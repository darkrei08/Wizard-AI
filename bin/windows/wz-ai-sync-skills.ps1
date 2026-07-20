# wz-wz-ai-sync-skills — Sync skills from ~\.gemini\config\skills\ to all agent paths.
# Windows port of bin/wz-wz-ai-sync-skills
#
# Direction 1 (always): ~\.gemini\config\skills\ -> claude, amp, agents, etc.
# Direction 2 (if WIZARD_AI_DIR is set): ~\.gemini\config\skills\ -> repo\skills\
#
# Run this after adding or modifying any skill to propagate changes everywhere.

$SkillsSrc = Join-Path $HOME '.gemini\config\skills'
$Targets = @(
    (Join-Path $HOME '.claude\skills'),
    (Join-Path $HOME '.config\amp\skills'),
    (Join-Path $HOME '.agents\skills'),
    (Join-Path $HOME '.config\agents\skills')
)

# Load wizard-ai env if not already set (user env var is set by setup.ps1)
$WizardDir = $env:WIZARD_AI_DIR
if (-not $WizardDir) {
    $WizardDir = [Environment]::GetEnvironmentVariable('WIZARD_AI_DIR', 'User')
}

if (-not (Test-Path $SkillsSrc)) {
    Write-Host "[X] Skills source not found: $SkillsSrc" -ForegroundColor Red
    Write-Host '    Run setup.ps1 first.'
    exit 1
}

Write-Host "Syncing AI skills from: $SkillsSrc"
Write-Host ''

# --- Direction 1: Gemini -> All other agents ---
foreach ($Target in $Targets) {
    $null = New-Item -ItemType Directory -Force -Path $Target
    Get-ChildItem -Path $SkillsSrc -Directory | ForEach-Object {
        $Dest = Join-Path $Target $_.Name
        $null = New-Item -ItemType Directory -Force -Path $Dest
        Copy-Item -Path (Join-Path $_.FullName '*') -Destination $Dest -Recurse -Force -ErrorAction SilentlyContinue
    }
    $Count = (Get-ChildItem -Path $Target -Directory -ErrorAction SilentlyContinue | Measure-Object).Count
    Write-Host "  [ok] $Target ($Count skills)" -ForegroundColor Green
}

# --- Direction 2: Gemini -> Wizard-AI repo (backup into categories) ---
if ($WizardDir -and (Test-Path (Join-Path $WizardDir 'skills'))) {
    Write-Host ''
    Write-Host '  Backing up new skills to repo...'
    $BackedUp = 0
    Get-ChildItem -Path $SkillsSrc -Directory | ForEach-Object {
        $SkillName = $_.Name
        # Search recursively (up to 3 levels) if this skill already exists anywhere in the repo
        $Existing = Get-ChildItem -Path (Join-Path $WizardDir 'skills') -Directory -Recurse -Depth 2 -ErrorAction SilentlyContinue |
            Where-Object { $_.Name -eq $SkillName } | Select-Object -First 1
        if (-not $Existing) {
            # New skill: back up into the misc category by default
            $RepoSkillDir = Join-Path $WizardDir "skills\misc\$SkillName"
            $null = New-Item -ItemType Directory -Force -Path $RepoSkillDir
            Copy-Item -Path (Join-Path $_.FullName '*') -Destination $RepoSkillDir -Recurse -Force -ErrorAction SilentlyContinue
            Write-Host "    + $SkillName (new -> repo/skills/misc/)"
            $BackedUp++
        }
    }
    if ($BackedUp -eq 0) {
        Write-Host '    All skills already in sync with repo.'
    } else {
        Write-Host "  [ok] $WizardDir\skills\ ($BackedUp new skills backed up to misc/)" -ForegroundColor Green
    }
} elseif (-not $WizardDir) {
    Write-Host ''
    Write-Host '  WIZARD_AI_DIR not set — skipping repo backup.'
    Write-Host '  Run setup.ps1 once to enable automatic repo backup.'
}

Write-Host ''
$Total = (Get-ChildItem -Path $SkillsSrc -Directory -ErrorAction SilentlyContinue | Measure-Object).Count
Write-Host "Done! $Total skills synced. Run 'wz-wz-ai-help' to see all available tools."

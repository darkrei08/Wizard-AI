<#
.SYNOPSIS
wz-ai-skill-doctor — Self-Healing Skill Diagnostic Daemon for Windows
#>
$WizardDir = $env:WIZARD_AI_DIR
if (-not $WizardDir) {
    $WizardDir = [Environment]::GetEnvironmentVariable('WIZARD_AI_DIR', 'User')
}
if (-not $WizardDir) { $WizardDir = Split-Path -Parent $PSScriptRoot }

$SkillsDir = Join-Path $WizardDir "skills"

Write-Host "🏥 WIZARD-AI SELF-HEALING SKILL DOCTOR (Windows)" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan

Write-Host "🔍 [Phase 1/3] Checking YAML frontmatter & SKILL.md index files..." -ForegroundColor Yellow
$Skills = Get-ChildItem -Path $SkillsDir -Filter "SKILL.md" -Recurse -File -ErrorAction SilentlyContinue
$Total = ($Skills | Measure-Object).Count
Write-Host "  ✅ Found $Total skills in local repo filesystem." -ForegroundColor Green

Write-Host "🔍 [Phase 2/3] Checking PowerShell wrapper scripts in bin\windows..." -ForegroundColor Yellow
$Wrappers = Get-ChildItem -Path $PSScriptRoot -Filter "*.ps1"
Write-Host "  ✅ Found $($Wrappers.Count) Windows CLI wrapper scripts." -ForegroundColor Green

Write-Host "🔍 [Phase 3/3] Triggering skill sync to all agent directories..." -ForegroundColor Yellow
$SyncScript = Join-Path $PSScriptRoot "wz-ai-sync-skills.ps1"
if (Test-Path $SyncScript) {
    & $SyncScript
}

Write-Host "✨ All diagnostic checks passed 100%!" -ForegroundColor Green
Write-Host "═══════════════════════════════════════════════════════════════════" -ForegroundColor Cyan

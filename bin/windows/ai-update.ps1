# ai-update.ps1 — Automates the update process for Wizard-AI and external skills.

param (
    [switch]$Quiet
)

function Log($msg, $color="White") {
    if (-not $Quiet) {
        Write-Host $msg -ForegroundColor $color
    }
}

# If WIZARD_AI_DIR isn't set (e.g. running from scheduled task), try to load env or fallback
$WizardDir = $env:WIZARD_AI_DIR
if (-not $WizardDir) {
    $EnvFile = Join-Path $HOME '.config\wizard-ai\env.ps1'
    if (Test-Path $EnvFile) { . $EnvFile }
    $WizardDir = $env:WIZARD_AI_DIR
    if (-not $WizardDir) { $WizardDir = Join-Path $HOME '.wizard-ai' }
}

Log "`n🧙‍♂️ Wizard-AI Update Process" "Cyan"
Log "=================================" "Cyan"

if (Test-Path (Join-Path $WizardDir '.git')) {
    Log "`n📦 Updating Wizard-AI repository..." "Blue"
    Push-Location $WizardDir
    if ($Quiet) { git pull --ff-only --quiet } else { git pull --ff-only }
    Pop-Location
}

$AiSkills = Join-Path $HOME '.ai-skills'
if (Test-Path $AiSkills) {
    Log "`n📚 Updating external skill repositories..." "Blue"
    $Dirs = Get-ChildItem -Path $AiSkills -Directory
    foreach ($Dir in $Dirs) {
        if (Test-Path (Join-Path $Dir.FullName '.git')) {
            Log "  -> Updating $($Dir.Name)..." "Yellow"
            Push-Location $Dir.FullName
            if ($Quiet) { git pull --ff-only --quiet } else { git pull --ff-only }
            Pop-Location
        }
    }
}

if (Get-Command uv -ErrorAction SilentlyContinue) {
    Log "`n🛠️ Upgrading global CLI tools via uv..." "Blue"
    if ($Quiet) {
        uv tool upgrade --all --quiet | Out-Null
    } else {
        uv tool upgrade --all
    }
}

$SyncScript = Join-Path $HOME '.local\bin\ai-sync-skills.ps1'
if (Test-Path $SyncScript) {
    Log "`n🔄 Syncing agent skills..." "Blue"
    & $SyncScript | Out-Null
}

Log "`n✅ Update complete!" "Green"

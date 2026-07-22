# wz-ai proxy - Manage the Cockpit Tools proxy daemon
# Wraps scripts/wz-ai proxy.js

$WizardAiDir = $env:WIZARD_AI_DIR
if (-not $WizardAiDir) {
    Write-Host "ERROR: WIZARD_AI_DIR is not set. Please run setup.ps1 first." -ForegroundColor Red
    exit 1
}

$NodeCmd = if (Get-Command node -ErrorAction SilentlyContinue) { "node" } else { $null }

if (-not $NodeCmd) {
    Write-Host "ERROR: Node.js is not installed or not in PATH." -ForegroundColor Red
    exit 1
}

& $NodeCmd "$WizardAiDir\scripts\wz-ai proxy.js" @args
exit $LASTEXITCODE

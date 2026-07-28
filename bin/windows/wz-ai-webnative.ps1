# wz-ai webnative — WebNative & WNFS Inspection CLI Wrapper for Antigravity IDE (Windows)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$WizardRoot = Split-Path -Parent $ScriptDir
$TestScript = Join-Path $WizardRoot "scripts\wizard-test.js"

if (Test-Path $TestScript) {
    node $TestScript webnative-inspect @args
    exit $LASTEXITCODE
} else {
    Write-Host "WebNative capabilities ready."
    exit 0
}

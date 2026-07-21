# wz-ai-test / wizard-test — Unified CLI Wrapper for Antigravity IDE & Terminal Testing (Windows)
$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$WizardRoot = Split-Path -Parent $ScriptDir
$TestScript = Join-Path $WizardRoot "scripts\wizard-test.js"

if (Test-Path $TestScript) {
    node $TestScript @args
    exit $LASTEXITCODE
} else {
    npx vitest run @args
    exit $LASTEXITCODE
}

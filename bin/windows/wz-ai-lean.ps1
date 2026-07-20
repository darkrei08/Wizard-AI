# wz-wz-ai-lean — Lean Context Intelligence wrapper
# Windows port of bin/wz-wz-ai-lean
# Source: https://github.com/yvgude/lean-ctx

$Lean = $null
$Cmd = Get-Command lean-ctx -ErrorAction SilentlyContinue
if ($Cmd) {
    $Lean = $Cmd.Source
} else {
    $Candidate = Join-Path $HOME '.local\bin\lean-ctx.exe'
    if (Test-Path $Candidate) { $Lean = $Candidate }
}

if (-not $Lean) {
    Write-Host '[X] lean-ctx not found.' -ForegroundColor Red
    Write-Host '    Ensure lean-ctx is installed (e.g. npm i -g lean-ctx or via cargo)'
    exit 1
}

if ($args.Count -eq 0 -and -not $MyInvocation.ExpectingInput -and -not [Console]::IsInputRedirected) {
    Write-Host 'wz-wz-ai-lean — Lean Context Intelligence'
    Write-Host ''
    Write-Host 'Usage:'
    Write-Host '  wz-wz-ai-lean setup'
    Write-Host '  wz-wz-ai-lean status'
    Write-Host '  wz-wz-ai-lean read <file> [mode]'
    Write-Host '  wz-wz-ai-lean benchmark'
    exit 0
}

if ($MyInvocation.ExpectingInput) {
    $input | & $Lean @args
} else {
    & $Lean @args
}
exit $LASTEXITCODE

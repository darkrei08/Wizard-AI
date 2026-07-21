# wz-ai-squeeze — sqz wrapper for compressing CLI output, JSON, logs
# Windows port of bin/wz-ai-squeeze
# Source: https://github.com/ojuschugh1/sqz

$Sqz = $null
$Cmd = Get-Command sqz -ErrorAction SilentlyContinue
if ($Cmd) {
    $Sqz = $Cmd.Source
} else {
    $Candidate = Join-Path $HOME '.local\bin\sqz.exe'
    if (Test-Path $Candidate) { $Sqz = $Candidate }
}
if (-not $Sqz) {
    Write-Host '[X] sqz not found.' -ForegroundColor Red
    Write-Host '    Install: uv tool install sqz   (or re-run setup.ps1)'
    exit 1
}

$HasStdin = $MyInvocation.ExpectingInput -or [Console]::IsInputRedirected

if ($args.Count -eq 0 -and -not $HasStdin) {
    Write-Host 'wz-ai-squeeze — Compress CLI output, JSON, and logs'
    Write-Host ''
    Write-Host 'Usage:'
    Write-Host '  command | wz-ai-squeeze                      # Compress command output'
    Write-Host '  wz-ai-squeeze < file.json                    # Compress a file (cmd.exe)'
    Write-Host '  command | wz-ai-squeeze compress --verify    # Show confidence score'
    Write-Host '  wz-ai-squeeze stats                          # Session compression report'
    Write-Host '  wz-ai-squeeze expand "<ref-token>"           # Expand a dedup token'
    Write-Host ''
    Write-Host 'Pipeline examples:'
    Write-Host '  git log --oneline -100 | wz-ai-squeeze'
    Write-Host '  kubectl get pods -A -o json | wz-ai-squeeze compress --mode aggressive'
    Write-Host '  npm run build 2>&1 | wz-ai-squeeze'
    exit 0
}

if ($MyInvocation.ExpectingInput) {
    $input | & $Sqz @args
} else {
    & $Sqz @args
}
exit $LASTEXITCODE

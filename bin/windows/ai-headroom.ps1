# ai-headroom — Headroom proxy and context compression wrapper
# Windows port of bin/ai-headroom

$Cmd = Get-Command headroom -ErrorAction SilentlyContinue
if (-not $Cmd) {
    Write-Host '[X] headroom not found.' -ForegroundColor Red
    Write-Host '    Install: uv tool install headroom-ai'
    exit 1
}

if ($args.Count -eq 0 -and -not $MyInvocation.ExpectingInput -and -not [Console]::IsInputRedirected) {
    Write-Host 'ai-headroom — Context compression and API proxy for token efficiency'
    Write-Host ''
    Write-Host 'Usage:'
    Write-Host '  ai-headroom proxy --port 8080      # Start the local API proxy'
    Write-Host '  ai-headroom auth                   # Setup API keys'
    Write-Host '  ai-headroom status                 # View headroom status'
    exit 0
}

if ($MyInvocation.ExpectingInput) {
    $input | & headroom @args
} else {
    & headroom @args
}
exit $LASTEXITCODE

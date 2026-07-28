# wz-ai usage — Track Gemini/AI token usage across sessions
# Windows port of bin/wz-ai usage
# Source: https://github.com/rmedranollamas/geminiusage

$SkillDir = Join-Path $HOME '.wizard-ai\geminiusage'

if (-not (Test-Path $SkillDir)) {
    Write-Host "[X] geminiusage not found at $SkillDir" -ForegroundColor Red
    Write-Host ''
    Write-Host 'Install with:'
    Write-Host "  git clone https://github.com/rmedranollamas/geminiusage.git `"$SkillDir`""
    Write-Host ''
    Write-Host 'Or re-run setup.ps1 to install everything automatically.'
    exit 1
}

if ($args.Count -eq 0) {
    Write-Host 'wz-ai usage — Track Gemini CLI token usage and session costs'
    Write-Host ''
    Write-Host 'Usage:'
    Write-Host '  wz-ai usage                   Show current session usage'
    Write-Host '  wz-ai usage --today           Consumption today'
    Write-Host '  wz-ai usage --rolling-24h     Last 24 hours'
    Write-Host '  wz-ai usage --quota           Quota status'
    Write-Host '  wz-ai usage --history         Full usage history'
    Write-Host ''
    Write-Host 'Aliases: gemini-usage (same script)'
    Write-Host ''
}

if (Get-Command python -ErrorAction SilentlyContinue) {
    python (Join-Path $SkillDir 'scripts\token_usage.py') @args
} elseif (Get-Command py -ErrorAction SilentlyContinue) {
    py -3 (Join-Path $SkillDir 'scripts\token_usage.py') @args
} else {
    Write-Host '[X] Python not found. Install Python or run setup.ps1.' -ForegroundColor Red
    exit 1
}
exit $LASTEXITCODE

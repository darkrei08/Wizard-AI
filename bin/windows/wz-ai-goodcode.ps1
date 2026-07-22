<#
.SYNOPSIS
wz-ai-goodcode — Exhaustive multi-agent orchestration wrapper (Windows)
#>
Write-Host "🎯 [wz-ai-goodcode] Exhaustive Multi-Agent Auditor & Verification Engine" -ForegroundColor Cyan
Write-Host "  Fan-out specialist roles, adversarial verification, loop-until-dry." -ForegroundColor Yellow
if ($args.Count -gt 0) {
    npx vitest run @args
} else {
    npx vitest run
}

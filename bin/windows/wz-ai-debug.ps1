<#
.SYNOPSIS
wz-ai-debug — Automated debug, lint, and test verification gate (Windows)
#>
Write-Host "🐛 [wz-ai-debug] Running quality control gates..." -ForegroundColor Cyan

if (Get-Command ruff -ErrorAction SilentlyContinue) {
    ruff check .
}
if (Get-Command vitest -ErrorAction SilentlyContinue) {
    npx vitest run
} else {
    npm test
}

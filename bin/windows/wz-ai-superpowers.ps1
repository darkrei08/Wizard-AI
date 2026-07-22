<#
.SYNOPSIS
wz-ai-superpowers — Discover and rank relevant skills (Windows)
#>
param([string]$Query = "")

$SkillsSrc = Join-Path $HOME '.gemini\config\skills'
Write-Host "🔍 [wz-ai-superpowers] Discovering skills for query: '$Query'..." -ForegroundColor Cyan

if (Test-Path $SkillsSrc) {
    if ($Query) {
        Get-ChildItem -Path $SkillsSrc -Filter "*$Query*" -Directory | ForEach-Object {
            Write-Host "  ⭐ Skill found: $($_.Name)" -ForegroundColor Green
        }
    } else {
        $Count = (Get-ChildItem -Path $SkillsSrc -Directory).Count
        Write-Host "  ✅ Total skills loaded in environment: $Count" -ForegroundColor Green
    }
} else {
    Write-Host "  ⚠ Skills directory not found. Run 'wz-ai-sync-skills'." -ForegroundColor Yellow
}

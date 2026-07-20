<#
.SYNOPSIS
wz-wz-ai-ponytail — AI skill to cut output tokens by acting like a lazy senior dev

.DESCRIPTION
Source: https://github.com/DietrichGebert/ponytail
This script injects the ponytail system prompt either standalone or before piped/provided text.
#>

$WizardAiDir = $env:WIZARD_AI_DIR
if (-not $WizardAiDir) {
    $WizardAiDir = Join-Path $HOME '.config\wizard-ai'
}

$SkillPath = Join-Path $WizardAiDir 'skills\ponytail\SKILL.md'

if (Test-Path $SkillPath) {
    Get-Content $SkillPath
} else {
    $Fallback = Join-Path $HOME '.gemini\config\skills\ponytail\SKILL.md'
    if (Test-Path $Fallback) {
        Get-Content $Fallback
    } else {
        Write-Host "Ponytail skill not found." -ForegroundColor Yellow
    }
}

# If arguments or pipeline input are provided, append them
if ($args.Count -gt 0) {
    Write-Output ""
    Write-Output ($args -join " ")
} elseif ([Console]::IsInputRedirected) {
    Write-Output ""
    $Input | Write-Output
}

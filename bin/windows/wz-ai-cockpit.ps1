# wz-ai-cockpit.ps1 - PowerShell Account Switcher CLI wrapper for Cockpit Tools & AI Agents

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$WizardDir = Split-Path -Parent $ScriptDir

$WzAiCockpitJs = Join-Path $WizardDir "scripts\wz-ai-cockpit.js"

if (Test-Path $WzAiCockpitJs) {
    node $WzAiCockpitJs @args
} else {
    Write-Error "wz-ai-cockpit.js not found at $WzAiCockpitJs"
}

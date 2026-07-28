# wz-ai-paperclip.ps1 - PowerShell wrapper for the Paperclip <-> pi-workflow bridge

$ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
$WizardDir = Split-Path -Parent $ScriptDir

$WzAiPaperclipJs = Join-Path $WizardDir "scripts\wz-ai-paperclip.js"

if (Test-Path $WzAiPaperclipJs) {
    node $WzAiPaperclipJs @args
} else {
    Write-Error "wz-ai-paperclip.js not found at $WzAiPaperclipJs"
}

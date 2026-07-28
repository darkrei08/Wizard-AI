<#
.SYNOPSIS
Wizard-AI Central Dispatcher for Windows
#>

if ($args.Count -eq 0) {
    Write-Host "Usage: wz-ai <command> [args...]"
    Write-Host "Run 'wz-ai help' for a list of available commands."
    exit 1
}

$CmdName = $args[0]
$CmdArgs = $args | Select-Object -Skip 1
$TargetCommand = "wz-ai-$CmdName"

# Check if the command exists in PATH (the .cmd or .ps1 shims created by setup)
if (Get-Command $TargetCommand -ErrorAction SilentlyContinue) {
    & $TargetCommand @CmdArgs
}
else {
    $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Definition
    $TargetScript = Join-Path $ScriptDir "$TargetCommand.ps1"
    $TargetBash = Join-Path (Split-Path -Parent $ScriptDir) $TargetCommand
    
    if (Test-Path $TargetScript) {
        & $TargetScript @CmdArgs
    }
    elseif (Test-Path $TargetBash) {
        if (Get-Command bash -ErrorAction SilentlyContinue) {
            & bash $TargetBash @CmdArgs
        } else {
            Write-Host "Command $CmdName requires bash or Git Bash on Windows." -ForegroundColor Red
            exit 1
        }
    }
    else {
        Write-Host "Unknown command: $CmdName" -ForegroundColor Red
        Write-Host "Run 'wz-ai help' for a list of available commands."
        exit 1
    }
}

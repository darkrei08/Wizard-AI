<#
.SYNOPSIS
wz-ai-os — Universal pre-install hook & meta-package-manager for Wizard-AI (Windows)
#>
param(
    [string]$Action = "info",
    [string]$PkgName = ""
)

if (-not (Get-Command winget -ErrorAction SilentlyContinue)) {
    Write-Host "[wz-ai-os] winget is recommended on Windows 10/11." -ForegroundColor Yellow
}

switch ($Action) {
    "info" {
        Write-Host "🖥️  OS: Windows ($env:PROCESSOR_ARCHITECTURE)" -ForegroundColor Cyan
        Write-Host "📦 Package Managers: winget, choco, npm, uv" -ForegroundColor Green
    }
    "check" {
        if (Get-Command $PkgName -ErrorAction SilentlyContinue) {
            exit 0
        } else {
            exit 1
        }
    }
    "install" {
        if (-not $PkgName) { Write-Host "Specify package name" -ForegroundColor Red; exit 1 }
        winget install $PkgName --accept-package-agreements --accept-source-agreements
    }
    "python" {
        uv tool install $PkgName
    }
    "node" {
        npm install -g $PkgName
    }
    default {
        $BashOs = Join-Path (Split-Path -Parent $PSScriptRoot) "wz-ai-os"
        if (Test-Path $BashOs) {
            & bash $BashOs @args
        } else {
            Write-Host "Usage: wz-ai os [info|check|install|python|node]"
        }
    }
}

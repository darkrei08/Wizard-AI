<#
.SYNOPSIS
wz-ai-install — Install a new skill or CLI tool into Wizard-AI (Windows)
#>
param(
    [string]$Target = ""
)

if (-not $Target) {
    $ScriptInstaller = Join-Path $PSScriptRoot '..\..\scripts\wizard-installer.js'
    if (Test-Path $ScriptInstaller) {
        node $ScriptInstaller @args
        exit 0
    }
    Write-Host "Usage: wz-ai install <skill-or-repo-url>" -ForegroundColor Yellow
    exit 1
}

Write-Host "📦 [wz-ai-install] Installing $Target..." -ForegroundColor Cyan
if ($Target.StartsWith("http") -or $Target.StartsWith("git@")) {
    $SkillsDir = Join-Path $HOME ".wizard-ai"
    $RepoName = Split-Path $Target -Leaf -Resolve:$false
    $RepoName = $RepoName -replace "\.git$", ""
    $Dest = Join-Path $SkillsDir $RepoName
    git clone --depth 1 $Target $Dest
    Write-Host "  ✅ Cloned $Target into $Dest" -ForegroundColor Green
} else {
    uv tool install $Target 2>$null
    if ($LASTEXITCODE -ne 0) {
        npm install -g $Target 2>$null
    }
}

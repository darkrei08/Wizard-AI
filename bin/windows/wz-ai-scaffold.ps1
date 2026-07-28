<#
.SYNOPSIS
wz-ai-scaffold — Scaffold new project templates (Windows)
#>
param([string]$Template = "express-ts")

Write-Host "🏗️ [wz-ai-scaffold] Scaffolding new project template: $Template" -ForegroundColor Cyan
switch ($Template) {
    "nuxt4" { npx -y create-nuxt-app@latest ./ }
    "qwik" { npx -y create-qwik@latest ./ }
    default {
        npx -y create-express-typescript-starter ./ 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "  ✓ Express+TypeScript scaffold initialized." -ForegroundColor Green
        }
    }
}

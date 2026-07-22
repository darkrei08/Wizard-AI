<#
.SYNOPSIS
wz-ai-branch — Git branch lifecycle & naming automation (Windows)
#>
param(
    [string]$Action = "status",
    [string]$Name = ""
)

switch ($Action) {
    "create" {
        if (-not $Name) { Write-Host "Branch name required." -ForegroundColor Red; exit 1 }
        git checkout -b $Name
        Write-Host "  ✅ Created and checked out branch: $Name" -ForegroundColor Green
    }
    "merge" {
        git checkout main
        git merge --no-ff $Name
    }
    default {
        git branch -a
    }
}

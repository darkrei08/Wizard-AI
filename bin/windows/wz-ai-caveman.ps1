param( [Parameter(ValueFromRemainingArguments=$true)]$RemainingArgs )

Write-Host "Caveman is a skill injection system for AI agents." -ForegroundColor Cyan
Write-Host "Running official Caveman installer..." -ForegroundColor Yellow

try {
    # Download the script to memory and execute it, passing any arguments
    $script = Invoke-RestMethod -Uri "https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1"
    $scriptBlock = [ScriptBlock]::Create($script)
    & $scriptBlock @RemainingArgs
} catch {
    Write-Host "Failed to run Caveman installer: $_" -ForegroundColor Red
    Write-Host "Try manually: irm https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 | iex" -ForegroundColor Yellow
}

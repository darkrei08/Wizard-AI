param( [Parameter(ValueFromRemainingArguments=$true)]$RemainingArgs )

if (Get-Command caveman -ErrorAction SilentlyContinue) {
    caveman @RemainingArgs
} else {
    Write-Host "caveman is not installed or not in PATH." -ForegroundColor Red
    Write-Host "Install it with: npm install -g https://github.com/JuliusBrussee/caveman.git" -ForegroundColor Yellow
}

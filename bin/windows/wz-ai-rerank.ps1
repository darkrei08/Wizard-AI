# wz-wz-ai-rerank — FlashRank passage reranker for RAG pipelines (CPU-optimized)
# Windows port of bin/wz-wz-ai-rerank
# Source: https://github.com/PrithivirajDamodaran/FlashRank

$Venv = Join-Path $HOME '.ai-skills\venv'
$Py = Join-Path $Venv 'Scripts\python.exe'

if (-not (Test-Path $Py)) {
    Write-Host "[X] FlashRank venv not found." -ForegroundColor Red
    Write-Host "    Run: uv venv `"$Venv`" --seed; uv pip install flashrank --python `"$Py`""
    exit 1
}

$null = & $Py -c "import flashrank" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] flashrank not installed in venv." -ForegroundColor Red
    Write-Host "    Run: uv pip install flashrank --python `"$Py`""
    exit 1
}

$Script = Join-Path $PSScriptRoot 'lib\ai_rerank.py'

if ($MyInvocation.ExpectingInput) {
    $input | & $Py $Script @args
} else {
    & $Py $Script @args
}
exit $LASTEXITCODE

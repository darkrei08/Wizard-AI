# wz-wz-ai-compress — LLMLingua prompt/context compressor (up to 20x token reduction)
# Windows port of bin/wz-wz-ai-compress
# Source: https://github.com/microsoft/LLMLingua

$Venv = Join-Path $HOME '.wizard-ai\venv'
$Py = Join-Path $Venv 'Scripts\python.exe'

if (-not (Test-Path $Py)) {
    Write-Host "[X] LLMLingua venv not found." -ForegroundColor Red
    Write-Host "    Run: uv venv `"$Venv`" --seed; uv pip install llmlingua --python `"$Py`""
    exit 1
}

$null = & $Py -c "import llmlingua" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "[X] llmlingua not installed in venv." -ForegroundColor Red
    Write-Host "    Run: uv pip install llmlingua --python `"$Py`""
    exit 1
}

$Script = Join-Path $PSScriptRoot 'lib\ai_compress.py'

if ($MyInvocation.ExpectingInput) {
    $input | & $Py $Script @args
} else {
    & $Py $Script @args
}
exit $LASTEXITCODE

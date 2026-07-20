# book-to-skill — Convert books/documents into AI agent skills
# Windows port of bin/book-to-skill
# Source: https://github.com/virgiliojr94/book-to-skill

$SkillDir = Join-Path $HOME '.wizard-ai\book-to-skill'

if (-not (Test-Path $SkillDir)) {
    Write-Host "ERROR: book-to-skill not found. Run: git clone https://github.com/virgiliojr94/book-to-skill.git `"$SkillDir`"" -ForegroundColor Red
    exit 1
}

function Resolve-Python {
    $VenvPy = Join-Path $HOME '.wizard-ai\venv\Scripts\python.exe'
    if (Test-Path $VenvPy) { return @($VenvPy) }
    if (Get-Command python -ErrorAction SilentlyContinue) { return @('python') }
    if (Get-Command py -ErrorAction SilentlyContinue) { return @('py', '-3') }
    return $null
}

# @() at the call site: PowerShell unrolls single-element arrays returned
# from functions, which would make $Py[0] index the first character.
$Py = @(Resolve-Python)
if ($Py.Count -eq 0) {
    Write-Host '[X] Python not found. Install Python or run setup.ps1.' -ForegroundColor Red
    exit 1
}
$PyExe = $Py[0]
$PyArgs = @($Py | Select-Object -Skip 1)

$Script = Join-Path $SkillDir 'book_to_skill.py'
if (Test-Path $Script) {
    & $PyExe @PyArgs $Script @args
    exit $LASTEXITCODE
}

Write-Host 'book-to-skill: Converting document to AI skill...'
Write-Host ''
Write-Host 'Usage: book-to-skill <file> [skill-slug]'
Write-Host 'Formats: PDF, EPUB, DOCX, TXT, MD, RST, HTML'
Write-Host ''
Write-Host 'Install optional deps:'
Write-Host "  uv pip install PyPDF2 pdfminer.six python-docx ebooklib beautifulsoup4 --python `"$HOME\.wizard-ai\venv\Scripts\python.exe`""
Write-Host ''
Write-Host 'Skill output: ~\.copilot\skills\<slug>\'
Write-Host '              ~\.claude\skills\<slug>\'
Write-Host '              ~\.agents\skills\<slug>\'
exit 0

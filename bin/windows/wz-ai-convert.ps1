# wz-wz-ai-convert — markitdown wrapper for converting files to Markdown
# Windows port of bin/wz-wz-ai-convert
# Source: https://github.com/microsoft/markitdown

$Md = $null
$Cmd = Get-Command markitdown -ErrorAction SilentlyContinue
if ($Cmd) {
    $Md = $Cmd.Source
} else {
    $Candidate = Join-Path $HOME '.local\bin\markitdown.exe'
    if (Test-Path $Candidate) { $Md = $Candidate }
}
if (-not $Md) {
    Write-Host '[X] markitdown not found.' -ForegroundColor Red
    Write-Host '    Install: uv tool install markitdown'
    exit 1
}

if ($args.Count -eq 0) {
    Write-Host 'wz-wz-ai-convert — Convert any file to Markdown for LLM ingestion'
    Write-Host ''
    Write-Host 'Usage:'
    Write-Host '  wz-wz-ai-convert <file>              Convert file to Markdown (stdout)'
    Write-Host '  wz-wz-ai-convert <file> -o out.md    Save to file'
    Write-Host '  wz-wz-ai-convert <url>               Convert URL to Markdown'
    Write-Host '  wz-wz-ai-convert *.pdf               Convert multiple files'
    Write-Host ''
    Write-Host 'Supported formats:'
    Write-Host '  Documents: PDF, DOCX, PPTX, XLSX, ODT, EPUB'
    Write-Host '  Web:       HTML, HTM, URLs'
    Write-Host '  Text:      TXT, CSV, JSON, XML, YAML'
    Write-Host '  Images:    PNG, JPG, GIF (OCR text extraction)'
    Write-Host '  Audio:     MP3, WAV, M4A (speech-to-text)'
    Write-Host '  Archives:  ZIP (recursive conversion)'
    Write-Host ''
    Write-Host 'Examples:'
    Write-Host '  wz-wz-ai-convert report.pdf > report.md'
    Write-Host '  wz-wz-ai-convert https://docs.example.com/api'
    Write-Host '  wz-wz-ai-convert presentation.pptx -o slides.md'
    exit 0
}

# PowerShell does not expand wildcards for native commands: do it here
$Expanded = @()
foreach ($a in $args) {
    if ($a -is [string] -and $a -match '[*?]') {
        $Matched = Get-ChildItem -Path $a -File -ErrorAction SilentlyContinue
        if ($Matched) { $Expanded += $Matched.FullName } else { $Expanded += $a }
    } else {
        $Expanded += $a
    }
}

# Handle multiple files
if ($Expanded.Count -gt 1 -and $Expanded[0] -ne '-o' -and $Expanded[0] -ne '--output') {
    foreach ($f in $Expanded) {
        if (Test-Path $f -PathType Leaf) {
            $OutName = [System.IO.Path]::ChangeExtension($f, '.md')
            Write-Host "Converting: $f -> $OutName"
            & $Md $f -o $OutName
        }
    }
    exit 0
}

& $Md @Expanded
exit $LASTEXITCODE

# ai-help — Central hub for all AI tools and skills
# Windows port of bin/ai-help
# Shows all available AI CLI tools with descriptions and usage hints

function Check-Cmd($Name) {
    if (Get-Command $Name -ErrorAction SilentlyContinue) { return '[OK]' } else { return '[--]' }
}

function Section($Title) {
    Write-Host $Title -ForegroundColor Yellow
}

function Tool($Status, $Name, $Desc) {
    if ($Status -eq '[OK]') {
        Write-Host "  $Status " -ForegroundColor Green -NoNewline
    } else {
        Write-Host "  $Status " -ForegroundColor Red -NoNewline
    }
    Write-Host ("{0,-17}" -f $Name) -NoNewline
    Write-Host $Desc
}

function Example($Text) {
    Write-Host "     $Text" -ForegroundColor Blue
}

Write-Host ''
Write-Host '=============================================================' -ForegroundColor Cyan
Write-Host "          AI Tools & Skills Hub — $env:COMPUTERNAME" -ForegroundColor Cyan
Write-Host '=============================================================' -ForegroundColor Cyan
Write-Host ''

Section 'KNOWLEDGE GRAPH'
Tool (Check-Cmd graphify) 'graphify' 'Build knowledge graphs from any codebase/docs'
Example 'ai-graph .                  -> Run Graphify on current directory'
Example 'graphify query "how does X work?"'
Write-Host ''

Section 'TOKEN OPTIMIZATION'
Tool (Check-Cmd ai-compress) 'ai-compress' 'Compress prompts/context up to 20x (LLMLingua)'
Example 'ai-compress --file doc.txt --ratio 0.5'
Tool (Check-Cmd ai-caveman) 'ai-caveman' 'Cut agent output tokens by ~75% while keeping accuracy'
Example 'ai-caveman --with-init'
Tool (Check-Cmd ai-ponytail) 'ai-ponytail' 'Acts as a lazy senior dev to prevent over-engineering (YAGNI)'
Example 'ai-ponytail "write a datepicker"'
Tool (Check-Cmd ai-rerank) 'ai-rerank' 'Re-rank passages by relevance (FlashRank RAG)'
Example 'ai-rerank --query "X" --passages docs.json'
Tool (Check-Cmd sqz) 'sqz' 'Compress CLI output / JSON / logs'
Example 'command | ai-squeeze'
Tool (Check-Cmd markitdown) 'markitdown' 'Convert any file to Markdown for LLM ingestion'
Example 'ai-convert document.pdf'
Write-Host ''

Section 'LLM GATEWAY'
Tool (Check-Cmd litellm) 'litellm' 'Unified API for 100+ LLM providers + cost tracking'
Example 'litellm --model gemini/gemini-2.0-flash --port 4000'
Write-Host ''

Section 'USAGE & MONITORING'
Tool (Check-Cmd ai-usage) 'ai-usage' 'Track Gemini CLI token/context usage'
Example 'ai-usage'
Write-Host ''

Section 'MEMORY & CONTEXT'
Tool (Check-Cmd ai-session-save) 'ai-session-save' 'Save current session context to MEMORY.md'
Example 'ai-session-save "completed feature X"'
if (Test-Path (Join-Path $HOME '.ai-skills\claude-mem')) {
    Tool '[OK]' 'claude-mem' 'Persistent semantic memory across sessions'
} else {
    Tool '[--]' 'claude-mem' 'Persistent semantic memory (not installed)'
}
Example 'ai-mem store "user prefers Python"'
Example 'ai-mem search "tech preferences"'
Write-Host ''

Section 'CODE INTELLIGENCE'
if (Get-Command serena -ErrorAction SilentlyContinue) {
    Tool '[OK]' 'serena' 'Semantic code search & LSP navigation (MCP + CLI)'
} else {
    Tool '[--]' 'serena' 'Semantic code search (install: uv tool install serena-agent)'
}
Example 'serena find-usages MyClass'
Write-Host ''

Section 'KNOWLEDGE BUILDING'
Tool (Check-Cmd book-to-skill) 'book-to-skill' 'Convert books/PDFs into AI skills'
Example 'book-to-skill document.pdf'
Write-Host ''

Section 'FRAMEWORK'
$EccDir = Join-Path $HOME '.ai-skills\ECC'
if (Test-Path $EccDir) {
    $EccSkills = (Get-ChildItem -Path (Join-Path $EccDir 'skills') -ErrorAction SilentlyContinue | Measure-Object).Count
    Tool '[OK]' 'ECC' "$EccSkills+ production-ready agent skills & hooks"
} else {
    Tool '[--]' 'ECC' 'Agent skills framework (not installed)'
}
Example "dir $HOME\.ai-skills\ECC\skills\"
Write-Host ''

Write-Host '-------------------------------------------------------------' -ForegroundColor Magenta
Write-Host "Skills directory: $HOME\.gemini\config\skills\"
Write-Host "Tools directory:  $HOME\.ai-skills\"
Write-Host "CLIs:             $HOME\.local\bin\"
Write-Host ''
Write-Host 'Tip: all tools work as pipes -> cmd | ai-compress | ai-rerank' -ForegroundColor Cyan
Write-Host ''

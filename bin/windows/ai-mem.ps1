# ai-mem — Persistent semantic memory for LLM sessions (claude-mem)
# Windows port of bin/ai-mem
# Source: https://github.com/thedotmack/claude-mem

$MemDir = Join-Path $HOME '.ai-skills\claude-mem'
$MemStore = Join-Path $HOME '.ai-skills\mem-store'

if (-not (Test-Path $MemDir)) {
    Write-Host '[X] claude-mem not found.' -ForegroundColor Red
    Write-Host "    Clone: git clone https://github.com/thedotmack/claude-mem `"$MemDir`""
    exit 1
}

$null = New-Item -ItemType Directory -Force -Path $MemStore

function Show-Help {
    Write-Host 'ai-mem — Persistent semantic memory across AI sessions'
    Write-Host ''
    Write-Host 'Usage:'
    Write-Host '  ai-mem store <text>          Store a memory'
    Write-Host '  ai-mem store --tag X <text>  Store with a tag'
    Write-Host '  ai-mem search <query>        Semantic search memories'
    Write-Host '  ai-mem list [--tag X]        List all memories'
    Write-Host '  ai-mem delete <id>           Delete a memory'
    Write-Host '  ai-mem export [file.json]    Export all memories'
    Write-Host '  ai-mem import <file.json>    Import memories'
    Write-Host ''
    Write-Host 'Examples:'
    Write-Host '  ai-mem store "User prefers Python over JavaScript"'
    Write-Host '  ai-mem store --tag project "Uses PostgreSQL 16 and Redis 7"'
    Write-Host '  ai-mem search "technology stack"'
    Write-Host '  ai-mem list --tag project'
}

if ($args.Count -eq 0) {
    Show-Help
    exit 0
}

# Resolve a Python interpreter: venv first, then python, then py launcher
function Resolve-Python {
    $VenvPy = Join-Path $HOME '.ai-skills\venv\Scripts\python.exe'
    if (Test-Path $VenvPy) { return @($VenvPy) }
    if (Get-Command python -ErrorAction SilentlyContinue) { return @('python') }
    if (Get-Command py -ErrorAction SilentlyContinue) { return @('py', '-3') }
    return $null
}

$Py = Resolve-Python
if (-not $Py) {
    Write-Host '[X] Python not found. Install Python or run setup.ps1.' -ForegroundColor Red
    exit 1
}
$PyExe = $Py[0]
$PyArgs = @($Py | Select-Object -Skip 1)

# Check if claude-mem has a CLI entry point
$MemPy = Join-Path $MemDir 'mem.py'
$MemCli = Join-Path $MemDir 'claude_mem\cli.py'

if (Test-Path $MemPy) {
    & $PyExe @PyArgs $MemPy @args
    exit $LASTEXITCODE
} elseif (Test-Path $MemCli) {
    & $PyExe @PyArgs -m claude_mem.cli @args
    exit $LASTEXITCODE
} elseif (Get-Command claude-mem -ErrorAction SilentlyContinue) {
    claude-mem @args
    exit $LASTEXITCODE
}

# Fallback: simple JSON-based memory store
$Action = $args[0]
$Rest = @($args | Select-Object -Skip 1)
$MemFile = Join-Path $MemStore 'memories.json'

if (-not (Test-Path $MemFile)) {
    Set-Content -Path $MemFile -Value '{"memories":[]}' -Encoding utf8
}

$Fallback = Join-Path $PSScriptRoot 'lib\ai_mem_fallback.py'
& $PyExe @PyArgs $Fallback $MemFile $Action @Rest
if ($LASTEXITCODE -eq 2) {
    Show-Help
    exit 1
}
exit $LASTEXITCODE

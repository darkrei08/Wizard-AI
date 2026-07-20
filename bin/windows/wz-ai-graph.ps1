# wz-wz-ai-graph — Graphify wrapper with convenient shortcuts
# Windows port of bin/wz-wz-ai-graph
# Source: https://github.com/safishamsi/graphify

function Show-Help {
    Write-Host 'wz-wz-ai-graph — Graphify knowledge graph builder'
    Write-Host ''
    Write-Host 'Usage:'
    Write-Host '  wz-wz-ai-graph [path]              Build graph for path (default: current dir)'
    Write-Host '  wz-wz-ai-graph <github-url>        Clone repo and build graph'
    Write-Host '  wz-wz-ai-graph query "<question>"  Query existing graph'
    Write-Host '  wz-wz-ai-graph update              Incremental update (only changed files)'
    Write-Host '  wz-wz-ai-graph open                Open graph.html in browser'
    Write-Host '  wz-wz-ai-graph report              Show GRAPH_REPORT.md'
    Write-Host '  wz-wz-ai-graph wiki                Build agent-crawlable wiki'
    Write-Host ''
    Write-Host 'Options:'
    Write-Host '  --deep          Thorough extraction, richer edges'
    Write-Host '  --directed      Build directed graph (preserves edge direction)'
    Write-Host '  --no-viz        Skip visualization, just report + JSON'
    Write-Host '  --mcp           Start MCP stdio server for agent access'
    Write-Host '  --help, -h      Show this help'
    Write-Host ''
    Write-Host 'Examples:'
    Write-Host '  wz-wz-ai-graph .                   # Current directory'
    Write-Host '  wz-wz-ai-graph C:\projects\myapp   # Specific project'
    Write-Host '  wz-wz-ai-graph https://github.com/user/repo'
    Write-Host '  wz-wz-ai-graph query "how does auth work?"'
    Write-Host '  wz-wz-ai-graph open                # Open in browser'
}

if ($args.Count -eq 0 -or $args[0] -eq '--help' -or $args[0] -eq '-h') {
    Show-Help
    exit 0
}

# Resolve graphify binary (uv tool installs to ~\.local\bin)
$Graphify = $null
$Cmd = Get-Command graphify -ErrorAction SilentlyContinue
if ($Cmd) {
    $Graphify = $Cmd.Source
} else {
    $Candidate = Join-Path $HOME '.local\bin\graphify.exe'
    if (Test-Path $Candidate) { $Graphify = $Candidate }
}
if (-not $Graphify) {
    Write-Host '[X] graphify not found. Install: uv tool install graphifyy' -ForegroundColor Red
    exit 1
}

# Auto-detect Cockpit Tools CLIProxyAPI / Pi Rotator on port 51200
$tcpConnection = $null
try {
    $tcpConnection = New-Object System.Net.Sockets.TcpClient("127.0.0.1", 51200)
    if ($tcpConnection.Connected) {
        Write-Host "🚀 Cockpit Tools Proxy detected! Routing LLM requests through local subscription..." -ForegroundColor Cyan
        $env:OPENAI_API_BASE = "http://127.0.0.1:51200/v1"
        $env:OPENAI_BASE_URL = "http://127.0.0.1:51200/v1"
        $env:OPENAI_API_KEY = "dummy"
        $env:GEMINI_API_KEY = "dummy"
        $env:ANTHROPIC_API_KEY = "dummy"
        $env:GRAPHIFY_LLM_PROVIDER = "openai"
        $env:GRAPHIFY_LLM_MODEL = "gemini-3.1-pro-high"
        $CockpitArgs = @("--backend", "openai", "--model", "gemini-3.1-pro-high")
    }
} catch {
    # Port not open, ignore
    $CockpitArgs = @()
} finally {
    if ($tcpConnection) { $tcpConnection.Close() }
}

$First = $args[0]
$Rest = @($args | Select-Object -Skip 1)

switch ($First) {
    'open' {
        $GraphHtml = Get-ChildItem -Path . -Recurse -Filter 'graph.html' -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -match 'graphify-out' } |
            Select-Object -First 1
        if (-not $GraphHtml) {
            Write-Host "[X] No graph.html found. Run 'wz-wz-ai-graph .' first." -ForegroundColor Red
            exit 1
        }
        Write-Host "Opening: $($GraphHtml.FullName)"
        Start-Process $GraphHtml.FullName
        exit 0
    }
    'report' {
        $Report = Get-ChildItem -Path . -Recurse -Filter 'GRAPH_REPORT.md' -ErrorAction SilentlyContinue |
            Where-Object { $_.FullName -match 'graphify-out' } |
            Select-Object -First 1
        if (-not $Report) {
            Write-Host "[X] No GRAPH_REPORT.md found. Run 'wz-wz-ai-graph .' first." -ForegroundColor Red
            exit 1
        }
        Get-Content $Report.FullName
        exit 0
    }
    'update' {
        if ($Rest.Count -eq 0) { $Rest = @('.') }
        & $Graphify @Rest --update @CockpitArgs
        exit $LASTEXITCODE
    }
    { $_ -in 'query', 'path', 'explain', 'add' } {
        & $Graphify @args @CockpitArgs
        exit $LASTEXITCODE
    }
}

# Default: run graphify with all remaining args
& $Graphify @args @CockpitArgs
exit $LASTEXITCODE

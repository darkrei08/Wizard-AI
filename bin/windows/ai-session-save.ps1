<#
.SYNOPSIS
Salva lo stato della sessione per le AI (Claude Code, Antigravity, ecc.)

.DESCRIPTION
Il contenuto verrà appeso al file MEMORY.md nella directory corrente (o CLAUDE.md),
che la maggior parte degli agenti CLI legge automaticamente all'apertura del terminale.
Questo garantisce il mantenimento del contesto tra diverse sessioni e finestre.

.PARAMETER InputObject
Il testo del riassunto, passato anche tramite pipeline.

.PARAMETER Message
Il testo del riassunto, se passato come argomento.

.EXAMPLE
ai-session-save "Il progetto è stato migrato a Next.js"

.EXAMPLE
"Tutti i test passano. Prossimo step: login" | ai-session-save
#>
[CmdletBinding()]
param (
    [Parameter(ValueFromPipeline=$true)]
    [string]$InputObject,

    [Parameter(Position=0)]
    [string]$Message
)

$File = "MEMORY.md"
$Content = ""

if ($InputObject) {
    $Content = $InputObject
} elseif ($Message) {
    $Content = $Message
} else {
    Write-Host "Usage: ai-session-save `"Il tuo riassunto della sessione...`"" -ForegroundColor Yellow
    Write-Host "       `"Riassunto`" | ai-session-save" -ForegroundColor Yellow
    exit 1
}

$Timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"

if (Test-Path $File) {
    $Size = (Get-Item $File).Length
    if ($Size -gt 51200) {
        Write-Host "[!] Warning: $File sta diventando grande ($Size bytes). Valuta di compattarlo." -ForegroundColor Yellow
    }
}

$OutputLines = @(
    "",
    "## [Session State Snapshot] - $Timestamp",
    $Content,
    ""
)

$OutputLines | Out-File -FilePath $File -Append -Encoding UTF8

Write-Host "[ok] Stato della sessione salvato in $File." -ForegroundColor Green
Write-Host "     L'agente AI lo leggerà automaticamente al prossimo riavvio del terminale." -ForegroundColor Gray

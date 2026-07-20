<#
.SYNOPSIS
Wrapper per l'esecuzione del gestore di sessioni/memoria @storybloq/storybloq

.DESCRIPTION
Intercetta flag allucinati come '-m' o '--message' che Storybloq snapshot non accetta nativamente.
#>
[CmdletBinding()]
param (
    [Parameter(ValueFromRemainingArguments=$true)]
    [string[]]$Args
)

$StorybloqDir = Join-Path $HOME '.ai-skills\storybloq'
$StorybloqBin = Join-Path $StorybloqDir 'node_modules\.bin\storybloq.cmd'

# Filtraggio degli argomenti "allucinati" per snapshot
$FilteredArgs = @()
$SkipNext = $false
$Cmd = if ($Args.Count -gt 0) { $Args[0] } else { "" }

for ($i = 0; $i -lt $Args.Count; $i++) {
    $Arg = $Args[$i]
    if ($SkipNext) {
        $SkipNext = $false
        continue
    }

    if ($Cmd -eq "snapshot") {
        if ($Arg -eq "-m" -or $Arg -eq "--message") {
            $SkipNext = $true
            continue
        }
    }
    
    $FilteredArgs += $Arg
}

if (Test-Path $StorybloqBin) {
    & $StorybloqBin $FilteredArgs
} else {
    npx -y @storybloq/storybloq $FilteredArgs
}

<#
.SYNOPSIS
Wrapper for engram
#>
if ($args.Count -eq 0) {
    engram --help
}
else {
    engram @args
}

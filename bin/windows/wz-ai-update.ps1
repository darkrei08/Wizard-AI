# wz-ai-update.ps1 — Automates the update process for Wizard-AI and external skills.

param (
    [switch]$Quiet
)

function Log($msg, $color="White") {
    if (-not $Quiet) {
        Write-Host $msg -ForegroundColor $color
    }
}

# If WIZARD_AI_DIR isn't set (e.g. running from scheduled task), try to load env or fallback
$WizardDir = $env:WIZARD_AI_DIR
if (-not $WizardDir) {
    $EnvFile = Join-Path $HOME '.config\wizard-ai\env.ps1'
    if (Test-Path $EnvFile) { . $EnvFile }
    $WizardDir = $env:WIZARD_AI_DIR
    if (-not $WizardDir) { $WizardDir = Join-Path $HOME '.wizard-ai' }
}

Log "`n🧙‍♂️ Wizard-AI Update Process" "Cyan"
Log "=================================" "Cyan"

if (Test-Path (Join-Path $WizardDir '.git')) {
    Log "`n📦 Updating Wizard-AI repository..." "Blue"
    Push-Location $WizardDir
    $PreUpdateCommit = git rev-parse HEAD
    if ($Quiet) { git pull --ff-only --quiet 2>$null } else { git pull --ff-only }
    if ($LASTEXITCODE -ne 0) {
        Log "  [!] Update failed for Wizard-AI. Rolling back to stable commit $PreUpdateCommit..." "Red"
        git reset --hard $PreUpdateCommit 2>$null | Out-Null
    }
    Pop-Location
}

$AiSkills = Join-Path $HOME '.wizard-ai'
if (Test-Path $AiSkills) {
    Log "`n📚 Updating external skill repositories..." "Blue"
    
    $UpdaterScript = Join-Path $WizardDir 'scripts\wz-ai-auto-updater.js'
    if (Test-Path $UpdaterScript) {
        if (Get-Command node -ErrorAction SilentlyContinue) {
            node $UpdaterScript
        } else {
            Log "  [!] Node.js not found. Skipping advanced auto-update." "Yellow"
        }
    } else {
        Log "  [!] Auto-updater script not found at $UpdaterScript" "Yellow"
    }
}

if (Get-Command npm -ErrorAction SilentlyContinue) {
    Log "`n📦 Upgrading global NPM packages (Wizard-AI CLI, AI-OS, etc)..." "Blue"
    if ($Quiet) {
        npm update -g --quiet | Out-Null
    } else {
        npm update -g
    }
}

if (Get-Command uv -ErrorAction SilentlyContinue) {
    Log "`n🛠️ Upgrading global CLI tools via uv..." "Blue"
    if ($Quiet) {
        uv tool upgrade --all --quiet | Out-Null
    } else {
        uv tool upgrade --all
    }
    
    # Auto-inject updated CLI skills into the master skills folder
    if (Get-Command graphify -ErrorAction SilentlyContinue) {
        Log "  -> Auto-injecting graphify skill updates..." "Yellow"
        if ($Quiet) { graphify install 2>$null | Out-Null } else { graphify install }
        $GraphifySrc = Join-Path $HOME '.claude\skills\graphify'
        $GraphifyDst = Join-Path $WizardDir 'skills\devops-and-tools\graphify'
        if ((Test-Path $GraphifySrc) -and (Test-Path $GraphifyDst)) {
            Copy-Item -Path "$GraphifySrc\*" -Destination $GraphifyDst -Recurse -Force
            # Force update version cache
            $Version = (graphify --version) -replace "graphify ",""
            if ($Version) {
                $Version | Out-File -FilePath (Join-Path $GraphifyDst '.graphify_version') -Encoding ascii
                Log "  [ok] Graphify skill synchronized to v$Version" "Green"
            }
        }
    }
}

Log "`n🔄 Syncing agent skills..." "Blue"
$SyncScript = Join-Path $HOME '.local\bin\wz-ai-sync-skills.ps1'
if (Test-Path $SyncScript) {
    & $SyncScript | Out-Null
}

Log "`n🔄 Updating Caveman agent skill..." "Blue"
try {
    $tempPs1 = Join-Path $env:TEMP "caveman_update.ps1"
    Invoke-RestMethod https://raw.githubusercontent.com/JuliusBrussee/caveman/main/install.ps1 -OutFile $tempPs1
    $proc = Start-Process powershell -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$tempPs1`"" -Wait -NoNewWindow -PassThru
    Remove-Item $tempPs1 -ErrorAction SilentlyContinue
    if ($proc.ExitCode -eq 0) {
        Log "  [ok] Caveman skill updated successfully across all agents." "Green"
    } else {
        Log "  [!] Caveman skill update returned exit code $($proc.ExitCode)." "Yellow"
    }
} catch {
    Log "  [!] Failed to update Caveman automatically." "Yellow"
}

Log "`n✅ Update complete!" "Green"

# Show desktop notification
try {
    Add-Type -AssemblyName System.Windows.Forms
    $notify = New-Object System.Windows.Forms.NotifyIcon
    $notify.Icon = [System.Drawing.SystemIcons]::Information
    $notify.BalloonTipIcon = "Info"
    $notify.BalloonTipTitle = "Wizard-AI"
    $notify.BalloonTipText = "Aggiornamento ambiente e skill (wiki incluse) completato con successo!"
    $notify.Visible = $true
    $notify.ShowBalloonTip(5000)
    Start-Sleep -Seconds 5
    $notify.Dispose()
} catch {
    # Fallback in case of errors with UI
}

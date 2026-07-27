const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

// Extended list of external repositories and their GitHub paths
const REPOS = {
    "claude-mem": "thedotmack/claude-mem",
    "headroom": "chopratejas/headroom",
    "Infographic": "antvis/Infographic",
    "cybersecurity-skills": "mukul975/Anthropic-Cybersecurity-Skills",
    "lean-ctx": "yvgude/lean-ctx",
    "stitch-skills": "google-labs-code/stitch-skills",
    "design.md": "google-labs-code/design.md",
    "wslens": "vekexasia/wslens",
    "ECC": "affaan-m/ECC",
    "caveman": "JuliusBrussee/caveman"
};

const WIZARD_DIR = process.env.WIZARD_AI_DIR || path.join(require('os').homedir(), '.wizard-ai');

function httpsGet(url) {
    return new Promise((resolve, reject) => {
        const req = https.get(url, { headers: { 'User-Agent': 'Wizard-AI-Updater' } }, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (res.statusCode >= 200 && res.statusCode < 300) {
                    try {
                        resolve(JSON.parse(data));
                    } catch (e) {
                        resolve(null);
                    }
                } else {
                    resolve(null); // Not found or error
                }
            });
        });
        req.on('error', reject);
    });
}

async function checkAndUpdate() {
    console.log(`\n🚀 Starting Wizard-AI Autonomous External Repositories Sync...`);
    
    // Ensure .wizard-ai exists
    if (!fs.existsSync(WIZARD_DIR)) {
        fs.mkdirSync(WIZARD_DIR, { recursive: true });
    }

    for (const [name, repoPath] of Object.entries(REPOS)) {
        const localDir = path.join(WIZARD_DIR, name);
        console.log(`\n🔍 Checking ${name} (${repoPath})...`);
        
        try {
            // Check latest release
            const releaseData = await httpsGet(`https://api.github.com/repos/${repoPath}/releases/latest`);
            let targetRef = "main"; // Default to branch pull
            let releaseTag = null;
            
            if (releaseData && releaseData.tag_name) {
                releaseTag = releaseData.tag_name;
                console.log(`   📦 Latest GitHub Release: ${releaseTag}`);
                targetRef = releaseTag;
            } else {
                console.log(`   ℹ️ No GitHub Releases found. Defaulting to branch pull.`);
            }

            if (!fs.existsSync(localDir)) {
                console.log(`   -> Cloning missing repository...`);
                execSync(`git clone https://github.com/${repoPath}.git "${localDir}"`, { stdio: 'ignore' });
                if (releaseTag) {
                    execSync(`git checkout ${releaseTag}`, { cwd: localDir, stdio: 'ignore' });
                }
                console.log(`   ✓ Successfully cloned and checked out.`);
            } else {
                // Check current commit/tag
                try {
                    let currentTag = "";
                    try {
                        currentTag = execSync(`git describe --tags --exact-match`, { cwd: localDir, stdio: 'pipe' }).toString().trim();
                    } catch (e) { }

                    if (releaseTag && currentTag === releaseTag) {
                        console.log(`   ✓ Already up to date (Tag: ${currentTag}).`);
                        continue;
                    }

                    console.log(`   -> Fetching updates...`);
                    execSync(`git fetch --all --tags`, { cwd: localDir, stdio: 'ignore' });
                    
                    const prevCommit = execSync(`git rev-parse HEAD`, { cwd: localDir, stdio: 'pipe' }).toString().trim();
                    
                    if (releaseTag) {
                        execSync(`git checkout ${releaseTag}`, { cwd: localDir, stdio: 'ignore' });
                        console.log(`   ✓ Successfully updated to release ${releaseTag}.`);
                    } else {
                        execSync(`git pull --ff-only`, { cwd: localDir, stdio: 'ignore' });
                        console.log(`   ✓ Successfully pulled latest commits.`);
                    }
                } catch (updateErr) {
                    console.log(`   ⚠ Update failed or conflicts detected. Rolling back...`);
                    try { execSync(`git reset --hard FETCH_HEAD`, { cwd: localDir, stdio: 'ignore' }); } catch(e){}
                }
            }
        } catch (e) {
            console.log(`   ❌ Error updating ${name}: ${e.message}`);
        }
    }
}

checkAndUpdate().then(() => console.log("\n✅ Autonomous repo sync complete."));

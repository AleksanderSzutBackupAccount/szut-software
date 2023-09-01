const fs = require("fs");
const { exec } = require("child_process");

const nvmVersion = fs.readFileSync(".nvmrc").toString().trim();
const npmVersion = fs.readFileSync(".npmrc").toString().trim();
const desired = `v${nvmVersion}`;
const running = process.version;

if (!running.startsWith(desired)) {
    exec("${NVM_DIR}/nvm.sh install")
    exec("${NVM_DIR}/nvm.sh use")
}
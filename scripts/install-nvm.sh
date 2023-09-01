#!/bin/bash

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.8/install.sh | bash; \
export NVM_DIR="$HOME/.nvm";
source ~/.bash_profile;
source $HOME/.nvm/nvm.sh;
nvm --version

nvm:
	source ${NVM_DIR}/nvm.sh && nvm use

check-version:
	source ${NVM_DIR}/nvm.sh && nvm use && node scripts/checkversion;

help:
	@echo 'make [tab]'

setup:
	source ${NVM_DIR}/nvm.sh && nvm use && npm install -g npm@9.6.7 && npm install

update:
	./scripts/update.sh
	make setup

update-force:
	./scripts/update-force.sh
	make setup

dev:
	source ${NVM_DIR}/nvm.sh && nvm use && node scripts/checkversion && npm run dev

build:
	source ${NVM_DIR}/nvm.sh && nvm use && node scripts/checkversion && npm run build

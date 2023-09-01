nvm:
	command -v nvm >/dev/null 2>&1|./scripts/install-nvm.sh

check-version: nvm
	@node scripts/checkversion

help:
	@echo 'make [tab]'

setup:
	make check-version
	npm install -g npm@9.6.7
	npm install

update:
	./scripts/update.sh
	make setup

update-force:
	./scripts/update-force.sh
	make setup

dev:
	make check-version
	npm run dev

build:
	make check-version
	npm run build

nvm:
	${NVM_DIR}/nvm.sh use
up:
	make nvm
	yarn

serve:
	make nvm
	yarn run serve

build:
	make nvm
	yarn run build

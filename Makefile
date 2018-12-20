BUILD_CD = frontend/
SERVER_CD = server/

build: 
	echo Install npm modules and build
	cd $(BUILD_CD) && npm install && npm run build

delete:
	cd $(SERVER_CD) && rm -r dist

just-build:
	cd $(BUILD_CD) && npm run build

copy:
	cp -R ./frontend/dist ./server

start:
	cd $(SERVER_CD) && npm start

build-and-copy: | build copy

just-build-and-copy: | just-build delete copy

first-start-server: | build-and-copy start

start-server: | just-build-and-copy start
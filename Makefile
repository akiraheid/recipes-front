pwd:=$(shell pwd)

build: Dockerfile clean
	docker build -t recipes-front -f Dockerfile .

build-test: Dockerfile.test
	docker build -t recipes-front-test -f Dockerfile.test .

clean:
	-rm -rf node_modules

lint:
	docker run --rm -v ${pwd}/:/data/:ro cytopia/eslint .

serve: build
	cp -n .env.example .env
	docker-compose up -d
	echo "App is running!"

serve-down:
	docker-compose down

test: lint build serve build-test
	docker run --rm --network=host -v ${pwd}/test/:/test/test/:ro recipes-api-test

.PHONY: build clean lint serve setup

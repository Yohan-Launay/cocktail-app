# Setup —————————————————————————————————————————————————————————————————————————
DOCKER_COMPOSE = docker-compose
EXEC_PHP = $(DOCKER_COMPOSE) exec php
EXEC_YARN  = yarn
SYMFONY    = $(EXEC_PHP) bin/console
COMPOSER   = $(EXEC_PHP) composer
VENDOR_BIN = $(EXEC_PHP) ./vendor/bin/
PHP_CS_FIXER  = $(VENDOR_BIN)php-cs-fixer
NPX        = npx
NPM        = npm

.DEFAULT_GOAL := help
Arguments := $(wordlist 2,$(words $(MAKECMDGOALS)),$(MAKECMDGOALS))

## —— My Make file  —————————————————————————————————————————————
help: ## Outputs this help screen
	@grep -E '(^[a-zA-Z_-]+:.*?##.*$$)|(^##)' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}{printf "\033[32m%-30s\033[0m %s\n", $$1, $$2}' | sed -e 's/\[32m##/[33m/'

## —— Docker  —————————————————————————————————————————————
build: ## Build
	$(DOCKER_COMPOSE) pull --ignore-pull-failures
	$(DOCKER_COMPOSE) build --pull

kill: ## Kill all docker
	$(DOCKER_COMPOSE) kill
	docker rm $$(docker ps -a -q) && echo "" > /dev/null 2>&1 || echo "" > /dev/null 2>&1
	@rm -rf vendor > /dev/null 2>&1 && echo "" > /dev/null 2>&1 || echo "" > /dev/null 2>&1
	@rm -rf var/cache > /dev/null 2>&1 && echo "" > /dev/null 2>&1  || echo "" > /dev/null 2>&1

up: ## Start all docker container
	$(DOCKER_COMPOSE) up -d

down: ## Stop, delete all docker containers
	$(DOCKER_COMPOSE) down --volumes --remove-orphans

stop: ## Stop all docker containers
	$(DOCKER_COMPOSE) stop

## —— Composer —————————————————————————————————————————————————————————————————
install: composer.lock ## Install vendors according to the current composer.lock file
	$(COMPOSER) install --no-interaction --no-progress --prefer-dist

update: composer.json ## Update vendors according to the current composer.json file
	$(COMPOSER) update --no-interaction --no-progress --prefer-dist

req: composer.json ## Composer require
	$(COMPOSER) require $(Arguments)

dal: composer.json  ## Composer dump-autoload
	$(COMPOSER) dump-autoload

## —— Symfony ——————————————————————————————————————————————————————————————————
sf: vendor ## List Symfony command
	$(SYMFONY) $(Arguments)

cc: vendor ## Clear cache
	$(SYMFONY) c:c

regen: vendor ## Doctrine regenerate entity
	$(SYMFONY) make:entity --regenerate $(Arguments)

entity: vendor ## Doctrine regenerate entity
	$(SYMFONY) make:entity

user: vendor ## Doctrine regenerate entity
	$(SYMFONY) make:user

mm: vendor ## Doctrine regenerate entity
	$(SYMFONY) make:migration

warmup: vendor ## Warmump the cache
	$(SYMFONY) cache:warmup

fix-perms: ## Fix permissions of all var files
	chmod -R 777 var/*

purge: ## Purge cache and logs
	rm -rf var/cache/* var/logs/*

diff: vendor  ## Doctrine migration diff
	$(SYMFONY) d:m:diff --no-interaction

dmm: vendor  ## Doctrine migration migrate
	$(SYMFONY) d:m:m --no-interaction

dmg: vendor  ## Doctrine migration generate
	$(SYMFONY) d:m:g --no-interaction

db: vendor ## Drop database + Create database
	$(SYMFONY) doctrine:database:drop --if-exists --force -n
	$(SYMFONY) doctrine:database:create

dbm: db dmm cc ## Drop database + Create database + Doctrine migration migrate + Clean cache

cdb: vendor  ## Clean db to delete users test
	$(SYMFONY) app:db:cleaner

ISO: vendor ## Import ISO DATA
	$(SYMFONY) import:country_code
	$(SYMFONY) import:currency

fix: vendor ## Doctrine regenerate entity
	$(SYMFONY) doctrine:fixtures:load


## —— Project ———————————————————————————————————————————————————————————————————
new: kill build up initfile update ## First installation of the project

initfile: .env ## Manage .env file
	cp commit-msg.dist .git/hooks/commit-msg
	cp pre-commit.dist .git/hooks/pre-commit
	chmod ug+x .git/hooks/commit-msg
	chmod ug+x .git/hooks/pre-commit

## —— RabbitMq ——————————————————————————————————————————————————————————————————
consume: vendor ## Consume messenger messages
	$(SYMFONY) messenger:consume async -vv

## —— Assets ————————————————————————————————————————————————————————————————————
watch: assets ## Turn on watch mode for assets
	$(EXEC_YARN) watch

dev: assets ## Build for dev environment
	$(EXEC_YARN) dev

prod: assets ## Build for prod environment
	$(EXEC_YARN) prod

ni: assets ## Yarn Install Force
	rm -rf node_modules
	rm -rf package-lock.json
	$(EXEC_YARN) install --force

## —— Coding standards ✨ ——————————————————————————————————————————————————————
lint-css: .stylelint.json ## Lint CSS using coding standards
	$(NPX) stylelint --config ./.stylelint.json "**/*.css" --allow-empty-input

lint-js: .eslintrc.json ## Lints JS using coding standards
	$(NPX) eslint assets/js

fix-js: .eslintrc.json ## Fixes JS files
	$(NPX) eslint assets/js --fix

phpcs: vendor .phpcs.xml ## PHP_CodeSnifer (https://github.com/squizlabs/PHP_CodeSniffer)
	$(VENDOR_BIN)phpcs -v --standard=.phpcs.xml src --ignore=Migrations/*

phpcbf: vendor .phpcs.xml ## PHP_CodeSnifer (https://github.com/squizlabs/PHP_CodeSniffer)
	$(VENDOR_BIN)phpcbf -v --standard=.phpcs.xml src

lint-twig: ## Lint twig files
	$(SYMFONY) lint:twig

lint-php: ## Lint php files with php-cs-fixer
	$(PHP_CS_FIXER) fix --dry-run

fix-php: ## Fix php files with php-cs-fixer
	$(PHP_CS_FIXER) fix

lint: lint-php lint-twig lint-css lint-js ## Launch all linters

stan: .phpstan.neon## Run PHPStan (https://github.com/phpstan/phpstan/tree/1.4.x)
	$(VENDOR_BIN)phpstan analyse -c .phpstan.neon --memory-limit 1G

phpunit: vendor
	$(VENDOR_BIN)phpunit

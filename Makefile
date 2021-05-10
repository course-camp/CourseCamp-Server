install: ;	docker-compose -f docker-compose.builder.yml run --rm install
dev: ;	docker-compose up -d
setup: ;	docker volume create nodemodules; docker volume create mongodatabase
remove: ;	docker rm -f $(shell docker ps --filter label=com.coursecamp.description=development -aq)
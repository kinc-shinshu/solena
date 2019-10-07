.PHONY: deploy
deploy: deploy-solena deploy-solena-api

.PHONY: deploy-solena
deploy-solena:
	git subtree push --prefix client https://git.heroku.com/solena.git master

.PHONY: deploy-solena-api
deploy-solena-api:
	git subtree push --prefix server https://git.heroku.com/solena-api.git master

start:
node bin/gendiff.js

files:
	bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

fix:
	npx eslint . --fix

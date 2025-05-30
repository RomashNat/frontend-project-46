start:
node bin/gendiff.js

files1:
	bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json

files2:
	bin/gendiff.js __fixtures__/file1.yml __fixtures__/file2.yml

install:
	npm ci

publish:
	npm publish --dry-run

lint:
    npm run lint
   
fix:
	npx eslint . --fix

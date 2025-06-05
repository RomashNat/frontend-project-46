# Diffchacker project

### Project description:
Difference Calculator is a program that determines the difference between two data structures. This is a popular task, for which there are many online services, for example http://www.jsondiff.com /. A similar mechanism is used when outputting tests or when automatically tracking changes in configuration files.

#### Utility features:

* Support for different input formats: yaml, json
* Generating a report in plain text, stylish, and json format

## Hexlet tests and linter status:

### Code climate
[![Maintainability](https://api.codeclimate.com/v1/badges/80cabe5e78a396c9574d/maintainability)](https://codeclimate.com/github/RomashNat/frontend-project-46/maintainability)

### SonarQube Scanner
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=RomashNat_frontend-project-46&metric=alert_status)](https://sonarcloud.io/project/configuration?id=RomashNat_frontend-project-46)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=RomashNat_frontend-project-46&metric=coverage)](https://sonarcloud.io/project/configuration?id=RomashNat_frontend-project-46)

### Hexlet:
[![Actions Status](https://github.com/RomashNat/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/RomashNat/frontend-project-46/actions)

### Comparing of flat format files: .json (example of work):
```sh
$ node bin/gendiff.js __fixtures__/file1.json __fixtures__/file2.json
```
[![asciicast](https://asciinema.org/a/BTEYZP8LxSga7EmhUUdCsAvVo.svg)](https://asciinema.org/a/BTEYZP8LxSga7EmhUUdCsAvVo)

### Comparing of flat format files: .yml, .yaml (example of work):
```sh
node bin/gendiff.js __fixtures__/file1.yml __fixtures__/file2.yml
```
[![asciicast](https://asciinema.org/a/crzsgyj4jOrZhDcfDyBMws9A6.svg)](https://asciinema.org/a/crzsgyj4jOrZhDcfDyBMws9A6)

### Comparing files with a nested structure with output in "Stylish" format:
```sh
node bin/gendiff -f stylish __fixtures__/file1.yml __fixtures__/file2.yml
```
[![asciicast](https://asciinema.org/a/crzsgyj4jOrZhDcfDyBMws9A6.svg)](https://asciinema.org/a/F2IYZG1mRp3nhpvExyKD8UYDR)


### Comparing files with a nested structure with output in "Plain" format:
```sh
node bin/gendiff -f plain __fixtures__/file1.yaml __fixtures__/file2.yaml
```
[![asciicast](https://asciinema.org/a/crzsgyj4jOrZhDcfDyBMws9A6.svg)]( https://asciinema.org/a/8UGuyh0d5wVTY2a0lGtnQ6X3G)


### Comparing files with a nested structure with output in "Json" format:
```sh
node bin/gendiff -f json __fixtures__/file1.json __fixtures__/file2.json
```
[![asciicast](https://asciinema.org/a/crzsgyj4jOrZhDcfDyBMws9A6.svg)](https://asciinema.org/a/XiVcfBvstDV8WyzJvebTVK8jX)



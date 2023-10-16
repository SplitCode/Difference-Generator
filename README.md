## Difference Generator

### Hexlet tests and linter status:
[![Actions Status](https://github.com/SplitCode/frontend-project-46/workflows/hexlet-check/badge.svg)](https://github.com/SplitCode/frontend-project-46/actions)

### Code Climate status:
[![Maintainability](https://api.codeclimate.com/v1/badges/71c007b43f46e158118b/maintainability)](https://codeclimate.com/github/SplitCode/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/71c007b43f46e158118b/test_coverage)](https://codeclimate.com/github/SplitCode/frontend-project-46/test_coverage)

### Integration status
[![.github/workflows/main.yml](https://github.com/SplitCode/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/SplitCode/frontend-project-46/actions/workflows/main.yml)
---
### Description
Difference Generator - is a program that identifies the difference between two data structures. The program can be used as a command-line utility or installed as a library in third-party applications.

Features:

* Input formats: YAML, YML, JSON.
* Formats to display:  STYLISH (default), PLAIN, JSON.

To get help information about utility use default help option -h, --help
```
gendiff -h
```

### System requirements:

Node.js v20.7.0

### Setup
```
make install
npm link
```

---
## Demonstration
### Comparison of flat JSON format files
[![asciicast](https://asciinema.org/a/612836.svg)](https://asciinema.org/a/612836)

### Comparison of flat YML/YAML format files
[![asciicast](https://asciinema.org/a/612837.svg)](https://asciinema.org/a/612837)

### Comparison of JSON/YML/YAML format files with nested structure in 'stylish' format
[![asciicast](https://asciinema.org/a/612838.svg)](https://asciinema.org/a/612838)

### Comparison of JSON/YML/YAML format files with nested structure in 'plain' format
[![asciicast](https://asciinema.org/a/612843.svg)](https://asciinema.org/a/612843)

### Comparison of JSON/YML/YAML format files with nested structure in 'json' format
[![asciicast](https://asciinema.org/a/612852.svg)](https://asciinema.org/a/612852)
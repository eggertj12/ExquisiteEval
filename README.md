ExquisiteEval
=============

Course evaluations for the future of RU

## Installation

For installation and building of the project following packages are required
 `npm`, `grunt`, `bower` and `compass`. In order to run unit tests and get code coverage results 
 `karma` and `istanbul` are required to be globally available.

### ExquisiteEval

Building `ExquisiteEval` is a simple process based on two simple steps. 
From package main folder install dependencies as follows
    
```
$ npm install
$ bower install
```

### Backend API

ExquisiteEval depends on a backend API currently located at http://dispatch.ru.is/h08/api/v1/

The URL for the backend API can be set in `app/scripts/services/evalsettings.js` file 

## Building

Building a distribution package is done with grunt

```
$ grunt dist
```

Which concatenates and minifies all files to `dist` directory which can then be copied to a webserver, or run locally f.ex. via `python -m SimpleHTTPServer` if `python 2.7.x` is installed on local machine.

## Developing

Development build of package can be built and continuously run via `grunt serve` task which then watches for changes and livereloads browser window.

Continuous testing can also be done with `karma start` command which will monitor changes to files and rerun tests when necessary. Code coverage report should be available under `coverage` folder in project root.

## Usage

Should be pretty self explanatory. 
- Login at first screen with valid top security credentials
- Student users will be taken to a list of open evaluations to fill out and post their results
- Admin user will on the other hand get an evaluations page with options for viewing results and adding evaluations
- Creation of evaluation templates is a straight forward process of filling out available fields based on excellent UI hints
- New evaluations can be set up based on templates which are available
- Results of questions will be displayed depending on types of questions and all sections are collapsible for better overview




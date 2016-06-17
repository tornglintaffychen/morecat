'use strict';
var angular = require('angular');
var uiRouter = require('angular-ui-router');

require('jquery');

var app = angular.module("moreCat", [uiRouter]);

app.controller('CatCtrl', require('./controller'));

'use strict';
var angular = require('angular');
var uiRouter = require('angular-ui-router');

var app = angular.module("moreCat", [uiRouter]);
require('./factory');
require('./controller');
require('jquery');

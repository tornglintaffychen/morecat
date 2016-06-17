'use strict';
var clarifai = require('./clarifai');

module.exports = function ($scope) {
    clarifai.initialize()
    $scope.getTags = function (url) {
        return clarifai.getTagsByUrl(url)
            .then(function (res) {
                $scope.tags = res.results[0].result.tag.classes
            })
    }


}

'use strict';
var $ = require('jquery');

module.exports = function ($scope) {
    function setScale(info) {
        $scope.catScale = info.scale;
        $scope.$digest();
    }

    function setCat(info) {
        $scope.message = info.message;
        $scope.catScale = info.scale;
        console.log($scope.catScale)
        $scope.$digest();
    }

    window.addEventListener("DOMContentLoaded", function () {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {
                from: "popup",
                subject: "catScale"
            }, setScale)
        });
    });

    $scope.getVal = function (percentage) {
        console.log("before listener is", percentage)
        window.addEventListener("click", function () {
            console.log("after listener", percentage)
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    from: "popup",
                    subject: "changeCatPercentage",
                    content: percentage
                }, setScale)
            });
        });
    }
}

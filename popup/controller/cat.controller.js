'use strict';
var $ = require('jquery');

module.exports = function ($scope) {

    function setScale(info) {
        $scope.catScale = info.scale;
        console.log($scope.catScale)
        $scope.$digest();
    }

    function setCat(info) {
        $scope.message = info.message;
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

    $scope.allCat = function () {
        window.addEventListener("click", function () {
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    from: "popup",
                    subject: "allCat"
                }, setCat)
            })
        })
    }
}

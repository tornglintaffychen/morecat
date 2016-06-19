'use strict';
var $ = require('jquery');

module.exports = function ($scope, CatFty) {
    $scope.biru = "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e15/11138060_1401680673483730_1311620004_n.jpg?ig_cache_key=OTU2NjUzNTY2NTk4Mzk2MzYy.2";
    $scope.grumpy = "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e35/13102397_251726421845576_268830580_n.jpg?ig_cache_key=MTIzNTc2MzQwMTMxMTA4MDk5MA%3D%3D.2";
    $scope.nala = "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e35/13355458_824127977731538_700815084_n.jpg?ig_cache_key=MTI2OTk3MDE1MTM2ODU2ODE2OQ%3D%3D.2";
    $scope.birus = CatFty.birus;
    $scope.grumpys = CatFty.grumpys;
    $scope.nalas = CatFty.nalas;

    function setScale(info) {
        $scope.catScale = info.scale;
        $scope.$digest();
    }


    window.addEventListener("DOMContentLoaded", function () {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            console.log("cats", $scope.cats)
            chrome.tabs.sendMessage(tabs[0].id, {
                from: "popup",
                subject: "catScale"
            }, setScale)
        });
    });

    $scope.getPercentage = function (percentage) {
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

    $scope.switchImg = function (srcs) {
        console.log(srcs)
        window.addEventListener("click", function () {
            console.log("switch img", srcs)
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    from: "popup",
                    subject: "switchImg",
                    content: srcs
                }, function () {
                    console.log("switched")
                })
            });
        });
    }
}

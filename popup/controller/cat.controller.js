'use strict';
var $ = require('jquery');

module.exports = function ($scope, CatFty) {
    $scope.biru = "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e15/11138060_1401680673483730_1311620004_n.jpg?ig_cache_key=OTU2NjUzNTY2NTk4Mzk2MzYy.2";
    $scope.grumpy = "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e35/13102397_251726421845576_268830580_n.jpg?ig_cache_key=MTIzNTc2MzQwMTMxMTA4MDk5MA%3D%3D.2";
    $scope.maru = "https://scontent-iad3-1.cdninstagram.com/t51.2885-15/s320x320/e35/12747583_604646293045150_219699387_n.jpg?ig_cache_key=MTE5ODE3Nzg4MzY0Nzk2NTc2NQ%3D%3D.2"
    $scope.nala = "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/e35/13355458_824127977731538_700815084_n.jpg?ig_cache_key=MTI2OTk3MDE1MTM2ODU2ODE2OQ%3D%3D.2";
    $scope.birus = CatFty.birus;
    $scope.grumpys = CatFty.grumpys;
    $scope.marus = CatFty.marus;
    $scope.nalas = CatFty.nalas;

    function setScale(info) {
        $scope.catScale = info.scale;
        $scope.$digest();
    }

    function randomIndex() {
        return Math.floor(Math.random() * (119 - 0 + 1))
    }

    CatFty.defaultCats()
        .then(function (urls) {
            $scope.randomCats = urls.splice(randomIndex(), 9)
            console.log($scope.randomCats.length)
        })

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

    $scope.getPercentage = function (percentage) {
        window.addEventListener("change", function () {
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

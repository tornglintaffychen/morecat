'use strict';
var clarifai = require('./clarifai');
var $ = require('jquery');
var Bluebird = require('bluebird');
var api = require('../api.js');

function getImgSrc() {
    var images = []
    $('img').each(function () {
        images.push($(this).attr('src'))
    })
    return images;
}

function randomIndex() {
    return Math.floor(Math.random() * (srcs.length - 1 - 0 + 1)) + 1
}

function defaultCats() {
    return $.ajax({
            url: "https://pixabay.com/api/?key=" + api.pixabay.key + "&q=cats&image_type=photo"
        })
        .then(function (res) {
            var imgUrls = res.hits.map(function (item) {
                return item.webformatURL;
            })
            return imgUrls
        })
}

var srcs = [];

module.exports = {
    changeSrc: function (newSrcs) {
        srcs = newSrcs;
    },
    toCats: function (percentage) {
        var images = getImgSrc();

        if (percentage === 0) return;

        var sliceTo;
        if (percentage == 25) sliceTo = Math.round(images.length / 4);
        else if (percentage == 50) sliceTo = Math.round(images.length / 2);
        else if (percentage == 75) sliceTo = Math.round(images.length / 4 * 3);
        else sliceTo = images.length;
        if (srcs.length === 0) {
            defaultCats()
                .then(function (urls) {
                    srcs = urls
                    var count = 0;
                    $('img').each(function () {
                        if (count === sliceTo) return;
                        $(this).attr('src', srcs[randomIndex()]);
                        count++;
                    })
                })
        } else {
            var count = 0;
            $('img').each(function () {
                if (count === sliceTo) return;
                $(this).attr('src', srcs[randomIndex()]);
                count++;
            })
        }
    },
    checkCat: function () {
        var images = getImgSrc();

        clarifai.initialize();
        var tags = images.map(function (img) {
            return clarifai.getTagsByUrl(img)
        })

        return Bluebird.all(tags)
            .then(function (tags) {
                var cats = 0
                var allTagsCount = 0

                for (var i = 0; i < tags.length; i++) {
                    if (Array.isArray(tags[i]) && tags[i].indexOf("cat") > -1) {
                        cats++
                    }

                    if (Array.isArray(tags[i])) {
                        allTagsCount++
                    }

                }

                var scale = +((cats / allTagsCount) * 100).toFixed(2);
                return scale;
            })

    }
}

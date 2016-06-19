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

function randomIndex(srcs) {
    return Math.floor(Math.random() * (srcs.length - 1 - 0 + 1)) + 1
}

function defaultCats() {
    return $.ajax({
            url: "https://pixabay.com/api/?key=" + api.pixabay.key + "&q=cat+cute+animal&image_type=photo&per_page=60"
        })
        .then(function (res) {
            var imgUrls = res.hits.map(function (item) {
                return item.webformatURL;
            })
            return imgUrls
        })
}

var srcs = [];
var original_images = getImgSrc();

module.exports = {
    changeSrc: function (newSrcs) {
        srcs = newSrcs;
    },
    toCats: function (percentage) {
        if (percentage === 0) return;

        var sliceTo;
        if (percentage == 0) sliceTo = 0
        else if (percentage == 25) sliceTo = Math.round(original_images.length / 4);
        else if (percentage == 50) sliceTo = Math.round(original_images.length / 2);
        else if (percentage == 75) sliceTo = Math.round(original_images.length / 4 * 3);
        else sliceTo = original_images.length;

        if (srcs.length === 0) {
            defaultCats()
                .then(function (urls) {
                    srcs = urls
                    var count = 0;
                    var i = sliceTo;
                    $('img').each(function () {
                        if (sliceTo !== 0 && count < sliceTo) {
                            $(this).attr('src', srcs[randomIndex(srcs)]);
                            count++;
                        } else {
                            $(this).attr('src', original_images[i])
                            i++
                        }
                    })
                })
        } else {
            var count = 0;
            var i = sliceTo;
            $('img').each(function () {
                if (sliceTo !== 0 && count < sliceTo) {
                    console.log("count", count, "sliceTo", sliceTo)
                    $(this).attr('src', srcs[randomIndex(srcs)]);
                    count++;
                } else {
                    $(this).attr('src', original_images[i])
                    i++;
                }
            })
        }
    },
    checkCat: function () {
        var current_images = getImgSrc();

        clarifai.initialize();
        var tags = current_images.map(function (img) {
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

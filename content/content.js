'use strict';
var clarifai = require('./clarifai');
var $ = require('jquery');
var Bluebird = require('bluebird');

function getImgSrc() {
    var images = []
    $('img').each(function () {
        images.push($(this).attr('src'))
    })
    return images;
}

module.exports = {
    toCats: function (percentage) {
        var images = getImgSrc();
        if (percentage === 0) return;

        var sliceTo;
        if (percentage == 25) sliceTo = Math.round(images.length / 4);
        else if (percentage == 50) sliceTo = Math.round(images.length / 2);
        else if (percentage == 75) sliceTo = Math.round(images.length / 4 * 3);
        else sliceTo = images.length;

        var count = 0;
        $('img').each(function () {
            if (count === sliceTo) return;
            $(this).attr('src', "https://scontent.cdninstagram.com/t51.2885-15/s750x750/sh0.08/e35/12479631_194445340947617_907239085_n.jpg?ig_cache_key=MTIyOTkwNDI3MDAzMjU4ODc2OQ%3D%3D.2")
            count++;
        })
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

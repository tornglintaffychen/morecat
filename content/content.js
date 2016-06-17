'use strict';
var clarifai = require('./clarifai');
var $ = require('jquery');
var Bluebird = require('bluebird');

module.exports = {
    allCat: function () {
        console.log("changing imgs")
        $('img').each(function () {
            console.log($(this))
            $(this).attr('src', 'http://cdn.grumpycats.com/wp-content/uploads/2016/02/12654647_974282002607537_7798179861389974677_n-758x758.jpg')
        })
    },
    checkCat: function () {
        var images = []

        $('img').each(function () {
            images.push($(this).attr('src'))
        })

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

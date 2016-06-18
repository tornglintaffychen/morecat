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

function randomIndex() {
    return Math.floor(Math.random() * (srcs.length - 1 - 0 + 1)) + 1
}
var srcs = ["https://66.media.tumblr.com/7d37581c8c41072d31aa1f7a93cac5b9/tumblr_o60xo3Vg1g1u7gnm9o1_400.gif", "https://media.giphy.com/media/gXcIuJBbRi2Va/giphy.gif", "https://i.ytimg.com/vi/mW3S0u8bj58/maxresdefault.jpg", "https://i.ytimg.com/vi/tntOCGkgt98/maxresdefault.jpg", "https://charge.co/blog/content/images/2015/10/lion-cat.gif", "http://cbsnews3.cbsistatic.com/hub/i/r/2016/03/23/38e32f54-b910-4612-8852-be9e0fbdbf73/thumbnail/620x350/440a1273973991f75a0ac768f554e37c/cat-istock.jpg", "https://media.giphy.com/media/zQR7qMJ3Esh0Y/giphy.gif", "https://secure.static.tumblr.com/d021f240ac135021f0f6cf67c2c8f2c7/rq89zdl/E0cn8e2qx/tumblr_static_tumblr_static_c1w2y4zph1k4g0w88wgkk0soc_640.jpg", "http://www.catgifpage.com/gifs/318.gif", "https://lovelace-media.imgix.net/uploads/448/3e6cbca0-5ce3-0133-0bd9-0e34a4cc753d.gif?", "http://sites.psu.edu/siowfa15/wp-content/uploads/sites/29639/2015/10/cat.jpg", "http://www.catgifs.org/wp-content/uploads/2013/09/099_manycatsinthebox_cat_gifs.gif", "http://pictures.cats-paradise.net/wp-content/uploads/2014/02/funny-cat-gif.gif", "https://i.ytimg.com/vi/JalVHgKqBXs/maxresdefault.jpg", "http://s7.favim.com/orig/151230/animal-animals-cat-cats-Favim.com-3825897.gif", "http://www.rd.com/wp-content/uploads/sites/2/2016/04/01-cat-wants-to-tell-you-laptop.jpg", "https://lh3.googleusercontent.com/-FqN9wfQ_xXU/VqOio60tpXI/AAAAAAAAvdc/-J9PQM2kdLw/w506-h750/CAT-GIF-Funny-Cat-in-Monkey-costume-eating-a-banana-haha.gif", "https://media3.giphy.com/media/j2gpL7TQBHxnO/200_s.gif", "https://img1.wsimg.com/fos/sales/cwh/8/images/cats-with-hats-shop-01.jpg", "https://media2.giphy.com/media/kIkwipWRoqeUE/giphy.gif"]


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

        var count = 0;
        $('img').each(function () {
            if (count === sliceTo) return;
            $(this).attr('src', srcs[randomIndex()]);
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

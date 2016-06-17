'use strict';
require('jquery');

module.exports = function () {
    function getMyImages(element) {
        element = element || document;
        var images = element.querySelectorAll('img[src]'); //Get all images with src attributes
        var matches = [];
        for (var i = 0, j = images.length; i < j; i++) {
            var attributes = images[i].attributes;
            if (attributes.length > 1) { //Skip images with more than one attribute
                continue;
            }
            if (attributes[0].name === 'src') { //if the attribute is a src attribute, add it to the matches
                matches.push(images[i]);
            }
        }
        return matches; //Matches will now just contain images with only src attribute
    }
}

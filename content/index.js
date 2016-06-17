'use strict';

var content = require('./content');

content.checkCat()
    .then(function (scale) {
        window.chrome.runtime.onMessage.addListener(function (msg, sender, res) {
            console.log("listening")
            if (msg.from === "popup" && msg.subject === "DOMInfo") {
                var domInfo = {
                    catScale: scale
                };
                res(domInfo)
            }
        })
    })

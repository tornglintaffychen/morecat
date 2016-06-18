'use strict';

var content = require('./content');
var $ = require('jquery')

$(function () {
    $("#slider").slider();
});

window.chrome.runtime.sendMessage({
    from: "content",
    subject: "showPageAction"
});

content.checkCat()
    .then(function (scale) {
        window.chrome.runtime.onMessage.addListener(function (msg, sender, res) {
            console.log("listening")
            if (msg.from === "popup") {
                if (msg.subject === "catScale") {
                    var catScale = {
                        scale: scale
                    };
                    res(catScale)
                } else if (msg.subject === "allCat") {
                    console.log("allCat index")
                    content.allCat()
                    var response = {
                        message: "enjoy~",
                        scale: 100
                    };
                    res(response)
                }
            }
        })
    })

'use strict';

var content = require('./content');
var $ = require('jquery')

window.chrome.runtime.sendMessage({
    from: "content",
    subject: "showPageAction"
});

content.checkCat()
    .then(function (scale) {
        window.chrome.runtime.onMessage.addListener(function (msg, sender, res) {
            console.log("listening")
            if (msg.from === "popup" && msg.subject === "catScale") {
                var catScale = {
                    scale: scale
                };
                res(catScale)
            }

        })
    })

window.chrome.runtime.onMessage.addListener(function (msg, sender, res) {
    if (msg.from === "popup" && msg.subject === "changeCatPercentage") {
        console.log("getting percentage", msg.content)
        content.toCats(msg.content);
        var response = {
            message: "changed percentage",
            scale: msg.content
        };
        res(response)
    }
})

window.chrome.runtime.onMessage.addListener(function (msg, sender, res) {
    if (msg.from === "popup" && msg.subject === "switchImg") {
        console.log("getting new src", msg.content);
        content.changeSrc(msg.content);
    }
})

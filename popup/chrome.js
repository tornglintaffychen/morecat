'use strict';

module.exports = {
    getCatScale: function () {
        chrome.extension.onMessage.addEventListener(function (request, sender, sendRequest) {
            console.log(request, sender, sendRequest)
            switch (request.type) {
            case "catScale":

            }
        })
    }
}

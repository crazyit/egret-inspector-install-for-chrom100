// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// The function below is executed in the context of the inspected page.
var page_getProperties = function () {
    var data = egret ? egret.MainContext.instance : {};
    // Make a shallow copy with a null prototype, so that sidebar does not
    // expose prototype.
    var props = Object.getOwnPropertyNames(data);
    var copy = { __proto__: null };
    for (var i = 0; i < props.length; ++i)
        copy[props[i]] = data[props[i]];
    return copy;
};
chrome.devtools.panels.elements.createSidebarPane("Egret Properties", function (sidebar) {
    function updateElementProperties() {
        sidebar.setExpression("(" + page_getProperties.toString() + ")()");
    }
    updateElementProperties();
    chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
});
//(function () {    var t = window.setInterval(function () { var a = egret && (window.clearInterval(t) || egret.devtool.start()); console.log("waiting") }, 100);egret && egret.devtool && (window.clearInterval(t) || egret.devtool.start());})();
    chrome.devtools.panels.create("Egret", "icon.png", "ipt/panel/index.html", function (panel) {
        var connected = false;
    console.log("chrome--->>chrome.devtools.panels.create" + `Current time: ${
        new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
    }.${
        new Date().getMilliseconds()
    }`);

    panel.onShown.addListener(function (w) {
            console.log("chrome--->>chrome.devtools.panels.onShown " + `Current time: ${
                new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false
                })
            }.${
                new Date().getMilliseconds()
        }`+'connected:',connected);
        if (!connected){
            chrome.devtools.inspectedWindow.eval('(function () {    var t = window.setInterval(function () { var a = egret && egret.devtool && egret.devtool.start&& (window.clearInterval(t) || egret.devtool.start()); console.log("waiting") }, 100);egret && egret.devtool && egret.devtool.start&&(window.clearInterval(t) || egret.devtool.start());})();');
            backgroundPageConnection = chrome.runtime.connect({
                name: btoa("for" + String(chrome.devtools.inspectedWindow.tabId))
            });
        }
            backgroundPageConnection.postMessage({
            toDevTool: true,
            toggleMask: true,
            devToolHidden: false
        });
        connected = true;
    });
    panel.onHidden.addListener(function (w) {
        console.log("devtoolinit.js panel.onHidden", connected);

        if (!connected) return;
        // if (backgroundPageConnection) {
        //     backgroundPageConnection.disconnect(); // 断开旧连接
        // }
        // backgroundPageConnection = chrome.runtime.connect(); // 创建新连接

        backgroundPageConnection.postMessage({
            toDevTool: true,
            toggleMask: true,
            devToolHidden: true
        });
    });
    var backgroundPageConnection = chrome.runtime.connect({
        name: btoa("for" + String(chrome.devtools.inspectedWindow.tabId))
    });
        console.log('backgroundPageConnection create' + `Current time: ${

            new Date().toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            })
        }.${
            new Date().getMilliseconds()
        }`);

        backgroundPageConnection.onDisconnect.addListener(function (disconnectedPort) {
            connected = false;
            console.log('backgroundPageConnection Port disconnected', chrome.runtime.lastError, `Current time: ${

        new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        })
    }.${
        new Date().getMilliseconds()
    }`);


    if (disconnectedPort.error) {
        console.log('Disconnect reason:', disconnectedPort.error.message);
    } else {
        console.log('Port disconnected without specific reason');
    }
    // e._reconnect(); // Handle reconnection here
});


    backgroundPageConnection.onMessage.addListener(function (message) {
        // Handle responses from the background page, if any
    });
    backgroundPageConnection.postMessage({
        tabId: chrome.devtools.inspectedWindow.tabId
    });
    panel.onSearch.addListener(function (action, query) {
        return false;
    });
});

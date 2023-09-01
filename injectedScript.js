(function () {
    var t = window.setInterval(function () {
        if (egret && egret.devtool && typeof egret.devtool.start === 'function') {
            window.clearInterval(t);
            egret.devtool.start();
            console.log("Started egret.devtool");
        } else {
            console.log("waiting");
        }
    }, 100);
})();

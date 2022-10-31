function savePageValue() { // 保存设定的属性值，并记录在chrome中
    var e = { speed: getSelectValue("speed"), density: getSelectValue("density"), resolution: getSelectValue("resolution"), rotate: getSelectValue("rotate"), imagedarkness: getSelectValue("imagedarkness") };
    chrome.storage.sync.set(e, function() {
        console.log("settings saved.");
        var e = chrome.getMessage("setsucess");
        alert(e)
    })
}

function loadPageValue(e) { // 拿取设定的属性值
    document.getElementById("speed").value = e.speed;
    document.getElementById("density").value = e.density;
    document.getElementById("resolution").value = e.resolution;
    document.getElementById("rotate").value = e.rotate;
    document.getElementById("imagedarkness").value = e.imagedarkness;
}

// function setup(e) { // 将设定属性应用到打印机上
//     // document.getElementById("speed").value = e.speed;
//     // document.getElementById("density").value = e.density;
//     // document.getElementById("resolution").value = e.resolution;
//     // document.getElementById("rotate").value = e.rotate;
//     // document.getElementById("imagedarkness").value = e.imagedarkness;
//     send("SPEED" + e.speed);
//     send("DENSITY" + e.density);
//     send(e.resolution);
//     send(e.rotate);
//     send(e.imagedarkness);
// }

function send(e) { // 发送命令
    var string = e; // 自检命令
    var encoder = new TextEncoder();
    var data = encoder.encode(string);
    device.transferOut(1, data)
        .catch(error => {
            console.log(error);
        })
}



function reset() { // 重置设定的属性值
    document.getElementById("speed").value = DEFAULT_SPEED;
    document.getElementById("density").value = DEFAULT_DENSITY;
    document.getElementById("resolution").value = DEFAULT_RESOLUTION;
    document.getElementById("rotate").value = DEFAULT_ROTATE;
    document.getElementById("imagedarkness").value = DEFAULT_IMAGE_DARKNESS;
    var e = { speed: DEFAULT_SPEED, density: DEFAULT_DENSITY, resolution: DEFAULT_RESOLUTION, rotate: DEFAULT_ROTATE, imagedarkness: DEFAULT_IMAGE_DARKNESS };

    console.log("reset saved.");
}
document.addEventListener("DOMContentLoaded", function() {
    // localizeHtmlPage();
    var e = document.getElementById("connect");
    //     t = window.localStorage.getItem(portType_str);
    // null != t;
    // e.onclick = function() {
    //     connectPrinter("0", "1");
    //     setTimeout(function() { disconnectPrinter() }, 5e3)
    // };
    console.log("heeo");
    chrome.storage.sync.get(["speed", "density", "resolution", "rotate", "imagedarkness"], function(e) {
        console.log(e);
        if (typeof e.density == "undefined") {
            e.speed = DEFAULT_SPEED;
            e.density = DEFAULT_DENSITY;
            e.resolution = DEFAULT_RESOLUTION;
            e.rotate = DEFAULT_ROTATE;
            e.imagedarkness = DEFAULT_IMAGE_DARKNESS
        }
        loadPageValue(e)
    });
    document.getElementById("btnsave").onclick = savePageValue;
    document.getElementById("reset").onclick = reset;
    document.getElementById("setup").onclick = setup;
});

function test() {
    alert(1111);
};
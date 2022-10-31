let kitten;
var docker;

function preload() {
    kitten = loadImage(dataURL);
}



function setup() {
    docker = createCanvas(800, 1200);

    // image(kitten, 0, 0);
    makeDithered(kitten, 1);
    image(kitten, 0, 0);
    // Apply gray filter to the whole canvas
    filter(GRAY);
}
setTimeout("getdata()", 3000);

function getdata() {
    can = document.getElementsByClassName('p5Canvas');
    cxt = can[0].getContext('2d');
    let imageData = cxt.getImageData(0, 0, 800, 1200); // 获取原图的像素信息
    let pixelf = imageData.data;
    pixelf.forEach(function(value, index, array) { // 像素0/255->0/1
        if (array[index] == 255) array[index] = 1;
        else array[index] = 0;
    });
    let bwarr = [];
    // for (var i = 0, len = pixelf.length; i < len; i++) {
    //     bwarr[i] = pixelf[i];
    // };



    for (var i = 0; i < pixelf.length; i += 4) { // 修改删减得到每个像素点0/1- [1,1,1,1,1,...]
        let e = pixelf[i];
        bwarr.push(e);
        // bwarr.splice(i + 1, 3);
    };






    var bytestring = bwarr.toString() // 数组转字符串
    var reg = new RegExp(',', 'g') //如果输出的string有逗号，就用这句去掉
    var nstr = bytestring.replace(reg, '')
    for (let i = 0; i <= nstr.length; i += 8) {
        var strstr = nstr.slice(i, i + 8);

        var hexstr = parseInt(strstr, 2).toString(16);
        while (hexstr.length < 2) hexstr = '0' + hexstr;
        var tempstr = tempstr + " " + hexstr;
    };
    sessionStorage.setItem("wbbhexdata", tempstr);
    // console.log(tempstr);
    // ExportTxt("result", tempstr) // 下载黑白图片像素数据
}

function imageIndex(img, x, y) {
    return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
    let idx = imageIndex(img, x, y);
    let pix = img.pixels;
    let red = pix[idx];
    let green = pix[idx + 1];
    let blue = pix[idx + 2];
    let alpha = pix[idx + 3];
    return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
    let idx = imageIndex(img, x, y);

    let pix = img.pixels;
    pix[idx] = red(clr);
    pix[idx + 1] = green(clr);
    pix[idx + 2] = blue(clr);
    pix[idx + 3] = alpha(clr);
}

// Finds the closest step for a given value
// The step 0 is always included, so the number of steps
// is actually steps + 1
function closestStep(max, steps, value) {
    return round(steps * value / 255) * floor(255 / steps);
}

function makeDithered(img, steps) {
    img.loadPixels();

    for (let y = 0; y < img.height; y++) {
        for (let x = 0; x < img.width; x++) {
            let clr = getColorAtindex(img, x, y);
            let oldR = red(clr);
            let oldG = green(clr);
            let oldB = blue(clr);
            let newR = closestStep(255, steps, oldR);
            let newG = closestStep(255, steps, oldG);
            let newB = closestStep(255, steps, oldB);

            let newClr = color(newR, newG, newB);
            setColorAtIndex(img, x, y, newClr);

            let errR = oldR - newR;
            let errG = oldG - newG;
            let errB = oldB - newB;

            distributeError(img, x, y, errR, errG, errB);
        }
    }

    img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
    addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
    addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
    addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
    addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
    if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
    let clr = getColorAtindex(img, x, y);
    let r = red(clr);
    let g = green(clr);
    let b = blue(clr);
    clr.setRed(r + errR * factor);
    clr.setGreen(g + errG * factor);
    clr.setBlue(b + errB * factor);

    setColorAtIndex(img, x, y, clr);
}

function ExportTxt(name, data) {
    const urlObject = window.URL || window.webkitURL || window;
    const export_blob = new Blob([data]);

    const save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
    save_link.href = urlObject.createObjectURL(export_blob);
    save_link.download = name;

    const ev = document.createEvent("MouseEvents");
    ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(ev);
}

let hexdata = sessionStorage.getItem("wbbhexdata");
console.log(hexdata);
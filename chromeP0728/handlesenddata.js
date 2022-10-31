new_element = document.createElement("script");
new_element.setAttribute("type", "text/javascript");
new_element.setAttribute("src", "pdftoimgtohandledata2_img.js");
document.body.appendChild(new_element);
console.log(new_element);


//step 4 
function mergesenddata() { //用来处理hex代码头尾数据
        let hexarr = [];
        let rarr = [];
        let aarr = [];
        let harr = [];
    
        m = DEFAULT_SPEED;
        f = DEFAULT_DENSITY;
        i = DEFAULT_RESOLUTION;
        y = DEFAULT_IMAGE_DARKNESS;
        d = DEFAULT_ROTATE
        width = 100;
        height = 150;
        ww = 1200;
        var r = "SIZE " + 100 + " mm," + height.toString() + " mm\r\n" + "SPEED " + m.toString() + "\r\n" + "DENSITY " + f.toString() + "\r\n" + "CLS\r\n";

        var a = "BITMAP 0,0," + width.toString() + "," + ww.toString() + ",1,";
    
        var h = "PRINT 1" + "\n";
        console.log(a);
        rarr.data = stringToHex(r);
        aarr.data = stringToHex(a);
        harr.data = stringToHex(h);
        hexarr = dataArr; // 来自 pdftoimgtohandledata2_img.js 的误差扩散 处理数据
        var hex2 = rarr.data;
        var hex3 = aarr.data;
        var hex4 = harr.data;
    
        var buffer1 = handle(hexarr.toString()).buffer;
        console.log(buffer1); // 图片hex码
        var buffer2 = handle(hex2.toString()).buffer;
        console.log(buffer2);
        var buffer3 = handle(hex3.toString()).buffer;
        console.log(buffer3);
        var buffer4 = handle(hex4.toString()).buffer;
        console.log(buffer4);

        console.log("loading complete!!");
    
        device.transferOut(1, buffer2)
            .catch(error => {
                console.log(error);
            })
        device.transferOut(1, buffer3)
            .catch(error => {
                console.log(error);
            })
        
        device.transferOut(1, buffer1)
        .catch(error => {
            console.log(error);
        })
        setTimeout(wait500ms,500);
        device.transferOut(1, buffer4)
        .catch(error => {
            console.log(error);
        })

  
}



function stringToHex(str) { // string To hex
    var val = ""
    var strArr = []
    for (var i = 0; i < str.length; i++) {
        if (val == "")
            strArr.push(str.charCodeAt(i).toString(16));
        else
            strArr.push(str.charCodeAt(i).toString(16));

    }
    return strArr;
}

function handle(hex) { // 处理字符串
    var typedArray = new Uint8Array(hex.match(/[\da-f]{2}|[\da-f]{1}/gi).map(function(h) {
        return parseInt(h, 16)
    }))
    return typedArray;
}

function wait500ms(){
    console.log("wait")
}

function outputdata(buffer4) { // 输出buffer
    printhex4(buffer4);
    
}


function printhex2(buffer2) {
    console.log(buffer2);
    device.transferOut(1, buffer2)
        .catch(error => {
            console.log(error);
        })
}

function printhex3(buffer3) {
    console.log(buffer3);
    device.transferOut(1, buffer3)
        .catch(error => {
            console.log(error);
        })
}

function printhex4(buffer4) {
    console.log(buffer4);
    device.transferOut(1, buffer4)
        .catch(error => {
            console.log(error);
        })
}
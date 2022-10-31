var device;


// 连接设备
function setupdevice(device) {
    return device.open()
        .then(() => device.selectConfiguration(1))
        .then(() => device.claimInterface(0))
}

function spliceIntoChunks(arr, chunkSize) {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
}








// 获取输入框内容并打印到打印机中
function print() {
    var string = document.getElementById("printContent").value + "\n";
    var encoder = new TextEncoder();
    var data = encoder.encode(string);
    device.transferOut(1, data)
        .catch(error => {
            console.log(error);
        })
}


// 筛选设备VID，连接设备，获取输入内容并打印到打印机
function connectAndPrint() {
    if (device == null) {
        navigator.usb.requestDevice({
                filters: [{
                    // vendorId: 11652
                    vendorId: 11575

                }]
            })
            .then(selectedDevice => {
                device = selectedDevice;
                console.log(device);
                return setupdevice(device);
            })
            .then(() => print())
            .catch(error => {
                console.log(error);
            })
    } else
        print();
}



// 连接后输入自检命令
function sftest() {
    var string = "PRINT 1.1 \n"; // 自检命令
    var encoder = new TextEncoder();
    var data = encoder.encode(string);
    device.transferOut(1, data)
        .catch(error => {
            console.log(error);
        })
}






document.addEventListener("DOMContentLoaded", function() {
    var e = document.getElementById("sub");
    e.addEventListener("click", connectAndPrint)
});


document.addEventListener("DOMContentLoaded", function() {
    var e = document.getElementById("connect");
    e.addEventListener("click", connectAndPrint)
});




const file = document.getElementById('file');

function append(file) {
    let count = 0;
    let reader = new FileReader();

    reader.onload = (e) => {
        if (--count === 0) {
            setTimeout(() => {
                window.print();
            }, 200);
        }
    }
    reader.readAsDataURL(file);
}



var url = document.getElementById("");


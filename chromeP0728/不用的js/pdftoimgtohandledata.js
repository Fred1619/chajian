var dataURL;
var filee;
var uurl;


function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}



function addPdf(url) {
    let loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then((pdf) => {
        //页数
        let numPages = pdf.numPages;
        let scale = 2;
        let Mycanvas = document.querySelector("#the-canvas");
        let imgList = [];
        let top = 0;
        let height = 0;
        let width = 0;
        let okRender = new Promise(async(res, rej) => {
            for (let i = 1; i <= numPages; i++) {
                let page = await pdf.getPage(i);
                let viewport = page.getViewport({
                    scale: scale,
                });

                let canvas = document.createElement("canvas");
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                console.log(viewport.height, 9);
                let context = canvas.getContext("2d");
                let renderContext = {
                    canvasContext: context, // 此为canvas的context
                    viewport: viewport,
                };
                let success = await page.render(renderContext).promise;
                if (i === 1) {
                    height = viewport.height;
                    width = viewport.width;
                    Mycanvas.height = viewport.height * numPages;
                    Mycanvas.width = viewport.width;
                }
                dataURL = canvas.toDataURL("image/jpeg", 1);
                console.log(dataURL);

                // fetch(dataURL)
                //     .then(res => res.blob())
                //     .then(blob => {
                //         const file1 = new File([blob], "File name", {
                //             type: "iamge/jpg"
                //         })
                //     })
                function dataURItoBlob(dataURI) {
                    if (dataURI != undefined) {
                        var byteString = atob(dataURI.split(',')[1]);
                        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

                        var ab = new ArrayBuffer(byteString.length);
                        var ia = new Uint8Array(ab);

                        for (var i = 0; i < byteString.length; i++) {
                            ia[i] = byteString.charCodeAt(i);
                        }
                        var blob = new Blob([ab], { type: mimeString });

                        return blob;
                    } else console.log("dataurl error");

                }
                uurl = dataURItoBlob(dataURL)
                    // -------------------------------------------------------------------------------------
                const URLLL = dataURItoBlob(dataURL)
                    // ------------------------------------------------------------------------------------------------



                let canvas2 = document.getElementById('mycanvas'); // 原生图像
                let cxt = canvas2.getContext("2d"); // getContext() 方法返回一个用于在画布上绘图的环境，该方法返回一个环境对象，该对象导出一个二维绘图 API，使用该对象可以绘制到Canvas元素中
                let filter = document.getElementById('filter'); // 黑白化图像
                let filter_cxt = filter.getContext("2d"); // --↑--
                var Reader = new FileReader();
                // 报错： pdftoimgtohandledata.js:102 Uncaught TypeError: Failed to execute 'readAsDataURL' on 'FileReader': parameter 1 is not of type 'Blob'.
                Reader.readAsDataURL(uurl); // 将读取到的文件编码成DataURL，防止chrome的canvas报错跨域
                Reader.onload = function() {
                    let img = new Image();
                    img.src = Reader.result; // 将result赋值给Image对象的src
                    img.onload = function() {
                        cxt.drawImage(img, 0, 0, canvas2.width, canvas2.height);
                        let imageData = cxt.getImageData(0, 0, canvas2.width, canvas2.height); // 获取原图的像素信息
                        console.log(imageData); // console.log()输出对象时将会是最终结果，不同浏览器可能处理方式不同(？)
                        let data = imageData.data; // data & imageData.data的值一同改变
                        console.log("before")
                        console.log(imageData.data[0]);
                        console.log(imageData.data[1]);
                        console.log(imageData.data[2]);
                        console.log(imageData.data[3]);
                        for (let i = 0; i < data.length; i += 4) { // 黑白化原图处理
                            let grayscale = data[i] * 0.3 + data[i + 1] * 0.6 + data[i + 2] * 0.1; //黑白处理
                            // let bwhandle = (data[i] + data[i + 1] + data[i + 2]) / 3 //黑白处理
                            let t = (data[i] + data[i + 1] + data[i + 2]) / 3; // 像素点二值化
                            if (t > 125) t = 255;
                            else t = 0;

                            // data[i] = grayscale;
                            // data[i + 1] = grayscale;
                            // data[i + 2] = grayscale;
                            // data[i] = bwhandle;
                            // data[i + 1] = bwhandle;
                            // data[i + 2] = bwhandle;

                            data[i] = t;
                            data[i + 1] = t;
                            data[i + 2] = t;
                        }
                        console.log("After")
                        console.log(imageData.data[0]);
                        console.log(imageData.data[1]);
                        console.log(imageData.data[2]);
                        console.log(imageData.data[3]);
                        filter_cxt.putImageData(imageData, 0, 0); // 输出黑白化后的图像到画布
                        cxt.font = "20px Calibri";
                        cxt.fillText("原图", 10, 30);
                        filter_cxt.font = "20px Calibri";
                        filter_cxt.fillStyle = "white";
                        filter_cxt.fillText("黑白", 10, 30);



                        filee = dataURLtoFile(dataURL, 'img.jpg');
                        console.log(filee);
                        imgList.push(dataURL);
                        console.log(i, numPages, imgList.length, imgList);
                        if (i === numPages) {
                            res();
                        }
                    }
                };


                //------------------------------------------------------------------------------

                //--------------------------------------------------------------------------------


                okRender.then((res) => {
                    let context = Mycanvas.getContext("2d");
                    imgList.forEach((item) => {
                        var image = new Image();
                        image.src = item;
                        image.onload = () => {
                            context.drawImage(image, 0, top, width, height);
                            top += height;
                        };
                    });
                });
            };

        })
        console.log("dataURLLLLLLLLLLLLLLLLLLLL");
        //console.log(uuurl);
        // ddurl = dataURL.toString();

    })
}
addPdf("./File/20220630_090834_071_00.pdf");






// var pixelf = imageData.data;



// var pixelfArr = []
// pixelf.forEach(function(value, index, array) { // 像素0/255->0/1
//     if (array[index] == 255) array[index] = 1;
//     else array[index] = 0;
// });

// console.log(pixelf.length);


// var bwarr = [];
// for (var i = 0, len = pixelf.length; i < len; i++) {
//     bwarr[i] = pixelf[i];
// };


// for (var i = 0, len = pixelf.length; i < len; i++) { // 修改删减得到每个像素点0/1- [1,1,1,1,1,...]
//     bwarr.splice(i + 1, 3);
// };
// console.log(bwarr.length);


// console.log(bwarr); // 输出像素点0/1

//------------------------------------------------------------



// var bytestring = bwarr.toString() // 数组转字符串
// var reg = new RegExp(',', 'g') //如果输出的string有逗号，就用这句去掉
// var nstr = bytestring.replace(reg, '')
//     // console.log(nstr);
// for (let i = 0; i <= nstr.length; i += 8) {
//     var strstr = nstr.slice(i, i + 8);

//     var hexstr = parseInt(strstr, 2).toString(16);
//     while (hexstr.length < 2) hexstr = '0' + hexstr;
//     // console.log(hexstr); // 输出1byte的16进制字符串
//     var tempstr = hexstr + " " + tempstr;
// };
// console.log(tempstr);
// // ExportTxt("result", tempstr) // 下载黑白图片像素数据


// // ExportTxt("文件名", "文件内容")

// function ExportTxt(name, data) {
//     const urlObject = window.URL || window.webkitURL || window;
//     const export_blob = new Blob([data]);

//     const save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
//     save_link.href = urlObject.createObjectURL(export_blob);
//     save_link.download = name;

//     const ev = document.createEvent("MouseEvents");
//     ev.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
//     save_link.dispatchEvent(ev);
// }
let kitten;
// ----------------------------------------------------------------------------------

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

                uurl = dataURItoBlob(dataURL)
                    // -------------------------------------------------------------------------------------



                // ------------------------------------------------------------------------------------------------


                filee = dataURLtoFile(dataURL, 'img.jpg');
                console.log(filee);
                imgList.push(dataURL);
                console.log(i, numPages, imgList.length, imgList);
                if (i === numPages) {
                    res();
                }

                ;


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





// ---------------------------------------------------------------------------------
//var uuurl = "062811455145_0TestPDF_1.jpg"
! function() {
    preload();
    setup();

    function preload() {
        kitten = 'data:image/gif;base64,R0lGODlhEAAOALMAAOazToeHh0tLS/7LZv/0jvb29t/f3//Ub//ge8WSLf/rhf/3kdbW1mxsbP//mf///yH5BAAAAAAALAAAAAAQAA4AAARe8L1Ekyky67QZ1hLnjM5UUde0ECwLJoExKcppV0aCcGCmTIHEIUEqjgaORCMxIC6e0CcguWw6aFjsVMkkIr7g77ZKPJjPZqIyd7sJAgVGoEGv2xsBxqNgYPj/gAwXEQA7';
    }


    function setup() {
        createCanvas(1920, 1080);

        image(kitten, 0, 0);
        makeDithered(kitten, 1);
        image(kitten, 512, 0);
        // Apply gray filter to the whole canvas
        filter(GRAY);
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
}()
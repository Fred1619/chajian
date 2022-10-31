var s = p => { // 添加变量 var s = p()=> {}
    let durl = [];
    console.log("pdftoimgh GO!");
    let kitten;

    p.preload = function() {
        console.log(dataURL);
        kitten = p.loadImage(dataURL);

    }

    p.setup = function() {

        console.log("this is setup")

        console.log(kitten);
        docker = p.createCanvas(800, 1200);
        console.log("pdftoimgh GO!");
        this.makeDithered(kitten, 1);
        p.image(kitten, 0, 0);
        // Apply gray filter to the whole canvas
        p.filter(p.GRAY);
        p.getdata();
        console.log("setup success");
    }



    p.getdata = function() {
        can = document.getElementsByClassName('p5Canvas');
        cxt = can[can.length - 1].getContext('2d');
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

        var newArr = []
        dataArr = []
        console.info(dataArr)
            // 切片数量
        const section = 8
            // 进行切片
        for (var i = 0; i < bwarr.length; i += section) {
            newArr.push(bwarr.slice(i, i + section))
        }

        // 切片后取每片数据
        for (var item of newArr) {
            //切片后count数组计数器
            var count = 0
            var dataInt = 0
            i = 7
                //每片数据遍历
            for (var temp of item) {
                dataInt = dataInt + temp * Math.pow(2, i)
                i -= 1
            }
            dataArr.push(dataInt.toString(16))
        }
        console.log(dataArr)
        console.log(typeof(dataArr));
        mergesenddata();

    }







    p.imageIndex = function(img, x, y) {
        return 4 * (x + y * img.width);
    }

    p.getColorAtindex = function(img, x, y) {
        let idx = p.imageIndex(img, x, y);
        let pix = img.pixels;
        let red = pix[idx];
        let green = pix[idx + 1];
        let blue = pix[idx + 2];
        let alpha = pix[idx + 3];
        return p.color(red, green, blue, alpha);
    }

    p.setColorAtIndex = function(img, x, y, clr) {
        let idx = p.imageIndex(kitten, x, y);

        let pix = kitten.pixels;
        pix[idx] = p.red(clr);
        pix[idx + 1] = p.green(clr);
        pix[idx + 2] = p.blue(clr);
        pix[idx + 3] = p.alpha(clr);
    }

    // Finds the closest step for a given value
    // The step 0 is always included, so the number of steps
    // is actually steps + 1
    p.closestStep = function(max, steps, value) {
        return p.round(steps * value / 255) * p.floor(255 / steps);
    }

    p.makeDithered = function(img, steps) {
        console.log(kitten);
        kitten.loadPixels();

        for (let y = 0; y < kitten.height; y++) {
            for (let x = 0; x < kitten.width; x++) {
                let clr = p.getColorAtindex(kitten, x, y);
                let oldR = p.red(clr);
                let oldG = p.green(clr);
                let oldB = p.blue(clr);
                let newR = p.closestStep(255, steps, oldR);
                let newG = p.closestStep(255, steps, oldG);
                let newB = p.closestStep(255, steps, oldB);

                let newClr = p.color(newR, newG, newB);
                p.setColorAtIndex(img, x, y, newClr);

                let errR = oldR - newR;
                let errG = oldG - newG;
                let errB = oldB - newB;

                p.distributeError(img, x, y, errR, errG, errB);
            }
        }

        kitten.updatePixels();
    }

    p.distributeError = function(img, x, y, errR, errG, errB) {
        p.addError(kitten, 7 / 16.0, x + 1, y, errR, errG, errB);
        p.addError(kitten, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
        p.addError(kitten, 5 / 16.0, x, y + 1, errR, errG, errB);
        p.addError(kitten, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
    }

    p.addError = function(img, factor, x, y, errR, errG, errB) {
        if (x < 0 || x >= kitten.width || y < 0 || y >= kitten.height) return;
        let clr = p.getColorAtindex(img, x, y);
        let r = p.red(clr);
        let g = p.green(clr);
        let b = p.blue(clr);
        clr.setRed(r + errR * factor);
        clr.setGreen(g + errG * factor);
        clr.setBlue(b + errB * factor);

        p.setColorAtIndex(img, x, y, clr);
    }

}
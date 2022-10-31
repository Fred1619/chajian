var pdfjsLib = require("./JSlib/pdf.min");
pdfjsLib.getDocument("./20220630_090834_071_00.pdf").then((pdf) => {
    const numPages = pdf.numPages;
    const allPromise = [];
    for (let i = 1; i <= numPages; i++) {
        allPromise.push(pdf.getPage(i))
    }
    return Promise.all(allPromise)
}).then((allPDF) => {
    return renderPDFS(allPDF)
}).then(allRender => {
    console.log(allRender)
    const allCanvasOKPromises = allRender.map(render => render.renderPromise);
    const allCanvas = allRender.map(render => render.canvas);
    return Promise.all(allCanvasOKPromises).then(val => {
        return allCanvas.map(canvas => {
            return canvas.toDataURL();
        })
    })
}).then(allBase64 => {
    allBase64.forEach(base64 => {
        const image = new Image();
        image.src = base64;
        document.body.appendChild(image);
    })
})

function renderPDFS(allPDF) {
    return allPDF.map(eachPDF => {
        return renderPDF2Canvas(eachPDF)
    })
}

function renderPDF2Canvas(eachPDF) {
    const viewport = eachPDF.getViewport(2);
    const canvas = document.getElementById("canvas");
    const context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    const renderPromise = eachPDF.render({ canvasContext: context, viewport: viewport })
    return { canvas, renderPromise }
}
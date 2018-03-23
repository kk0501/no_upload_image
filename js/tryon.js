var processFiles = function (files) {
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                // append image
                document.getElementById('m-tryon-upload-area').innerHTML = ['<img class="m-thumb" id="m-thumb" src="', e.target.result,
                    '" title="', escape(theFile.name), '"/>'].join('');
                var image = document.getElementById('m-thumb');
                // new cropper
                var options = {
                    aspectRatio: 16 / 9,
                };
                var cropper = new Cropper(image, options);
                document.getElementById('continue').addEventListener('click', function () {
                    var result = cropper.getCroppedCanvas();
                    var url = result.toDataURL('image/jpeg');
                    image.src = url;
                    // var cropBoxData = cropper.getCropBoxData();
                    // var canvasData = cropper.getCanvasData();
                    // cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
                    cropper.destroy();
                    // cropper = new Cropper(image, options);
                });
                document.getElementById('rotate').addEventListener('click', function () {
                    cropper.rotate(90);
                });
            };
        })(f);
        reader.readAsDataURL(f);
    }
};

var handleFileSelect = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.target.files;
    processFiles(files);
};

var handleFileDrop = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    var files = evt.dataTransfer.files;
    processFiles(files);
};

var handleDragOver = function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
};

$(document).on('click', '#select-image', function () {
    $('#p-image').click();
});
document.getElementById('p-image').addEventListener('change', handleFileSelect, false);
var dropZone = document.getElementById('m-tryon-upload-area');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileDrop, false);
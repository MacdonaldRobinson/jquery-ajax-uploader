var ajaxUploadOptions = {
  containerClass: "container",
  dragOverClass: "dragover",
  inputFileClass: "file-selector",
  dataToId: "data-toId",
  blockUIMessage: "<span>Processing</span>",
  webServiceUrl: "[URL_TO_WEBSERVICE]?toId=",
  success: function () {
    console.log("success")
  },
  error: function () {
    console.log("error")
  },
  complete: function () {
    console.log("complete")
  }
}

function initAjaxUploadOptions(options) {
  ajaxUploadOptions = options;
}

$(document).ready(function () {
  $("." + ajaxUploadOptions.containerClass).on("dragenter dragover", function (e) {
    $(this).addClass(ajaxUploadOptions.dragOverClass);


    e.originalEvent.dataTransfer.dropEffect = "copy";

    e.preventDefault();
    e.stopPropagation();
  });

  $("." + ajaxUploadOptions.containerClass).on("dragleave", function (e) {
    $(this).removeClass(ajaxUploadOptions.dragOverClass);

    e.preventDefault();
    e.stopPropagation();
  });

  $("." + ajaxUploadOptions.containerClass).on("drop", function (e) {
    e.preventDefault();
    e.stopPropagation();

    $(this).removeClass(ajaxUploadOptions.dragOverClass);

    if (e.originalEvent.dataTransfer && e.originalEvent.dataTransfer.files.length) {

      var toId = $(this).attr(ajaxUploadOptions.dataToId);

      uploadFiles(this, e.originalEvent.dataTransfer.files, toId);
    }
  });

  $("." + ajaxUploadOptions.inputFileClass).change(function () {


    var el = $(this).closest("." + ajaxUploadOptions.containerClass);
    var toId = el.attr(ajaxUploadOptions.dataToId);


    uploadFiles(el, this.files, toId);
  });

});

function blockElement(el) {
  $(el).block({
    message: ajaxUploadOptions.blockUIMessage,
    css: {}
  });
}

function uploadFiles(el, files, toId) {

  var formData = new FormData();
  $.each(files, function (key, value) {
    formData.append(key, value);
  });

  blockElement(el);

  $.ajax({
    url: ajaxUploadOptions.webServiceUrl + toId,
    type: 'POST',
    data: formData,
    cache: false,
    dataType: 'json',
    processData: false, // Don't process the files - I actually got this and the next from an SO post but I don't remember where
    contentType: false, // Set content type to false as jQuery will tell the server its a query string request
    success: ajaxUploadOptions.success,
    error: ajaxUploadOptions.error,
    complete: ajaxUploadOptions.complete
  });
}
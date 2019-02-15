# jquery-ajax-uploader
- Makes it easy to upload files either via drag and drop or by selecting it via an input type file element

```html

  <!-- Required Includes -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.blockUI/2.70/jquery.blockUI.min.js"></script>
  
  <script src="jquery-ajax-uploader.js"></script>

  <script>

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

    initAjaxUploadOptions(ajaxUploadOptions);

  </script>

  <style>
    .container {
      border: 1px dashed;
      padding: 20px;
    }

    .dragover {
      background-color: yellow;
    }
  </style>

  <div class="container" data-toId="23">
    <h2>Select files to upload ( you can drag and drop in this area as well )</h2>
    <input type="file" class="file-selector" multiple="multiple">
  </div>

```

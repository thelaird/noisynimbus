NoisyNimbus.Views.SongsUpload = Backbone.View.extend({
  template: JST['songs/upload'],

  events: {
    'click .upload': 'upload',
    'change input#Files': 'onChangeFiles'
  },


  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  },

  upload: function (event) {
    event.preventDefault();
    debugger
    var s3upload = s3upload != null ? s3upload : new S3Upload({
      file_dom_selector: 'files',
      s3_sign_put_url: 'api/signS3put',
      onProgress: function(percent, message) { // Use this for live upload progress bars
        console.log('Upload progress: ', percent, message);
      },
      onFinishS3Put: function(public_url) { // Get the URL of the uploaded file
        console.log('Upload finished: ', public_url);
      },
      onError: function(status) {
        console.log('Upload error: ', status);
      }
      });

      // event.preventDefault();
      // var data = this.$el.find('form').serializeJSON();
      // this.model.save(data, {
      //   success: function () {
      //     console.log('success');
      //     Backbone.history.navigate('', { trigger: true });
      //   },
      //
      //   error: function () {
      //     console.log('error');
      //   }
      // });
  }
});

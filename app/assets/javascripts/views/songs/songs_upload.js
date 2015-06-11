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

  iTunesUrl: function (artist) {
    var url = "http://itunes.apple.com/search?term=";
    url = url.concat(artist.replace(/ /g, '+'));
    url = url.concat("&limit=1");
    return url;
  },

  upload: function (event) {
    event.preventDefault();
    var data = $('.song-form').serializeJSON();
    // Pull album art from iTunes
    var that = this;
    $.ajax({
      url: this.iTunesUrl(data.artist),
      type: 'GET',
      dataType: 'jsonp',
      success: function (data) {
        if (data.results.length == 1) {
          that.model.set({ "song_image": data.results[0].artworkUrl100 });
        } else {
          that.model.set({ "song_image": DEFAULT_IMAGE_URL });
        }
      }
    });


    // var s3upload = s3upload != null ? s3upload : new S3Upload({
    //   file_dom_selector: 'song',
    //   s3_sign_put_url: 'api/signS3put',
    //   onProgress: function(percent, message) { // Use this for live upload progress bars
    //     console.log('Upload progress: ', percent, message);
    //   },
    //   onFinishS3Put: function(public_url) { // Get the URL of the uploaded file
    //     console.log('Upload finished: ', public_url);
    //   },
    //   onError: function(status) {
    //     console.log('Upload error: ', status);
    //   }
    //   });

  }
});

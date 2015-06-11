NoisyNimbus.Views.SongsUpload = Backbone.View.extend({
  template: JST['songs/upload'],

  events: {
    'click .upload': 'upload',
    'change input#Files': 'onChangeFiles'
  },

  initialize: function () {
    this.progress = 0;
    this.listenTo(this.progress, 'change', this.render);
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    debugger
    return this;
  },

  iTunesUrl: function (artist) {
    var url = "http://itunes.apple.com/search?term=";
    url = url.concat(artist.replace(/ /g, '+'));
    url = url.concat("&limit=1");
    return url;
  },

  fetchSongImage: function (artist) {
    $.ajax({
      url: this.iTunesUrl(artist),
      type: 'GET',
      dataType: 'jsonp',
      success: function (data) {
        if (data.results.length == 1) {
          this.model.set({ "image_url": data.results[0].artworkUrl100 });
        } else {
          this.model.set({ "image_url": DEFAULT_IMAGE_URL });
        }
        this.model.save();
      }.bind(this)
    });
  },

  upload: function (event) {
    event.preventDefault();
    var $progress = $('#progress');
    var data = $('.song-form').serializeJSON();
    this.fetchSongImage(data.artist);

    var s3upload = s3upload != null ? s3upload : new S3Upload({
      file_dom_selector: 'song',
      s3_sign_put_url: 'api/signS3put',
      onProgress: function(percent, message) { // Use this for live upload progress bars
        $progress.text(percent);
      }.bind(this),
      onFinishS3Put: function(public_url) { // Get the URL of the uploaded file
        console.log('Upload finished: ', public_url);
        this.model.save({'song_url': public_url}, {
          success: function () {
            Backbone.history.navigate('', { trigger: true });
          }
        });

      }.bind(this),
      onError: function(status) {
        console.log('Upload error: ', status);
      }
      });
  }
});

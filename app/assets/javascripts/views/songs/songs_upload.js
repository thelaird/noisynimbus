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
    return this;
  },

  iTunesUrl: function (artist) {
    var url = "http://itunes.apple.com/search?term=";
    url = url.concat(artist.replace(/ /g, '+'));
    url = url.concat("&limit=1");
    return url;
  },

  fetchSongImage: function (artist) {
    var deferred = jQuery.Deferred();
    return $.ajax({
      url: this.iTunesUrl(artist),
      type: 'GET',
      dataType: 'jsonp',
      success: function (data) {
        if (data.results.length == 1) {
          this.model.set({ "image_url": data.results[0].artworkUrl100 });
        } else {
          this.model.set({ "image_url": DEFAULT_IMAGE_URL });
        }
        deferred.resolve();
      }.bind(this)
    });
    return deferred;
  },

  upload: function (event) {
    event.preventDefault();
    var data = $('.song-form').serializeJSON();
    var songImgDfd = this.fetchSongImage(data.artist);
    var songUploadDfd = this.uploadSong();
    this.model.set(data);
    $.when(songImgDfd, songUploadDfd).done(function () {
      this.model.save({}, {
        success: function () {
          this.collection.add(this.model);
          Backbone.history.navigate('', { trigger: true });
        }.bind(this)
      });
    }.bind(this));
  },

  uploadSong: function () {
    $('.progress').removeClass('inactive');
    var $progress = $('.progress-bar');
    var deferred = jQuery.Deferred();
    var s3upload = s3upload != null ? s3upload : new S3Upload({
      file_dom_selector: 'song',
      s3_sign_put_url: 'api/signS3put',

      onProgress: function(percent, message) {
        $progress.attr("aria-valuenow", percent).css("width", percent + "%");
      }.bind(this),

      onFinishS3Put: function(public_url) {
        $progress.text("Success!");
        this.model.set({ "song_url": public_url });
        setTimeout(function(){ deferred.resolve(); }, 750);
        }.bind(this),

      onError: function(status) {
        // reject promise
        console.log('Upload error: ', status);
      }
    });

    return deferred;
  }
});

NoisyNimbus.Views.SongsUpload = Backbone.View.extend({
  template: JST['songs/upload'],

  events: {
    'click .upload': 'upload',
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  },

  // attachTags: function (tags){
  //   tagsArray = tags.split(' ');
  //   var view = this;
  //   tagsArray.forEach( function (tagText) {
  //     var text = view.hashify(tagText);
  //     var tag = new NoisyNimbus.Models.Tag({ "text": text });
  //     tag.save({}, {
  //       success: function () {
  //         var tagItem = new NoisyNimbus.Models.TagItem();
  //         tagItem.save({ 'tag_id': tag.id, 'song_id': view.model.id });
  //       }
  //     });
  //
  //   });
  // },

  fetchSmallImage: function (artist) {
    var dfd = jQuery.Deferred();
    return $.ajax({
      url: this.iTunesUrl(artist),
      type: 'GET',
      dataType: 'jsonp',
      success: function (data) {
        if (data.results.length == 1) {
          this.model.set({ "small_image_url": data.results[0].artworkUrl100 });
        } else {
          this.model.set({ "small_image_url": NoisyNimbus.AMAZON_URL + "default.png" });
        }
        dfd.resolve();
      }.bind(this)
    });
  },

  iTunesUrl: function (artist) {
    var base = "http://itunes.apple.com/search?";
    var params = {
      term: artist,
      limit: 1
    };

    return base.concat($.param(params));
  },

  setupDeferreds: function (data) {
    var songSmImgDfd = this.fetchSmallImage(data.artist);
    var songUploadDfd = this.uploadSong();
    var view = this;

    var tags = data.tags;
    delete data.tags;

    $.when(songSmImgDfd, songUploadDfd).done(function () {
      view.model.save({}, {
        success: function () {
          view.attachTags(tags);
          view.collection.add(view.model);
          Backbone.history.navigate('#users/' + CURRENT_USER_ID, { trigger: true });
        }
      });
    });
  },

  upload: function (event) {
    this.validateFile();

    event.preventDefault();
    var data = $('.song-form').serializeJSON();

    this.setupDeferreds(data);
    this.model.set(data);
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
  },

  validateFile: function () {
    if ($('#song')[0].files[0].size > 10485760) {
      throw "file too large";
    }

    if ($('#song')[0].files[0].type !== 'audio/mp3'){
      throw 'wrong file type';
    }
  }
});

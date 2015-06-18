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

  renderErrors: function (errors) {
    var $errors = $('<div>');
    errors.forEach( function (error) {
      var errorMessage = $('<div>').addClass('alert alert-danger').text(error);
      $errors.append(errorMessage);
    });
    $('.errors').html($errors);
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
          view.collection.add(view.model);
          Backbone.history.navigate('#songs/' + view.model.id, { trigger: true });
        }
      });
    });
  },

  upload: function (event) {
    event.preventDefault();
    var data = $('.song-form').serializeJSON();
    this.validateForm(data, function () {
      this.setupDeferreds(data);
      this.model.set(data);
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
        console.log('Upload error: ', status);
        deferred.reject();
      }
    });

    return deferred;
  },

  validateForm: function (data, callback) {
    var errors = [];
    if ($('#song')[0].files[0]) {
      if ($('#song')[0].files[0].size > 10485760) {
        errors.push("File must be less than 10 MB.");
      }
      if ($('#song')[0].files[0].type !== 'audio/mp3'){
        errors.push("File must be an MP3.");
      }
    } else {
      errors.push("Please select a file.");
    }
    if (data.artist.length === 0) {
      errors.push("Artist cannot be blank.");
    }
    if (data.title.length === 0) {
      errors.push("Title cannot be blank.");
    }
    if (data.tagstring.length > 0 && !/^[A-Za-z0-9-# ]+$/.test(data.tagstring)){
      errors.push("Invalid tags. Tags can only contain numbers, letters, hyphens and hash marks.");
    }

    if (errors.length > 0) {
      this.renderErrors(errors);
    } else {
      callback();
    }
  }
});

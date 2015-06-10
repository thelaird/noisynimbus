NoisyNimbus.Views.SongsUpload = Backbone.View.extend({
  template: JST['songs/upload'],

  events: {
    'click .upload': 'upload'
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  },

  upload: function (event) {

      event.preventDefault();
      var data = this.$el.find('form').serializeJSON();

      this.model.save(data, {
        success: function () {
          console.log('success');
          Backbone.history.navigate('', { trigger: true });
        },

        error: function () {
          console.log('error');
        }
      });
  }
});

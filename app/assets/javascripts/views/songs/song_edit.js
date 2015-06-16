NoisyNimbus.Views.SongEdit = Backbone.View.extend({
  template: JST['songs/edit'],

  initialize: function () {
    this.listenTo(this.model, 'sync', this.generateTagString);
    this.listenTo(this.model, 'sync', this.render);
  },

  events: {
    'click .save': 'saveSong'
  },

  render: function () {
    var content = this.template({ song: this.model, tagString: this.tagString });
    this.$el.html(content);
    return this;
  },

  generateTagString: function () {
    var tagArray = [];
    this.model.tags().each( function (tag) {
      tagArray.push(tag.escape('text'));
    });

    this.tagString = tagArray.join(' ');
  },

  saveSong: function (event) {
    event.preventDefault();
    var data = $('.song-form').serializeJSON();
    this.model.save(data, {
      success: function () {
        Backbone.history.navigate('#songs/' + this.model.id, { trigger: true });
      }.bind(this)
    });
  }

});

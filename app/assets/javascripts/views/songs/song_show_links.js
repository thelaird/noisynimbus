NoisyNimbus.Views.SongShowLinks = Backbone.View.extend({
  template: JST['songs/show_links'],

  className: 'song-show-uploader-links',

  initialize: function () {
    this.listenTo(this.model, 'sync', this.attachDeleteTooltip);
  },

  render: function () {
    var content = this.template({ song: this.model });
    this.$el.html(content);
    return this;
  },

  attachDeleteTooltip: function () {
    var deleteView = new NoisyNimbus.Views.SongDeleteWindow({ model: this.model });
    var deleteContent = deleteView.render().$el;
    $('.delete-song').tooltipster( {
      content: deleteContent,
      interactive: true,
      theme: 'tooltipster-light',
      delay: 100,
      updateAnimation: false,
      trigger: 'click'
      });
  },

  onRender: function () {
    this.attachDeleteTooltip();
  }

});

NoisyNimbus.Views.TagItem = Backbone.View.extend({
  template: JST['tags/item'],

  events: {
    'click .tag-item': 'tagShow'
  },

  render: function () {
    var content = this.template({ tag: this.model });
    this.$el.html(content);
    return this;
  },

  tagShow: function () {
    if (CURRENT_USER_ID) {
      Backbone.history.navigate('#tags/' + this.model.id, { trigger: true });
    } else {
      window.location.href = '/session/new';
    }
  }
});
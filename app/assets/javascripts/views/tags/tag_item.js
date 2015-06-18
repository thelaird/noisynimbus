NoisyNimbus.Views.TagItem = Backbone.View.extend({
  template: JST['tags/item'],

  tagName: 'span',

  className: 'tag-item',

  events: {
    'click .tag-item-inner': 'tagShow'
  },

  render: function () {
    var content = this.template({ tag: this.model });
    this.$el.html(content);
    return this;
  },

  tagShow: function () {
    debugger;
    if (CURRENT_USER_ID) {
      Backbone.history.navigate('#tags/' + this.model.id, { trigger: true });
    } else {
      window.open('http://noisynimbus.com', '_blank')
    }
  }
});

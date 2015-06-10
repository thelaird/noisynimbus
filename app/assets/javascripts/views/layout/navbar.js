NoisyNimbus.Views.Navbar = Backbone.View.extend({
  template: JST['layout/navbar'],

  render: function () {
    var content = this.template();
    this.$el.html(content);
    return this;
  }
});

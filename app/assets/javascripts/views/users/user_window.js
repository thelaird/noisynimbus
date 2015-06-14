NoisyNimbus.Views.UserWindow = Backbone.View.extend({
  template: JST['users/window'],

  className: "user-window",

  events: {
    'click .follow': 'toggleFollowState',
    'click .view': 'view',
    'mouseleave': 'hideWindow'
  },

  initialize: function () {
    this.uploaderId = this.model.get('uploader').id;
  },

  render: function () {
    var content = this.template();
    this.$el.html(content);
    this.setFollowState();
    return this;
  },

  follow: function () {
    var following = new NoisyNimbus.Models.Following({
      "follower_id": CURRENT_USER_ID,
      "followee_id": this.uploaderId });
    following.save({},{
      success: function () {
        this.$('.follow').text("Unfollow").addClass('active');
      }
    });

  },

  hideWindow: function () {
    $('.uploader').tooltipster('hide');
  },

  setFollowState: function () {
    if ( this.model.get('uploader').followed === "true") {
      this.$('.follow').text("Unfollow").addClass('active');
    }
  },

  toggleFollowState: function (event) {
    event.preventDefault();
    if ( this.model.get('uploader').followed === "true") {
      this.unfollow();
    } else {
      this.follow();
    }
  },

  unfollow: function () {
    var following = new NoisyNimbus.Models.Following();
  },

  view: function () {
    Backbone.history.navigate("users/" + this.uploaderId,
      { trigger: true } );
  }
});

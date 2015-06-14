NoisyNimbus.Views.UserWindow = Backbone.View.extend({
  template: JST['users/window'],

  className: "user-window",

  events: {
    'click .follow': 'toggleFollowState',
    'click .view': 'view',
    'mouseleave': 'hideWindow'
  },

  initialize: function () {
    this.uploader = this.model.uploader();
    this.listenTo(this.uploader.following(), "change", this.render);
  },

  render: function () {
    var content = this.template( { uploader: this.uploader });
    this.$el.html(content);
    // this.setFollowState();
    return this;
  },

  followUser: function () {
    this.uploader.following().save({
      "follower_id": CURRENT_USER_ID,
      "followee_id": this.uploader.id
    });
  },


  hideWindow: function () {
    $('.uploader-' + this.model.id).tooltipster('hide');
    this.remove();
  },

  toggleFollowState: function (event) {
    event.preventDefault();
    if (this.uploader.isFollowed()) {
      this.unfollowUser();
    } else {
      this.followUser();
    }
  },

  unfollowUser: function () {
    this.uploader.following().destroy();
    this.uploader.following().clear();
  },

  view: function () {
    Backbone.history.navigate("users/" + this.uploader.id,
      { trigger: true } );
  }
});

class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username],user_params[:password])

    if @user
      log_in_user!(@user)
      redirect_to root_url
    else
      @user = User.new
      flash.now[:errors] = ["Invalid username or password."]
      render :new
    end
  end

  def new
    @user = User.new
    render :new
  end

  def destroy
    log_out_user!
    render text: 'logged out successfully'
  end
end

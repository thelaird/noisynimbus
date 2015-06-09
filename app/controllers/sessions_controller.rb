class SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(user_params[:username],user_params[:password])

    if @user
      log_in_user!(@user)
      render json: @user
    else
      @user = User.new
      @user.errors.add(:base, "Invalid Username or Password")
      render json: @user.errors.full_messages
    end
  end

  def new
    @user = User.new

    render :new
  end

  def destroy
    log_out_user!
  end
end

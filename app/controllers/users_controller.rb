class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      log_in_user!(@user)
      redirect_to root_url
    else
      render json: @user.errors.full_messages, status: :unprocessable_entity
    end
  end

  def index
    render json: User.all
  end

  def new
    @user = User.new
    render :new
  end
end

class UsersController < ApplicationController
  def create
    @user = User.new(user_params)

    if @user.save
      log_in_user!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def index
    render json: User.all
  end

  def show
    @user = User.find(params[:id])
    @user.songs.order_by('created_at desc')
    render :show
  end

  def new
    @user = User.new
    render :new
  end
end

class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  helper_method :current_user

  def current_user
    @current_user ||= Session.find_user(session[:session_token])
    return @current_user
  end

  def log_in_user!(user)
    @session = user.sessions.create
    session[:session_token] = @session.token
  end

  def log_out_user!
    @session = Session.find_by(token: session[:session_token])
    @session.destroy!
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def require_logged_in
    redirect_to new_session_url unless logged_in?
  end

  protected

  def user_params
    params.require(:user).permit(:username, :password, :email, :about_me)
  end
end

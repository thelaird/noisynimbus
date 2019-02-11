class V2::SessionsController < ApplicationController
    def create
      @user = User.find_by_credentials(user_params[:username],user_params[:password])
  
      if @user
        if token = log_in_user!(@user)
            render json: { session_token: token }
        else 
            render json: {}, status: 422 
        end
      else
        render json: { error: "Invalid username or password" }, status: 401
      end
    end
  
    def destroy
      log_out_user!
      render json: 'logged out successfully'
    end
  end
  
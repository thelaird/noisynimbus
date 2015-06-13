module Api
  class FollowingsController < ApiController
    def create
      @following = current_user.followings.new(following_params)

      if @following.save
        render json: @following
      else
        render json: @following.errors.full_messages, status: 422
      end

    end

    def destroy
      @following = Following.find(follower_id: current_user.id, followee_id: following_params)
      @following.destroy
      render json: @following
    end


    private

    def following_params
      params.require(:following).permit(:followee_id)
    end
  end
end

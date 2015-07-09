module Api
  class SearchController < ApiController

    def index
      @songs_by_artist = Song.where("artist ILIKE ?", "%#{search_params[:query]}%").order('created_at desc')
      @songs_by_title = Song.where("title ILIKE ?", "%#{search_params[:query]}%").order('created_at desc')
      @tags = Tag.where("text ILIKE ?", "%#{search_params[:query]}%")
      @users = User.where("username ILIKE ?", "%#{search_params[:query]}%")
      render :index
    end

    private

    def search_params
      params.permit(:query)
    end
  end
end

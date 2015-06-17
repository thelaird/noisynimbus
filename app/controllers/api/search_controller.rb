module Api
  class SearchController < ApiController

    def index
      @songs_by_artist = Song.find_by_fuzzy_artist(params[:query], limit: 5)
      @songs_by_title = Song.find_by_fuzzy_title(params[:query], limit: 5)
      @tags = Tag.find_by_fuzzy_text(params[:query], limit: 5)
      @users = User.find_by_fuzzy_username(params[:query], limit: 5)
      render :index
    end

    # private
    #
    # def search_params
    #   params.require(:search).permit(:query)
    # end
  end
end

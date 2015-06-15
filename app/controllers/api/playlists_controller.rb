module Api
  class PlaylistsController < ApiController
    def create
      @playlist = current_user.playlists.new(playlist_params)

      if @playlist.save
        render json: @playlist
      else
        render json: @playlist.errors.full_messages, status: 422
      end
    end

    def index
      @playlists = current_user.playlists.all
      render json: @playlists
    end

    def show
      @playlist = current_user.playlists.find(params[:id])
      render json: @playlist
    end

    private

    def playlist_params
      params.require(:playlist).permit(:title)
    end
  end
end

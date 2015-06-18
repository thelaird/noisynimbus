module Api
  class PlaylistsController < ApiController
    wrap_parameters :playlist, include: [
      :title,
      :description,
      :song_ids
    ]

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
      render :index
    end

    def show
      @playlist = current_user.playlists.find(params[:id])
      render :show
    end

    private

    def playlist_params
      params.require(:playlist).permit(:title, :description, :song_ids => [])
    end
  end
end

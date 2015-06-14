module Api
  class SongsController < ApiController
    def create
      @song = current_user.songs.new(song_params)

      if @song.save
        render json: @song
      else
        render json: @song.errors.full_messages, status: 422
      end
    end

    def destroy
      @song = current_user.songs.find(params[:id])
      @song.destroy
      render json: @song
    end

    def explore
      @songs = Song.all.sample(5)
      render :index
    end

    def index
      @songs = current_user.followed_songs
      render :index
    end

    def show
      @song = Song.find(params[:id])
      render json: @song
    end

    def update
      @song = current_user.songs.find(params[:id])

      if @song.update(song_params)
        render json: @song
      else
        render json: @song.errors.full_messages, status: 422
      end
    end

    private

    def song_params
      params.require(:song).permit(:artist, :title, :description, :song_url, :image_url)
    end
  end
end

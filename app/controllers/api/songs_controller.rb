module Api
  class SongsController < ApplicationController
    def create
      @song = current_user.songs.new(song_params)

      if @song.save
        render json: @song
      else
        render json: @song.errors.full_messages, status: unprocessable_entity
      end
    end

    def destroy
      @song = current_user.songs.find(params[:id])
      @song.destroy
      render json: @song
    end

    def show
      @song = Songs.find(params[:id])
      render json: @song
    end

    def update
      @song = current_user.songs.find(params[:id])

      if @song.update(song_params)
        render json: @song
      else
        render json: @song.errors.full_messages, status: unprocessable_entity
      end
    end

    private

    def song_params
      params.require(:song).permit(:artist, :title, :description, :song_url)
  end
end
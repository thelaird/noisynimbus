module Api
  class PlaylistItemsController < ApiController
    def create
      @playlist_item = PlaylistItem.new(playlist_item_params)

      if @playlist_item.save
        render json: @playlist_item
      else
        render json: @playlist_item.errors.full_messages, status: 422
      end
    end

    def delete
      @playlist_item = PlaylistItem.find(params[:id])
      @playlist_item.destroy
      render json: {}
    end

    private

    def playlist_item_params
      params.require(:playlist_item).permit(:song_id, :playlist_id, :ord)
    end

  end
end

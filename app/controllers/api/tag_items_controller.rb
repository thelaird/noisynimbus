module Api
  class TagItemsController < ApiController
    def create
      @tag_item = TagItem.new(tag_item_params)

      if @tag_item.save
        render json: @tag_item
      else
        render json: @tag_item.errors.full_messages, status: 422
      end
    end

    def delete
      @tag_item = TagItem.find(params[:id])
      @tag_item.destroy
      render json: {}
    end

    private

    def tag_item_params
      params.require(:tag_item).permit(:song_id, :tag_id)
    end
  end
end

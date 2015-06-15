module Api
  class TagsController < ApiController
    def create
      @tag = Tag.new(tag_params)

      if @tag.save
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: 422
      end
    end

    private

    def tag_params
      params.require(:tag).permit(:text)
    end
  end
end

module Api
  class TagsController < ApiController
    def create

      @tag = Tag.find_or_create_by(text: params[:text])

      if @tag.valid?
        render json: @tag
      else
        render json: @tag.errors.full_messages, status: 422
      end
    end

    def show
      @tag = Tag.find(params[:id])
    end
  end
end

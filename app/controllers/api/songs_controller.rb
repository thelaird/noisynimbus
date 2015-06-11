module Api
  class SongsController < ApiController
    def create
      @song = current_user.songs.new(song_params)

      if @song.save
        render json: @song
      else
        render json: @song.errors.full_messages, status: :unprocessable_entity
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

    def sign_request
      objectName = SecureRandom.urlsafe_base64 #params[:s3_object_name]
      mimeType = params['s3_object_type']
      expires = Time.now.to_i + 100 # PUT request to S3 must start within 100 seconds

      amzHeaders = "x-amz-acl:public-read" # set the public read permission on the uploaded file
      stringToSign = "PUT\n\n#{mimeType}\n#{expires}\n#{amzHeaders}\n/#{ENV['s3_bucket']}/#{objectName}";
      sig = CGI::escape(Base64.strict_encode64(OpenSSL::HMAC.digest('sha1', ENV['aws_secret_access_key'], stringToSign)))

      render json: {
        signed_request: CGI::escape("http://s3.amazonaws.com/#{ENV['s3_bucket']}/#{objectName}?AWSAccessKeyId=#{ENV['aws_access_key_id']}&Expires=#{expires}&Signature=#{sig}"),
        url: "http://s3.amazonaws.com/#{ENV['s3_bucket']}/#{objectName}"
      }

    end

    def update
      @song = current_user.songs.find(params[:id])

      if @song.update(song_params)
        render json: @song
      else
        render json: @song.errors.full_messages, status: :unprocessable_entity
      end
    end

    private

    def song_params
      params.require(:song).permit(:artist, :title, :description, :song_url)
    end
  end
end

module Api
  class UploadsController < ApiController
    def sign_request
      filename = sanitize_filename(params['s3_object_name'])
      objectName = "#{current_user.username}/#{filename}"
      mimeType = params['s3_object_type']
      expires = Time.now.to_i + 100

      amzHeaders = "x-amz-acl:public-read"
      stringToSign = "PUT\n\n#{mimeType}\n#{expires}\n#{amzHeaders}\n/#{ENV['s3_bucket']}/#{objectName}";
      sig = CGI::escape(Base64.strict_encode64(OpenSSL::HMAC.digest('sha1', ENV['aws_secret_access_key'], stringToSign)))

      render json: {
        signed_request: CGI::escape("#{ENV['s3_url']}/#{ENV['s3_bucket']}/#{objectName}?AWSAccessKeyId=#{ENV['aws_access_key_id']}&Expires=#{expires}&Signature=#{sig}"),
        url: "#{ENV['s3_url']}/#{ENV['s3_bucket']}/#{objectName}"
      }
    end

    def sanitize_filename(filename)
      return filename.gsub(/[^0-9A-Za-z.\-]/, '')
    end
  end
end

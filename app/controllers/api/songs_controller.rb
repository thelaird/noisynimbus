module Api
  class SongsController < ApiController


    def by_artist
      @songs = Song.where("artist ILIKE ?", params[:artist])
      render :index
    end

    def create
      @song = current_user.songs.new(song_params)
      query_url = self.lastfm_url(@song.artist, @song.title)
      @song.large_image_url = self.fetch_large_image_url(query_url)
      @song.tags = parse_tagstring(params[:tagstring])

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
      @songs = Song.all.sample(5).sort_by! { |song| -song.id }
      render :index
    end

    def fetch_large_image_url (query_string)
      response = JSON.parse(RestClient.get query_string)

      begin
        url = response["track"]["album"]["image"][3]["#text"]
        return url
      rescue NoMethodError => e
        return "#{ENV['s3_url']}/#{ENV['s3_bucket']}/large_default.png"
      end
    end

    def index
      # if params[:artist].present?
      #   @songs = Song.where("artist ILIKE ?", params[:artist])
      # else
      #   @songs = current_user.followed_songs
      # endd

      @songs = current_user.followed_songs
      render :index
    end

    def lastfm_url(artist, track)
      base = "http://ws.audioscrobbler.com/2.0/?"
      url_params = {
        method: "track.getInfo",
        api_key: ENV['lastfm_key'],
        artist: artist,
        track: track,
        format: "json",
      }

      return base.concat(url_params.to_query)
    end

    def parse_tagstring(string)
      tags = string.split(' ')
      tags.map! {|tag| Tag.find_or_create_by(text: tag) }
      return tags
    end


    def show
      @song = Song.find(params[:id])
      render :show
    end

    def update
      @song = current_user.songs.find(params[:id])
      @song.tags = parse_tagstring(params[:tagstring])
      if @song.update(song_params)
        render json: @song
      else
        render json: @song.errors.full_messages, status: 422
      end
    end

    private

    def song_params
      params.require(:song).permit(
        :artist,
        :title,
        :description,
        :song_url,
        :small_image_url
    )
    end
  end
end

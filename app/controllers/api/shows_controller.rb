class Api::ShowsController < ApplicationController 
    def index
        @shows = Show.with_attached_poster.all.includes(:videos)
        videos = Video.with_attached_video_file.all 
        @previewVideos = self.find_videos(@shows)
        @genres = Genre.all
        @runtime = @previewVideos[0].runtime;

        render :index
    end

    def show
        @show = Show.find(params[:id])
        @nextShow = Show.where(id: @show.id).first # the video that will be recommended after
        @video = @show.videos.first

        render :show
    end

    def search
        query_string = params[:query_string]

        if query_string == "" 
            render json: {}
        else 
            @shows = Show.with_attached_poster.where('shows.title LIKE %:q% OR shows.director LIKE %:q%', q: query_string).includes(:videos)
            @genres = Genre.all
            @previewVideos = self.find_videos(@shows)
            @runtime = @previewVideos[0].runtime;

            render :index
        end
    end

    # finds each preview video with their attached video
    # right now this grabs the first video under each show
    # this will be refactored once genres are implemented`
    def find_videos(shows) 
        previewVideos = []
        videos = Video.with_attached_video_file.all

        shows.each do |show|
            previewId = show.show_type == "FEATURE" ? show.movie_id : show.episode_ids[0]
            
            videos.each do |video|
                if ( video.id == previewId ) 
                    previewVideos << video
                    break
                end
            end
        end

        previewVideos
end
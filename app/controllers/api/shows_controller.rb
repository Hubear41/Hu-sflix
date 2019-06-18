class Api::ShowsController < ApplicationController 
    def index
        @shows = Show.with_attached_poster.all.includes(:videos)
        videos = Video.with_attached_video_file.all 
        @previewVideos = Array.new
        @genres = Genre.all

        # finds each preview video with their attached video
        # right now this grabs the first video under each show
        # this will be refactored once genres are implemented
        @shows.each do |show|
            previewId = show.show_type == "FEATURE" ? show.movie_id : show.episode_ids[0]

            videos.each do |video|
                if ( video.id == previewId ) 
                    @previewVideos << video
                    break
                end
            end
        end
        
        render :index
    end

    def show
        @show = Show.find(params[:id])
        @nextShow = Show.where(id: @show.id).first # the video that will be recommended after
        @video = @show.videos.first

        render :show
    end
end
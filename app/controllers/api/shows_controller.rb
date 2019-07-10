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
        
        if query_string.length == 0 
            render json: {}
        else 
            @shows = Show.with_attached_poster
                    .joins(:genres)
                    .where('shows.title ILIKE :first OR
                            shows.title ILIKE :middle OR
                            shows.director ILIKE :first OR
                            shows.director ILIKE :last OR
                            genres.name ILIKE :first ',
                            first: "#{query_string}%", 
                            middle: "%#{query_string}%", 
                            last: "%#{query_string}" 
                    )
                    .includes(:videos)
            @genres = Genre.all
            @previewVideos = self.find_videos(@shows)
            @runtime = @previewVideos.count > 0 ? @previewVideos[0].runtime : 0; 

            if @shows.empty?
                render json: {}
            else 
                render :index
            end
        end
    end

    def my_list 
        @shows = Show.with_attached_poster.where(id: current_user.shows_on_list_ids).includes(:videos)
        @previewVideos = self.find_videos(@shows)
        @genres = Genre.all
        @runtime = @previewVideos.count > 0 ? @previewVideos[0].runtime : 0; 

        if @shows.empty?
            render json: {}
        else
            render :index
        end
    end

    # finds each preview video with their attached video
    # right now this grabs the first video under each show
    # this will be refactored once genres are implemented
    def find_videos(shows) 
        previewVideos = []
        videos = Video.with_attached_video_file.all
        
        shows.each do |curr_show|
            previewId = curr_show.show_type == "FEATURE" ? curr_show.movie_id : curr_show.episode_ids[0]
            
            videos.each do |video|
                if ( video.id == previewId ) 
                    previewVideos << video
                    break
                end
            end
        end
        
        previewVideos
    end
end
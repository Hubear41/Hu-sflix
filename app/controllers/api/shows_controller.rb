class Api::ShowsController < ApplicationController 
    def index
        @shows = Show.with_attached_poster.all.includes(:videos, :genres, :episodes, :film)
        @preview_videos = self.find_videos(@shows)
        @genres = Genre.all.includes(:shows_with_genre, :show_genres, :associated_genres)
        
        render :index
    end

    def show
        @show = Show.find(params[:id])
        @video = @show.type == "Movie" ? @show.film : @show.episodes.first
        
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
                            genres.name ILIKE :first',
                            first: "#{query_string}%", 
                            middle: "%#{query_string}%", 
                            last: "%#{query_string}" 
                    )
                    .includes(:videos, :genres)
            @genres = Genre.all.includes(:shows_with_genre, :show_genres, :associated_genres)
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
        @shows = Show.with_attached_poster.where(id: current_user.shows_on_list_ids ).includes(:videos, :genres)
        @preview_videos = self.find_videos(@shows)
        @genres = Genre.all.includes(:shows_with_genre, :show_genres, :associated_genres)
        
        if @shows.empty?
            render json: {}
        else
            render :index
        end
    end

    def movies
        @shows = Movie.with_attached_poster.all.includes(:videos, :genres, :film)
        @preview_videos = self.find_videos(@shows)
        @genres = Genre.all.includes(:shows_with_genre, :show_genres, :associated_genres)

        render :index
    end

    def tv
        @shows = Series.with_attached_poster.all.includes(:videos, :genres, :episodes)
        @preview_videos = self.find_videos(@shows)
        @genres = Genre.all.includes(:shows_with_genre, :show_genres, :associated_genres)

        render :index
    end

    # finds each preview video with their attached video
    # right now this grabs the first video under each show
    # this will be refactored once genres are implemented
    def find_videos(shows) 
        preview_video_ids = shows.map(&:id)
        preview_ids = Video.with_attached_video_file.where(id: preview_video_ids)
    end
end
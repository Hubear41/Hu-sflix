class Api::ShowsController < ApplicationController 
    def index
        @shows = Show.with_attached_poster.all.includes(:videos)
        @previewVideos = @shows.map { |show| show.videos.first } 
        
        render :index
    end

    def show
        @show = Show.find(params[:id])

        render :show
    end
end
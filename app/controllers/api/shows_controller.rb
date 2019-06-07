class Api::ShowsController < ApplicationController 
    def index
        @shows = Show.with_attached_poster.all.includes(:videos)

        render :index
    end

    def show
        @show = Show.find(params[:id])
        @next_show = @show.next_show
        @video = @show.videos.first

        render :show
    end
end
class Api::ShowsController < ApplicationController 
    def index
        @shows = Show.all.includes(:videos)

        render :index
    end

    def show
        @show = Show.find(params[:id])

        render :show
    end
end
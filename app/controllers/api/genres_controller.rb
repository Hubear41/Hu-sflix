class GenresController < ApplicationController 
    def index 
        @genres = Genre.all.includes(:shows_with_genre);
        
        render :index
    end
    
    def show
        @genre = Genre.find(params[:id])

        render :show
    end
end
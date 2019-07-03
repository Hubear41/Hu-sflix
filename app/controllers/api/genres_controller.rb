class Api::GenresController < ApplicationController 
    def index
        @genre = Genre.all

        render :index;
    end

    def genre_index 
        genre = Genre.includes(:shows_with_genre).find(params[:genre_id])
        @genres = Genre.all
        # @shows = genre.shows_with_genre.with_attached_poster
        @shows = genre.shows_with_genre

        render :genre_index
    end

    def show
        @genre = Genre.find(id: params[:id])
        @shows = @genre.shows_with_genre

        render :show
    end
end
json.partial! 'api/genres/genre', genre: @genre
json.relatedGenreIds @genre.related_genre_ids
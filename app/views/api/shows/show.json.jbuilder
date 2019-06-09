json.show do
    json.partial! 'api/shows/show', show: @show
end

json.nextShow do
    json.partial! 'api/shows/show', show: @nextShow    
end

json.video do 
    json.partial! 'api/videos/video', video: @video
end

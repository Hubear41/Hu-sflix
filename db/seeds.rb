# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Video.destroy_all
Show.destroy_all

User.create!(email: 'guest@guest.com', password: 'go_password_go')

show1 = Show.create(poster_url: 'asdasglasdfasfhgsdf', title: 'Best Show', director: 'me', tagline: 'this is the best show ever!', year: 2001, maturity_rating: 'G')
show2 = Show.create(poster_url: 'nbkjkhd', title: 'Regular Show', director: 'CN', tagline: 'Regular Show: It\'s Anything But', year: 2009, maturity_rating: 'PG-13')

show1.videos.create!(video_url: 'another_url.com', name: 'Best Show', description: 'Everything is awesome', video_type: 'MOVIE', runtime: 600000, credits_time: 570000)
show2.videos.create!(video_url: 'first_url.com', name: 'Episode 1', description: 'just a regular day', video_type: 'EPISODE', runtime: 30000, credits_time: 29000)
show2.videos.create!(video_url: 'second_url.com', name: 'Episode 2', description: 'another day goes by', video_type: 'EPISODE', runtime: 32340, credits_time: 23068)
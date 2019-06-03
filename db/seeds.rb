# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'open-uri'

User.destroy_all
Video.destroy_all
Show.destroy_all

User.create!(email: 'guest@guest.com', password: 'go_password_go')

caroline_show = Show.create!( title: 'Caroline', 
                              director: 'ELO Films', 
                              tagline: 'When plans fall through, a six-year-old is faced with a big responsibility on a hot Texas day.',
                              year: 2018,
                              maturity_rating: 'PG-13',
                              show_type: 'FEATURE',
                              poster_url: 'https://hu-sflix-seed.s3.amazonaws.com/posters/caroline-husflix-poster.jpg',
)

caroline_poster_file = open('https://hu-sflix-seed.s3.amazonaws.com/posters/caroline-husflix-poster.jpg')
caroline_show.poster.attach(io: caroline_poster_file, filename: 'caroline-husflix-poster.jpg')
caroline_show.save!


caroline_video = caroline_show.videos.create!( name: 'Caroline',
                             description: 'Alex has given up on love completely, until one day his heart calls him via a public payphone to convince  otherwise.',
                             video_type: 'FILM',
                             runtime: 713,
                             credits_time: 677,
                             video_url: "1"
)

# caroline_file = open("/Users/dennishu/Documents/Bootcamp\ Work/Fullstack\ Project/video_assets/Carolin_Husflix_720p.mp4")
# caroline_video.video_file.attach(io: caroline_file, filename: 'Carolin_Husflix_720p.mp4')
# caroline_video.save!

heart_show = Show.create!( title: 'Heart',
                          director: 'Dorian Cambi',
                          tagline: 'Alex has given up on love completely, until one day his heart calls him via a public payphone to convince  otherwise.',
                          year: 2016,
                          maturity_rating: 'PG',
                          show_type: 'FEATURE',
                          poster_url: 'https://hu-sflix-seed.s3.amazonaws.com/posters/heart_husflix_poster.png'
)

heart_poster = open ('https://hu-sflix-seed.s3.amazonaws.com/posters/heart_husflix_poster.png')
heart_show.poster.attach(io: heart_poster, filename: 'heart-husflix-poster.jpg')
heart_show.save!

heart_video = heart_show.videos.create!( name: 'Heart',
                          description: 'Alex has given up on love completely',
                          video_type: 'FILM',
                          runtime: 890,
                          credits_time: 830,
                          video_url: "3"
)

# heart_file = open('/Users/dennishu/Documents/Bootcamp\ Work/Fullstack\ Project/video_assets/Heart_Husflix_720p.mp4')
# heart_video.video_file.attach(io: heart_file, filename: 'Heart_Husflix_720p.mp4')
# heart_video.save!

midnight_girl_show = Show.create!( title: 'Kate',
                                  director: 'Christina Yoon',
                                  tagline: 'A shy high schooler dealing with the aftermath of sexual assault meets a "cam girl" who shows her a very different side of sexuality.',
                                  year: 2018,
                                  maturity_rating: 'R',
                                  show_type: 'FEATURE',
                                  poster_url: 'https://hu-sflix-seed.s3.amazonaws.com/posters/midnight_girl_husflix_poster.jpg'                 
)

midnight_girl_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/midnight_girl_husflix_poster.jpg')
midnight_girl_show.poster.attach(io: midnight_girl_poster, filename: 'midnight-girl-poster.jpg')
midnight_girl_show.save!

midnight_girl_video = midnight_girl_show.videos.create!( name: 'Kate',
                                                        description: 'A shy high schooler dealing with the aftermath of sexual assault meets a "cam girl" who shows her a very different side of sexuality.',
                                                        video_type: 'FILM',
                                                        runtime: 1069,
                                                        credits_time: 1043,
                                                        video_url: "/Users/dennishu/Documents/Bootcamp\ Work/Fullstack\ Project/Hu-sflix/app/assets/videos/Kate_Husflix_720p.mp4"

)

# midnight_girl_file = open('')

ling_show = Show.create!( title: 'Ling',
                          director: 'Dennis Liu',
                          tagline: 'something',
                          year: 2018,
                          maturity_rating: 'PG',
                          show_type: 'EPISODIC',
                          poster_url: 'https://hu-sflix-seed.s3.amazonaws.com/posters/ling_husflix_poster.png'
)

ling_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/ling_husflix_poster.png')
ling_show.poster.attach( io: ling_poster, filename: 'ling_poster.jpg')
ling_show.save!

ling_show.videos.create!( name: 'Ling Promo',
                          description: 'Ling Promo',
                          runtime: '272',
                          video_type: 'PREVIEW',
                          video_url: '6'
)

foolish_gents_show = Show.create!( title:'The Fantastic Adventures of Foolish Gentlemen',
                                  director: 'Jake Rubin Max Pava',
                                  tagline: 'Fools are silly and carefree. Gentlemen are honorable and chivalrous. The Foolish Gents hope to marry these attributes to create! high quality, entertaining, and original content for years to come.',
                                  year: 2014,
                                  maturity_rating: 'PG-13',
                                  show_type: 'EPISODIC',
                                  poster_url: 'https://hu-sflix-seed.s3.amazonaws.com/posters/foolish_gents_husflix_poster.png'
 
)

foolish_gents_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/foolish_gents_husflix_poster.png')
foolish_gents_show.poster.attach(io: foolish_gents_poster, filename: 'foolish_gents_poster.jpg')
foolish_gents_show.save!

foolish_gents_ep1 = foolish_gents_show.videos.create!( name: 'Discontent',
                                                      description: 'Tim daydreams about a more exciting life, Jonathan rallies his band for a gig, and Peter plans to propose to his girlfriend Chloe at their housewarming party.',
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 1,
                                                      video_url: 'video url4'

)

foolish_gents_ep2 = foolish_gents_show.videos.create!( name: 'Confusion',
                                                      description: "Tim is haunted by last night's drunken escapades, Jonathan grapples with love for the first time, and Peter fantasizes about how to spice up his relationship.",
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 2,
                                                      video_url: 'video url5'

)

foolish_gents_ep3 = foolish_gents_show.videos.create!( name: 'Timing',
                                                      description: "Tim asks Ellie out on a date, Jonathan embarks on a quest to find his one true love, and Peter connects with a stranger in the park.",
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 3,
                                                      video_url: 'video url6'

)

foolish_gents_ep4 = foolish_gents_show.videos.create!( name: 'Games ',
                                                      description: "Jonathan calls for a meeting of the minds, Tim and Peter attempt to drink their way to clarity.",
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 4,
                                                      video_url: 'video url7'

)

foolish_gents_ep5 = foolish_gents_show.videos.create!( name: 'Love',
                                                      description: 'The gang attends a formal event, Tim and Jonathan face a new rival, and Peter makes a stand.',
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 5,
                                                      video_url: 'video9'
)

foolish_gents_ep6 = foolish_gents_show.videos.create!( name: 'Truth',
                                                      description: 'The gentlemen face their problems without the help of their fantastic imaginations.',
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 6,
                                                      video_url: 'video url8'

)


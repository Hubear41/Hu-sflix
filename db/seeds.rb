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

# Default User
User.create!(email: 'guest@guest.com', password: 'go_password_go')


# Shows and Videos 
caroline_show = Show.create!( title: 'Caroline', 
                              director: 'ELO Films', 
                              tagline: 'When plans fall through, a six-year-old is faced with a big responsibility on a hot Texas day.',
                              year: 2018,
                              maturity_rating: 'PG-13',
                              show_type: 'FEATURE',
)

caroline_poster_file = open('https://hu-sflix-seed.s3.amazonaws.com/posters/caroline-husflix-poster.jpg')
caroline_show.poster.attach(io: caroline_poster_file, filename: 'caroline-husflix-poster.jpg')
caroline_show.save!


caroline_video = caroline_show.videos.create!( name: 'Caroline',
                             description: 'Alex has given up on love completely, until one day his heart calls him via a public payphone to convince  otherwise.',
                             video_type: 'FILM',
                             runtime: 713,
                             credits_time: 677,
)

# caroline_file = open("/Users/dennishu/Documents/Bootcamp\ Work/Fullstack\ Project/video_assets/Carolin_Husflix_720p.mp4")
# caroline_video.video_file.attach(io: caroline_file, filename: 'Carolin_Husflix_720p.mp4')
# caroline_video.save!

mouse_show = Show.create!( title: 'Mouse',
                           director: 'ELO Films',
                           tagline: 'Fueled by coke, a desperate couple attempts to capitalize on an unlikely opportunity.',
                           year: 2016,
                           maturity_rating: 'R',
                           show_type: 'FEATURE',
)

mouse_video = mouse_show.videos.create!( name: 'Mouse',
                                         description: 'Fueled by coke, a desperate couple attempts to capitalize on an unlikely opportunity.',
                                         video_type: 'FILM',
                                         runtime: 189,
                                         credits_time: 189,

                                         )

heart_show = Show.create!( title: 'Heart',
                          director: 'Dorian Cambi',
                          tagline: 'Alex has given up on love completely, until one day his heart calls him via a public payphone to convince  otherwise.',
                          year: 2016,
                          maturity_rating: 'PG',
                          show_type: 'FEATURE',
)

heart_poster = open ('https://hu-sflix-seed.s3.amazonaws.com/posters/heart_husflix_poster.png')
heart_show.poster.attach(io: heart_poster, filename: 'heart-husflix-poster.jpg')
heart_show.save!

heart_video = heart_show.videos.create!( name: 'Heart',
                          description: 'Alex has given up on love completely',
                          video_type: 'FILM',
                          runtime: 890,
                          credits_time: 830,
)

ramona_show = Show.create!( title: 'Ramona',
                            director: 'Dorian Cambi',
                            tagline: 'Ramona has an inability to express emotions verbally. The only person that might be able to help her is her dashing therapist.',
                            year: 2014,
                            maturity_rating: 'PG',
                            show_type: 'FEATURE',
)

ramona_video = ramona_show.videos.create!( name: 'Ramona',
                                           description: 'N/A',
                                           video_type: 'FILM',
                                           runtime: 98,
                                           credits_time: 95,
)


stumped_show = Show.create!( title: 'Stumped',
                             director: 'Matthew Puccini',
                             description: 'An awkward dinner escalates into a full-blown musical number as a young man struggles to come out to his parents.' ,
                             video_type: 'FILM',
                             year: 2017,
                             maturity_rating: 'PG',
                             show_type: 'FEATURE',
                             
) 

stumped_show = stumped_show.videos.create!( name: 'Stumped',
                                            description: 'N/A',
                                            video_type: 'FILM',
                                            runtime: 86,
                                            credits_time: 80,

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
)

midnight_girl_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/midnight_girl_husflix_poster.jpg')
midnight_girl_show.poster.attach(io: midnight_girl_poster, filename: 'midnight-girl-poster.jpg')
midnight_girl_show.save!

midnight_girl_video = midnight_girl_show.videos.create!( name: 'Kate',
                                                        description: 'A shy high schooler dealing with the aftermath of sexual assault meets a "cam girl" who shows her a very different side of sexuality.',
                                                        video_type: 'FILM',
                                                        runtime: 1069,
                                                        credits_time: 1043,

                                                        
)

# midnight_girl_file = open('')

marina_show = Show.create!( title: 'Marina',
                            director: 'Story Chen',
                            tagline: 'Marina is a story about a girl who inherited Spinal Muscular Atrophy from her mom. Before she lose the control of her body, does she have the right to decide her own life and death?',
                            year: 2018,
                            maturity_rating: 'PG-13',
                            show_type: 'FEATURE',
)

marina_video = marina_show.videos.create!( name: 'Marina',
                                           description: 'N/A',
                                           video_type: 'FILM',
                                           runtime: 110,
                                           credits_time: 100,

                                           
)

charm_city_show = Show.create( title: 'Goodbye Charm City',
                               director: 'Christian Grier',
                               year: 2015,
                               tagline: 'A mother prepares her final impact statement to the man that murdered her son.',
                               maturity_rating: "R",
                               show_type: 'FEATURE',
)

charm_city_video = charm_city_show.videos.create!( name: 'Goodbye Charm City',
                                                   description: 'N/A',
                                                   video_type: 'FILM',
                                                   runtime: 146,
                                                   credits_time: 125,

                                                   )

malis_tribute = Show.create( title: "Mali's Tribute",
                             director: 'Dircelene Castilho Torres',
                             tagline: "In an attempt to honor her brother's memory through clothing, a young woman must wrestle with the questions of sexuality her fashion choices prompt in her peers and, ultimately, herself.",
                             year: 2016,
                             maturity_rating: 'PG-13',
                             show_type: 'FEATURE',
)

malis_tribute_video = malis_tribute.videos.create!( name: "Mali's Tribute",
                                                   description: 'N/A',
                                                   video_type: 'FILM',
                                                   runtime: 80,
                                                   credits_time: 67,

                                                   )


ling_show = Show.create!( title: 'Ling',
                          director: 'Dennis Liu',
                          tagline: 'something',
                          year: 2018,
                          maturity_rating: 'PG',
                          show_type: 'EPISODIC',
)

ling_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/ling_husflix_poster.png')
ling_show.poster.attach( io: ling_poster, filename: 'ling_poster.jpg')
ling_show.save!



ling_show.videos.create!( name: 'Ling Promo',
                          description: 'Ling Promo',
                          runtime: '272',
                          video_type: 'PREVIEW',

                          )

max_out_show = Show.create!( title: 'Max Out',
                             director: 'Max Talisman',
                             tagline: 'Four friends try their best to overcome living and dating in NYC',
                             year: 2016,
                             maturity_rating: 'PG-13',
                             show_type: 'EPISODIC',
)

max_out_ep1 = max_out_show.videos.create!( name: 'Worst Date Ever',
                                           description: 'Online dating can lead to unexpected adventures',
                                           video_type: 'EPISODE',
                                           episode_num: 2,
                                           runtime: 78,
                                           credits_time: 65,

                                           )

max_out_ep2 = max_out_show.videos.create!( name: 'Audition Animal',
                                           description: 'Max tries out for a movie',
                                           video_type: 'EPISODE',
                                           episode_num: 1,
                                           runtime: 89,
                                           credits_time: 75,

                                           )

foolish_gents_show = Show.create!( title:'The Fantastic Adventures of Foolish Gentlemen',
                                  director: 'Jake Rubin Max Pava',
                                  tagline: 'Fools are silly and carefree. Gentlemen are honorable and chivalrous. The Foolish Gents hope to marry these attributes to create! high quality, entertaining, and original content for years to come.',
                                  year: 2014,
                                  maturity_rating: 'PG-13',
                                  show_type: 'EPISODIC', 
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

                                                      
)

foolish_gents_ep2 = foolish_gents_show.videos.create!( name: 'Confusion',
                                                      description: "Tim is haunted by last night's drunken escapades, Jonathan grapples with love for the first time, and Peter fantasizes about how to spice up his relationship.",
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 2,                                                
)

foolish_gents_ep3 = foolish_gents_show.videos.create!( name: 'Timing',
                                                      description: "Tim asks Ellie out on a date, Jonathan embarks on a quest to find his one true love, and Peter connects with a stranger in the park.",
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 3,                                           
)

foolish_gents_ep4 = foolish_gents_show.videos.create!( name: 'Games ',
                                                      description: "Jonathan calls for a meeting of the minds, Tim and Peter attempt to drink their way to clarity.",
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 4,
)

foolish_gents_ep5 = foolish_gents_show.videos.create!( name: 'Love',
                                                      description: 'The gang attends a formal event, Tim and Jonathan face a new rival, and Peter makes a stand.',
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 5,
)

foolish_gents_ep6 = foolish_gents_show.videos.create!( name: 'Truth',
                                                      description: 'The gentlemen face their problems without the help of their fantastic imaginations.',
                                                      video_type: 'EPISODE',
                                                      runtime: 0,
                                                      credits_time: 0,
                                                      episode_num: 6,
)

# Genres
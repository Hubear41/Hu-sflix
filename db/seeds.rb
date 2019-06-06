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

# Default user for Guest Login
User.create!(email: 'guest@guest.com', password: 'go_password_go')


# Shows and Videos 
# |-------------------------------------- 1. Caroline ------------------------------------------------------ |

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
                             runtime: 61,
                             credits_time: 60,
)

caroline_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Caroline_Husflix_short_720p.mp4')
caroline_video.video_file.attach(io: caroline_file, filename: 'Caroline.mp4')
caroline_video.save!

# |-------------------------------------- 2. Mouse ------------------------------------------------------ |

mouse_show = Show.create!( title: 'Mouse',
                           director: 'ELO Films',
                           tagline: 'Fueled by coke, a desperate couple attempts to capitalize on an unlikely opportunity.',
                           year: 2016,
                           maturity_rating: 'R',
                           show_type: 'FEATURE',
)

mouse_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/mouse_husflix_poster.jpg')
mouse_show.poster.attach(io: mouse_poster, filename:'mouse_poster.jpg')

mouse_video = mouse_show.videos.create!( name: 'Mouse',
                                         description: 'Fueled by coke, a desperate couple attempts to capitalize on an unlikely opportunity.',
                                         video_type: 'FILM',
                                         runtime: 153 ,
                                         credits_time: 150
)

mouse_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Mouse_Husflix_short_720p.mp4')
mouse_video.video_file.attach(io: mouse_file, filename: 'Mouse.mp4')
mouse_video.save!

# |-------------------------------------- 3. Heart ------------------------------------------------------ |

heart_show = Show.create!( title: 'Heart',
                          director: 'Dorian Cambi',
                          tagline: 'Alex has given up on love completely, until one day his heart calls him via a public payphone to convince  otherwise.',
                          year: 2016,
                          maturity_rating: 'PG',
                          show_type: 'FEATURE',
)

heart_poster = open ('https://hu-sflix-seed.s3.amazonaws.com/posters/heart_husflix_poster.png')
heart_show.poster.attach(io: heart_poster, filename: 'heart-husflix-poster.jpg')

heart_video = heart_show.videos.create!( name: 'Heart',
                          description: 'Alex has given up on love completely',
                          video_type: 'FILM',
                          runtime: 890,
                          credits_time: 830,
)

heart_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Heart_Husflix_short_720p.mp4')
heart_video.video_file.attach(io: heart_file, filename: 'Heart.mp4')
heart_video.save!

# |-------------------------------------- 4. Ramona ------------------------------------------------------ |

ramona_show = Show.create!( title: 'Ramona',
                            director: 'Dorian Cambi',
                            tagline: 'Ramona has an inability to express emotions verbally. The only person that might be able to help her is her dashing therapist.',
                            year: 2014,
                            maturity_rating: 'PG',
                            show_type: 'FEATURE',
)

ramona_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/Ramona_poster.png')
ramona_show.poster.attach(io: ramona_poster, filename: 'ramona_poster.png')
ramona_show.save!

ramona_video = ramona_show.videos.create!( name: 'Ramona',
                                           description: 'N/A',
                                           video_type: 'FILM',
                                           runtime: 43,
                                           credits_time: 40,
)


ramona_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Ramona_Husflix_short_720p.mp4')
ramona_video.video_file.attach(io: ramona_file, filename: 'Ramona.mp4')
ramona_video.save!

# |-------------------------------------- 5. Stumped ------------------------------------------------------ |

stumped_show = Show.create!( title: 'Stumped',
                             director: 'Matthew Puccini',
                             tagline: 'An awkward dinner escalates into a full-blown musical number as a young man struggles to come out to his parents.' ,
                             year: 2017,
                             maturity_rating: 'PG',
                             show_type: 'FEATURE',
                             
) 

stumped_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/Stumped_Poster.png')
stumped_show.poster.attach(io: stumped_poster, filename: 'stumped_poster.png')
stumped_show.save!

stumped_video = stumped_show.videos.create!( name: 'Stumped',
                                            description: 'N/A',
                                            video_type: 'FILM',
                                            runtime: 86,
                                            credits_time: 80,
)

stumped_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Stumped_Husflix_short_720p.mp4')
stumped_video.video_file.attach(io: stumped_file, filename: 'Stumped.mp4')
stumped_video.save!

# |-------------------------------------- 6. Midnight Girl ------------------------------------------------------ |

midnight_girl_show = Show.create!( title: 'Midnight Girl',
                                  director: 'Christina Yoon',
                                  tagline: 'A shy high schooler dealing with the aftermath of sexual assault meets a "cam girl" who shows her a very different side of sexuality.',
                                  year: 2018,
                                  maturity_rating: 'R',
                                  show_type: 'FEATURE',
)

midnight_girl_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/midnight_girl_husflix_poster.jpg')
midnight_girl_show.poster.attach(io: midnight_girl_poster, filename: 'midnight-girl-poster.jpg')
midnight_girl_show.save!

midnight_girl_video = midnight_girl_show.videos.create!( name: 'Midnight Girl',
                                                        description: 'A shy high schooler dealing with the aftermath of sexual assault meets a "cam girl" who shows her a very different side of sexuality.',
                                                        video_type: 'FILM',
                                                        runtime: 96,
                                                        credits_time: 90,                                                       
)

midnight_girl_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Midnight+Girl_Husflix_short_720p.mp4')
midnight_girl_video.video_file.attach(io: midnight_girl_file, filename: 'Midnight_Girl.mp4')
midnight_girl_video.save!

# |-------------------------------------- 7. Marina ------------------------------------------------------ |

marina_show = Show.create!( title: 'Marina',
                            director: 'Story Chen',
                            tagline: 'Marina is a story about a girl who inherited Spinal Muscular Atrophy from her mom. Before she lose the control of her body, does she have the right to decide her own life and death?',
                            year: 2018,
                            maturity_rating: 'PG-13',
                            show_type: 'FEATURE',
)

marina_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/Marina_poster.jpg')
marina_show.poster.attach(io: marina_poster, filename: 'marina_poster.jpg')
marina_show.save!

marina_video = marina_show.videos.create!( name: 'Marina',
                                           description: 'N/A',
                                           video_type: 'FILM',
                                           runtime: 46,
                                           credits_time: 40,                                         
)

marina_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Marina_Husflix_short_720p.mp4')
marina_video.video_file.attach(io: marina_file, filename: 'Marina.mp4')
marina_video.save!

# |-------------------------------------- 8. Goodbye Charm City ------------------------------------------------------ |

charm_city_show = Show.create( title: 'Goodbye Charm City',
                               director: 'Christian Grier',
                               year: 2015,
                               tagline: 'A mother prepares her final impact statement to the man that murdered her son.',
                               maturity_rating: "R",
                               show_type: 'FEATURE',
)

charm_city_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/GCC_poster.png')
charm_city_show.poster.attach(io: charm_city_poster, filename: 'charm_city_poster.png')
charm_city_show.save!

charm_city_video = charm_city_show.videos.create!( name: 'Goodbye Charm City',
                                                   description: 'N/A',
                                                   video_type: 'FILM',
                                                   runtime: 99,
                                                   credits_time: 93,
)

charm_city_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Goodbye_Charm_City_Husflix_short_720p.mp4')
charm_city_video.video_file.attach(io: charm_city_file, filename: 'charm-city.mp4')
charm_city_video.save!

# |-------------------------------------- 9. Mali's Tribute ------------------------------------------------------ |

malis_tribute = Show.create( title: "Mali's Tribute",
                             director: 'Dircelene Castilho Torres',
                             tagline: "In an attempt to honor her brother's memory through clothing, a young woman must wrestle with the questions of sexuality her fashion choices prompt in her peers and, ultimately, herself.",
                             year: 2016,
                             maturity_rating: 'PG-13',
                             show_type: 'FEATURE',
)

malis_tribute_poster = open("https://hu-sflix-seed.s3.amazonaws.com/posters/Mali's+Tribute_Poster.jpg")
malis_tribute.poster.attach(io: malis_tribute_poster, filename: 'malis_tribute_poster.png')
malis_tribute.save!

malis_tribute_video = malis_tribute.videos.create!( name: "Mali's Tribute",
                                                   description: 'N/A',
                                                   video_type: 'FILM',
                                                   runtime:  106,
                                                   credits_time: 106
)

malis_tribute_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Malis_Tribute_Husflix_short_720p.mp4')
malis_tribute_video.video_file.attach(io: malis_tribute_file, filename: 'tribute.mp4')
malis_tribute_video.save!

# |-------------------------------------- 10. Freeze ------------------------------------------------------ |

freeze = Show.create!( title: 'Freeze',
                       director: 'Nelicia Low',
                       tagline: 'We all do terrible things when we think that no one is watching. When her distant husband cannot give her the love she desires, the lonely and insecure Hui will do anything to feel loved. Caught in an unusual love triangle with her autistic brother, Hui has found a constant source of comfort.',
                       year: 2016,
                       maturity_rating: 'R',
                       show_type: 'FEATURE'
)    

freeze_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/Freeze_poster.jpg')
freeze.poster.attach(io: freeze_poster, filename: 'freeze_poster.jpg')
freeze.save!

freeze_video = freeze.videos.create!( name: 'Freeze',
                                      description: 'n/a',
                                      video_type: 'FILM',
                                      runtime: 51,
                                      credits_time: 45
)

freeze_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Freeze_Husflix_short_720p.mp4')
freeze_video.video_file.attach(io: freeze_file, filename: 'freeze.mp4')
freeze_video.save!

# |-------------------------------------- 11. Freak ------------------------------------------------------ |

freak = Show.create!( title: 'Freak',
                      director: 'Nelicia Low',
                      tagline: "When her husband mysteriously goes missing, Mrs. Wang begins to suspect that her androgynous daughter had something to do with his disappearance.",
                      year: 2014,
                      maturity_rating: 'R',
                      show_type: 'FEATURE'
)

freak_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/freak_poster.png')
freak.poster.attach(io: freak_poster, filename: 'freak_poster.png')
freak.save!

freak_video = freak.videos.create!( name: 'Freak',
                                    description: 'n/a',
                                    video_type: 'FILM',
                                    runtime: 85,
                                    credits_time: 79
)

freak_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Freak_Husflix_short_720p.mp4')
freak_video.video_file.attach(io: freak_file, filename: 'freak.mp4')
freak_video.save!

# |-------------------------------------- 12. Ling ------------------------------------------------------ |

ling_show = Show.create!( title: 'Ling',
                          director: 'Dennis Liu',
                          tagline: 'A young girl discovers a magical animal that changes her life forever',
                          year: 2018,
                          maturity_rating: 'PG',
                          show_type: 'FEATURE',
)

ling_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/ling_husflix_poster.png')
ling_show.poster.attach( io: ling_poster, filename: 'ling_poster.jpg')
ling_show.save!

ling_video = ling_show.videos.create!( name: 'Ling Promo',
                          description: 'Ling Promo',
                          runtime: '272',
                          video_type: 'FILM',
)

ling_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Ling_1.mp4')
ling_video.video_file.attach(io: ling_file, filename: 'ling_show.mp4')
ling_video.save!

# |-------------------------------------- 13. Max Out ------------------------------------------------------ |

max_out_show = Show.create!( title: 'Max Out',
                             director: 'Max Talisman',
                             tagline: 'Four friends try their best to overcome living and dating in NYC',
                             year: 2016,
                             maturity_rating: 'PG-13',
                             show_type: 'EPISODIC',
)

max_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/Max_Out_poster.png')
max_out_show.poster.attach(io: max_poster, filename: 'max_out_poster.png')
max_out_show.save!

# |-------------------------------------- 13.1 Max Out Ep 1 ------------------------------------------------------- |

max_out_ep1 = max_out_show.videos.create!( name: 'Worst Date Ever',
                                           description: 'Online dating can lead to unexpected adventures',
                                           video_type: 'EPISODE',
                                           episode_num: 1,
                                           runtime: 58,
                                           credits_time: 61,
)

max_ep1_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Max_Out_Ep1_Husflix_short_720p.mp4')
max_out_ep1.video_file.attach(io: max_ep1_file, filename: 'maxout1.mp4')
max_out_ep1.save!

# |-------------------------------------- 13.2 Max Out Ep 2 ------------------------------------------------------- |

max_out_ep2 = max_out_show.videos.create!( name: 'Audition Animal',
                                           description: 'Max tries out for a movie',
                                           video_type: 'EPISODE',
                                           episode_num: 2,
                                           runtime: 61,
                                           credits_time: 61,
)


max_ep2_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Max_Out_Ep2_Husflix_short_720p.mp4')
max_out_ep2.video_file.attach(io: max_ep2_file, filename: 'maxout2.mp4')
max_out_ep2.save!

# |-------------------------------------- 14. The Fantastic Adventures of Foolish Gentlemen ----------------------------------------------- |


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

# |-------------------------------------- 14.1 Foolish Gents EP 1 ------------------------------------------------------- |

foolish_gents_ep1 = foolish_gents_show.videos.create!( name: 'Discontent',
                                                      description: 'Tim daydreams about a more exciting life, Jonathan rallies his band for a gig, and Peter plans to propose to his girlfriend Chloe at their housewarming party.',
                                                      video_type: 'EPISODE',
                                                      runtime: 51,
                                                      credits_time: 0,
                                                      episode_num: 1,                                                     
)

gents_ep1 = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Foolish_Gents_Ep1_Husflix_short_720p.mp4')
foolish_gents_ep1.video_file.attach(io: gents_ep1, filename: 'gents1.mp4')
foolish_gents_ep1.save!

# |-------------------------------------- 14.2 Foolish Gents EP 2 ------------------------------------------------------- |


foolish_gents_ep2 = foolish_gents_show.videos.create!( name: 'Confusion',
                                                      description: "Tim is haunted by last night's drunken escapades, Jonathan grapples with love for the first time, and Peter fantasizes about how to spice up his relationship.",
                                                      video_type: 'EPISODE',
                                                      runtime: 66,
                                                      credits_time: 0,
                                                      episode_num: 2,                                                
)

gents_ep2 = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Foolish_Gents_Ep2_Husflix_short_720p.mp4')
foolish_gents_ep2.video_file.attach(io: gents_ep2, filename: 'gents2.mp4')
foolish_gents_ep2.save!

# |-------------------------------------- 14.3 Foolish Gents EP 3 ------------------------------------------------------- |

foolish_gents_ep3 = foolish_gents_show.videos.create!( name: 'Timing',
                                                      description: "Tim asks Ellie out on a date, Jonathan embarks on a quest to find his one true love, and Peter connects with a stranger in the park.",
                                                      video_type: 'EPISODE',
                                                      runtime: 94,
                                                      credits_time: 0,
                                                      episode_num: 3,                                           
)

gents_ep3 = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Foolish_Gents_Ep3_Husflix_short_720p.mp4')
foolish_gents_ep3.video_file.attach(io: gents_ep3, filename: 'gents3.mp4')
foolish_gents_ep3.save!

# |-------------------------------------- 14.4 Foolish Gents EP 4 ------------------------------------------------------- |

foolish_gents_ep4 = foolish_gents_show.videos.create!( name: 'Games ',
                                                      description: "Jonathan calls for a meeting of the minds, Tim and Peter attempt to drink their way to clarity.",
                                                      video_type: 'EPISODE',
                                                      runtime: 132,
                                                      credits_time: 0,
                                                      episode_num: 4,
)

gents_ep4 = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Foolish_Gents_Ep4_Husflix_short_720p.mp4')
foolish_gents_ep4.video_file.attach(io: gents_ep4, filename: 'gents4.mp4')
foolish_gents_ep4.save!

# |-------------------------------------- 14.5 Foolish Gents EP 5 ------------------------------------------------------- |

foolish_gents_ep5 = foolish_gents_show.videos.create!( name: 'Love',
                                                      description: 'The gang attends a formal event, Tim and Jonathan face a new rival, and Peter makes a stand.',
                                                      video_type: 'EPISODE',
                                                      runtime: 91,
                                                      credits_time: 0,
                                                      episode_num: 5,
)

gents_ep5 = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Foolish_Gents_Ep5_Husflix_short_720p.mp4')
foolish_gents_ep5.video_file.attach(io: gents_ep5, filename: 'gents5.mp4')
foolish_gents_ep5.save!

# |-------------------------------------- 14.6 Foolish Gents EP 6 ------------------------------------------------------- |

foolish_gents_ep6 = foolish_gents_show.videos.create!( name: 'Truth',
                                                      description: 'The gentlemen face their problems without the help of their fantastic imaginations.',
                                                      video_type: 'EPISODE',
                                                      runtime: 96,
                                                      credits_time: 0,
                                                      episode_num: 6,
)
 
gents_ep6 = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Foolish_Gents_Ep6_Husflix_short_720p.mp4')
foolish_gents_ep6.video_file.attach(io: gents_ep6, filename: 'gents6.mp4')
foolish_gents_ep6.save!

# |-------------------------------------- 15. Valencia ------------------------------------------------------ |

valencia_show = Show.create!( title:'Valencia Road',
                              director: 'ELO Films',
                              tagline: 'While driving to the reading of her father’s will, a woman is faced with an anomaly on the side of the road.',
                              year: 2014,
                              maturity_rating: 'PG-13',
                              show_type: 'FEATURE', 
)

valencia_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/Valencia_poster.jpg')
valencia_show.poster.attach(io: valencia_poster, filename: 'valencia_poster.jpg')
valencia_show.save!

valencia_video = valencia_show.videos.create!( name: 'Valencia Road',
                                               description: 'n/a',
                                               video_type: "FILM",
                                               runtime: 65,
                                               credits_time: 65
)

valencia_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Valencia_Husflix_720p.mp4')
valencia_video.video_file.attach(io: valencia_file, filename: 'Valencia.mp4')
valencia_video.save!

# |-------------------------------------- 16. Gamers Generation ------------------------------------------------------ |

gamers_generation = Show.create!( title: 'Gamers Generation',
                                  director: 'Tom Sun',
                                  tagline: 'All units, ready to fight.',
                                  year: 2017,
                                  maturity_rating: 'PG-13',
                                  show_type: 'EPISODIC'
)

gg_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/GG_Poster.jpg')
gamers_generation.poster.attach(io: gg_poster, filename: 'GG_poster.jpg')
gamers_generation.save!

# |-------------------------------------- 16.1 GG Ep 1 ------------------------------------------------------- |

gg_ep1 = gamers_generation.videos.create!( name: 'Welcome to eSports Academy',
                                           episode_num: 1,
                                           description: 'Our hero arrives at his first day of esports school',
                                           video_type: 'EPISODE',
                                           runtime: 111,
                                           credits_time: 111
)

gg_ep1_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Gamers_Gen_Ep1_Husflix_720p.mp4')
gg_ep1.video_file.attach(io: gg_ep1_file, filename: 'gg_ep_1.mp4')
gg_ep1.save!

# |-------------------------------------- 16.2 GG Ep 2 ------------------------------------------------------- |

gg_ep2 = gamers_generation.videos.create!( name: 'Ladder',
                                           episode_num: 2,
                                           description: 'Our hero tries to sneak into a party, only to run into a costumed crusader',
                                           video_type: 'EPISODE',
                                           runtime: 59,
                                           credits_time: 59
)

gg_ep2_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/Gamers_Gen_Ep2_Husflix_720p.mp4')
gg_ep2.video_file.attach(io: gg_ep2_file, filename: 'gg_ep_2.mp4')
gg_ep2.save!

# |-------------------------------------- 17. White Rabbit ------------------------------------------------------ |

white_rabbit = Show.create!( title: 'White Rabbit',
                             director: "Christina Yoon",
                             tagline: 'A lonely 14-year-old girl discovers that a troubled classmate is murdering rabbits near her school. A conflicted relationship unfolds between them and ultimately brings her to question her own values.',
                             year: 2015,
                             maturity_rating: 'PG-13',
                             show_type: 'FEATURE'
)

white_rabbit_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/White_Rabbit_poster.jpg')
white_rabbit.poster.attach(io: white_rabbit_poster , filename: 'white_rabbit_poster.png')
white_rabbit.save!

white_rabbit_video = white_rabbit.videos.create!( name: 'White Rabbit',
                                                  description: 'n/a',
                                                  video_type: 'FILM',
                                                  runtime: 94,
                                                  credits_time: 94
)

white_rabbit_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/White_Rabbit_Husflix_720p.mp4')
white_rabbit_video.video_file.attach(io: white_rabbit_file, filename: 'white_rabbit.mp4')
white_rabbit_video.save!

# |-------------------------------------- 18. Another Day Gone By ------------------------------------------------------ |

ADGB = Show.create!( title: 'Another Day Gone By',
                     director: "Daniel Angles",
                     tagline: 'A short film about a boy and a girl and everything that gets lost after some time apart.',
                     year: 2016,
                     maturity_rating: 'PG-13',
                     show_type: 'FEATURE'
)

ADGB_poster = open('https://hu-sflix-seed.s3.amazonaws.com/posters/Another_Day_Gone_By_poster.png')
ADGB.poster.attach(io: ADGB_poster , filename: 'ADGB_poster.png')
ADGB.save!

ADGB_video = ADGB.videos.create!( name: 'ADGB',
                                  description: 'n/a',
                                  video_type: 'FILM',
                                  runtime: 98,
                                  credits_time: 94
)

ADGB_file = open('https://hu-sflix-seed.s3.amazonaws.com/videos/ADGB_Husflix_720p.mp4')
ADGB_video.video_file.attach(io: ADGB_file, filename: 'ADGB.mp4')
ADGB_video.save!


# Genres
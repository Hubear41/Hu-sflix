Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]

    resources :users, only: [:create] do
      resources :my_list_videos, only: [:create]
    end
    
    resources :my_list_videos, only: [:destroy]

    resources :videos, only: [:show, :index]

    resources :shows, only: [:index, :show]
    get 'search', to: 'shows#search', as: :shows_search

    resources :genres, only: [:show, :index]
    get 'genre_index/:genre_id', to: 'genres#genre_index', as: :genre_index
  end
end

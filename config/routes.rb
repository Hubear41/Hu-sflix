Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:create, :destroy]

    resources :users, only: [:create] 

    post 'users/:user_id/my_list', to: 'my_list_shows#create', as: :create_my_list_show
    post 'my_list_shows', to: 'my_list_shows#destroy', as: :delete_my_list_show

    resources :videos, only: [:show, :index]

    resources :shows, only: [:index, :show]
    get 'search', to: 'shows#search', as: :shows_search
    get 'my_list/shows', to: 'shows#my_list', as: :shows_my_list

    resources :genres, only: [:show, :index]
    get 'genre_index/:genre_id', to: 'genres#genre_index', as: :genre_index
  end
end

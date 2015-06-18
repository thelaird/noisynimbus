Rails.application.routes.draw do
  root to: 'static_pages#root'
  get 'embed', to: 'static_pages#embed'
  resources :users, only: [:create, :new]
  resource :session, only: [:create, :new, :destroy]
  namespace :api, defaults: { format: :json } do
    get '/signS3put', to: 'uploads#sign_request'
    get '/songs/explore', to: 'songs#explore'
    get '/artist/:artist', to: 'songs#by_artist'
    get '/search/:query', to: 'search#index'
    resources :songs, only: [:create, :destroy, :update, :index, :show]
    resources :users, only: [:show]
    resources :followings, only: [:create, :destroy]
    resources :playlists, only: [:create, :index, :show, :update, :destroy]
    resources :playlist_items, only: [:create, :destroy]
    resources :tags, only: [:create, :show]
    resources :tag_items, only: [:create, :destroy]
  end
end

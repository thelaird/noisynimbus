Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users, only: [:create, :new, :index]
  resource :session, only: [:create, :new, :destroy]
  namespace :api, defaults: { format: :json } do
    get '/signS3put', to: 'uploads#sign_request'
    get '/songs/explore', to: 'songs#explore'
    resources :songs, only: [:create, :destroy, :update, :index, :show]
    resources :users, only: [:show]
    resources :followings, only: [:create, :destroy]
  end
end

Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users, only: [:create, :new, :show, :index]
  resource :session, only: [:create, :new, :destroy]
  namespace :api, defaults: { format: :json } do
    get '/signS3put', to: 'songs#sign_request'
    resources :songs, only: [:create, :update, :destroy, :show]
  end
end

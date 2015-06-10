Rails.application.routes.draw do
  root to: 'static_pages#root'
  resources :users, only: [:create, :new, :show, :index]
  resource :session, only: [:create, :new, :destroy]
  namespace :api, defaults: { format: :json } do
    resources :songs, only: [:create, :update, :destroy, :show]
  end
end

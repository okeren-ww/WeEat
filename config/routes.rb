Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'restaurants#index', as: 'restaurants_index'
  resources :restaurants do
    resources :reviews
  end
  resources :reviews
  resources :cuisines
end

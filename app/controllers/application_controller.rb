class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception
  protect_from_forgery prepend: true

  def index
    render inline: '', layout: 'application'
  end
end

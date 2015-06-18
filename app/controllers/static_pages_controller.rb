class StaticPagesController < ApplicationController
  before_action :require_logged_in, only: :root
  after_action :allow_iframe, only: :embed

  def root
  end

  def embed
  end

  private

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end

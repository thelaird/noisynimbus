class Session < ActiveRecord::Base
  validates :user_id, :token, presence: true
  belongs_to :user
  after_initialize :ensure_unique_token

  def self.find_user(session_token)
    session = Session.find_by(token: session_token)

    if session
      return session.user
    else
      nil
    end
  end

  private

  def ensure_unique_token
    token = SecureRandom.urlsafe_base64

    while Session.exists?(token: token)
      token = Secure.urlsafe_base64
    end

    self.token = token
  end

end

# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  session_token   :string
#

class User < ActiveRecord::Base
  validates :username, :session_token, presence: true
  validates :username, uniqueness: true
  validates :username, length: { maximum: 15 }
  validates :password, length: { minimum: 8, allow_nil: true }

  fuzzily_searchable :username

  attr_reader :password

  has_many :sessions, dependent: :destroy
  has_many :playlists, dependent: :destroy
  has_many(
    :songs,
    class_name: 'Song',
    foreign_key: :uploader_id
  )
  has_many(
    :followings,
    class_name: 'Following',
    foreign_key: :follower_id,
    dependent: :destroy
  )
  has_many(
    :followed_users,
    through: :followings,
    source: :followee
  )
  has_many(
    :followed_songs,
    through: :followed_users,
    source: :songs
  )

  def self.find_by_credentials(username, password)
    @user = User.find_by(username: username)
    return nil if @user.nil?
    return @user if @user.is_password?(password)
    nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  # def reset_session_token!
  #   self.session_token = SecureRandom.urlsafe_base64
  #   self.save
  #   self.session_token
  # end

end

# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  text       :string           not null
#  created_at :datetime
#  updated_at :datetime
#

class Tag < ActiveRecord::Base
  validates :text, presence: true
  validates :text, length: { maximum: 15 }
  validates :text, uniqueness: true
  validates_format_of :text, with: /\A[a-zA-Z#-]+\z/
  after_initialize :dehashify

  fuzzily_searchable :text

  has_many :tag_items, dependent: :destroy
  has_many :songs, through: :tag_items

  def dehashify
    self.text.downcase!
    if self.text.start_with?('#')
      self.text = self.text[1..-1]
    end
  end
end
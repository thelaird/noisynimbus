class Tag < ActiveRecord::Base
  validates :text, presence: true
  validates :text, length: { maximum: 15 }
  validates :text, uniqueness: true
  validates_format_of :text, with: /\A[a-zA-Z#-]+\z/
  after_initialize :hashify

  has_many :tag_items, dependent: :destroy
  has_many :songs, through: :tag_items

  def hashify
    self.text.downcase!
    self.text = "##{self.text}" unless self.text.start_with?('#')
  end
end

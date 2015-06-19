# == Schema Information
#
# Table name: trigrams
#
#  id          :integer          not null, primary key
#  trigram     :string(3)
#  score       :integer
#  owner_id    :integer
#  owner_type  :string
#  fuzzy_field :string
#

class Trigram < ActiveRecord::Base
  include Fuzzily::Model
end

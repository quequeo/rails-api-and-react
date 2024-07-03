class Post < ApplicationRecord
  has_one_attached :image

  PER_PAGE = 10
end

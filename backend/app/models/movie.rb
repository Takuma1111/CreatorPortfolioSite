class Movie < ApplicationRecord
  mount_uploader :url, ImageUploader
end

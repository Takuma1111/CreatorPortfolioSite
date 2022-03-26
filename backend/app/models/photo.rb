class Photo < ApplicationRecord
  mount_uploader :url, ImageUploader

end

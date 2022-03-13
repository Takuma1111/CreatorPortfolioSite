# CarrierWave.configure do |config|
#     config.asset_host = "http://localhost:3001"
#     config.storage = :file
#     config.cache_storage = :file
#   end
CarrierWave.configure do |config|
    # if Rails.env.production?
      config.storage    = :aws
      config.aws_bucket = ENV['S3_BUCKET']
      config.aws_acl    = 'public-read'
   
      # The maximum period for authenticated_urls is only 7 days.
      config.aws_authenticated_url_expiration = 60 * 60 * 24 * 7
   
      # Set custom options such agit s cache control to leverage browser caching
      config.aws_attributes = {
        expires: 1.week.from_now.httpdate,
        cache_control: 'max-age=604800'
      }
   
      # aws credential
      config.aws_credentials = {
        # 今回はIAM ロールを使用するため記載しない
        access_key_id:     ENV["AWS_ACCESS_KEY_ID"],
        secret_access_key: ENV["AWS_SECRET_ACCESS_KEY"],
        region: ENV["AWS_REGION"]
      }
    # else
      # テスト時はローカルにファイルを保存する
      # config.storage = :file
    # end
  end
   
  CarrierWave::SanitizedFile.sanitize_regexp = /[^[:word:]\.\-\+]/
# require 'carrierwave/storage/abstract'
# require 'carrierwave/storage/file'
# require 'carrierwave/storage/fog'

# CarrierWave.configure do |config|
#   if Rails.env.production? || Rails.env.test? # 本番環境の場合はS3へアップロード
#     config.storage :fog
#     config.fog_provider = 'fog/aws'
#     config.fog_directory  = 'creatorportfolio' # バケット名
#     config.fog_public = false
#     config.fog_credentials = {
#       provider: 'AWS',
#       aws_access_key_id:ENV["AWS_ACCESS_KEY_ID"], # アクセスキー
#       aws_secret_access_key:ENV["AWS_SECRET_ACCESS_KEY"], # シークレットアクセスキー
#       region: ENV["AWS_REGION"], # リージョン
#       path_style: true
#     }
# else
# end

# #   else # 本番環境以外の場合はアプリケーション内にアップロード
# #     config.storage :file
# #     config.enable_processing = false if Rails.env.test?
# #   end
# end
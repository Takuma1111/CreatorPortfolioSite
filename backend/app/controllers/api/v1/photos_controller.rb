class Api::V1::PhotosController < ApplicationController
    before_action :set_photo, only: %i[destroy]
    before_action :set_s3_direct_photo, only: [:new, :edit, :create, :update]

    def index
      render json: { photos: Photo.all.order("created_at DESC") }
    end
  
    def create
    #User_IDを検索するためのメールアドレスを取得
    mail = photo_params[:user_id]   

    #取得したメールアドレスをもとにユーザIDを検索
    ids = User.where(email: mail).ids 

    #検索したユーザIDをもとにポストされたデータを作成
    photo = Photo.new(user_id: ids[0],name: photo_params[:name], text:photo_params[:text],url:photo_params[:url])
        
        if photo.save 
            puts "保存成功"
        else 
            puts "保存失敗"
        end
    end
  
    def show
        @photo = Photo.find(params[:id])
        render json: @photo
    end

    def destroy
      photo = Photo.find(params[:id])
      photo.destroy
    end
  
    private
  
      def set_photo
        @photo = Photo.find(params[:id])
      end
  

      def photo_params
        params.permit(:user_id,:name,:text,:url)
      end

     def set_s3_direct_photo
      @s3_direct_photo = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
    end
end

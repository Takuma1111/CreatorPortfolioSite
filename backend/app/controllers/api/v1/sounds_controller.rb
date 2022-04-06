class Api::V1::SoundsController < ApplicationController
    before_action :set_sound, only: %i[destroy]
    before_action :set_s3_direct_sound, only: [:new, :edit, :create, :update]

    def index
      render json: { sounds: Sound.all.order("created_at DESC") }
    end
  
    def create
    #User_IDを検索するためのメールアドレスを取得
    mail = sound_params[:user_id]   

    #取得したメールアドレスをもとにユーザIDを検索
    ids = User.where(email: mail).ids 

    #検索したユーザIDをもとにポストされたデータを作成
    sound = Sound.new(user_id: ids[0],name: sound_params[:name], text:sound_params[:text],url:sound_params[:url])
    puts "soundの中身"
    puts sound_params[:url]
        if sound.save 
            puts "保存成功"
        else 
            puts "保存失敗"
        end
    end
  
    def show
        @sound = Sound.find(params[:id])
        render json: @sound
    end

    def destroy
      sound = Sound.find(params[:id])
      sound.destroy
    end
  
    private
  
      def set_sound
        @sound = Sound.find(params[:id])
      end
  
      def sound_params
        params.permit(:user_id,:name,:text,:url)
      end

     def set_s3_direct_sound
      @set_s3_direct_sound = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
    end
end

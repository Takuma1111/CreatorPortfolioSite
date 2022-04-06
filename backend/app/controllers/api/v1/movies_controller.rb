class Api::V1::MoviesController < ApplicationController
    before_action :set_movie, only: %i[destroy]
    before_action :set_s3_direct_movie, only: [:new, :edit, :create, :update]

    def index
      render json: { movies: Movie.all.order("created_at DESC") }
    end
  
    def create
    #User_IDを検索するためのメールアドレスを取得
    mail = movie_params[:user_id]   

    #取得したメールアドレスをもとにユーザIDを検索
    ids = User.where(email: mail).ids 

    #検索したユーザIDをもとにポストされたデータを作成
    movie = Movie.new(user_id: ids[0],name: movie_params[:name], text:movie_params[:text],url:movie_params[:url])
        
        if movie.save 
            puts "保存成功"
        else 
            puts "保存失敗"
        end
    end
  
    def show
        @movie = Movie.find(params[:id])
        render json: @movie
    end

    def destroy
      movie = Movie.find(params[:id])
      movie.destroy
    end
  
    private
  
      def set_movie
        @movie = Movie.find(params[:id])
      end
  

      def movie_params
        params.permit(:user_id,:name,:text,:url)
      end

     def set_s3_direct_movie
      @s3_direct_movie = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
    end
end

class Api::V1::PostsController < ApplicationController
        before_action :set_post, only: %i[destroy]
        before_action :set_s3_direct_post, only: [:new, :edit, :create, :update]

        def index
          render json: { posts: Post.all.order("created_at DESC") }
        end
      
        def create
          post = Post.new(post_params)  
          post.save
        end
      
        def destroy
          post = Post.find(params[:id])
          post.destroy
        end
      
        private
      
          def set_post
            @post = Post.find(params[:id])
          end
      
          def post_params
            params.permit(:name,:content, :image)
          end

         def set_s3_direct_post
          @s3_direct_post = S3_BUCKET.presigned_post(key: "uploads/#{SecureRandom.uuid}/${filename}", success_action_status: '201', acl: 'public-read')
        end
end

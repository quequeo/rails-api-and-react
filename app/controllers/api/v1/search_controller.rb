class Api::V1::SearchController < ApplicationController
  def posts
    @posts = Post.where("title LIKE ? OR body LIKE ?", "%#{params[:query]}%", "%#{params[:query]}%").order(created_at: :desc)
    
    post_with_images = @posts.map do |post|
      if post.image.attached?
        post.attributes.merge(image_url: url_for(post.image))
      else
        post.attributes.merge(image_url: nil)
      end
    end

    render json: post_with_images
  end
end

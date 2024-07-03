class Api::V1::SearchController < ApplicationController
  def posts
    @posts = Post.where("title LIKE ? OR body LIKE ?", "%#{params[:query]}%", "%#{params[:query]}%")
    @posts  = @posts.order(created_at: :desc)
    post_with_images = paginate_posts(@posts, posts_per_page)

    render json: {
      posts: post_with_images,
      total_posts_count: @posts.count,
      per_page: posts_per_page
    }
  end
end

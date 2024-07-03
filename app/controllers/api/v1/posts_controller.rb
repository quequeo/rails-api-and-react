class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.all.order(created_at: :desc)
    posts_with_images = paginate_posts(@posts, posts_per_page)

    render json: {
      posts: posts_with_images,
      total_posts_count: @posts.count,
      per_page: posts_per_page
    }
  end

  # GET /posts/1
  def show
    @post = augment_with_image(@post)
    
    render json: @post
  end

  # POST /posts
  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post, status: :created, location: api_v1_post_url(@post)
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /posts/1
  def update
    if params[:post] && params[:post][:image] == 'DELETE'
      @post.image.purge if @post.image.attached?
      params[:post].delete(:image)
    end
    
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  # DELETE /posts/1
  def destroy
    logger.info { "Destroying post: #{@post.attributes.inspect}" }
    @post.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_post
    @post = Post.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def post_params
    params.require(:post).permit(:title, :body, :image)
  end
end

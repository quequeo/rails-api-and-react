class Api::V1::PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  # GET /posts
  def index
    @posts = Post.order(created_at: :desc)
    
    post_with_images = @posts.map do |post|
      if post.image.attached?
        post.attributes.merge(image_url: url_for(post.image))
      else
        post.attributes.merge(image_url: nil)
      end
    end

    render json: post_with_images
  end

  # GET /posts/1
  def show
    if @post.image.attached?
      @post = @post.attributes.merge(image_url: url_for(@post.image))
    else
      @post = @post.attributes.merge(image_url: nil)
    end
    
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

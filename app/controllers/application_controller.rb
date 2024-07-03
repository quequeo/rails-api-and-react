class ApplicationController < ActionController::API
  
  private

  def augment_with_image(post)
    if post.image.attached?
      post.attributes.merge(image_url: url_for(post.image))
    else
      post.attributes.merge(image_url: nil)
    end
  end

  def paginate_posts(posts, posts_per_page)
    paginated_posts = posts.page(params[:page]).per(posts_per_page)
    paginated_posts.map { |post| augment_with_image(post) }
  end

  def posts_per_page
    params[:per_page] || Post::PER_PAGE
  end

end

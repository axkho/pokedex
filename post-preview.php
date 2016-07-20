<?php
/*
Template Name: Preview Posts
*/
?>

<?php get_header(); ?>

<section id="post-preview">
  <div class="container">
    <div class="row">
      <?php
        $countPosts = wp_count_posts();
        $nextPost = 0;
        $publishedPosts = $countPosts->publish;
        $myPosts = get_posts(array("posts_per_page"=>$publishedPosts));
        for($nextPost; $nextPost<3; $nextPost++){
          setup_postdata($post);
          $date = get_the_date();
        }
      ?>
      <div class="col-md-6">
        <?php the_title(); ?> &bull; <a href="<?php the_permalink(); ?>">Read More</a>
      </div>
    </div>

    <div class="row">

    </div>
  </div>
</section>

<?php get_footer(); ?>

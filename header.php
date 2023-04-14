<?php
  /**
   * Header Template.
   *
   * @package aveha
   */

  global $post;
  $page_slug = $post->post_name;
?>
<!doctype html>
<html <?=language_attributes() ?>>

<head>
  <meta charset="<?=bloginfo( 'charset' ) ?>">
  <meta name="viewport"
    content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
  <meta name="theme-color" content="">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?=wp_head() ?>
</head>

<body <?=body_class( ['bg-slate-100', $page_slug] ) ?>>
  <div id="content" class="site-content">
<?php
/**
 * Front-End Enqueue Template.
 *
 * @package platform
 */

function platform_enqueue()
{
  $uri      = get_theme_file_uri();
  $version  = PLATFORM_DEV_MODE ? time() : false;
  $manifest = json_decode( file_get_contents( __DIR__ . '../../../public/manifest.json', true ) );
  $app      = $manifest->app;

  wp_register_style( 'app', $uri . "/public/" . $app->css, null, $version );
  wp_register_script( 'app', $uri . "/public/" . $app->js, ['jquery'], $version, true );

  wp_enqueue_style( 'app' );
  wp_enqueue_script( 'app' );
}

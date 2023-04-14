<?php
/**
 * Functions Template.
 *
 * @package platform
 */

$path = get_theme_file_path();

/**
 * Setup
 */

define( 'PLATFORM_DEV_MODE', true );

/**
 * Includes
 */

include $path . '/inc/front-end/enqueue.php';

/**
 * Hooks
 */

add_action( 'wp_enqueue_scripts', 'platform_enqueue' );

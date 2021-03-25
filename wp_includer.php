<?php

/* Add CoHa Trck */
function wp_coha_trk() {
    wp_register_script('my_coha_trk_script', get_template_directory_uri() . '/coha-tracking-client/cl_trk.js', array('jquery'),'1.1', true);
    wp_enqueue_script('my_coha_trk_script');
}

add_action( 'wp_enqueue_scripts', 'wp_coha_trk', 999 );


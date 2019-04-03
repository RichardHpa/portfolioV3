const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/back/app.js', 'public/js')
   .sass('resources/sass/back/app.scss', 'public/css');

mix.react('resources/js/front/front.js', 'public/js')
   .sass('resources/sass/front/front.scss', 'public/css');

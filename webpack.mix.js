let mix = require('laravel-mix');

mix.sass('resources/sass/app.scss', 'public/css/app.css')
    .js('resources/js/index.js', 'public/js')
    .copy('resources/sass/index.css', 'public/css/')
    .copy('resources/sass/blog.css', 'public/css/');
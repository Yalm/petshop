web: vendor/bin/heroku-php-apache2 back/public/
worker: php artisan queue:restart && php artisan queue:work --tries=3

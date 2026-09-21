FROM php:8.4-apache

WORKDIR /var/www/html

RUN docker-php-ext-install pdo_mysql

COPY . .

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN composer install

RUN a2enmod rewrite

ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' \
    /etc/apache2/sites-available/000-default.conf

EXPOSE 80

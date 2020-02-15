FROM php:7.4-apache

RUN apt-get update \
  && apt-get install -y vim wget git zip unzip

RUN docker-php-ext-install pdo_mysql mysqli

COPY ./server/ /var/www/html/

WORKDIR /var/www/html/

# enable mode_rewrite module
RUN a2enmod rewrite

# disable default site
RUN a2dissite 000-default.conf

# copy new site to sites-available directory
RUN cat ./httpd-conf/apache2.conf > /etc/apache2/sites-available/localhost.conf

# enable new site
RUN a2ensite localhost.conf

RUN wget https://getcomposer.org/installer \
&& php ./installer --version=1.9.3 \
  && rm installer

RUN mv composer.phar /usr/local/bin/composer

RUN composer install

EXPOSE 80

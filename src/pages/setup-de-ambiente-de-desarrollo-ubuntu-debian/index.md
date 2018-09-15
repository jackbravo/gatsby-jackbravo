---
title: "Setup de ambiente de desarrollo (ubuntu / debian)"
date: "2014-05-06T18:41:41.000Z"
aliases: []
tags: []
---

## Instalar los programas básicos

Todos los desarrolladores de portales Drupal de axai tendran que tener instalado una serie de programas para poder correr de manera satisfactoria el CMS. [Apache](https://httpd.apache.org/) o [nginx](http://wiki.nginx.org/Main) como servidores web. MySQL o [MariaDB](https://mariadb.org/) como base de datos y PHP instalados. Nosotros utilizamos nginx porque es más ligero y rápido que apache. Si tienes la curiosidad, también puedes utilizar MariaDB en lugar de MySQL, aunque estas instrucciones usas mysql al instalar, pero lo demás es igualito para ambos. Y además necesitas instalar [git](http://git-scm.com/) que se utiliza para descargar muchos programas y además para llevar un control de versiones de nuestros sitios de drupal. Y finalmente también necesitas un buen editor de texto. Te recomendamos vi (este es un buen tutorial: http://www.gentoo.org/doc/es/vi-guide.xml), pero hay otros como gedit (si instalaste gnome o ubuntu) o scite (si instalaste lubuntu u otro sistema operativo ligero).

En Ubuntu es necesario ejecutar los siguientes comando en consola para instalarlos. **Para tus sitios de desarrollo te recomendamos poner una contraseña en blanco para mysql. Pero nunca hagas esto en producción**:

    sudo apt-get install nginx
    sudo apt-get install mysql-server
    sudo apt-get install php5-cli php5-fpm php5-mysql php5-gd php5-curl php5-sqlite php5-tidy php5-imagick
    sudo apt-get install git tig
    sudo apt-get install vim-gtk

PHP por default viene con un límite de memoria muy pequeño (16MB). Por lo que es necesario aumentarlo para casi cualquier aplicación. Te recomendamos poner un límite de 128M o más en tu computadora editando los archivos php.ini que puedas tener en /etc/php5/fpm o /etc/php5/cli o /etc/php5/cgi y cambiando la variable **memory_limit**.

Y finalmente solo asegúrate que mysql, nginx y php-fpm estén corriendo

    sudo /etc/init.d/nginx status
    sudo /etc/init.d/mysql status
    sudo /etc/init.d/php5-fpm status

Si alguno no está corriendo, puedes cambiar `status` por `start`.

## Drush

Para ayudar al desarrollo de portales en drupal utilizamos el programa `drush` que se puede descargar desde https://github.com/drush-ops/drush. Recomendamos utilizar la instalación manual:

    cd /home/usuario
    git clone https://github.com/drush-ops/drush.git
    sudo ln -s /home/usuario/drush/drush /usr/bin/drush

Para comprobar que drush corre correctamente lanza el comando `drush --version`

## Estructura para carpetas de drupal

Los sitios de drupal los podemos poner todos en un mismo folder. La estructura que recomendamos es:

    /home/usuario/work
      /drupal-sites
        /sitio1
          /drupal
        /sitio2
          /drupal
        /sitio3
          /drupal

Esto para que cada carpeta de sitios tenga una carpeta drupal con la instalación de drupal, y además fuera de la carpeta de drupal puedan existir backups de la base de datos, archivos de diseño, documentación y otros archivos que no necesitan verse desde el sitio web. Vamos a crear esta estructura. El comando `mkdir -p` crea carpetas y si la carpeta padre no existe la crea también. Y después podemos descargar ahí la última versión de drupal:

    mkdir -p /home/usuario/work/drupal-sites/sitio1
    cd /home/usuario/work/drupal-sites/sitio1
    drush dl drupal

Al final debes tener una carpeta drupal-7.x. Te recomendamos renombrar esa carpeta como drupal para facilitar los siguientes pasos (`mv drupal-7.x drupal`).

## Configurar nginx

Enseguida se tiene que configurar drupal en nginx. Para esto podemos utilizar la configuración de https://github.com/jackbravo/simple-drupal-nginx

    cd ~/work
    git clone https://github.com/jackbravo/simple-drupal-nginx.git

Ahora ya podemos crear archivos de configuración para cada sitio de Drupal que queramos instalar. El primero puede ser así. Vamos a crear un archivo llamado `/etc/nginx/sites-available/sitio1.conf` con el siguiente contenido:

    server {
      listen       80;
      server_name  sitio1;
      root         /home/usuario/work/drupal-sites/sitio1/drupal;
      include      /home/usuario/work/simple-drupal-nginx/drupal.conf;
    }

Como podrás ver, el sitio tiene el nombre (`server_name`) de sitio1. Para que tu computadora pueda abrir ese sitio, necesitas decirle que cuando escribas sitio1 en tu navegador use la IP de tu computadora, para esto hay que editar el archivo **/etc/hosts** y agregar esta línea:

    127.0.0.1 sitio1

El archivo de configuración de nginx que creamos está en la carpeta `sites-available`. Para habilitarlo hay que hacer dos cosas. 1) crear un symlink a la carpeta `sites-enabled` y 2) reiniciar nginx:

    sudo ln -s /etc/nginx/sites-available/sitio1.conf /etc/nginx/sites-enabled/sitio1.conf
    sudo /etc/init.d/nginx reload

**Recuerda editar tu archivo /etc/hosts cada que agregas un nuevo sitio local**.

## Base de datos

Finalmente, antes de instalar necesitas tener una base de datos. Para poderlo hacer sigue los siguientes comandos dentro de mysql:

    mysql -u root
    > create database sitio1; 
    > grant all on sitio1.* to usuario1@localhost identified by 'password del sitio 1';
    > exit;

Listo, ya puedes entrar a tu navegador a [http://sitio1](http://sitio1) y continuar instalando tu primer sitio de drupal.

## Opcional. Instalar fish

[Fish](https://github.com/fish-shell/fish-shell) es una consola que puede reemplazar bash (la consola por default en linux). Tiene varias opciones como autocompletado y un historial de búsqueda muy chido. Este programa se compila para instalarse. Para todos los programas que compiles te recomendamos usar la carpeta /home/usuario/work/build

    cd /home/usuario/work/build
    git clone https://github.com/fish-shell/fish-shell.git
    sudo apt-get install build-essential autoconf libncurses5-dev libncursesw5-dev
    cd fish-shell
    autoconf
    ./configure
    make
    sudo make install

Para utilizar fish como tu consola principal necesitas agregarla al archivo `/etc/shells`. Ahí agrega esta línea:

    /usr/local/bin/fish

Y luego corre el siguiente comando para cambiar tu consola (chsh o change shell):

    chsh -s /usr/local/bin/fish
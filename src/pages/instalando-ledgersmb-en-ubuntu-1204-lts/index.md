---
title: "Instalando LedgerSMB en ubuntu 12.04 LTS"
date: "2014-03-01T00:20:33.000Z"
aliases: []
tags: ["ubuntu"]
---

Basado en http://sourceforge.net/p/ledger-smb/code/HEAD/tree/branches/1.3/INSTALL

0. Bajar la última versión de ledgersmb. Yo la puse en la carpeta: /var/www/vhosts/ledger.axai.mx/public

1. Instalar postgres:

    sudo apt-get install postgresql-9.1 postgresql-client postgresql-contrib

2. Instalar dependencias de perl, lo que viene en el archivo INSTALL +

    sudo apt-get install libmodule-install-perl libio-stringy-perl fcgiwrap

Fcgiwrap se usa para correr perl. Este artículo fue esado como referencia: https://library.linode.com/web-servers/nginx/perl-fastcgi/ubuntu-10.04-lucid

Hay otras opciones para correr perl en nginx:

- http://mikkel.hoegh.org/blog/2012/04/05/deploying-ledgersmb-with-nginx-and-plack-on-freebsd/
- http://nginxlibrary.com/perl-fastcgi/

Pero esta parece ser la más sencilla.

4. Instalar y configurar nginx

    sudo apt-get install nginx

configurar con:

<code>
server {
    listen   80;
    server_name example.com;
    root   /var/www/vhosts/example.com/public;

    location / {
        index  index.html index.htm;
    }

    location ~ \.pl$ {
        gzip off;
        include /etc/nginx/fastcgi_params;
        fastcgi_pass unix:/var/run/fcgiwrap.socket;
        fastcgi_index index.pl;
        fastcgi_param SCRIPT_FILENAME /var/www/vhosts/example.com/public$fastcgi_script_name;
    }

    # Deny access to configuration and other nasty places.
    location ~ \.conf$ { deny all; }
    location /users { deny all; }
    location /bin { deny all; }
    location /utils { deny all; }
    location /spool { deny all; }
    location /templates { deny all; }
    location /LedgerSMB { deny all; }
}
</code>

5. Ahora, en la carpeta de ledgersmb, edita el archivo ledgersmb.conf y cambia la carpeta de contrib a su dirección en postgres 9.1: `/usr/share/postgresql/9.1/extension`.

6. Listo, reinicia nginx y entra a example.com/setup.pl

---
title: "Usando la consola: Cuanto miden tus particiones y carpetas?"
date: "2009-06-12T16:44:26.000Z"
aliases: []
tags: ["linux","ubuntu","consola","shell"]
---

Siempre se me olvida cómo usar bien estos comandos, porque tampoco los uso taan seguido. Pero bueno, si algún día necesitan averiguar el tamaño de una carpeta o lo que están utilizando de sus particiones en línx, desde la línea de comandos, utilicen estos comandos.

Para saber el tamaño de sus particiones:

    $ df -h
    Filesystem            Size  Used Avail Use% Mounted on
    /dev/sda1              25G  9.8G   14G  43% /
    varrun                257M   52K  257M   1% /var/run
    varlock               257M     0  257M   0% /var/lock
    udev                  257M   20K  257M   1% /dev
    devshm                257M     0  257M   0% /dev/shm

Para saber el tamaño de sus carpetas:

    $ du -csh /home/jackbravo/work/*
    33M 	/home/jackbravo/work/catalogo-pdf
    0   	/home/jackbravo/work/drupal6
    852K	/home/jackbravo/work/gitosis
    32M 	/home/jackbravo/work/sf_code
    44M 	/home/jackbravo/work/sphinx-0.9.9-rc1
    1.1M	/home/jackbravo/work/sphinx-0.9.9-rc1.tar.gz
    26M 	/home/jackbravo/work/user_admin
    136M	total

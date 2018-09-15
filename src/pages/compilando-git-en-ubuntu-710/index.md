---
title: "Compilando git en ubuntu 7.10"
date: "2008-02-10T23:12:07.000Z"
aliases: []
tags: ["git","linux","ubuntu"]
---

Git es un sistema de control de versiones distribuido. Es decir, un programa tipo subversion o CVS pero que funciona también cuando no estás conectado a internet.

En Ubuntu 7.10 puedes instalar git usando apt-get. Lamentablemente la versión que instala es la 1.5.2 que ya es algo viejita. Actualmente git está en la versión 1.5.4 que trae bastantes mejoras, particularmente las que te permiten manejar submódulos en git (introducidas desde la versión 1.5.3).

Para esto vamos a tener que compilar git, así que manos a la obra. Primero tenemos que obtener el código fuente de git de su <a href="http://git.or.cz">página</a>.

<code> > wget http://kernel.org/pub/software/scm/git/git-1.5.4.1.tar.gz
 > tar -zxf git-1.5.4.1.tar.gz
 > cd git-1.5.4.1</code>

Para compilar git se necesitan instalar algunas dependencias primero. La manera más sencilla de obtenerlas en ubuntu es con el comando:

<code> > sudo apt-get build-dep git-core</code>

En teoría, ahora puedes instalar git sin problemas, pero por alguna razón en mi computadora tuve algunos errores con dependencias relacionadas que no pudo encontrar el archivo sha.h y otras cosillas con traducciones de archivos .po (gettext). Así que tuve que instalar otros paquetes manualmante:

<code> > sudo apt-get install libssl-dev gettext</code>

Y listo, ahora puedes instalar git. Te recomiendo leer los archivos README e INSTALL de cualquier manera. Para instalar git para todos los usuarios:

<code> > make prefix=/usr all doc
 > sudo make prefix=/usr install install-doc</code>

Ahora puedes usar la última versión de git ;-). Pruébalo con.

<code> > git --version
 > git config --global user.name "Your Name Comes Here"
 > git config --global user.email you@yourdomain.example.com</code>

Si quieres aprender a usar git te recomiendo el <a href="http://www.kernel.org/pub/software/scm/git/docs/tutorial.html">manual de introducción</a> y en general toda la documentación de la página de <a href="http://git.or.cz">git</a>.
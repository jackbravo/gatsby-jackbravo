---
title: "Crear un nuevo proyecto compartido en git"
date: "2008-12-10T02:23:31.000Z"
aliases: []
tags: ["git"]
---

Aquí en la oficina hemos estado utilizando [git](http://git.or.cz/) desde hace ya algunos meses. Una de las cosas que nos daba más flojera hacer era crear repositorios públicos que pudiéramos compartir varios compañeros aquí en la oficina. Los pasos que vienen en el [Manual de git](http://www.kernel.org/pub/software/scm/git/docs/user-manual.html#setting-up-a-public-repository) para crear un repositorio público son algo tediosos, porque involucran clonar tu repositorio localmente y después copiarlo a la ubicación pública, lo que puede ser muy pero muy tardado si tu repositorio es grande y tu ubicación pública está en otro servidor.

Hace poco, en [github](http://github.com) encontramos una alternativa diferente para hacer esto, en donde primero creas el repositorio vacío en tu ubicación pública y después "empujas" tu proyecto desde git.

1. Crear una carpeta vacía para tu proyecto en la ubicación pública

        tu@public:$ cd /var/cache/git
        tu@public:$ mkdir my-new-repo.git

2. En esa carpeta creas un repositorio _vacío (bare)_ de git

        tu@public:$ cd my-new-repo.git
        tu@public:$ git --bare init

3. Y finalmente, desde tu repositorio local creas un canal remoto para git y empujas tu proyecto:

        tu@local:$ cd existing_git_repo
        tu@local:$ git remote add origin tu@publico:/var/cache/git/my-new-repo.git
        tu@local:$ git push origin master

Y eso es todo, ahora git copiará todos tus archivos a través de la red de manera más eficiente que si utilizaras ftp o scp. Enjoy!
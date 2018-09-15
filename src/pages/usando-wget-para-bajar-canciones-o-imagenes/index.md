---
title: "Usando wget para bajar canciones o imágenes"
date: "2008-12-05T20:24:08.000Z"
aliases: []
tags: ["linux","consola"]
---

Un cliente me tiene que mandar varias imágenes (logotipos, fotos) para poner en el sitio web que les estamos haciendo y lo que se le hizo más fácil fue subirlo todo a una carpeta en el servidor web que tienen contratado. Me dice que tiene más cosas y que las va a ir subiendo durante la semana.

Yo quiero bajarlo todo, pero que flojera hacerlo archivo por archivo. Y luego queda el problema de estar revisando la página por archivos nuevos. Tanto trabajo manual va a reducir mi productividad y no podré estar checando mi Google Reader. Por suerte estamos en linux ;-)

GNU/Linux tiene una herramienta que queda como anillo al dedo para este tipo de tareas y se llama [wget](http://www.gnu.org/software/wget/). Sirve para bajar archivos de Internet y soporta HTTP, HTTPS y FTP. Como dice en su [documentación](http://www.gnu.org/software/wget/manual/), sus principales ventajas son:

- que no es _interactivo_, lo que permite utilizarlo sin necesidad de intervención por el usuario ;-)
- te permite continuar descargas canceladas (para cuando se te cae la conexión por usar la wifi)
- sabe distinguir entre archivos que ya bajaste y los nuevos de la página
- es recursivo (te podrías bajar todo un sitio web completito con un solo comando)

Entonces, manos a la obra.

    wget -r -l1 -np -nd -A.jpg,.png,.gif -N http://dominiodelcliente.com/folder_de_imagenes/

Este comando lo que hace es:

- __-r__. bajar todo lo que este en la dirección recursivamente, es decir, seguir todas las ligas que aparezcan en la página (recursive)
- __-l1__. pero sólo hasta un nivel de recursividad, es decir, sin seguir las ligas que aparezcan en las otras páginas que se baje (level 1)
- __-np__. Sin bajarse los archivos de carpetas en niveles superiores (no parent)
- __-nd__. Bajandolo todo en un sólo directorio (no directories)
- __-A__. Bajando solamente los archivos que terminen en .gif o .png o .jpg. (Accept)
- __-N__. Y bajando solamente los archivos nuevos que no existan ya en la carpeta a menos que el del servidor sea más nuevo

Este archivo lo puedo correr una vez al día, o ponerlo en el [cron](http://es.wikipedia.org/wiki/Cron_(unix)) y me bajara cada vez los archivos nuevos que vaya encontrando. Chido.

Todo esto fue fácil de averiguar gracias al poder de google, este [buen tutorial](http://www.veen.com/jeff/archives/000573.html) escrito en inglés y el man page de wget.
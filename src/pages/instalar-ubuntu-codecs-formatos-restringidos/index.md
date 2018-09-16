---
title: "Instalar Ubuntu codecs (formatos restringidos)"
date: "2008-04-29T16:40:59.000Z"
aliases: ["2008/04/29/instalar-ubuntu-codecs-formatos-restringidos"]
tags: ["ubuntu"]
---

Cada vez que instalo ubuntu en una compu nueva (de mis primos, amigos, papás, etc), después de un rato me enfrento con el mismo problema: me llaman diciéndome que no pudieron tocar alguna canción (mp3), o ver alguna película (DVDs), o descargar un video de youtube (flash).

Hoy encontré una manera fácil de instalar varios codecs de un jalón en la página de https://help.ubuntu.com/community/RestrictedFormats:

<code> $ sudo apt-get install ubuntu-restricted-extras </code>

<!--break-->

Este comando instala varios paquetes a la vez, necesarios para ver DVDs, tocar MP3s, ver archivos de flash en el navegador y muchas cosas más.

Para instalar este paquete necesitas haber habilitado el repositorio de multiverse de paquetes (System -> Administration -> Software Sources).

Esta solución funciona en ubuntu 8.04, 7.10 y creo que también el 7.04.

La razón por la que estos paquetes no son instalados desde un principio es que estos son formatos restringidos por su licencia. No son formatos libres sino que son propietarios de alguna compañía o grupo que requiere el pago de alguna regalía o impone alguna restricción (mediante patentes o algún otro medio) para poder utilizarlos.

Si quieres leer más información sobre este tema te recomiendo esta página: http://doc.ubuntu-es.org/Formatos_libres
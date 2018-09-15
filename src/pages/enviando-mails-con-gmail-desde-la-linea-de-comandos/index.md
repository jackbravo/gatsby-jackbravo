---
title: "Enviando mails con gmail desde la línea de comandos"
date: "2009-01-21T18:59:54.000Z"
aliases: []
tags: ["linux","ubuntu","consola","shell"]
---

Desde que linux es linux el hombre se ha preguntado por la manera más eficiente para comunicarse con otras personas. Hmmmm, perdón por ese inicio tan raro, es que acabo de la [Última Pregunta](http://todoslosnombresyaestabanocupados.blogspot.com/2009/01/la-ltima-pregunta.html) de Asimov =). Bueno, el caso es que al empezar a programar siempre surge la necesidad de mandar correos y no todo mundo tiene a su disposición un servidor de correo instalado localmente desde el cual mandarlos.

En linux existe una aplicación llamada mail que otros programas (como PHP) utilizan para mandar correos. En realidad hay muchas versiones de este programa. La que encontré que era más sencilla de instalar y configurar en ubuntu fue [heirloom-mailx](http://heirloom.sourceforge.net/mailx.html) (antes se llamaba __nail__).

    sudo apt-get install heirloom-mailx

Este programita te permite mandar correos utilizando cualquier servidor de correo del que dispongas. Por ejemplo, si tienes una cuenta de correo en gmail, puedes configurar mailx con un sencillo archivo en tu HOME `~/.mailrc`:

    set smtp=smtp.gmail.com:587
    set smtp-use-starttls
    set ssl-verify=strict
    set smtp-auth-user=tucuenta@gmail.com
    set smtp-auth-password=muymuyseguro

Si quieres probarlo intenta mandar un correo electrónico con

    mail tuamigo@gmail.com

Te va a pedir escribir el título de tu mail y después el contenido del correo, cuando hayas terminado de escribirlo terminalo con Ctrl+D (que manda la señal de End Of Output a la consola... o algo así).
---
title: "Omitir archivos de svn al buscar con grep"
date: "2008-10-29T17:32:32.000Z"
aliases: []
tags: ["linux"]
---

Usar *linux* es una maravilla para un programador. Existen muchos comandos que te facilitan muchas cosas de la vida diaria. Uno de ellos es grep, que te permite *buscar alguna cadena o patrón* en los archivos de tus proyectos. El uso normal se ve así:

    grep -r 'function setFormatName' lib/widget

Para buscar recursivamente (-r) en todos los archivos dentro de `lib/widget` donde esta definida la funcion `setFormatName`.

Lamentablemente, cuando usas [subversion](http://subversion.tigris.org/) para algún proyecto, terminas con un montón de carpetas .svn con cadenas similares a la que buscas....

Ahora, en internet hay varias maneras sugeridas para evitar buscar en estas odiosas carpetas de svn (una de las razones por las que prefiero mil veces [git](http://git.or.cz/), que solo tiene una carpeta .git en el root de tu proyecto.... pero me estoy desviando). La que más me gustó, porque no involucra opciones confusas que tienes que recordar cada que escribes el comando, es agregar unas opciones a tu archivo .bashrc y listo ;-).

    GREP_OPTIONS="--exclude=\*.svn\*"
    export GREP_OPTIONS

Después de agregar eso a tu `.bashrc` sólo corre el comando `source .bashrc` para que tomen efecto (o reinicia tu sesión). También puedes leer las [instrucciones en inglés aquí](http://coreygilmore.com/blog/2007/09/14/ignoring-svn-directories-with-grep/).

Otra opción es mejor usar **[ack](http://petdance.com/ack/)**, funciona en windows y linux por igual... pero eso lo dejaré para otra ocasión.
<!--break-->
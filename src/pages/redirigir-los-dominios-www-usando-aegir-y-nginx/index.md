---
title: "redirigir los dominios www usando aegir y nginx"
date: "2010-11-19T23:21:01.000Z"
aliases: []
tags: ["drupal"]
---

Desde hace algunos meses que usamos [aegir](http://aegirproject.org/) para manejar todos los sitios de drupal de clientes que hosteamos en nuestro servidor. Es una bendición del cielo =). Pero por ahí acabamos de hacer una pequeña modificación. Usualmente, todos los dominios que manejamos tienen su version con www y sin www. Como www.elevare.org y [elevare.org](http://elevare.org). Ambos queremos que funcionen. Con aegir tu puedes crear alias para tus sitios, pero como esto es una regla general, pues hicimos una modificación a la regla de nginx para que jale en TODOS los sitios www:

    ## www. redirect
    if ($host ~* ^(www\.)(.+)) {
      set $rawdomain $2;
      rewrite ^/(.*)$  http://$rawdomain/$1 permanent;
    }

Con esta regla de nginx puesta en el servidor default, todos los dominios con www serán redirigidos al dominio sin www. Presto =).

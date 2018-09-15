---
title: "Capitalizar la primer letra de una columna en MySQL"
date: "2011-01-17T18:35:38.000Z"
aliases: []
tags: ["mysql"]
---

Mi compañero Elías está metiendo datos de un catálogo de un cliente a su página web que le estamos haciendo. El nombre de todos los productos vienen en mayúsculas, pero por el diseño de la página web no queremos que se vea así, sino que solamente la primer letra esté capitalizada. Para facilitar la entrada de datos lo que hacemos es meter todos los datos como vienen y después usar SQL para cambiar la columna.

La sentencia que utilizamos al final es:

    update node set title = CONCAT(UPPER(LEFT(title, 1)), LOWER(MID(title,2)));

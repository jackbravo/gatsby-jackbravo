---
title: "noticias sobre PHP"
date: "2007-07-25T04:00:00.000Z"
aliases: ["2007/07/25/noticias-sobre-php"]
tags: ["php"]
---

hoy me tope con 2 noticias bastante interesantes sobre PHP

1. el 31 de diciembre de este año será el EOL (end of life) para PHP 4, es decir, a partir del 1o de enero del 2008 ya no habrá actualizaciones de PHP 4 (quizás sólo security fixes).
http://www.php.net/index.php#2007-07-13-1

2. parece ser que PHP 6 sí va a traer soporte para namespaces, y de hecho, ya hay alguien que migró ese patch al HEAD de PHP 5, por lo que existe la posibilidad de que PHP 5.3 ya venga con namespaces!!!
http://www.stubbles.org/archives/22-Namespaces-in-action.html

la neta esa última es la que a mi me suena como una gran noticia, sobre todo si se materializa. No mas clases como las del Zend Framework:

<code>$term = new Zend_Search_Lucene_Analize
_Analyzer_Query_Term();</code>

ta cañón no? jejeje. Ahora sería más bien algo como:

<code>import Zend.Search.Lucene.Analize;
$term = new Analizer_Query_Term();</code>

ala java, .NET, o casi cualquier otro lenguaje caray!!!! es una de las cosas que más me molestan todavía de PHP (aunque en realidad al día a día casi no lo sientes).

Bueno, los dejo con un link a una de esas presentaciones PRO-PHP5 que abundan ahorita.

http://blog.joshuaeichorn.com/slides/CoolThingsInPHP5/

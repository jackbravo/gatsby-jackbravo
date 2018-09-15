---
title: "Noticias sobre PHP5"
date: "2007-07-26T02:30:00.000Z"
aliases: []
tags: ["php"]
---

Hoy me tope con 2 noticias bastante interesantes sobre PHP

1. el 31 de diciembre de este año será el [EOL (end of life) para PHP 4](http://www.php.net/index.php#2007-07-13-1), es decir, a partir del 1o de enero del 2008 ya no habrá actualizaciones de PHP 4 (quizás sólo security fixes).

2. parece ser que PHP 6 sí va a [traer soporte para namespaces](http://www.stubbles.org/archives/22-Namespaces-in-action.html), y de hecho, ya hay alguien que migró ese patch al HEAD de PHP 5, por lo que existe la posibilidad de que PHP 5.3 ya venga con namespaces!!!

La verdad esa última es la que a mi me suena como una gran noticia, sobre todo si se materializa. No mas clases como las del Zend Framework:

    $term = new Zend_Search_Lucene_Analize_Analyzer_Query_Term();

ta cañón no? jejeje
ahora sería más bien algo como:

import Zend.Search.Lucene.Analize;
$term = new Analizer_Query_Term();

ala java, .NET, o casi cualquier otro lenguaje carajo!!!! es una de las pequeñas cosas que me molestan todavía de PHP  aunque,  igual que con casi todo, terminas por acostumbrarte.

Bueno, los dejo con un link a una de esas [presentaciones PRO-PHP5](http://blog.joshuaeichorn.com/slides/CoolThingsInPHP5/) que abundan ahorita.
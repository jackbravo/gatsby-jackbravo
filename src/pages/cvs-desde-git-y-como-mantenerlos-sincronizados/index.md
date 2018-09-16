---
title: "CVS desde git, y como mantenerlos sincronizados"
date: "2008-07-24T15:27:50.000Z"
aliases: ["2008/07/24/cvs-desde-git-y-como-mantenerlos-sincronizados"]
tags: ["git","drupal"]
---

Llevo algún rato intentando rastrear de manera eficaz algunos módulos de drupal que están en desarrollo: <a href="http://drupal.org/project/spaces">spaces</a> y <a href="http://drupal.org/project/context">context</a>.

Lamentablemente, en drupal todavía usan CVS para administrar el código. El código que usan para administrar los projectos en drupal.org (releases, registro de bugs, descargas, etc) está basado en CVS, y aunque poco a poco avanzan para hacerlo más independiente de CVS y poder utilizar subversion o cualquier otra cosa, pues es algo que va a tomar todavía algo de tiempo.

Así que la solución que más me agrada es seguir el avance de estos repositorios utilizando git ;-). <a href="http://mikkel.hoegh.org/blog/2008/a_git_mirror_for_drupal_cvs">Este</a> blog te dice cómo hacerlo en inglés. Los pasos son simples. El comando de git-cvsimport actúa en la carpeta en la que estás ubicado a menos que utilices la opción de -C para decirle a qué carpeta quieres importar, así que crea una carpeta para tu repositorio antes de empezar.

<code>$ mkdir spaces
$ cd spaces
$ git-cvsimport -d:pserver:anonymous@cvs.drupal.org:/cvs/drupal-contrib -k -v -r drupal-contrib contributions/modules/spaces</code>

<ul>
<li>La opción de -d indica donde esta el repositorio de CVS</li>
<li>la opción de -k es para evitar cambiar los keywords de CVS y es opcional aunque recomendada (al menos si ves el manpage de git-cvsimport)</li>
<li>-v para que te imprima lo que está haciendo (si no, funcionará como cualquier comando de UNIX que no imprime nada a menos que haya un error)</li>
<li>la opción de -r es para que utilice un nombre en tu repositorio de git diferente a origin para este repositorio remoto, puedes decidir no utilizarla</li>
<li>y finalmente le tienes que decir qué módulo de CVS quieres traerte</li>
</ul>

Para mantener actualizado este repositorio de git no hay más que correr este mismo comando en  la misma carpeta y lixto!
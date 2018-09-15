---
title: "Backups de MySQL con git"
date: "2008-08-05T16:26:48.000Z"
aliases: []
tags: ["git","mysql"]
---

[Brian Aker](http://krow.livejournal.com/593424.html), desarrollador de mysql, sugirió una manera "inteligente o extraña" de hacer backups de tu base de datos utilizando mercurial (un sistema control de versiones distribuido).

Nosotros en axai veníamos utilizando un sistema parecido, con la diferencia de que nosotros utilizamos [git](http://git.or.cz/) en vez de mercurial y que tampoco conocíamos la opción --tab del comando [mysqldump](http://dev.mysql.com/doc/refman/5.0/en/upgrading-to-arch.html). Esta opción es la que logra hacer que este método para backups sea todavía más útil, ya que al revisar la historia de tu base de datos podrás ver exactamente que cambios a sufrido con el paso del tiempo.

Este método de backups en resumidas cuentas tiene las siguientes ventajas:

<ul>
<li>Buscar en tu historial de backups</li>
<li>Ver los cambios entre una fecha y otra</li>
<li>Hacer restauraciones parciales (de algunas tablas solamente)</li>
<li>Ocupar muy poco espacio en tu disco duro</li>
<li>Permitirte trasladar ese historial de backups de manera sencilla de una máquina a otra</li>
</ul>

Entonces, vamos a ver cómo se hace. Para crear los respaldos de tu base de datos utilizas los siguientes comandos:

<code>$ mysqldump -u user --tab=/var/backup/dbname dbname
$ cd /var/backup/dbname
$ git-add .
$ git-commit -m "automatic backup"
$ git-push</code>

El último comando es opcional, utilizalo sólo si tienes un repositorio remoto de git configurado.

Para restaurar este tipo de respaldos se utiliza el comando mysqlimport:

<code>$ mysqladmin -u user create dbname
$ cat /var/backups/dbname/*.sql | mysql dbname   # crea las tablas
$ mysqlimport -u user dbname --local /var/backups/dbname/*.txt   # carga los datos</code>

Disfruten ;-).
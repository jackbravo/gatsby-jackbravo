---
title: "Crear un calendario de grupo con drupal"
date: "2008-09-10T20:03:59.000Z"
aliases: []
tags: ["drupal","views"]
---

Este tutorial es para sitios en drupal que utilizan el módulo de organic groups para crear comunidades virtuales. Al terminar el módulo tendrás una página donde se mostrarán únicamente las actividades específicas a tu grupo en forma de calendario.

### Módulos Necesarios

Primero necesitas tener los siguientes módulos en tu sites/all/modules:

- [og](http://drupal.org/project/og)
- [cck](http://drupal.org/project/cck)
- [date](http://drupal.org/project/date)
- [views](http://drupal.org/project/views)
- [calendar](http://drupal.org/project/calendar)

Los módulos que necesitas habilitar para que esto funcione (suponiendo que ya tienes og habilitado) son como mínimo: content, calendar, date, date api, date timezone, views y views ui. Al crear sitios con drupal lo mejor es habilitar los menos módulos posibles, ya que cada módulo que instalas tiene un impacto en el desempeño de tu sitio.

### CCK y Date

Ahora hay que crear un tipo de contenido que tenga un campo de fecha. Para esto vamos a `admin/content/types` y creamos un tipo nuevo. No olvides que este tipo de contenido debe de poder pertenecer a un grupo. Yo le puse evento. Y luego le agregamos un campo de cck, puedes elegir 3 tipos de fecha: datestamp, datetime y date. Date es únicamente la fecha, datetime incluye hora y datestamp es el más específico. O al menos eso parece no? ;-).

Crea algunos eventos de prueba.

### Views y Calendar

Ahora viene lo bueno. Ve a la vista de administrar vistas en `admin/build/views` y activa la vista de calendario que nos va a servir como base. Esta vista la puedes editar para que todos los calendarios que crees tengan ciertos elementos en común:

1. Por ejemplo, a mi no me gusta que en la vista mensual me muestren el número de semana. Para corregir esto nos vamos a la vista de mes y en basic settings -> calendar damos click en el ícono de settings  y deshabilitamos esa opción.

2. Tampoco me gusta que en la vista se desplieguen las etiquetas de los campos (Título:, Updated date:). Así que las podemos quitar.

3. Normalmente nada más quieres que se puedan ver los nodos publicados, así que hay que agregar un filtro de Nodo: publicado = TRUE.

4. Finalmente, el cambio que considero más importante es hacer que las vistas de calendario, por default, utilicen el campo de fecha que acabamos de crear en lugar de la fecha de última actualización de los nodos. Para hacer esto vamos a editar el argumento de fecha (node.changed):

  1. como el sitio está en español, cambia las cadenas que dicen 'all' por 'todos'
  2. quita la palomita al campo Nodo: update date
  3. pon una palomita al campo tu campo de fecha, en mi caso Contenido: Datestamp: Fecha (field_fecha_futura)
  4. guarda tus cambios

Esta vista de calendario (a la que puedes navegar en el url calendar) ya nos sirve como punto de partida, y si la visitas podrás ver una vista general de todas las actividades programadas en tu sitio.

### OG, Views y Arguments

Ahora nada más falta hacer una vista que te muestre nada más las actividades del grupo en el que te encuentres. Para esto vamos a usar un elemento muy poderoso de las vistas: argumentos.

Los argumentos sirven para personalizar tu vista de acuerdo a información que reciben de diversas fuentes, normalmente el url de tu vista. Entonces:

1. Desde la lista de vistas, clona la vista del calendario base (calendar). Yo a esta vista la nombre calendario_grupo y su descripción es eso precisamente: Calendario de grupos. Next.

2. Vamos a agregar un argumento: Grupos: Grupos. Este argumento lo que hace es mostrar únicamente los nodos que pertenezcan al grupo que especifiques en el argumento. Add. 

  ![Agregar grupo](http://joaquin.axai.mx/sites/joaquin.axai.mx/files/argumento_grupo.png)

3. Este argumento de grupo debe aparecer antes del argumento de fecha, así que hay que reordenarlos presionando este ícono: 

4. Hay que modificar la ruta de la vista de página para que sepa que forzosamente debe llevar un argumento, así que la vamos a cambiar de calendara calendario/%

Y listo, con esto ya sabes lo básico para adecuarla a tus necesidades. Si navegas en tu sitio a (/calendario/id_de_un_grupo)[http://fef-apostolado.org/calendario/50], podrás ver tu vista de calendario ;-).
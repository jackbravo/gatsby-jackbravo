---
title: "Usando views handlers para mostrar el total de una vista de inventario"
date: "2011-08-04T16:35:24.000Z"
aliases: ["creando-views-handlers"]
tags: ["drupal","views"]
---

Hay veces que quieres desplegar información específica en una vista además de los datos que traes de tus nodos. Bien puede ser para desplegar simplemente una descripción de tu vista, o tal vez un subtítulo con datos de tu argumento, o incluso un subtotal si estás mostrando datos de productos o algo así.

Este tipo de cosas las puedes insertar en el header y footer de tu view. Y en los casos más sencillos puedes simplemente insertar un "text area" donde pongas el texto estático. Pero hay veces que quieres más ;-).

Pudiera ser tentador habilitar el módulo "PHP Filter" y poner código de PHP ahí mismo en tu vista. Para algo sencillo puede ser suficiente, pero si tu código van a ser más de 3 líneas te recomiendo usar un views_handler que sirve precisamente para eso y así podrás meter tu código en un control de versiones y editarlo con vi o emacs.

Manos a la obra, vamos a implementar un modulo views_total para desplegar el total de un inventario. El views_total.info está fácil:

    name = Views Total
    description = Implements an area handler to display the inventory summary
    package = Other
    core = 7.x

    files[] = views_total.module
    dependencies[] = "views"

    ; Views handlers
    files[] = views_total_handler_area_summary.inc

El views_total.module simplemente implemente el hook_views_api para indicarle a views que existimos:

    <?php

    /**
     * Implements hook_views_api().
     */
    function views_total_views_api() {
      return array(
        'api' => 3,
      );
    }

En el views_total.views.inc finalmente declaramos nuestro handler que va a estar en la "tabla global" porque no estámos adjuntándonos a ninguna tabla de nuestra BD.

    <?php

    /**
     * Implements hook_views_data.
     */
    function views_total_views_data()
    {
      $data = array();

      $data['views_total']['table']['group'] = t('Global');
      $data['views_total']['table']['join'] = array(
        '#global' => array(),
      );

      $data['views_total']['summary'] = array(
        'title' => t('Inventory summary'),
        'help' => t('Display the total of items in the inventory'),
        'area' => array(
          'handler' => 'views_total_handler_area_summary',
        ),
      );

      return $data;
    }

Y finalmente, viene el bueno, nuestro handler:

    <?php

    /**
     * Definir un area handler para que el total del inventario se pueda agregar a la vista
     */
    class views_total_handler_area_summary extends views_handler_area {

      function option_definition() {
        $options = parent::option_definition();

        // Quitamos opciones del formulario de edición del handler que no queramos.
        // las opciones vienen heredadas del views_handler_area
        unset($options['empty']);

        return $options;
      }

      function options_form(&$form, &$form_state) {
        parent::options_form($form, $form_state);

        // Quitamos el empty también del display
        unset($form['empty']);
      }

      // Esto es lo que se va a desplegar en la vista
      function render($empty = FALSE) {
        if (!$empty) {
          $total = 0;
          foreach ($this->view->result as $result) {
            $total += $result->node_taxonomy_index_nid;
          }
          return "<table class='views-table'><tr><th>Total de equipos</th><th class='views-field-nid'>$total</th></tr></table>";
        }

        return '';
      }
    }

Puedes inspeccionar el $this->view->result con un print_r o un krumo (si tienes devel instalado) para ver qué variables te pueden servir.

Para hacer este modulito me basé mucho en el código del submodulo line_item del módulo [commerce](http://drupal.org/project/commerce) para Drupal 7.
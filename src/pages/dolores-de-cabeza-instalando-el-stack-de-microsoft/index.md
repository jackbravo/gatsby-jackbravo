---
title: "Dolores de cabeza instalando el stack de microsoft"
date: "2009-09-22T23:33:02.000Z"
aliases: []
tags: []
---

Hace poco, por razones estríctamente laborales, decidí instalar el stack de desarrollo de Microsoft. Llamese Visual Studio 2008, SQL Server 2008 Express y otras herramientas sugeridas por el [web platform installer](http://microsoft.com/web).

Debo decir que estoy gratamente sorprendido por el web platform installer. Ya que con él puedes instalar PHP de manera decente - usando FastCGI - para el IIS e incluso Drupal y otros programas de software libre.

Aunque las herramientas de Microsoft son de primera clase - Visual Studio está muy chido, sobre todo usando emacs bindings para los shortcuts jeje - debo decir que el proceso de instalación dista mucho de ser algo sencillo. Es larguíiiiiismo y aparte siempre te encuentras con piedras en el camino.

La más grande de todas llegó al querer instalar el SQL Server 2008 Express. La maldita cosa no quería instalarse. Primero creí que era cosa de dlls, porque tenía instalada la versión 2005 desde antes, tons la desinstalé. Nada. Como buen programador me puse a checar los logs de errores y por ahí salía el mensaje de error:

>  Rule "Performance counter registry hive consistency check" failed. The performance counter registry hive is corrupted

E incluso una referencia a la base de conocimientos de Microsoft para [ver cómo solucionarlo](http://support.microsoft.com/kb/300956). ¡Vaya! Eso sí son mensajes de error. Los pasos no eran miel sobre hojuelas. Tenía que editar el registro de windows, borrar algunas entradas y luego correr algunos comandos en la consola para poder regenerarlos, reiniciar - ¡claro! - y luego correr otros comandos. Terminé muy satisfecho de la ayuda clara y me dispuse a instalar nuevamente. Nada.

Chale. Bueno, pues vamos buscando en Google =D. [La primera respuesta](http://www.ferventcoder.com/archive/2008/08/10/possible-performance-counter-corruption-or-performance-counters-are-just-disabled.aspx) se veía bastante prometedora, porque era de alguien que tampoco había podido instalar el SQL Server. Lo malo fue que el leer ví que repetía algunos de los pasos que ya había seguido y que no aplicaba mucho a mi situación actual.

Total que googleando por otros lados eventualmente llegué a una página titulada "[SQL Server 2008 Nov CTP Installation error](https://connect.microsoft.com/SQLServer/feedback/ViewFeedback.aspx?FeedbackID=311246)". Y ahí encontré la solución a mi problema. Otra persona se dió a la tarea de:

- leyendo el mismo log de errores
- encontrar la clase desde donde fue lanzada el error (Microsoft.SqlServer.Configuration.SetupExtension.FacetPerfMonCheck)
- decompilar el dll que la contiene (\Program Files\Microsoft SQL Server\100\Setup Bootstrap\ Microsoft.SqlServer.Configuration.SetupExtension.dll)
- y en la función referida ver que la segunda línea pide un LCID (Locale ID asignado por Microsoft)

Esta función regresaba el valor 7C04 que debía ser encontrado en una llave del registro, pero que no existía, existían otros. Así que creó la llave, copió los registros que estaban en la llave equivalente y logró instalar el programa. Mi heroe =D.

Ahora sólo tenía que encontrar cuál era el LCID de mi máquina. Así viendo la misma línea de código que él creé mi primer programa en C# usando mi recién instalado Visual Studio (también lo corrí en MonoDevelop nomás pa comparar):

    using System.Globalization;
 
    namespace ConsoleTest
    {
        class MainClass
        {
            public static void Main (string[] args)
            {
                string LCID = CultureInfo.InstalledUICulture.Parent.LCID.ToString("X");
                string str2 = string.Format("{0,3}", LCID).Replace(" ", "0");
                Console.WriteLine(str2);
                Console.ReadLine();
            }
        }
    }

Creé el registro y ¡presto! se instaló el SQL Server.

Que rollo. Total, ya tengo todo lo necesario pa programar aplicaciones usando el Visual Studio y todo usando nada más como 2GB =P. Mi stack en linux es de como 100 MB (contando IDE, servidor web y servidor SQL). Codeen a gusto!
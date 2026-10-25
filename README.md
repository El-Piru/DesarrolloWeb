# Acta Digital para Árbitros de Futbol

El proyecto corresponde a una página destinada a tomar registro digital de lo que sucede en partidos de fútbol, destinada a árbitros.

---

# Tecnologías usadas

**HTML**: Lenguaje de marcado utilizado para crear la estructura base de la página.

**CSS**: Hojas de estilo utilizadas para para darle aspecto visual a la página.

**JavaScript**: Lenguaje de programación interpretado utilizado para darle lógica e interacciones a la página.

**JSON**: Formato de texto ligero utilizado para almacenar e intercambiar datos.

**Alpine.js**: Librería de JavaScript utilizada para darle dinamismo y reactividad a una página en el mismo HTML, en este proyecto, se agregó para crear una barra de búsqueda en Equipos y para enviar el formulario para agregar más equipos a la lista.

---

# Estructura de carpetas

Se fragmentó el archivo .js en distintas secciones que abarcan cada uno algo distinto, y todos ellos se almacenan en una carpeta aparte, los demás archivos (.html, .css y los dos JSON) son almacenados por separado fuera de la carpeta.

La estructura corresponde a:

1. **index.html**: Archivo HTML que posee toda la estructura base de la página, en ella se encuentran los textos, formularios, botones, entre otros.
2. **Style.css**: Archivo CSS encargado de darle la estructura visual y posición al contenido que está en **index.html**.
3. **users.json**: Guarda los datos de ingreso de los usuarios, como el rol, usuario y contraseña.
4. **equipos.json**: Guarda los datos de los equipos precargados de la página, para tener una información artificial. 
5. **Carpeta.js**: A pesar de su nombre, es una carpeta que almacena todas las secciones de los .js, con algunas que interactúan entre sí, que constan de:

   - **actas.js**: Contiene toda la lógica relacionada a la sección de actas.
   - **app.js**: Le brinda la lógica de los botones que no pertenecen a ninguna sección en específico.
   - **equipos.js**: Contiene la función de obtención de datos para los equipos, que trabaja en conjunto con Alpine.
   - **login.js**: Posee la lógica encargada de iniciar sesión en las distintas cuentas.
   - **partidos.js**: Es la que tiene la lógica del formulario de creación de partidos y la que registra los partidos en su sección correspondiente.
   - **PartidosEnVivo**: Lleva la lógica de la sección en vivo, tal como el cronómetro, los botones de tarjetas, etc.

En resumen, se fragmentó **script.js**, además de separar los datos estáticos en un JSON, e implementar Alpine para hacer interacciones más dinámicas.

---

# Sobre JSON y Alpine

Como se menciono, los archivos JSON se encuentran en la misma carpeta que el HTML.

Sobre su estructura, el **users.json** posee solo dos usuarios, con rol (Admin o Árbitro), su respectivo usuario y la misma contraseña para ambos. Para **equipos.json** existen 8 equipos con su respectivo ID y nombre, y un arreglo con los nombres de 4 jugadores.

Para cargar los datos, se utilizan funciones dentro de su respectica sección de JavaScript, utilizando fetch() y, en caso de **equipos.json**, posee un método que filtra los elementos por el nombre del equipo o del jugador ignorando mayúsculas o minúsculas, siendo utilizada para la barra de búsqueda dinámica.

Todas las implementación de Alpine se encuentra en la sección de equipos del menú del Árbitro. Para comprobar el listado y la búsqueda, dirigirse a "Equipos y Jugadores" del Árbitro, siendo los equipos la lista dinámica. Para los mensajes ocultos, se encuentran en la misma barra de búsqueda, según los estados, existiendo el de sin resultados, el cargando (complicado de obtener teniendo en cuenta lo poco que se demora en obtener los datos) y la de error el cargar los datos. El formulario agregado con Alpine también se encuentra ahí, siendo la función de agregar más equipos.

Para generar la sección de error en ambos lados, se puede cambiar el nombre del archivo del JSON al cargar los datos en cada fetch. De esta forma, aparece el mensaje al no poder obtener los datos del JSON.

---

# Funciones principales

1. Inicio y cierre de sesión entre 2 tipos de usuarios (Árbitro y Administrador), con funciones distintas. Para árbitro es user: *arbitro*, password: *1234* y para administrador es user: *admin*, password: *1234*.
2. En Árbitro, crear y finalizar partidos (próximos o en vivo) y poder verlos en tiempo real para registrar incidencias (goles, tarjetas o cambios). También ver el historial de cada partido.
3. En Administrador, gestionar árbitros, administrar equipos y consultar partidos.

---

# IP utilizada

Para subir la página creada, se utilizó la instancia de AWS Academy, usando una IP elástica

**Corresponde a**: 34.192.39.49

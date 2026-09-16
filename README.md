# Acta Digital para Árbitros de Futbol

El proyecto corresponde a una página destinada a tomar registro digital de lo que sucede en partidos de fútbol, destinada a árbitros.

---

# Tecnologías usadas

**HTML**: Lenguaje de marcado utilizado para crear la estructura base de la página.

**CSS**: Hojas de estilo utilizadas para para darle aspecto visual a la página.

**JavaScript**: Lenguaje de programación interpretado utilizado para darle lógica e interacciones a la página.

---

# Estructura de carpetas

En la carpeta solo existen 3 archivos, uno .html; .css y .js. No se utilizaron más archivos ya que las redirecciones se manejan mediante JavaScript, utilizando IDs y class en html y funciones.

La estructura correspone a:

1. **index.html**: Archivo HTML que posee toda la estructura base de la página, en ella se encuentran los textos, formularios, botones, entre otros.
2. **Style.css**: Archivo CSS encargado de darle la estructura visual y posición al contenido que está en **index.html**.
3. **script.js**: Archivo JavaScript que posee toda la lógica e interacciones de la página, encargándose de darle "movimiento" y sentido al **index.html**.

---

# Funciones principales

1. Inicio y cierre de sesión entre 2 tipos de usuarios (Árbitro y Administrador), con funciones distintas. Para árbitro es user: *arbitro*, password: *1234* y para administrador es user: *admin*, password: *1234*.
2. En Árbitro, crear y finalizar partidos (próximos o en vivo) y poder verlos en tiempo real para registrar incidencias (goles, tarjetas o cambios). Tambíen ver el historial de cada partido.
3. En Administrador, gestionar árbitros, administrar equipos y consultar partidos.

---

# IP utilizada

Para subir la página creada, se utilizó la instancia de AWS Academy, usando una IP elástica

**Corresponde a**: 34.192.39.49

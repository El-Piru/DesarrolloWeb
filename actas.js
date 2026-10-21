
const btnActas = document.getElementById('btnHubActas');
if (btnActas) {
    btnActas.addEventListener('click', function() {
        mostrarVista('VistaActas');
        renderizarActas();
    });
}


document.getElementById('btnAdminActas')?.addEventListener('click', function() {
    renderizarActas();
    mostrarVista('VistaActas');
});


function renderizarActas() {
    const contenedor = document.getElementById("contenedorActas");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    const partidosFinalizados = historialPartidos.filter(function(partido) {
        return partido.estado === "Finalizado";
    });

    if (partidosFinalizados.length === 0) {
        contenedor.innerHTML = "<p>No hay actas de partidos finalizados aún.</p>";
        return;
    }

    partidosFinalizados.forEach(function(partido) {
        const tarjeta = document.createElement("div");
        tarjeta.className = "acta-card";

        let incidencias = "";
        if (partido.incidencias.length === 0) {
            incidencias = "<li>Sin incidencias registradas</li>";
        } else {
            partido.incidencias.forEach(function(incidencia) {
                incidencias += "<li>" + incidencia + "</li>";
            });
        }

        tarjeta.innerHTML =
            "<h3>" + partido.local + " VS " + partido.visitante + "</h3>" +
            "<p>Fecha: " + partido.fecha + "</p>" +
            "<p>Estadio: " + partido.estadio + "</p>" +
            "<p>Resultado: " + partido.golesLocal + " - " + partido.golesVisita + "</p>" +
            "<h4>Incidencias:</h4>" +
            "<ul>" + incidencias + "</ul>";

        contenedor.appendChild(tarjeta);
    });
}
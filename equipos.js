function equipos() {
    return{
        datosEquipos: [],
        busqueda: '',
        cargando: true,
        error: '',
        async cargarEquipos() {
            try {
                const response = await fetch('equipos.json');
                if (!response.ok) {
                    throw new Error('Error al cargar los datos de los equipos');
                }
                this.datosEquipos = await response.json();
            } catch (error) {
                this.error = 'Error al cargar los datos de los equipos';
                console.error(error);
            } finally {
                this.cargando = false;
            }
        },
        get equiposFiltrados() {
            const textoBusqueda = this.busqueda.trim().toLowerCase();
            if (textoBusqueda === '') {
                return this.datosEquipos;
            }
            return this.datosEquipos.filter(equipo =>
                equipo.nombre.toLowerCase().includes(textoBusqueda) || 
                equipo.jugadores.some(jugador => jugador.toLowerCase().includes(textoBusqueda))
            );
        }
    }
}
const btnEquipos = document.getElementById('btnHubEquipos');
if (btnEquipos) {
    btnEquipos.addEventListener('click', function() {
        mostrarVista('VistaEquipos');
    });
}
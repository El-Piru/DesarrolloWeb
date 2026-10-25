document.addEventListener('alpine:init', () => {
    Alpine.store('equipos', {
        lista: [],
        cargado: true,
        error: '',

        async init() {
            try {
                const response = await fetch('equipos.json');
                if (!response.ok) {
                    throw new Error('Error al cargar los datos de los equipos');
                }
                this.lista = await response.json();
            } catch (error) {
                this.error = 'Error al cargar los datos de los equipos';
                console.error(error);
            } finally {
                this.cargando = false;
            }
        }
    });
});

function equipos() {
    return{
        datosEquipos: [],
        busqueda: '',
        mostrarAyuda: false,
        nuevoNombre: '',
        nuevosJugadores: '',
        mensajeError: '',
        mensajeExito: '',
        
        get equiposFiltrados() {
            const textoBusqueda = this.busqueda.trim().toLowerCase();
            const lista = this.$store.equipos.lista;
            if (textoBusqueda === '') {
                return lista;
            }
            return lista.filter(equipo =>
                equipo.nombre.toLowerCase().includes(textoBusqueda) || 
                equipo.jugadores.some(jugador => jugador.toLowerCase().includes(textoBusqueda))
            );
        },
        agregarEquipo(){
            this.mensajeExito = '';
            this.mensajeError = '';

            if(this.nuevoNombre.trim() == '' || this.nuevosJugadores.trim() == ''){
                this.mensajeError = 'Es obligatorio completar todos los campos.';
                return;
            }

            const nuevoClub = {
                id: Date.now(),
                nombre: this.nuevoNombre.trim(),
                jugadores: this.nuevosJugadores.split(',').map(j => j.trim()).filter(j => j!=='')
            };

            this.$store.equipos.lista.push(nuevoClub);
            this.mensajeExito = `!Club "${nuevoClub.nombre}" ha sido agregado temporalmente con exito.`;

            this.nuevoNombre = '';
            this.nuevosJugadores = '';
        }
    }
}
const btnEquipos = document.getElementById('btnHubEquipos');
if (btnEquipos) {
    btnEquipos.addEventListener('click', function() {
        mostrarVista('VistaEquipos');
    });
}
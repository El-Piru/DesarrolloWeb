const botonesNav = document.querySelectorAll('.nav-link');
const vistas = document.querySelectorAll('.vista-content');

botonesNav.forEach(function(boton) {
    boton.addEventListener('click', function() {

        botonesNav.forEach(function(b){b.classList.remove('active'); });
        vistas.forEach(function(v){v.classList.remove('active'); });
        boton.classList.add('active');

        if(boton.innerText === 'Crear Partido'){
            doacument.getElementById('VistaNuevoPartido').classlist.add('active');
        }else if(boton.innerText === 'En Vivo'){
            document.getElementById('VistaEnVivo').classList.add('active');

        }
    });
});
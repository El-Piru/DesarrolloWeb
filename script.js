const boton = document.querySelector('#BOTTOMSINGUP');
const estado = document.querySelector('.estado');
const reloj = document.querySelector('#reloj');
const inputCliente = document.getElementById('inputCliente');
let estadoActual = false;
let segundos =0;
let cronometro;

boton.addEventListener('click', function() {
    if(estadoActual) {
        clearInterval(cronometro);
        let cobro = segundos * 0.5;
        alert('Sesion terminada ' + inputCliente.value + '. Tiempo: '+ segundos + 's. Total a pagar: $' + cobro);
        reloj.innerHTML = 'Tiempo : 00:00:00';
        segundos = 0;
    estado.innerText = 'UwU';
    inputCliente.value = '';
    inputCliente.disabled = false;
    estado.style.color = '#10b981';
    boton.innerText = 'Iniciar Sesion';
    estadoActual = false;
    }else{
    inputCliente.disabled = true;
    cronometro = setInterval(function() {
        segundos++;
        reloj.innerHTML = 'Tiempo : ' + segundos + 's';
    }, 1000);
    estado.innerText = 'OwO';
    estado.style.color = '#d85407';
    boton.innerText = 'Cerrar Sesion';
    estadoActual = true;
    }
});
// Salud
const indicardorSalud = document.querySelector(".healthLevel__bar");
const botonMedicina = document.querySelector(".medicine-button");
// Cansancio
const indicadorCansancio = document.querySelector(".energyLevel__bar");
const botonDormir = document.querySelector(".sleep-button");
// Alimentacion
const indicadorAlimentacion = document.querySelector(".foodLevel__bar");
const botonAlimentacion = document.querySelector(".food-button");
// Gameover
const gameoverButton = document.querySelector(".gameover-button")
const gameover = document.querySelector(".gameover")

barras = []

/** Temporizador para disminuir las barras */
function crearTemporizador(indicador, tiempoInicial) {
    let tiempo = tiempoInicial;
    let intervalo;

    function nivelBarras() {
        indicador.style.width = tiempo + "%";
    
        if (tiempo > 66.66) {
            indicador.style.backgroundColor = "green";
        } else if (tiempo <= 66.66 && tiempo > 33.33) {
            indicador.style.backgroundColor = "yellow";
        } else {
            indicador.style.backgroundColor = "red";
        }
    }

    function iniciar(s) {
        if (intervalo){
            clearInterval(intervalo);
        }

        intervalo = setInterval(() => {
            if (tiempo > 0) {
                tiempo--;
                nivelBarras();
            } else {
                gameover.style.display = "flex"
                barras.forEach(clearInterval)
            }
        }, s);

        barras.push(intervalo)
    }

    function reiniciar(s) {
        tiempo = tiempoInicial;
        nivelBarras(); 
        iniciar(s); 
    }

    nivelBarras();

    return { iniciar, reiniciar };
}

console.log(barras)

// Crea el temporizador para las barras
const temporizadorSalud = crearTemporizador(indicardorSalud, 100);
const temporizadorCansancio = crearTemporizador(indicadorCansancio, 100);
const temporizadorAlimentacion = crearTemporizador(indicadorAlimentacion, 100);

// Inicia 
temporizadorSalud.iniciar(200);
temporizadorCansancio.iniciar(1000);
temporizadorAlimentacion.iniciar(1500);


botonMedicina.addEventListener("click", ()=>{temporizadorSalud.reiniciar(200)});
botonDormir.addEventListener("click", ()=>{temporizadorCansancio.reiniciar(1000)});
botonAlimentacion.addEventListener("click", ()=>{temporizadorAlimentacion.reiniciar(1200)});

gameoverButton.addEventListener("click", ()=>{
    location.reload()
})
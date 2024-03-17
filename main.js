// Salud
const indicardorSalud = document.querySelector(".healthLevel__bar");
const botonMedicina = document.querySelector(".medicine-button");
// Energia
const indicadorEnergia = document.querySelector(".energyLevel__bar");
const botonDormir = document.querySelector(".sleep-button");
// Alimentacion
const indicadorAlimentacion = document.querySelector(".foodLevel__bar");
const botonAlimentacion = document.querySelector(".food-button");
//Felicidad
const indicadorFelicidad = document.querySelector(".happinessLevel__bar");
const botonJugar = document.querySelector(".play-button");
// Gameover
const gameoverButton = document.querySelector(".gameover-button")
const gameover = document.querySelector(".gameover")

let barras = []

/* Temporizador para disminuir las barras */
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
const temporizadorEnergia = crearTemporizador(indicadorEnergia, 100);
const temporizadorAlimentacion = crearTemporizador(indicadorAlimentacion, 100);
const temporizadorFelicidad = crearTemporizador(indicadorFelicidad, 100);

//generación de número aleatorio entre 100 y 300ms para que la velocidad de las barras cambie 
// estructura Math.floor(Math.random() * (maximo - minimo + 1)) + minimo;
let valorRandomSpeed = Math.floor(Math.random()*(300-100 +1))+100;

// Inicia 
temporizadorSalud.iniciar(valorRandomSpeed);
temporizadorEnergia.iniciar(valorRandomSpeed);
temporizadorAlimentacion.iniciar(valorRandomSpeed);
temporizadorFelicidad.iniciar(valorRandomSpeed);


botonMedicina.addEventListener("click", ()=>{temporizadorSalud.reiniciar(valorRandomSpeed)});
botonDormir.addEventListener("click", ()=>{temporizadorEnergia.reiniciar(valorRandomSpeed)});
botonAlimentacion.addEventListener("click", ()=>{temporizadorAlimentacion.reiniciar(valorRandomSpeed)});
botonJugar.addEventListener("click", ()=>{temporizadorFelicidad.reiniciar(valorRandomSpeed)});

gameoverButton.addEventListener("click", ()=>{
    location.reload()
})
const mostrar = (valor, numero, multiplo) => {

    if (valor == 0) {
        alert(`${multiplo} es multiplo de ${numero}`);
    } else {
        alert(`${multiplo} no es multiplo de ${numero}`);
    }
}

const esMultiplo = (numero, multiplo) => multiplo % numero;

const calcularMultiplo = () => {
    numero = parseInt(prompt("Ingrese un valor:"));
    multiplo = parseInt(prompt("Ingrese otro numero para saber si es multiplo de " + numero + ":"));

    mostrar(esMultiplo(numero, multiplo), numero, multiplo);
}

let seguirIngresando = "si";
let numero = 0;
let multiplo = 0;

while (seguirIngresando == "si") {
     calcularMultiplo();
     seguirIngresando = prompt("Seguir calculando multiplos? si/no");
}
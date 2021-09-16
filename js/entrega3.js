const CANT_SUMA = 5;

let numeroSuma = parseInt(prompt("Ingresa el numero que quieras sumar: "));
let sumaTotal = numeroSuma;

for (let i = 0; i < CANT_SUMA; i++) {
    let numeroSuma2 = parseInt(prompt("Ingresa otro numero que quieras sumar: "));
    sumaTotal = sumaTotal + numeroSuma2;
    alert(`La suma es: ${sumaTotal}`);
}

let letra = "";
let clave = "";

do {

    letra = prompt("Ingresa la letra que quieras concatenar ('b' para borrar): ");
    clave = clave + letra;

    if (letra == "b" || letra == "B" ) {
        clave = "";
    }

    alert(`La clave por el momento es ${clave}`);

} while (clave != "esc" && clave != "ESC");

let saludo = parseInt(prompt("Ingrese la cantidad de veces que quieras que te salude:"));

for (let i = 0; i < saludo; i++) {
    alert("Hola");
}


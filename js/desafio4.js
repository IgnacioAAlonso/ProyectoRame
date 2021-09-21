const PRECIO_REMERA = 40;
const PRECIO_PANTALON = 50;
const PRECIO_CAMPERA = 65;
const INTERES3 = 1.25;
const INTERES12 = 1.45;
const DESCUENTO = 0.80;

const precioProducto = (p) => {
    switch (p) {
        case 1:
            return PRECIO_REMERA;
            break;
        case 2:
            return PRECIO_PANTALON;
            break
        case 3:
            return PRECIO_CAMPERA;
            break
        default:
            return 0;
            break;
    }
};

const calcularPrecio = (p, np) => precioProducto(p) * np;

const seguirDeCompras = () => {
    producto = parseInt(prompt(`Que otro producto desea comprar? 1.Remera ${PRECIO_REMERA}, 2.Pantalon ${PRECIO_PANTALON}, 3.Campera ${PRECIO_CAMPERA}`));

    cantidad = parseInt(prompt(`Cuantos desea comprar?`));

    return calcularPrecio(producto, cantidad);
}

const totalCuotas = (cuotas, precioAPagar) => precioAPagar * recargoDeCuotas(cuotas);

const recargoDeCuotas = (nCuotas) => {
    switch (nCuotas) {
        case 3:
            return INTERES3;
            break;
        case 12:
            return INTERES12;
            break
        default:
            return 1;
            break;
    }
}

const calcularCuotas = (cuotas, precioAPagar) => totalCuotas(cuotas, precioAPagar) / cuotas;

const calcularDescuento = (precioAPagar) => precioAPagar * DESCUENTO;

// --------- CODIGO -----------

let seguirComprando = "si";

let producto = parseInt(prompt(`Que producto desea comprar? 1.Remera ${PRECIO_REMERA}, 2.Pantalon ${PRECIO_PANTALON}, 3.Campera ${PRECIO_CAMPERA}`));

let cantidad = parseInt(prompt(`Cuantos desea comprar?`));

let precioTotal = calcularPrecio(producto, cantidad);

// Seguir si o no
seguirComprando = prompt("Desea seguir comprando? si/no");
while (seguirComprando == "si") {

    precioTotal = precioTotal + seguirDeCompras();
    seguirComprando = prompt("Desea seguir comprando? si/no");

}

alert("Muchas gracias por su compra. Como desea abonar? Hay 6 cuotas sin interes.");

// Dar el precio y medios de pago
let medioDePago = prompt("Escriba cuotas si desea esa forma de pago. De lo contrario será al contado. El total a pagar es: $" + precioTotal);

// cuotas o contado
if (medioDePago == "cuotas") {
    let cantidadDeCuotas = parseInt(prompt("Elija la cantidad de cuotas 3, 6 o 12."));

    while (cantidadDeCuotas != 3 && cantidadDeCuotas != 6 && cantidadDeCuotas != 12) {
        cantidadDeCuotas = parseInt(prompt("Elija una cantidad de cuotas correcta."));
    }

    // Recargo de cuotas depende la cantidad
    alert(`El precio total: ${totalCuotas(cantidadDeCuotas, precioTotal)} quedaria en cómodas ${cantidadDeCuotas} cuotas de: 
    ${calcularCuotas(cantidadDeCuotas, precioTotal)}.`);

    precioTotal = totalCuotas(cantidadDeCuotas, precioTotal);
}

// Poner descuento
let descuento = prompt("Ingrese el código de descuento");

if (descuento == "qwerty") {
    // Calcular descuento
    precioTotal = calcularDescuento(precioTotal);
} else {
    // Dar descuento
    alert("Le regalamos un descuento para su próxima compra: qwerty");
}

// precio total
alert("Muchas gracias por su compra. El precio final total es: " + precioTotal);
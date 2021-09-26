const INTERES3 = 1.25;
const INTERES12 = 1.45;
const DESCUENTO = 0.80;

const calcularPrecio = (p, np) => p * np;

const seguirDeCompras = (productoSeleccionado, producto) => {

    producto = parseInt(prompt(`Que otro producto desea comprar? 1.${productoJabon.nombre} $${productoJabon.precio}, 2.${productoVela.nombre} $${productoVela.precio}`));

    while (producto != 1 && producto != 2) {
        producto = parseInt(prompt(`No es un producto válido. Que producto desea comprar? 1.${productoJabon.nombre} $${productoJabon.precio}, 2.${productoVela.nombre} $${productoVela.precio}`));
    }

    switch (producto) {
        case 1:
            productoSeleccionado = productoJabon;
            break;
        case 2:
            productoSeleccionado = productoVela;
            break;
        default:
            break;
    }

    cantidad = parseInt(prompt(`Cuantos desea comprar?`));

    let stockAux = productoSeleccionado.stockActual; 

    // Chequeamos si hay stock
    while (productoSeleccionado.compra(cantidad) < 0) {
        
        alert("Lamentablemente no nos queda esa cantidad :(");

        if (productoSeleccionado.stockInicial == stockAux || productoSeleccionado.stockActual < 0) {
            productoSeleccionado.recargarStock(stockAux);    
        }
        
        cantidad = parseInt(prompt(`Cuantos desea comprar?`));

    }

    return calcularPrecio(productoSeleccionado.precio, cantidad);
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

// --------- OBJETO -----------
class Producto {
    constructor(nombre, precio, stock){
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.stockInicial = parseInt(stock);
        this.stockActual = this.stockInicial;
    }
    recargarStock(stock){
        this.stockActual = stock;
    }
    compra(cantidad){
        this.stockActual = this.stockActual - cantidad;
        return this.stockActual;
    }
}

// --------- CODIGO -----------

// Creamos los objetos
const productoJabon = new Producto("Jabones", 40, 5);
const productoVela = new Producto("Velas", 70, 7);

// Preguntamos por el producto
let producto = parseInt(prompt(`Que producto desea comprar? 1.${productoJabon.nombre} $${productoJabon.precio}, 2.${productoVela.nombre} $${productoVela.precio}`));

while (producto != 1 && producto != 2) {
    producto = parseInt(prompt(`No es un producto válido. Que producto desea comprar? 1.${productoJabon.nombre} $${productoJabon.precio}, 2.${productoVela.nombre} $${productoVela.precio}`));
}

let productoSeleccionado;

switch (producto) {
    case 1:
        productoSeleccionado = productoJabon;
        break;
    case 2:
        productoSeleccionado = productoVela;
        break;
    default:
        break;
}

let cantidad = parseInt(prompt(`Cuantos desea comprar?`));

// Chequeamos si hay stock
while (productoSeleccionado.compra(cantidad) < 0) {
    
    alert("Lamentablemente no nos queda esa cantidad :(");
    productoSeleccionado.recargarStock(productoSeleccionado.stockInicial);
    cantidad = parseInt(prompt(`Cuantos desea comprar?`));

}

let precioTotal = calcularPrecio(productoSeleccionado.precio, cantidad);

// Seguir si o no
let seguirComprando = prompt("Desea seguir comprando? si/no");
while (seguirComprando == "si") {

    precioTotal = precioTotal + seguirDeCompras(productoSeleccionado, producto);
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
    alert(`El precio total: ${totalCuotas(cantidadDeCuotas, precioTotal)} quedaria en cómodas ${cantidadDeCuotas} cuotas de: $${calcularCuotas(cantidadDeCuotas, precioTotal).toFixed(2)}.`);

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
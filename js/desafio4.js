const INTERES3 = 1.25;
const INTERES12 = 1.45;
const DESCUENTO = 0.80;

const calcularPrecio = (p, np) => p * np;

const seguirDeCompras = (productoSeleccionado, producto) => {

    producto = parseInt(prompt(`Que otro producto desea comprar? 1.Jabones, 2.Velas, 3.Ver Todo`));

    while (producto != 1 && producto != 2 && producto != 3) {
        producto = parseInt(prompt(`No es un producto válido. Que otro producto desea comprar? 1.Jabones, 2.Velas, 3.Ver Todo`));
    }

    switch (producto) {
        case 1:
            productoSeleccionado = arrayProducto.filter(product => product.nombre.includes("Jabones"));
            break;
        case 2:
            productoSeleccionado = arrayProducto.filter(product => product.nombre.includes("Velas"));
            break;
        case 3:
            productoSeleccionado = arrayProducto;
            break;
        default:
            break;
    }

    // Preguntamos por el producto que quiere comprar
    productoText = "";
    for (let i = 0; i < productoSeleccionado.length; i++) {
        productoText = (productoText + " " +  (i+1) + ". " + productoSeleccionado[i].nombre + " $" + productoSeleccionado[i].precio + ("\n"));
    }

    producto = parseInt(prompt(productoText));

    while (producto > productoSeleccionado.length || producto <= 0) {
        producto = parseInt(prompt(`No es un producto válido. ${productoText}`));
    }

    // SELECCIONAMOS EL PRODUCTO
    productoSeleccionado = productoSeleccionado[producto - 1];

    let cantidad = parseInt(prompt(`Cuantos desea comprar? Stock: ${productoSeleccionado.stockActual}`));

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

// Creamos el array de objetos
const arrayProducto = [];

arrayProducto.push(new Producto("Jabones Cuerpo", 60, 10));
arrayProducto.push(new Producto("Jabones Mano", 40, 6));
arrayProducto.push(new Producto("Velas Aroma", 80, 7));
arrayProducto.push(new Producto("Velas Decorativas", 30, 7));

// Preguntamos por el producto que quiere ver
let producto = parseInt(prompt(`Que desea ver? 1.Jabones, 2.Velas, 3.Ver Todo`));

while (producto != 1 && producto != 2 && producto != 3) {
    producto = parseInt(prompt(`No es un producto válido. Que desea ver? 1.Jabones, 2.Velas, 3.Ver Todo`));
}

let productoSeleccionado = [];

switch (producto) {
    case 1:
        productoSeleccionado = arrayProducto.filter(product => product.nombre.includes("Jabones"));
        break;
    case 2:
        productoSeleccionado = arrayProducto.filter(product => product.nombre.includes("Velas"));
        break;
    case 3:
        productoSeleccionado = arrayProducto;
        break;
    default:
        break;
}

// Preguntamos por el producto que quiere comprar
let productoText = "";
for (let i = 0; i < productoSeleccionado.length; i++) {
    productoText = (productoText + " " +  (i+1) + ". " + productoSeleccionado[i].nombre + " $" + productoSeleccionado[i].precio + ("\n"));
}

producto = parseInt(prompt(productoText));

while (producto > productoSeleccionado.length || producto <= 0) {
    producto = parseInt(prompt(`No es un producto válido. ${productoText}`));
}

// SELECCIONAMOS EL PRODUCTO
productoSeleccionado = productoSeleccionado[producto - 1];

let cantidad = parseInt(prompt(`Cuantos desea comprar? Stock: ${productoSeleccionado.stockActual}`));

// Chequeamos si hay stock
while (productoSeleccionado.compra(cantidad) < 0) {
    
    alert("Lamentablemente no nos queda esa cantidad :(");
    productoSeleccionado.recargarStock(productoSeleccionado.stockInicial);
    cantidad = parseInt(prompt(`Cuantos desea comprar? Stock: ${productoSeleccionado.stockActual}`));

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
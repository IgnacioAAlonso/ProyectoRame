class Producto {
    constructor(nombre, precio, vendidos, valoracion){
        this.nombre = nombre;
        this.precio = parseInt(precio);
        this.vendidos = parseInt(vendidos);
        this.valoracion = parseInt(valoracion);
    }
}

// --------- CODIGO -----------

// Creamos el array de objetos
const arrayProducto = [];

arrayProducto.push(new Producto("Jabones Cuerpo", 60, 10, 2));
arrayProducto.push(new Producto("Jabones Mano", 40, 6, 3));
arrayProducto.push(new Producto("Velas Aroma", 80, 7, 5));
arrayProducto.push(new Producto("Velas Decorativas", 20, 3, 1));
arrayProducto.push(new Producto("Velas Hogar", 30, 9, 4));

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

let productoPrecio = "Menor a Mayo precio: " + ("\n");
const productosPorPrecio = productoSeleccionado.sort((a, b) => a.precio - b.precio);
for (let i = 0; i < productosPorPrecio.length; i++) {
    productoPrecio = (productoPrecio + " " +  (i+1) + ". " + productosPorPrecio[i].nombre + " $" + productosPorPrecio[i].precio + ("\n"));
}

alert(productoPrecio);

let productoValoracion = "Mejor valorados: " + ("\n");
const productosPorValoracion = productoSeleccionado.sort((a, b) => b.valoracion - a.valoracion);
for (let i = 0; i < productosPorValoracion.length; i++) {
    productoValoracion = (productoValoracion + " " +  (i+1) + ". " + productosPorValoracion[i].nombre + ": " + productosPorValoracion[i].valoracion + ("\n"));
}

alert(productoValoracion);

let productoVendidos = "Mas vendidos: " + ("\n");
const productosPorVentas = productoSeleccionado.sort((a, b) => b.vendidos - a.vendidos);
for (let i = 0; i < productosPorVentas.length; i++) {
    productoVendidos = (productoVendidos + " " +  (i+1) + ". " + productosPorVentas[i].nombre + ": " + productosPorVentas[i].vendidos + ("\n"));
}

alert(productoVendidos);

const productosJabones = [
    {
      id: 1,
      nombre: 'Jabones de Cuerpo',
      descripcion:'Parece un jabón pero no lo es: este limpiador en barra limpia la piel sin agredirla, respetando su película protectora natural.', 
      imagen: './imagenes/jabones/jabones-favoritos.jpg'
    },
    {
      id: 2,
      nombre: 'Jabones de Mano',
      descripcion:'Este jabon, en equilibrio con el pH de la piel, está enriquecido con aceite de almendras para añadir hidratación al ritual de la limpieza.', 
      imagen: './imagenes/jabones/jabones-favoritos.jpg'
    }
];

const productosVelas = [
    {
      id: 1,
      nombre: 'Velas Aromáticas',
      descripcion:'Hechas a mano, con cera de soja y mecha de madera son, además, pero que muy estéticas. Esta tiene aroma cítrico a naranja sanguina con notas dulces de almendras verdes.', 
      imagen: './imagenes/jabones/jabones-favoritos.jpg'
    },
    {
      id: 2,
      nombre: 'Velas Decorativas',
      descripcion:'En colores suaves y formas caprichosas, estas velas prometen generar nuevas formas a medida que se van derritiendo con el tiempo.', 
      imagen: './imagenes/jabones/jabones-favoritos.jpg'
    }
];

const publicaciones = [
    {
      id: 1,
      titulo: 'Jabones',
      parrafos:'Los jabones mas vendidos'
    },
    {
      id: 2,
      titulo: 'Velas',
      parrafos:'Las velas mas vendidas'
    }
];

const personas = [
    {
      id: 1,
      nombre: 'Ignacio Alonso',
      comentario:'Los mejores jabones para el cuerpo.'
    },
    {
      id: 2,
      nombre: 'Diego Milito',
      comentario:'Las velas mas lindas para el hogar.'
    },
    {
      id: 3,
       nombre: 'Amelia Juarez',
       comentario:'Hermosos jabones para el baño.'
    },
    {
       id: 4,
       nombre: 'Facundo Dominguez',
       comentario:'Excelentes velas para regalar.'
    },
    {
       id: 5,
       nombre: 'Damian Betular',
       comentario:'Les falta decoracion, pero son hermosos todos los productos.'
    },
    {
       id: 6,
       nombre: 'NN',
       comentario:'Sin comentarios.'
    }
    
];

const tituloJabonHTML = document.getElementById("publicacionJabones");
const tituloVelaHTML = document.getElementById("publicacionVelas");
const listadoProductos = document.getElementById("listadoJabones");
const listadoVelas = document.getElementById("listadoVelas");
const listadoComentarios = document.getElementById("comentarios");

const insertarTitulos = () => {
    
    for (const publicacion of publicaciones) {

        if (publicacion.id == 1) {
            let contenidoTitulo = document.createElement("div");
            contenidoTitulo.innerHTML = `
                    <h2>${publicacion.titulo}</h2>
                    <p>${publicacion.parrafos}</p>`;
      
            tituloJabonHTML.appendChild(contenidoTitulo);

            insertarJabones();
        } else {
            let contenidoTitulo = document.createElement("div");
            contenidoTitulo.innerHTML = `
                    <h2>${publicacion.titulo}</h2>
                    <p>${publicacion.parrafos}</p>`;
      
            tituloVelaHTML.appendChild(contenidoTitulo);

            insertarVelas();
        }
     
    }
  }

const insertarJabones = () => {
    for (const producto of productosJabones) {
      let contenidoProducto = document.createElement("div");
      contenidoProducto.className = "col-4";
      contenidoProducto.id = producto.id;
      contenidoProducto.innerHTML = `
      <div class="card" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="foto producto">
            <div class="card-body">
              <p class="card-text">${producto.nombre}</p>
              <p class="card-text">${producto.descripcion}</p>
              <button>Comprar</button>
            </div>
        </div>`;

      listadoProductos.appendChild(contenidoProducto);
    }
  }

  const insertarVelas = () => {
    for (const producto of productosVelas) {
      let contenidoProducto = document.createElement("div");
      contenidoProducto.className = "col-4";
      contenidoProducto.id = producto.id;
      contenidoProducto.innerHTML = `
      <div class="card" style="width: 18rem;">
            <img src="${producto.imagen}" class="card-img-top" alt="foto producto">
            <div class="card-body">
              <p class="card-text">${producto.nombre}</p>
              <p class="card-text">${producto.descripcion}</p>
              <button>Comprar</button>
            </div>
        </div>`;

      listadoVelas.appendChild(contenidoProducto);
    }
  }

  const insertarComentarios = () => {
    for (const comentario of personas) {
      let contenidoComentarios = document.createElement("div");
      contenidoComentarios.className = "col-4";
      contenidoComentarios.innerHTML = `
      <p>
            <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample-${comentario.id}" role="button" aria-expanded="false" aria-controls="collapseExample">
              Comentario de ${comentario.nombre}
            </a>
        </p>
          <div class="collapse" id="collapseExample-${comentario.id}">
            <div class="card card-body">
              ${comentario.comentario}
            </div>
          </div>`;

      listadoComentarios.appendChild(contenidoComentarios);
    }
  }

  insertarTitulos();
  insertarComentarios();


/* class Producto {
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
 */
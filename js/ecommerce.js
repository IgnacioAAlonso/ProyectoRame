const productos = [
    {
      id: 1,
      nombre: 'Jabones de Cuerpo',
      descripcion:'Parece un jabón pero no lo es: este limpiador en barra limpia la piel sin agredirla, respetando su película protectora natural.', 
      imagen: './imagenes/jabones/jabones-favoritos.jpg',
      precio: '205',
      cantidad: 0
    },
    {
      id: 2,
      nombre: 'Jabones de Mano',
      descripcion:'Este jabon, en equilibrio con el pH de la piel, está enriquecido con aceite de almendras para añadir hidratación al ritual de la limpieza.', 
      imagen: './imagenes/jabones/el-mejor-jabon-para-tu-tipo-de-piel-2.jpg',
      precio: '99',
      cantidad: 0
    },
    {
      id: 3,
      nombre: 'Velas Aromáticas',
      descripcion:'Hechas a mano, con cera de soja y mecha de madera son, además, pero que muy estéticas. Esta tiene aroma cítrico a naranja sanguina con notas dulces de almendras verdes.', 
      imagen: './imagenes/velas/la-mejor-vela-para-tu-hogar.jpg',
      precio: '250',
      cantidad: 0
    },
    {
      id: 4,
      nombre: 'Velas Decorativas',
      descripcion:'En colores suaves y formas caprichosas, estas velas prometen generar nuevas formas a medida que se van derritiendo con el tiempo.', 
      imagen: './imagenes/velas/la-mejor-vela-para-decourar-tu-hogar.jpg',
      precio: '315',
      cantidad: 0
    }
];

class Carrito {
    constructor(cantidad){
        this.cantidad = parseInt(cantidad);
    }
    
    agregarAlCarrito(){
        this.cantidad ++;
        //this.precio += precio;
    }
    quitarDelCarrito(cantidad){
        this.cantidad -= cantidad;
    }
}

// -------- CONSTANTES ELEMENTOS DEL DOM
const listadoProductos = document.getElementById("listado");
const precioElementos = document.getElementsByClassName("precio");
const contenedorCanasta = document.getElementById("canasta");
const arrayCanasta = [];
const arrayCarrito = [];
arrayCarrito.push(new Carrito(0));
const elementoCarrito = arrayCarrito[0];
const carritoLocalStorage = localStorage.getItem("carrito");

// -------- FUNCIONES 
/* Con esta función puedo eliminar productos de la canasta */
const eliminarProducto = (producto) => {
    elementoCarrito.quitarDelCarrito(producto.cantidad);
    producto.cantidad = 0;
    carritoHTML.innerHTML = elementoCarrito.cantidad;

    for (const productoCanasta of contenedorCanasta.children) {
      if (parseInt(productoCanasta.id) === parseInt(producto.id)) {
        productoCanasta.parentElement.removeChild(productoCanasta);
        
        // El método indexOf me permite obtener el índice de algún item de un Array
        const index = arrayCanasta.indexOf(producto);
  
        /* 
          El método splice permite eliminar un elemento de un Array, 
          paso el indice y cuantos elementos quiero eliminar
        */
        arrayCanasta.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
      }  
    }
  }

  /* Resto 1 a la cantidad del Producto */
  const restoProducto = (producto) => {
        elementoCarrito.quitarDelCarrito(1);
        producto.cantidad--;

        let cantidadProducto = document.getElementById(`cantidad-${producto.id}`);
        cantidadProducto.innerHTML = `${producto.cantidad}`;
        let totalProducto = document.getElementById(`total-${producto.id}`);
        totalProducto.innerHTML = `$ ${precioTotal(producto.precio, producto.cantidad)}`;

        /* Retiro el producto y vuelvo a colocarlo con la nueva cantidad
          Ya que fue la forma que pude encontrar para actualizar la cantidad en en localStorage
          Sin agregarlo nuevamente */

        if (producto.cantidad <= 0) {
          eliminarProducto(producto);
        } else {
          const indexCanasta = arrayCanasta.indexOf(producto);
          arrayCanasta.splice(indexCanasta, 1);
          arrayCanasta.push(producto);
          localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
        }
  }
  
  /* 
  Con esta función puedo agregar productos del contenedor a la canasta 
  */
  const insertarCanasta = (producto) => {

    elementoCarrito.agregarAlCarrito();    
    console.log(arrayCanasta);

    /* Pregunto si la cantidad es 0 para saber si es el primer elemento
       (1)De ser el primero creo el producto en la canasta
       (2)Si ya existe en la canasta, solamente aumento la cantidad */
    if (producto.cantidad <= 0) {
        producto.cantidad++;

        let contenedor = document.createElement("div");
        contenedor.className = "producto-canasta";
        contenedor.id = producto.id;
        contenedor.innerHTML = `
        <img src="${producto.imagen}">
              <div class="contenedor__general-producto">
              <div class="contenedor__producto">
                <div class="descripcion-producto">
                  <p class="producto-canastaDescripcion"">${producto.nombre}</p>
                  <p> $ ${producto.precio} </p>
                </div>
                <div class="contenedor__cantidad">
                  <a id="cantidadMenos-${producto.id}"> <i class="contenedor__cantidad-icon contenedor__cantidad-icon--red fas fa-minus-square"></i> </a>
                  <p  class="contenedor__cantidad-numero" id="cantidad-${producto.id}"> ${producto.cantidad} </p>
                  <a id="cantidadMas-${producto.id}"> <i class="contenedor__cantidad-icon contenedor__cantidad-icon--green fas fa-plus-square"></i> </a>
                </div>
              </div>
              <div class="contenedor__eliminar">
                <b class="contenedor__eliminarCantidad" id="total-${producto.id}">$ ${precioTotal(producto.precio, producto.cantidad)}</b>
                <a id="eliminar-${producto.id}" ><i class="contenedor__eliminarProducto far fa-trash-alt"></i></a>
              </div>
              </div>
          `
    
        /*
        Inserto un elemento botón al elemento recientemente creado
        que contenga la función para poder eliminar el prodcuto de la canasta
        */
    
        contenedorCanasta.appendChild(contenedor);
        eliminar(producto);
        sumarAlCarrito(producto);
        restarAlCarrito(producto);
        arrayCanasta.push(producto);
        localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
        
    } else {
        producto.cantidad++;
        let cantidadProducto = document.getElementById(`cantidad-${producto.id}`);
        cantidadProducto.innerHTML = `${producto.cantidad}`;
        let totalProducto = document.getElementById(`total-${producto.id}`);
        totalProducto.innerHTML = `$ ${precioTotal(producto.precio, producto.cantidad)}`;

        /* Retiro el producto y vuelvo a colocarlo con la nueva cantidad
          Ya que fue la forma que pude encontrar para actualizar la cantidad en en localStorage
          Sin agregarlo nuevamente */
        const indexCanasta = arrayCanasta.indexOf(producto);
        arrayCanasta.splice(indexCanasta, 1);
        arrayCanasta.push(producto);
        localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
    }

  }

  /* 
  Con esta función puedo agregar lo productos del localStorage a la canasta 
  */
  const insertarCanastaLocalStorage = (producto) => {

    /* Por la cantidad que tiene el producto, hago la llamda al agregar al carrito */
    for (let index = 0; index < producto.cantidad; index++) {
        elementoCarrito.agregarAlCarrito();
    }

    carritoHTML.innerHTML = elementoCarrito.cantidad;
    let contenedor = document.createElement("div");
    contenedor.className = "producto-canasta";
    contenedor.id = producto.id;
    contenedor.innerHTML = `<img src="${producto.imagen}">
    <div class="contenedor__general-producto">
    <div class="contenedor__producto">
      <div class="descripcion-producto">
        <p class="producto-canastaDescripcion"">${producto.nombre}</p>
        <p> $ ${producto.precio} </p>
      </div>
      <div class="contenedor__cantidad">
        <a id="cantidadMenos-${producto.id}"> <i class="contenedor__cantidad-icon contenedor__cantidad-icon--red fas fa-minus-square"></i> </a>
        <p  class="contenedor__cantidad-numero" id="cantidad-${producto.id}"> ${producto.cantidad} </p>
        <a id="cantidadMas-${producto.id}"> <i class="contenedor__cantidad-icon contenedor__cantidad-icon--green fas fa-plus-square"></i> </a>
      </div>
    </div>
    <div class="contenedor__eliminar">
      <b class="contenedor__eliminarCantidad" id="total-${producto.id}">$ ${precioTotal(producto.precio, producto.cantidad)}</b>
      <a id="eliminar-${producto.id}" ><i class="contenedor__eliminarProducto far fa-trash-alt"></i></a>
    </div>
    </div>`
    
        /* 
        Inserto un elemento botón al elemento recientemente creado
        que contenga la función para poder eliminar el prodcuto de la canasta
        */
    
        contenedorCanasta.appendChild(contenedor);
        eliminar(producto);
        sumarAlCarrito(producto);
        restarAlCarrito(producto);
        arrayCanasta.push(producto);
        localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
  }
  
  /* 
    Función para crear productos dinámicamente y crearlos en el contenedor 
  */
  const insertarProductos = () => {
    for (const producto of productos) {
      let contenidoProducto = document.createElement("div");
      contenidoProducto.className = "row justify-content-center container__favoritos-box";
      contenidoProducto.id = producto.id;

      /* Pregunto si son positivos o negativos, ya que quiero ir variando como se muestran en el html */

    if (producto.id % 2 == 1) {
        contenidoProducto.innerHTML = `
        <div class="col-12 col-md-6 container__favoritos-jabonesDescripcion">
            <div class="contenedorCartas">
                <h2 class="contenedorCartas__titulo">${producto.nombre}</h2>
                <p class="contenedorCartas__texto"> ${producto.descripcion} </p>
                <p class="contenedorCartas__precio">$${producto.precio}</p>
                <button class="contenedorCartas__enlace" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" id="boton-${producto.id}">Comprar</button>
            </div>
          </div>
          <div class="col-12 col-md-6 container__favoritos-jabonesImagen">
            <img class="container__jabonesImagen-img" src="${producto.imagen}"
            alt="Imagen de los jabones mas favoritos">
          </div>
    </div>`;
    } else {
        contenidoProducto.innerHTML = `
      <div class="col-12 col-md-6 container__favoritos-jabonesImagen oreder-md-1 order-2">
      <img class="container__jabonesImagen-img" src="${producto.imagen}"
        alt="Imagen de los jabones mas favoritos">
    </div>

    <div class="col-12 col-md-6 container__favoritos-jabonesDescripcion order-md-2 order-1">
      <div class="contenedorCartas">
        <h2 class="contenedorCartas__titulo">${producto.nombre}</h2>
        <p class="contenedorCartas__texto"> ${producto.descripcion} </p>
        <p class="contenedorCartas__precio">$${producto.precio}</p>
        <button class="contenedorCartas__enlace" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample" id="boton-${producto.id}">Comprar</button>
      </div>
    </div>`;    
    }

      listadoProductos.appendChild(contenidoProducto);
    }
  }

  /* Inicializo la cantidad de los productos a los del localStorage
    Y los inserto en la canasta */
  const inicializarProductos = (productoLocal) => {
    for (const producto of productos){
        if (producto.id == productoLocal.id) {
            producto.cantidad = productoLocal.cantidad;
            insertarCanastaLocalStorage(producto);
        }
    }
  }

  /* Agrego el método comprar para el boton de los productos */
  const comprar = () => {
    for (const producto of productos){
        let boton = document.getElementById(`boton-${producto.id}`);     
        boton.onclick = () => {
            insertarCanasta(producto);
            carritoHTML.innerHTML = elementoCarrito.cantidad;
        } 
            
    }
  }

  /* Agrego el método eliminar producto para el boton del tacho */
  const eliminar = (producto) => {
        let boton = document.getElementById(`eliminar-${producto.id}`);     
        boton.onclick = () => {
            eliminarProducto(producto);
        }
  }

  /* Agrego el método eliminar producto para el boton del tacho */
  const sumarAlCarrito = (producto) => {
    let boton = document.getElementById(`cantidadMas-${producto.id}`);     
    boton.onclick = () => {
      insertarCanasta(producto);
      carritoHTML.innerHTML = elementoCarrito.cantidad;
    }
  }

  /* Agrego el método eliminar producto para el boton del tacho */
  const restarAlCarrito = (producto) => {
    let boton = document.getElementById(`cantidadMenos-${producto.id}`);     
    boton.onclick = () => {
      restoProducto(producto);
      carritoHTML.innerHTML = elementoCarrito.cantidad;
    }
  }


  /* Calculo el precio total del producto dependiendo de la cantidad */
  const precioTotal = (precio, cantidad) => { return precio * cantidad}


  //CÓDIGO
  let carritoHTML = document.getElementById("cantidadEnElCarrito");
  let carritoParse;

  insertarProductos();
  comprar();

  /* Pregunto por el localStorage y de existir lo inserto en la canasta */
  if (carritoLocalStorage) {
    carritoParse = JSON.parse(carritoLocalStorage);

    for (const producto of carritoParse) {
        inicializarProductos(producto);
    }
  }

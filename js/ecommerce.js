class Carrito {
  constructor(cantidad) {
    this.cantidad = parseInt(cantidad);
  }

  agregarAlCarrito() {
    this.cantidad++;
    //this.precio += precio;
  }
  quitarDelCarrito(cantidad) {
    this.cantidad -= cantidad;
  }
}

//jQuery(() => {

  // -------- CONSTANTES ELEMENTOS DEL DOM
  const listadoProductos = document.getElementById("listado");
  const precioElementos = document.getElementsByClassName("precio");
  const URL = "json/productos.json"
  const contenedorCanasta = document.getElementById("canasta");
  const arrayCanasta = [];
  const arrayCanastaAux = [];
  const arrayCarrito = [];
  const productos = [];
  arrayCarrito.push(new Carrito(0));
  const elementoCarrito = arrayCarrito[0];
  const carritoLocalStorage = localStorage.getItem("carrito");

  // -------- FUNCIONES 

  /* Con esta función puedo eliminar productos de la canasta */
  const eliminarProducto = (producto) => {
    elementoCarrito.quitarDelCarrito(producto.cantidad);
    producto.cantidad = 0;
    carritoHTML.html(`${elementoCarrito.cantidad}`);
    totalCarrito();

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

    let cantidadProducto = $(`#cantidad-${producto.id}`); //document.getElementById(`cantidad-${producto.id}`);
    cantidadProducto.html(`${producto.cantidad}`);
    let totalProducto = $(`#total-${producto.id}`); // document.getElementById(`total-${producto.id}`);
    totalProducto.html(`$ ${precioTotal(producto.precio, producto.cantidad)}`);

    /* Retiro el producto y vuelvo a colocarlo con la nueva cantidad
      Ya que fue la forma que pude encontrar para actualizar la cantidad en en localStorage
      Sin agregarlo nuevamente */

    if (producto.cantidad <= 0) {
      eliminarProducto(producto);
    } else {
      const indexCanasta = arrayCanasta.indexOf(producto);
      arrayCanasta.splice(indexCanasta, 1);
      arrayCanasta.push(producto);
      arrayCanastaAux.push(producto);
      localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
    }
  }

  /* 
  Con esta función puedo agregar productos del contenedor a la canasta 
  */
  const insertarCanasta = (producto) => {

    elementoCarrito.agregarAlCarrito();

    /* Pregunto si la cantidad es 0 para saber si es el primer elemento
       (1)De ser el primero creo el producto en la canasta
       (2)Si ya existe en la canasta, solamente aumento la cantidad */
    if (producto.cantidad <= 0) {
      producto.cantidad++;

      $('#canasta').append(`
    <div class="producto-canasta" id="${producto.id}">
    <img src="${producto.imagen}">
              <div class="contenedor__general-producto">
              
              <div class="contenedor__producto">

                <div class="descripcion-producto">
                  <p class="producto-canastaDescripcion">${producto.nombre}</p>
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
                <a id="eliminar-${producto.id}" class="nav_cursor"><i class="contenedor__eliminarProducto far fa-trash-alt"></i></a>
              </div>

              </div>
    </div>`);

      /*
      Inserto un elemento botón al elemento recientemente creado
      que contenga la función para poder eliminar el prodcuto de la canasta
      */


      eliminar(producto);
      sumarAlCarrito(producto);
      restarAlCarrito(producto);
      arrayCanasta.push(producto);
      arrayCanastaAux.push(producto);
      localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
      totalCarrito();

    } else {
      producto.cantidad++;
      let cantidadProducto = $(`#cantidad-${producto.id}`); //document.getElementById(`cantidad-${producto.id}`);
      cantidadProducto.html(`${producto.cantidad}`);
      let totalProducto = $(`#total-${producto.id}`);
      totalProducto.html(`$ ${precioTotal(producto.precio, producto.cantidad)}`);

      /* Retiro el producto y vuelvo a colocarlo con la nueva cantidad
        Ya que fue la forma que pude encontrar para actualizar la cantidad en en localStorage
        Sin agregarlo nuevamente */
      const indexCanasta = arrayCanasta.indexOf(producto);
      arrayCanasta.splice(indexCanasta, 1);
      arrayCanasta.push(producto);
      arrayCanastaAux.push(producto);
      localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
      totalCarrito();
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

    carritoHTML.html(`${elementoCarrito.cantidad}`);

    $('#canasta').append(`
    <div class="producto-canasta" id="${producto.id}">
    <img src="${producto.imagen}">
    <div class="contenedor__general-producto">
    <div class="contenedor__producto">
      <div class="descripcion-producto">
        <p class="producto-canastaDescripcion">${producto.nombre}</p>
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
    </div>`);

    /* 
    Inserto un elemento botón al elemento recientemente creado
    que contenga la función para poder eliminar el prodcuto de la canasta
    */

    eliminar(producto);
    sumarAlCarrito(producto);
    restarAlCarrito(producto);
    arrayCanasta.push(producto);
    arrayCanastaAux.push(producto);
    localStorage.setItem("carrito", JSON.stringify(arrayCanasta));
    totalCarrito();
  }

  /* 
    Función para crear productos dinámicamente y crearlos en el contenedor 
  */
  /* const crearProductos = () => {
    $.get(URL, (respuesta, estado) => {
      if (estado === "success") {
        for (const producto of respuesta) {
          productos.push(producto);
          console.log(producto);
        }
      }
    });
  } */

  const insertarProductos = () => {
    console.log("entrando PRODUCTOS");

    $.get(URL, (respuesta, estado) => {
      if (estado === "success") {
        for (const producto of respuesta) {
          productos.push(producto);
        }

        for (const producto of productos) {
          // let contenidoProducto = document.createElement("div");
          //contenidoProducto.className = "row justify-content-center container__favoritos-box";
          //contenidoProducto.id = producto.id;

          /* Pregunto si son positivos o negativos, ya que quiero ir variando como se muestran en el html */
          if (producto.id % 2 == 1) {
            $('#listado').append(`
      <div class="row justify-content-center container__favoritos-box" id="${producto.id}">
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
  </div>
      </div>`);
          } else {

            $('#listado').append(`
        <div class="row justify-content-center container__favoritos-box" id="${producto.id}">
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
      </div>
      </div>`);

          }

          //listadoProductos.appendChild(contenidoProducto);
        }

        comprar();
        insertarStock();

        /* Pregunto por el localStorage y de existir lo inserto en la canasta */
      if (carritoLocalStorage) {
        carritoParse = JSON.parse(carritoLocalStorage);

        for (const producto of carritoParse) {
          inicializarProductos(producto);
        }
      }
      }
    });
  }

  /* Inicializo la cantidad de los productos a los del localStorage
    Y los inserto en la canasta */
  const inicializarProductos = (productoLocal) => {
    
    console.log(productos);
    for (const producto of productos) {
      if (producto.id == productoLocal.id) {
        producto.cantidad = productoLocal.cantidad;
        insertarCanastaLocalStorage(producto);
      }
    }

  }

  /* Agrego el método comprar para el boton de los productos */
  const comprar = () => {
    for (const producto of productos) {
      
      $(`#boton-${producto.id}`).on("click", function () {
        if (producto.stock > producto.cantidad) {
          insertarCanasta(producto);
          carritoHTML.html(`${elementoCarrito.cantidad}`);
          totalCarrito();
        }
      });
    
    }
  }

  /* Agrego el método eliminar producto para el boton del tacho */
  const eliminar = (producto) => {
    $(`#eliminar-${producto.id}`).on("click", function () {
      eliminarProducto(producto);
    });
  }

  /* Agrego el método eliminar producto para el boton del tacho */
  const sumarAlCarrito = (producto) => {
      $(`#cantidadMas-${producto.id}`).on("click", function () {
        if (producto.stock > producto.cantidad) { 
          insertarCanasta(producto);
          carritoHTML.html(`${elementoCarrito.cantidad}`);
          totalCarrito();
        }
    });
  }

  /* Agrego el método eliminar producto para el boton del tacho */
  const restarAlCarrito = (producto) => {
    $(`#cantidadMenos-${producto.id}`).on("click", function () {
      restoProducto(producto);
      carritoHTML.html(`${elementoCarrito.cantidad}`);
      totalCarrito();
    });
  }


  /* Calculo el precio total del producto dependiendo de la cantidad */
  const precioTotal = (precio, cantidad) => {
    return precio * cantidad
  }

  /* Calculo el precio de todos los productos de la canasta */
  const totalCarrito = () => {
    sumaTotalCarrito = 0;
    for (const producto of productos) {
      sumaTotalCarrito += precioTotal(producto.precio, producto.cantidad);
    }

    sumaTotalCarritoHTML.html(`$ ${sumaTotalCarrito}`);
  }


  const eliminarCanastaAux = () => {
    if (arrayCanastaAux[0] != null) {
      arrayCanastaAux.pop();
    }
  }
  /* Realizo el checkout del carrito */
  const realizarCompra = () => {
    for(producto of arrayCanastaAux){
      producto.stock -= producto.cantidad;
      eliminarProducto(producto);
    }

    //Tengo que validar que si no hay stock, sacar el boton de compra y ponerle opacidad

    //Tambien, si en el localStore, hay mas cantidad que Stock, poner la cantidad maxima

    eliminarCanastaAux();
  }

  const insertarStock = () => {
    for (const producto of productos) {
      console.log("Stock viejo " + producto.stock);
      producto.stock = Math.floor(Math.random() * (10 - 1)) + 1;
      console.log("Stock actual " + producto.stock);
    }
  }

  //CÓDIGO
  let carritoHTML = $("#cantidadEnElCarrito");
  let carritoParse;
  let sumaTotalCarrito = 0;
  let sumaTotalCarritoHTML = $("#sumaTotalCarrito");
  

  insertarProductos();

//});
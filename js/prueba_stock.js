const URL_PRODUCTOS = "json/productos.json"



$.get(URL_PRODUCTOS, (respuesta, estado) => {
    if (estado === "success") {
       
    }
});

$.get(URL_PRODUCTOS, (respuesta, estado) => {
    if (estado === "success") {
      for (const producto of respuesta) {
        console.log(producto);
      }
    }
});

//https://stackoverflow.com/questions/56934798/update-value-in-external-json-file-using-jquery/56937250

//edit external json file with jquery with put
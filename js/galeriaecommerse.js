const URL = "json/galeria.json"

$.get(URL, (respuesta, estado) => {
    if (estado === "success") {
      for (const foto of respuesta) {

        if (foto.id < 5) {
            $('#galeria_fotos_1').append(`
            <div class="contenedorGrid__catalogoVinos-card" id="card${foto.id}">
                <div class="contenedorGrid__catalogoVinos-imgBox">
                    <img class="contenedorGrid__catalogoVinos-image" src="${foto.imagen}" alt="Catalogo">
                </div>
            </div>
            `);
        }else{
            $('#galeria_fotos_2').append(`
            <div class="contenedorGrid__catalogoVinos-card" id="card${foto.id}">
                <div class="contenedorGrid__catalogoVinos-imgBox">
                    <img class="contenedorGrid__catalogoVinos-image" src="${foto.imagen}" alt="Catalogo">
                </div>
            </div>
            `);
        }
      }
    }
});
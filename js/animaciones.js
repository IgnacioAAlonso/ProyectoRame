jQuery(() => {
    $(document).ready(function (){
        $("#imagen_portada")
        .animate({left:0, opacity: 1},1500);
    
        $("#contenedor_portada")
        .animate({right:0, opacity: 1},1500);

        var productos = $(".container__favoritos-box");
        var informacion = $("#section_informacion");
        var galeria = $(".contenedorGrid__catalogoVinos-card");
        $(window).scroll(function() {
            var scroll = jQuery(window).scrollTop();
            for (let i = 0; i < productos.length; i++) {
                let alturaProducto = $(`#${i+1}`).offset().top;

                if((alturaProducto - 750) < scroll){
                    $(`#${i+1}`).animate({opacity: 1},1500);
                }
            }

            if ((informacion.offset().top - 750) < scroll) {
                informacion.addClass("mostrarArriba");
                informacion.animate({opacity: 1});
            }

            for (let i = 0; i < galeria.length; i++) {
               let alturaGaleria = galeria.offset().top;
                if((alturaGaleria - 750) < scroll){
                    galeria.addClass("mostrarDerecha");
                    galeria.animate({opacity: 1})
                }
            }
         });  
      });
});
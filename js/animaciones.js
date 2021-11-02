jQuery(() => {
    $(document).ready(function (){
        //Animacion para la Imagen y el Titulo inicial al cargar el documento
        $("#imagen_portada")
        .animate({left:0, opacity: 1},1500);
    
        $("#contenedor_portada")
        .animate({right:0, opacity: 1},1500);

        // Obtengo las referencias de lo que deseo animar
        var productos = $(".container__favoritos-box");
        var informacion = $("#section_informacion");
        var galeria = $(".contenedorGrid__catalogoVinos-card");

        //Funcion al hacer el scroll
        $(window).scroll(function() {
            //Pregunto si existe productos, ya que al cargar puede no tomar las referencias
            if (productos) {
                productos = $(".container__favoritos-box");
            }
            //Toma la referencia del scroll 
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

            if (galeria) {
                galeria = $(".contenedorGrid__catalogoVinos-card");
            }
            let alturaGaleria = galeria.offset().top;

            //Hago las animaciones de la grilla de fotos, y que se ejecute al terminar la anterior
            if((alturaGaleria - 750) < scroll){
                $(`#card1`).addClass("mostrarDerecha");
                $(`#card1`).animate({opacity: 1},
                    function(){
                        $(`#card2`).addClass("mostrarDerecha");
                        $(`#card2`).animate({opacity: 1},
                            function(){
                                $(`#card3`).addClass("mostrarDerecha");
                                $(`#card3`).animate({opacity: 1},
                                    function(){
                                        $(`#card4`).addClass("mostrarDerecha");
                                        $(`#card4`).animate({opacity: 1},
                                            function(){
                                                $(`#card5`).addClass("mostrarDerecha");
                                                $(`#card5`).animate({opacity: 1},
                                                    function(){
                                                        $(`#card6`).addClass("mostrarDerecha");
                                                        $(`#card6`).animate({opacity: 1},
                                                            function(){
                                                                $(`#card7`).addClass("mostrarDerecha");
                                                                $(`#card7`).animate({opacity: 1},
                                                                    function(){
                                                                        $(`#card8`).addClass("mostrarDerecha");
                                                                        $(`#card8`).animate({opacity: 1});
                                                                    });
                                                            });
                                                    });
                                            });
                                    });
                            });
                    });
            }
            
         });  
      });

    // Animaciones para ir a las diferentes secciones de la pagina
    $("#nav_jabones, #nav_jabones2").on("click", function(){
        $("html, body").animate({
            scrollTop: $("#section_jabones").offset().top}, 1000);
    });

    $("#nav_velas, #nav_velas2").on("click", function(){
        $("html, body").animate({
            scrollTop: $("#3").offset().top}, 1000);
    });

    $("#nav_nosotros, #nav_nosotros2").on("click", function(){
        $("html, body").animate({
            scrollTop: $("#section_nosotros").offset().top}, 1000);
    });

    $("#nav_contacto, #nav_contacto2").on("click", function(){
        $("html, body").animate({
            scrollTop: $("#section_contacto").offset().top}, 1000);
    });

    $("#nav_inicio").on("click", function(){
        $("html, body").animate({
            scrollTop: $("#section_inicio").offset().top}, 1000);
    });
});
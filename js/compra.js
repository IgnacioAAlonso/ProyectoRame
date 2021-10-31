let botonCompra = $(`#iniciar_compra`);


    botonCompra.on("click", function(){
    $('#close_offcanvas').trigger("click");
    $('#btn_iniciar_compra').trigger("click");

    realizarCompra();
    });
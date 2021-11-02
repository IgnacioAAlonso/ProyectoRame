let botonCompra = $(`#iniciar_compra`);

botonCompra.on("click", function () {
    //Valido que exista un elemento para simular el click
    if (arrayCanasta[0]) {
        $('#close_offcanvas').trigger("click");
        $('#btn_iniciar_compra').trigger("click");
    }

    //Llamo a la funcion para vaciar el carrito
    realizarCompra();
});
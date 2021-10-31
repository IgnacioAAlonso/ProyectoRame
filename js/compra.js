let botonCompra = $(`#iniciar_compra`);

botonCompra.on("click", function () {
    if (arrayCanasta[0]) {
        $('#close_offcanvas').trigger("click");
        $('#btn_iniciar_compra').trigger("click");
    }

    realizarCompra();
});
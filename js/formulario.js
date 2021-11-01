const URL_POST = "https://jsonplaceholder.typicode.com/posts";

$("#form").on("submit", (e) => {
    e.preventDefault();
    const payload = {email: $("#email").val() };
    if ($("#email").val() != '') {
        $.post(URL_POST, payload, (respuesta, estado) => {
            if (estado === "success") {
                $('#form').trigger("reset");
                $('#btn_accion').trigger("click");
            };
        })
    }
});

const formularioProducto = (producto) => {
    $(`#form-${producto.id}`).on("submit", (e) => {
        e.preventDefault();
        const payload = {email: $(`#email-${producto.id}`).val() };
        if ($(`#email-${producto.id}`).val() != '') {
            $.post(URL_POST, payload, (respuesta, estado) => {
                if (estado === "success") {
                    $(`#form-${producto.id}`).trigger("reset");
                    $('#btn_accion').trigger("click");
                };
            })
        }
    });
}
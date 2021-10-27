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
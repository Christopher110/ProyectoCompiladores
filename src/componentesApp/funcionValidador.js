function validarTexto() {
    // Obtenemos el texto ingresado en el textbox
    var texto = document.getElementById("texto").value;

    // Expresión regular para validar el texto
    var expresionRegular = /\b(libro|cuaderno|hoja|borrador|Estuche|separador|Grapa|resaltador|silicon|canionera|pizarron|Tarea|Bolson|China|Lapiz|ReglaT|Pipa|Goma|Regla|Escuadra|Alfiler|Tapon|Compas|Transportador|Limpiapipas|Corrector|Librillo|Cuadernillo|Agenda|Pin|Mina|Bolsa Clip|Aguja|Dispensador|Boligrafo|Folios|Ordenador|Tinta|Cartucho|rotulador|radio|mouse|ejercicio|Jabon|extension|papel|tableta|gel|grapadora|acuarela|pizarra|nota|algodon|mapa|PapelCrepe|tiza|PistolaSilicon|plasticina|pincel|carton|etiqueta|PostIf|sacapuntas|pegamento|calculadora)\b/g;

    var regexTiposVariables

    // Array para almacenar los tokens encontrados
    var tokensEncontrados = [];

    // Obtenemos las coincidencias con la expresión regular
    var match;
    while ((match = expresionRegular.exec(texto)) !== null) {
        // Obtenemos la descripción del token
        var descripcion = match[0];

        // Obtenemos la posición del token en el texto
        var inicio = match.index;
        var fin = inicio + descripcion.length;

        // Obtenemos el valor del token
        var valor = texto.substring(inicio, fin);

        // Obtenemos la línea de código donde se encuentra el token
        var lineaCodigo = obtenerNumeroLinea(texto, inicio);

        // Creamos el objeto JSON con la información del token
        var token = {
            "token": valor,
            "descripcion": descripcion,
            "valor": valor,
            "lineaCodigo": lineaCodigo
        };

        // Agregamos el token al array
        tokensEncontrados.push(token);
    }

    // Retornamos el array de tokens encontrados en formato JSON
    return JSON.stringify(tokensEncontrados);
}

// Función para obtener el número de línea de un texto dado una posición
function obtenerNumeroLinea(texto, posicion) {
    var lineas = texto.substr(0, posicion).split("\n");
    return lineas.length;
}
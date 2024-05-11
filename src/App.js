import './App.css';
import './estilosParaComponentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState } from 'react';
import FileUploader from './componentesApp/codificacion';
import {validarTexto} from './componentesApp/funcionValidador'
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { Container } from 'react-bootstrap';
//import './assets/chefbims.jc';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [tokens, setTokens] = useState([]);
  const editorRef = useRef(null);

  const onFileUpload = (fileContent) => {
    setFileContent(fileContent);
  };

  function validarTexto() {
    // Obtenemos el texto ingresado en el textbox
    var texto = editorRef.current.editor.getValue();

    console.log(texto)

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
    console.log(JSON.stringify(tokensEncontrados))

    return JSON.stringify(tokensEncontrados);
  }

  // Función para obtener el número de línea de un texto dado una posición
  function obtenerNumeroLinea(texto, posicion) {
      var lineas = texto.substr(0, posicion).split("\n");
      return lineas.length;
  }

  function muestraTokens(){
    const jsonValidaciones = validarTexto();

    setTokens(JSON.parse(jsonValidaciones));
  }


  return ( 
  <>
    <div className="div-padre">  
        <div>
          <FileUploader onFileUpload={onFileUpload} />
        </div>
    
        <div className="superior" style={{padding: 0, margin: 0, alignContent: "initial"}}>
            <h3 style={{color:"white"}}>Code Area</h3>
            <AceEditor
                    ref={editorRef}
                    mode="csharp" // Lenguaje de programación
                    theme="monokai" // Tema del editor
                    onChange={onFileUpload} // Función para manejar cambios en el código
                    value={fileContent} // Valor del código en el editor
                    editorProps={{ $blockScrolling: true, }} // Propiedades del editor
                    fontSize={17}
                    style={{ width: '100%', height: '80%'}} // Estilo del editor
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true
                    }}
            />
        </div>
    
        <div style={{ overflowX: 'auto'}} className="inferior-izquierda">
          <Container style={{display: "flex", justifyContent: "center", alignContent:"center"}}>
            <h1 style={{color:"white", paddingRight: "100px"}}>Tabla Errores</h1>
            <button onClick={muestraTokens} className="btn btn-secondary" style={{height: "35px"}}>Ejecutar</button>
          </Container>

          <table style={{ borderCollapse: "collapse", width: "95%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid white", padding: "3px" }}>Token</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Descripción</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Valor</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Línea de Código</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamos los tokens para renderizar filas de la tabla */}
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.token}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.descripcion}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.valor}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.lineaCodigo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ overflowX: 'auto'}} className="inferior-derecha" >
          <Container style={{display: "flex", justifyContent: "center"}}>
            <h1 style={{color:"white", paddingRight: "100px"}}>Tabla de Tokens</h1>
            <button className="btn btn-secondary" style={{height: "35px"}}>Ejecutar</button>
          </Container>

          <table style={{ borderCollapse: "collapse", width: "95%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid white", padding: "3px" }}>Token</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Descripción</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Valor</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Línea de Código</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeamos los tokens para renderizar filas de la tabla */}
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.token}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.descripcion}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.valor}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.lineaCodigo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </div>
  </>
  );
}

export default App;

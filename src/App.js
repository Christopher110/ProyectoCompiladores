import './App.css';
import './estilosParaComponentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useRef, useState } from 'react';
import FileUploader from './componentesApp/codificacion';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
import { Container } from 'react-bootstrap';
//import './assets/tuto+';

function App() {
  const [fileContent, setFileContent] = useState('');
  const [tokens, setTokens] = useState([]);
  const [erroresLexicos, setErroresLexicos] = useState([]); // Agregando estado para errores léxicos
  const editorRef = useRef(null);

  const onFileUpload = (fileContent) => {
    setFileContent(fileContent);
  };  
    
  // Definir expresiones regulares para diferentes tipos de tokens
  var T_AlcVariables = /\b(Libro|Cuaderno)\b/gi;
  var T_Variables = /\b(Hoja|Borrador|Estuche|Separador|Grapa|Resaltador|Silicon)\b/gi;
  var T_Impinfo = /\b(Canonera|Pizarron)\b/gi;
  var T_ModificadorPu = /\b(Tarea)\b/gi;
  var T_ModificadorPr = /\b(Bolson)\b/gi;
  var T_ModificadorDe = /\b(China)\b/gi;
  var T_ModificadoraPro = /\b(Lapiz)\b/gi;  
  var T_PalabrasClave = /\b(Boligrafo|Etiqueta|Sello|Resaltador|Rotulador|Radio|Mouse|Ejercicio|Jabon|Extensión|Papel|Tableta|Gel|Grapadora|Acuarela|Pizarra|Nota|Algodon|Mapa|PapelCrepe|Tiza|PistolaSilicon|Plasticina|Pincel|Cartón|Folder)\b/gi;
  var T_Sentencias = /\b(Rotulador|Postif|Sacapuntas|Pegamento|Calculadora)\b/gi;
  var T_Operadores = /[+-/*]/g; // Operadores aritméticos
  var T_Digitos = /\b[\d]+\b/g; // Dígitos del 0 al 9
  var T_CaracteresEspeciales = /[!@#$%^&(),.?":{}|<>]/g;
  var T_Comentario = /\/\/.*/g; // Comentario de una línea
  var T_ComentarioMultiLinea = /\/\*[\s\S]*?\*\//g; // Comentario de varias líneas
  var T_palabras = /\b(java|util|scanner|class|Documentocompiladores|static|main|system|out|Ingrese|in|el|primer|digito|num1|nextBorrador|segundo|num2|seleccione|la|operacion|a|realizar|suma|resta|division|multiplicacion|opcion|resultado|num2|num3|Error|numero|mayor|incorrecta|resultado|close|[0-9]|nextHoja|es|un|args)\b/gi;

  function levenshteinDistance(a, b) {
    const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));

    for (let i = 0; i <= a.length; i++) dp[i][0] = i;
    for (let j = 0; j <= b.length; j++) dp[0][j] = j;

    for (let i = 1; i <= a.length; i++) {
        for (let j = 1; j <= b.length; j++) {
            if (a[i - 1] === b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
            }
        }
    }

    return dp[a.length][b.length];
  }

  function calculaPorcentajeCoincidencia(patron, palabra){
    const distancia = levenshteinDistance(patron, palabra);
    const largoMaximo = Math.max(patron.length, palabra.length);
    const porcentajeCoincidencia = ((largoMaximo - distancia) / largoMaximo) * 100;
    return porcentajeCoincidencia
  }

  function validadorPalabra(patron, palabra){
    const porcentajeMatch = calculaPorcentajeCoincidencia(patron, palabra);
    return porcentajeMatch >= 95
  }

  function validarTexto() {
    // Obtenemos el texto ingresado en el editor
    var texto = editorRef.current.editor.getValue();
    
    // Array para almacenar los tokens encontrad
    var tokensEncontrados = [];
    
    // Array para almacenar los errores encontrados
    var errores = [];
  
    // Función para agregar tokens encontrados al array
    function agregarTokens(regex, descripcion) {
      var match;
      
      while ((match = regex.exec(texto)) !== null) {
        var valor = match[0];
        var inicio = match.index;
        var fin = inicio + valor.length;
        var lineaCodigo = obtenerNumeroLinea(texto, inicio);
        var token = { "token": valor, "descripcion": descripcion, "lineaCodigo": lineaCodigo };
        tokensEncontrados.push(token);
      }
    }
  
    // Agregar tokens para cada expresión regular
    agregarTokens(T_AlcVariables, "T_AlcanceVariables");
    agregarTokens(T_Variables, "T_Variables");
    agregarTokens(T_Impinfo, "T_Información Impresa");
    agregarTokens(T_ModificadorPu, "T_Modificador Público");
    agregarTokens(T_ModificadorPr, "T_Modificador Protegido");
    agregarTokens(T_ModificadorDe, "T_Modificador Default");
    agregarTokens(T_ModificadoraPro, "T_Modificador Privado");
    agregarTokens(T_PalabrasClave, "T_Palabras Clave");
    agregarTokens(T_Sentencias, "T_Sentencias");
    agregarTokens(T_Operadores, "T_Operadores");
    agregarTokens(T_Digitos, "T_Dígitos");
    agregarTokens(T_CaracteresEspeciales, "T_Caracteres Especiales");
    agregarTokens(T_Comentario, "T_Comentario");
    agregarTokens(T_ComentarioMultiLinea, "T_ComentarioMultiLinea");
    
    // Validar si las palabras coinciden con las expresiones regulares
    var palabras = texto.match(/\b\w+\b/g) || [];
    palabras.forEach(palabra => {
        if (!palabra.match(T_AlcVariables) &&
            !palabra.match(T_Variables) &&
            !palabra.match(T_Impinfo) &&
            !palabra.match(T_ModificadorPu) &&
            !palabra.match(T_ModificadorPr) &&
            !palabra.match(T_ModificadorDe) &&
            !palabra.match(T_Digitos) &&
            !palabra.match(T_ModificadoraPro) &&
            !palabra.match(T_PalabrasClave) &&
            !palabra.match(T_palabras) &&
            !palabra.match(T_Sentencias)) {
            errores.push({ "token": palabra, "descripcion": "Error léxico: Palabra no reconocida en el contexto actual", "lineaCodigo": obtenerNumeroLinea(texto, texto.indexOf(palabra)) });
        }
    });
  
    // Retornar los tokens y errores encontrados en formato JSON
    return {
      tokensEncontrados: tokensEncontrados,
      errores: errores 
    };
}


  function muestraTokens() {
    const { tokensEncontrados, errores } = validarTexto();
    setTokens(tokensEncontrados || []);
    setErroresLexicos(errores || []);
  }

  // Función para obtener el número de línea de un texto dado una posición
  function obtenerNumeroLinea(texto, posicion) {
      var lineas = texto.substr(0, posicion).split("\n");
      return lineas.length;
  }


 return (
    <>
      <div className="div-padre">
        <div>
          <FileUploader onFileUpload={onFileUpload} />
        </div>

        <div className="superior" style={{ padding: 0, margin: 0, alignContent: "initial" }}>
          <h3 style={{ color: "white" }}>Code Area</h3>
          <AceEditor
            ref={editorRef}
            mode="csharp"
            theme="monokai"
            onChange={onFileUpload}
            value={fileContent}
            editorProps={{ $blockScrolling: true, }}
            fontSize={17}
            style={{ width: '100%', height: '80%' }}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              enableSnippets: true
            }}
          />
        </div>

        <div style={{ overflowX: 'auto' }} className="inferior-izquierda">
          <Container style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
            <h1 style={{ color: "white", paddingRight: "100px" }}>Tabla Errores</h1>
            <button onClick={muestraTokens} className="btn btn-secondary" style={{ height: "35px" }}>Ejecutar</button>
          </Container>

          <table style={{ borderCollapse: "collapse", width: "95%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid white", padding: "3px" }}>Token</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Descripción</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Línea de Código</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeo de errores léxicos */}
              {erroresLexicos.map((error, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{error.token}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{error.descripcion}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{error.lineaCodigo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sección de tokens */}
        <div style={{ overflowX: 'auto' }} className="inferior-derecha" >
          <Container style={{ display: "flex", justifyContent: "center" }}>
            <h1 style={{ color: "white", paddingRight: "100px" }}>Tabla de Tokens</h1>
            <button className="btn btn-secondary" style={{ height: "35px" }}>Ejecutar</button>
          </Container>

          <table style={{ borderCollapse: "collapse", width: "95%" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid white", padding: "3px" }}>Token</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Descripción</th>
                <th style={{ border: "1px solid white", padding: "3px" }}>Línea de Código</th>
              </tr>
            </thead>
            <tbody>
              {/* Mapeo de tokens */}
              {tokens.map((token, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.token}</td>
                  <td style={{ border: "1px solid white", padding: "3px" }}>{token.descripcion}</td>
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
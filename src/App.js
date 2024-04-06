import './App.css';
import './estilosParaComponentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import FileUploader from './componentesApp/codificacion';
import AceEditor from 'react-ace';
import "ace-builds/src-noconflict/mode-csharp";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";
//import './assets/chefbims.jc';

function App() {
  const [fileContent, setFileContent] = useState('');

  const onFileUpload = (fileContent) => {
    setFileContent(fileContent);
  };

  return ( 
  <>
    <div className="div-padre">  
        <div className="test">
          <FileUploader onFileUpload={onFileUpload} />
        </div>
    
        <div className="superior" style={{padding: 0, margin: 0}}>
            <h1 style={{color:"white"}}>Area de codigo</h1>
            <AceEditor
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
    
        <div className="inferior-izquierda">
          <h1 style={{color:"white"}}>Tabla Errores</h1>
          <button>Ejecutar</button>
        </div>

        <div className="inferior-derecha" style={{padding: 0, margin: 0}}>
          <h1 style={{color:"white"}}>Tabla de Tokens</h1>
          <button>Ejecutar</button>
        </div>
    </div>
  </>
  );
}

export default App;

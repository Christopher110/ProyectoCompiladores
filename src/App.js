import './App.css';
import swal from 'sweetalert';
import './estilosParaComponentes.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import FileUploader from './componentesApp/codificacion';

function App() {
  const [fileContent, setFileContent] = useState('');

  const onFileUpload = (fileContent) => {
    setFileContent(fileContent);
  };

  function funcionPrueba(){
    swal("Completado","El archivo se cargo correctamente","success");
  }

  return ( 
  <>
    <div className="div-padre">  
        <div className="test">
          <FileUploader onFileUpload={onFileUpload} />
        </div>
    
        <div className="superior" style={{padding: 0, margin: 0}}>
            <h1 style={{color:"white"}}>Area de codigo</h1>
            <textarea className="responsive-textarea" value={fileContent} readOnly={false}>Ingresar texto</textarea>
        </div>
    
        <div className="inferior-izquierda">
          <h1 style={{color:"white"}}>Tabla Errores</h1>
          <button className="btn btn-primary" style={{backgroundColor:"black", borderLeftColor:"gray", borderRightColor:"gray", borderTopColor:"gray", borderBottomColor:"gray"}}>test</button>
        </div>

        <div className="inferior-derecha" style={{padding: 0, margin: 0}}>
          <h1 style={{color:"white"}}>Tabla de Tokens</h1>
        </div>
    </div>
  </>
  );
}

export default App;

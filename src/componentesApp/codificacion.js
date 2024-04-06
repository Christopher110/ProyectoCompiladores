import React, {useState} from 'react';
import swal from "sweetalert";
import "./estilosComponentes.css"

const FileUploader = ({ onFileUpload }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        try {
            if (selectedFile) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const content = event.target.result;
                    onFileUpload(content); // Llama a la función proporcionada como prop
                };
                reader.readAsText(selectedFile);
                swal("Completado","El archivo se cargo correctamente","success");
            } else {
                swal("Error","No se ha cargado ningún archivo","error");
            }            
        } catch (error) {
            swal("Oophs!","Ocurrio un error","error");
        }

    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} style={{color:"white"}}/>
            <button onClick={handleUpload} class="btn btn-primary" style={{backgroundColor:"black", borderLeftColor:"gray", borderRightColor:"gray", borderTopColor:"gray", borderBottomColor:"gray"}}>Subir archivo</button>
        </div>
    );
};

export default FileUploader;
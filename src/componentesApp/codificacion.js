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
        <div style={{display:"flex", justifyContent:"space-between", alignContent:"center"}}>
            <img src="logotutotest.png" width={"200px"} className="invertir-color-imagen"></img>

            <div style={{display: "flex", justifyContent: "right", alignContent: "right"}}>
                <input type="file" onChange={handleFileChange} style={{color:"white", paddingRight: "80px", fontSize: "17px"}}/>
                <button onClick={handleUpload} class="btn btn-primary" style={{height: "40px"}}>Subir archivo</button>
            </div>
        </div>
    );
};

export default FileUploader;
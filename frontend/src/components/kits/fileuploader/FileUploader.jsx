import { useRef, useState } from 'react'
import { FaFileUpload } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

import './FileUploader.scss';

const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
const KILO_BYTES_PER_BYTE = 1000;

const FileUploader = ({ label, updateFilesCb, multiple = true, maxFile, maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES }) => {
    const [files, setFiles] = useState({});
    const fileInputField = useRef(null);

    const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

    const handleUpLoadBtnClick = () => {
        fileInputField.current.click();
    }

    const handleNewFileUpload = (e) => {
        if (Object.keys(files).length+1 <= maxFile) {
            const { files: newFiles } = e.target;
            if (newFiles.length) {
                let updateFiles = addNewFiles(newFiles);
                setFiles(updateFiles);
            }
        }
        else{
            toast.warn(`Vous ne pouvez déposer que ${maxFile} photos`)
        }
    }

    const addNewFiles = (newFiles) => {
        for (let file of newFiles) {
            if (file.size <= maxFileSizeInBytes) {
                if (!multiple) {
                    return { file };
                }
                files[file.name] = file;
            }
            else {
                toast.info('La taille du fichier ne doit pas dépasser : ' + convertBytesToKB(maxFileSizeInBytes) + ' ko');
            }
        }
        return { ...files }
    }

    const convertNestedObjectToArray = (nestedObj) => {
        return Object.keys(nestedObj).map((key) => nestedObj[key])
    }

    const callUpdateFilesCb = (files) => {
        const filesAsArray = convertNestedObjectToArray(files);
        updateFilesCb(filesAsArray);
    }

    const removeFile = (filename) => {
        if (window.confirm("Voulez-vous supprimer cette image ?")) {
            delete files[filename];
            setFiles({ ...files });
        }
    }

    const handleSendFile=()=>{
        callUpdateFilesCb({ ...files });
    }

    return (
        <div className="file-uploader">
            <ToastContainer />
            <section className='file-upload-container'>
                <label className='input-label'>{label}</label>
                <p className='drag-drop-text'>Glisser vos fichiers ici ou </p>
                <button type="button" className="upload-file-btn" onClick={handleUpLoadBtnClick}>
                    <FaFileUpload className='upload-icon' /><span className='btn-title'>Téléchargez vos fichiers</span>
                </button>
                <input
                    className='form-field'
                    type="file"
                    ref={fileInputField}
                    value=""
                    title=" "
                    accept="image/png, image/jpeg"
                    onChange={handleNewFileUpload}
                />
            </section>
            <article className='file-preview-container'>
                <span>A télécharger</span>
                <section className="preview-list">
                    {Object.keys(files).map((fileName, index) => {
                        let file = files[fileName];
                        let isImageFile = file.type.split('/')[0] === "image";
                        return (
                            <section key={fileName} className="preview-container">
                                <div>
                                    {isImageFile && (
                                        <img src={URL.createObjectURL(file)}
                                            alt={`file preview ${index}`} className="image-preview" />
                                    )}
                                    <div className={isImageFile ? "file-meta-data-image" : "file-meta-data"} >
                                        <span>{file.name}</span>
                                        <aside>
                                            <span>{convertBytesToKB(file.size)} kb</span>
                                            <FaTrash className='trash-icon' onClick={() => removeFile(fileName)} />
                                        </aside>
                                    </div>
                                </div>
                            </section>
                        )
                    })}
                </section>
            </article>
           { Object.keys(files).length>0? <button onClick={handleSendFile}>Valider</button>:null}
        </div>
    )
}

export default FileUploader

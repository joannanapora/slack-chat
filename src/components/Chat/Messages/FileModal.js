import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone'
import { Button, FormHeader } from "../../../styledComponents/FormStyled"
import { WrapFileName } from "../../../styledComponents/ChannelsStyled"
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



const FileModal = ({ closeModal, onSend, onDrop, fileName }) => {

    useEffect(() => {
    }, [fileName])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })


    const onCancel = () => {
        closeModal();
    }


    return (
        <div>
            <FormHeader>Select an Image File</FormHeader>
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <div>Drag 'n' drop image files here or <Button primary >{fileName ? <WrapFileName>{fileName}</WrapFileName> : 'Choose File'}</Button></div>
                }
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                <Button onClick={onSend} type='button' secondary><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faCheck} />Send</Button>
                <Button onClick={onCancel} type='button' secondary><FontAwesomeIcon style={{ marginRight: '5px' }} icon={faTimes} />Cancel</Button>
            </div>
        </div>
    )
}


export default FileModal;



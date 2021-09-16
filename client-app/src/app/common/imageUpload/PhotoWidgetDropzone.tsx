import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { Header, Icon } from 'semantic-ui-react'

interface Props{
    setFiles: (files: any) => void;
}

const PhotoWidgetDropzone = ({setFiles}: Props) => {
    const dzStyles = {
        border: 'dashed 3pc #eee',
        borderRadius: '5px',
        borderColor: '#eee',
        paddingTop: '30px',
        boxShadow: '2px, 2px, 5px black',
        textAlign: 'center' as 'center',
        height: '200'
    }

    const dzActive = {
        borderColor: 'green'
    }

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
  }, [setFiles])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div {...getRootProps()} style={isDragActive ? {...dzStyles, ...dzActive} : dzStyles}>
        <input {...getInputProps()} />
        <Icon name='upload' size='huge'/>
        <Header content='Drop image here'/>    
    </div>
  )
} 

export default PhotoWidgetDropzone
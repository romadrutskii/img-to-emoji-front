import React from 'react'
import { useDropzone } from 'react-dropzone'
import loadingSvg from './puff.svg'

const getClassName = (className, isActive) => {
  if (!isActive) return className
  return `${className} ${className}-active`
}

const Dropzone = ({onDrop, accept, predictions, loading, error}) => {
  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    accept,
  })

  let emoji = predictions.map(prediction => prediction.emoji.map(emoji => emoji.score >= 0.95 && (
      <span className="emoji-text" key={prediction.probability + emoji.emoji.char}>{emoji.emoji.char}</span>
  )))
  if (emoji.every(arr => arr.every(item => !item))) {
    emoji = false
  }

  if (loading) return (
      <div className="dropzone loading"><img src={loadingSvg} alt="loading" width={200} height={200}/></div>
  )
  return (
      <div className="dropzone" {...getRootProps()}>
        <input className="dropzone-input" {...getInputProps()} />
        <div className="text-center">
          {isDragActive ? (
              <div className={getClassName('dropzone-background', isDragActive)}>
                <div className="dropzone-cloud"></div>
                <div className="dropzone-arrow"></div>
                <div className={getClassName('dropzone-text', isDragActive)}>Drop image here</div>
              </div>
          ) : ''}

          {predictions.length ? (
              <div className="emoji">
                {emoji.length ? emoji : <span className="dropzone-text">Can't see any emoji here 😔</span>}
              </div>
          ) : error ? (
              <span className="dropzone-text">{error}</span>
          ) : (
              <span className="dropzone-text">
                Drag 'n' drop some files here, or click to select files
              </span>
          )}
        </div>
      </div>
  )
}

export default Dropzone

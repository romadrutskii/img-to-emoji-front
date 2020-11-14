import React, { useCallback, useState } from 'react'
import axios from 'axios'

import Dropzone from './Dropzone'

import './normalize.css'
import './App.css'

function App() {
  const [predictions, setPredictions] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = useCallback(async files => {
    if (files.length === 1) {
      const formData = new FormData()
      formData.append('image', files[0])

      setLoading(true)
      axios({
        method: 'post',
        url: 'https://img-to-emoji-back.herokuapp.com/get-emoji',
        data: formData,
        headers: {'Content-Type': 'multipart/form-data'},
      })
          .then(response => {
            setLoading(false)
            console.log(response.data)
            setPredictions(response.data)
          })
          .catch(error => {
            setLoading(false)
            console.log(error.response.data)
            setError(error.response.data)
          })
    }

    // this.setState({
    //   file: URL.createObjectURL(event.target.files[0]),
    // })
    // console.log(event)

  }, [])

  return (
      <main className="App">
        <Dropzone onDrop={onDrop} accept={'image/*'} predictions={predictions} loading={loading} error={error}/>
      </main>
  )
}

export default App

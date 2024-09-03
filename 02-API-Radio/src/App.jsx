import { useState, useEffect } from 'react'
import Radio from './Radio'


function App() {

  const [data, setData] = useState([])  
  const [play, setPlay] = useState(false)
  const [repoduccion, setReproduccion] = useState(() => {
    return(
      <div className="play"></div>
    )
  })


  
  useEffect( () => {
    const url = 'https://api.boostr.cl/radios.json';
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(url, options)
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(err => console.error('error:' + err));
  },[])

  useEffect(() => {
    if(play){
      setReproduccion(
        () => {
          return(
            <div className="loading">
              <div className="load"></div>
              <div className="load"></div>
              <div className="load"></div>
              <div className="load"></div>
            </div>
          )
        })
    }
  }, [play])


  const iniciarRadio = () => {
    setPlay(!play)
  }

  // const resetRadio = () =>{
  //   setPlay(false)
  //   setReproduccion(elementReproducción)
  // }


  return (
    <main>
        <div className="currentplaying">
          <p className="heading">Radio</p>
        </div>
        <Radio data={data} iniciarRadio={iniciarRadio} reproduciendo={repoduccion}></Radio>
        <audio controls>
          <source src="https://redirector.dps.live/digitalfm/aac/icecast.audio" type="audio/aac" />
                Tu navegador no soporta el elemento de audio.
        </audio>
    </main>
  )
}

export default App

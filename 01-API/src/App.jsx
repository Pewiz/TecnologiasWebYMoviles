import { useEffect, useState } from 'react';
import DiaFeriado from './components/DiaFeriado';
import { getRandomColor } from './constantes';
import './App.css';

function App() {
  const [data, setData] = useState([]);
  
  const tipoFeriado = (element) => {
    return(
      element.inalienable? '👔 Irrenunciable' : ' 😎 Renunciable'
    )
  }

  useEffect(() => {
    const url = 'https://api.boostr.cl/holidays.json';
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    fetch(url, options)
      .then(res => res.json())
      .then(json => setData(json.data))
      .catch(err => console.error('error: ' + err));
  }, []);

  
  return (
    <>
    <section className='cajaElementos'>
      <h1>Todos los feriados del año 🎉</h1>
      <div className='cajaDia'>
        <DiaFeriado data={data} tipoFeriado={tipoFeriado} getRandomColor={getRandomColor}></DiaFeriado>
      </div>
    </section>

    <footer>
        <address>Creado por David Osorio</address>
    </footer>

    </>
  );
}

export default App;

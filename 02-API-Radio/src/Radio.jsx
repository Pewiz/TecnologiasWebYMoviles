
const Radio = ({data, iniciarRadio, reproduciendo}) => {
    return(
        data.map((elemento) => {
            return(
              <section key={elemento.name} onClick={iniciarRadio} >
                  <div className='loader'>
                  <div className="song">
                    <p className="name">{elemento.name}</p>
                    <p className="artist">{elemento.url}</p>
                  </div>
                  <div className="albumcover"><img src={elemento.image[200]} alt="Logo de Radio" /></div>
                  {reproduciendo}

                  
                </div>
              </section>
            )
          }
          
        )
    )
}

export default Radio
import confetti from "canvas-confetti";

const DiaFeriado = ({ data, tipoFeriado, getRandomColor }) => {

  const ejecutarConfetti = (event) => {
    const { clientX: x, clientY: y } = event;
    confetti({
      particleCount: 100,
      startVelocity: 30,
      spread: 360,
      origin: {
        x: x / window.innerWidth,  // Normaliza la coordenada X o sea obtiene valores entre 0 y 1 para que los confettis no se salga de la ventana
        y: y / window.innerHeight, // Normaliza la coordenada Y o sea obtiene valores entre 0 y 1 para que los confettis no se salga de la ventana
      }
    });
  };

  return (
    data.map((element) => {
      return (
        <article
          onClick={ejecutarConfetti}
          key={element.date}
          className="contenedorDia"
          style={{ backgroundColor: getRandomColor() }}
        >
          <div className="text">
            <div>📆 {element.date}</div>
            <div>🥳 {element.title}</div>
            <div>{tipoFeriado(element)}</div>
          </div>
          <div className="overlay"></div>
        </article>
      );
    })
  );
};

export default DiaFeriado;

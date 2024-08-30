import { ejecutarConfetti } from "../constantes";

const DiaFeriado = ({ data, tipoFeriado, getRandomColor }) => {

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

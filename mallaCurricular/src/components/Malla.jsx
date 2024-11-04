import { useState, useEffect } from 'react';
import '../style/malla.css'; 

const Malla = () => {
  const [ramos, setRamos] = useState([]);
  const [selectedRamos, setSelectedRamos] = useState(null);

  useEffect(() => {
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => setRamos(data.ramos));
  }, []);

  const handleClick = (ramo) => {
    if (selectedRamos && selectedRamos.name === ramo.name) {
      setSelectedRamos(null); 
    } else {
      setSelectedRamos(ramo);
    }
  };
  const insertHyphen = (text) => {
    return text.replace(/(Electromag)(netismo)/, "$1&shy;$2");
  };

  const renderButton = (ramo) => {
    const isSelected = selectedRamos && selectedRamos.name === ramo.name;
    const hasPrev = selectedRamos && selectedRamos.prev.includes(ramo.name);
    const hasNext = selectedRamos && selectedRamos.next.includes(ramo.name);

    let buttonClass = '';
    if (isSelected) {
      buttonClass = 'selected';
    } else if (hasPrev) {
      buttonClass = 'prev';
    } else if (hasNext) {
      buttonClass = 'next';
    }

    return (
      <button key={ramo.name} className={buttonClass} onClick={() => handleClick(ramo)}>
        <span dangerouslySetInnerHTML={{ __html: insertHyphen(ramo.name) }} />
      </button>
    );
  };

  const semesters = ramos
                    .map((ramo) => ramo.semester)
                    .filter((semester, index, self) => self.indexOf(semester) === index);


  return (
    <div className="malla-grid">
      {semesters.map((semester) => (
        <div key={semester} className="semester-column">
          <h3>Semestre {semester}</h3>
          {
            ramos
            .filter((ramo) => ramo.semester === semester)
            .map(renderButton)
          }
        </div>
      ))}
    </div>
  );
};

export default Malla;
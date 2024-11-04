import '../style/footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faFacebookF, faYoutube } from '@fortawesome/free-brands-svg-icons'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-md-4 line">
            <h4>Enlaces de Interés</h4>
            <ul>
              <li><a href="https://www.ulagos.cl/dgac/" target="_blank">Aseguramiento de la Calidad</a></li>
              <li><a href="https://pmi.ulagos.cl/" target="_blank">PMI ULagos</a></li>
              <li><a href="https://use.ulagos.cl/" target="_blank">Unidad Seguimiento Egresados</a></li>
              <li><a href="https://web.helen.cl/web_ulagos/" target="_blank">Fondo Solidario Crédito Universitario</a></li>
              <li><a href="https://dai.ulagos.cl/" target="_blank">Análisis Institucional</a></li>
              <li><a href="https://www.ulagos.cl/prevencionacoso/" target="_blank">Prevención Acoso</a></li>
              <li><a href="https://direcciondegenero.ulagos.cl/" target="_blank">Dirección de Igualdad de Género</a></li>
              <li><a href="http://icorporativa.ulagos.cl/" target="_blank">Unidad de Imagen Corporativa</a></li>
              <li><a href="http://udedoc.ulagos.cl/" target="_blank">Udedoc</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h4>Empleos y Herramientas</h4>
            <ul>
              <li><a href="http://portaltrabajos.ulagos.cl/" target="_blank">Portal de empleos</a></li>
              <li><a href="https://www.ulagos.cl/concursos-publicos/" target="_blank">Llamados a concurso</a></li>
              <li><a href="https://biblioteca.ulagos.cl/" target="_blank">Biblioteca en línea</a></li>
              <li><a href="https://escritorio.acepta.com/portalboletas/buscarboletaindex.php" target="_blank">Consulta Boleta Electrónica</a></li>
              <li><a href="https://admision.ulagos.cl/index.php/admision/carreras/ulagos.cl/sistema-delfos/" target="_blank">Sistema Delfos</a></li>
              <li><a href="https://pagos.ulagos.cl/" target="_blank">Pagos Online</a></li>
              <li><a href="https://www.ulagosvirtual.cl/login/index.php" target="_blank">ULagosVirtual</a></li>
            </ul>
          </div>
          
        </div>
        <div className='containerMedio'>
        <div className="col-md-4">
            <img className='imgFooter' src="https://res.cloudinary.com/doq82xcpd/image/upload/v1730388316/u6tzkfnfo6rutj9ljoqe.png" alt="Medios Ulagos" />
            <ul className="social-links">
              <li><a href="https://web.facebook.com/admision.ulagos?_rdc=1&_rdr" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebookF} style={{color: "#ffffff",}} /></a></li>
              <li><a href="https://www.instagram.com/admision.ulagos/" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff",}} /></a></li>
              <li><a href="https://www.youtube.com/channel/UC2iG8Kg8uOqa6sFMYH0jo1g" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faYoutube} style={{color: "#ffffff",}} /></a></li>
            </ul>
            <div className='brand-data'>
              <p className='casaCentral'>Casa Central</p>
              <p>Lord Cochrane 1046</p>
              <p>Teléfono 56 642333000</p>
              <p>Osorno, Chile</p>
            </div>
          </div >
        </div>
      </div>
    </footer>
  );
};

export default Footer;
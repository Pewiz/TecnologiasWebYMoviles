import '../style/topBar.css';

const Footer = () => {
  return (
    <>
        <div className='topBar'>
            <div><a href="https://admision.ulagos.cl/index.php/home" target="_blank"><img src="https://res.cloudinary.com/doq82xcpd/image/upload/v1730396958/hcdm7gwagrz84vth9uem.svg" alt="Ulagos Logo" /></a></div>
            <div className='title'><h1>Malla Curricular ICINF 2020</h1></div>
            <button className='btn-admision' ><a className='text' href="https://admision.ulagos.cl/index.php/admision/carreras/ingcivil-informatica" target="_blank">Admisión</a></button>
        </div>
    </>
  );
};

export default Footer;
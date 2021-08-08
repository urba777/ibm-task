import { Link } from 'react-router-dom';

const Footer = (props) => {

    return (
        <div className='footer'>
            <div style={{color: 'rgba(255,255,255,0.5)'}}>
                Deividas Urbanavičius | IBM {(props.language === 'en') ? 'task' : 'užduotis'} | 2021
            </div>
            <div className='footerButtons'>
            <Link to='/'>
                        <h5 className='headerButton'>{(props.language === 'en') ? 'Gallery' : 'Galerija'}</h5>
                    </Link>
                    <Link to='/upload'>
                        <h5 className='headerButton'>{(props.language === 'en') ? 'Upload' : 'Įkelti'}</h5>
                    </Link>
            </div>
        </div>
    )
}

export default Footer;
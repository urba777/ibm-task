import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import enIcon from '../images/en.svg'
import ltIcon from '../images/lt.svg'

const Header = (props) => {

    const [englishIconBorderColor, setEnglishIconBorderColor] = useState('1px solid white');
    const [lithuanianIconBorderColor, setLithuanianIconBorderColor] = useState('');

    useEffect(() => {
        if (props.language === 'en') {
            setEnglishIconBorderColor('1px solid white');
            setLithuanianIconBorderColor('none');
        } else if (props.language === 'lt') {
            setEnglishIconBorderColor('none');
            setLithuanianIconBorderColor('1px solid white');
        }
    }, [props.language]);

    return (
        <div className='header'>
            <div className='headerWrapper'>
                <div className='headerButtons'>
                    <Link to='/'>
                        <h5 className='headerButton'>{(props.language === 'en') ? 'Gallery' : 'Galerija'}</h5>
                    </Link>
                    <Link to='/upload'>
                        <h5 className='headerButton'>{(props.language === 'en') ? 'Upload' : 'Įkelti'}</h5>
                    </Link>
                </div>
                <div className='languages'>
                    <img style={{ border: englishIconBorderColor }} onClick={() => props.setLanguage('en')} className='languageIcon' src={enIcon} alt='English'></img>
                    <img style={{ border: lithuanianIconBorderColor }} onClick={() => props.setLanguage('lt')} className='languageIcon' src={ltIcon} alt='Lithuanian'></img>
                </div>
            </div>
        </div>
    )
}

export default Header;
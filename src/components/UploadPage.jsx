import { useState } from "react";
import { Link } from 'react-router-dom';


const UploadPage = props => {

    const [fileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [imageName, setImageName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [redirectNumber, setRedirectNumber] = useState(0);

    //adding file from input
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    }

    //adding file name from input
    const handleFileInputNameChange = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setImageName(value);
    }

    //shows the image that user selected to upload
    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    //file submit
    const handleSubmitFile = (e) => {
        e.preventDefault();
        if (!previewSource) return;
        uploadImage(previewSource);
    }

    //file upload
    const uploadImage = async (image) => {
        if (imageName && previewSource) {
            try {
                setRedirectNumber(1);
                await fetch('/api/upload', {
                    method: 'POST',
                    body: JSON.stringify({ data: image, name: imageName }),
                    headers: { 'Content-type': 'application/json' }
                });
            } catch (error) {
                console.error(error);
                setRedirectNumber(2);
            }
        } else {
            if (!imageName && previewSource) {
                setErrorMessage((props.language === 'en') ? 'Enter image name!' : 'Pavadinimo laukelis privalomas!');
            } else if (!previewSource && imageName) {
                setErrorMessage((props.language === 'en') ? 'Select photo to upload!' : 'Pasirinkite nuotrauką!');
            } else if (!previewSource && !imageName) {
                setErrorMessage((props.language === 'en') ? 'Select photo to upload and enter its name!' : 'Pasirinkite nuotrauką ir priskirkite jai pavadinimą!');
            }
        }
    }

    //return
    if (redirectNumber === 1) {
        return (
            <div className='uploadPage' style={{ textAlign: 'center' }}>
                <h4 style={{ color: 'green', textAlign: 'center' }}>{(props.language === 'en') ? 'Image uploaded!' : 'Nuotrauka įkelta!'}</h4>
                <h5 style={{ color: 'green', textAlign: 'center' }}>{(props.language === 'en') ? "It may take some time for the server to display the new image. Go to the gallery and if you don't see the new image, try reloading the page." : 'Gali praeiti šiek tiek laiko, kol serveris parodys naują vaizdą. Jeigu galerijoje nematote naujo paveiksliuko - pabandykite perkrauti puslapį.'}</h5>
                <Link to='/'>
                    <button onClick={() => setRedirectNumber(0)} className='btn'>{(props.language === 'en') ? 'Gallery' : 'Galerija'}</button>
                </Link>
            </div>
        );
    } else if (redirectNumber === 2) {
        return (
            <div className='uploadPage' style={{ textAlign: 'center' }}>
                <h4 style={{ color: 'red', textAlign: 'center' }}>{(props.language === 'en') ? 'Something is wrong with the server!' : 'Problemos su serveriu!'}</h4>
                <Link to='/'>
                    <button onClick={() => setRedirectNumber(0)} className='btn'>{(props.language === 'en') ? 'Home' : 'Pagrindinis'}</button>
                </Link>
            </div>
        )
    } else {
        return (
            <div className='uploadPage'>
                {!previewSource && (<h3 style={{ textAlign: 'center' }}>{(props.language === 'en') ? 'Select an image to upload.' : 'Pasirinkite nuotrauką įkėlimui'}</h3>)}
                <form onSubmit={handleSubmitFile}>
                    <input
                        type='file'
                        name='image'
                        className="btn"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                    />
                    {previewSource && (<img className='previewImage' src={previewSource} alt='Preview' />)}
                    {previewSource && (<input
                        type='text'
                        onChange={handleFileInputNameChange}
                        placeholder={(props.language === 'en') ? 'Enter name' : 'Įveskite pavadinimą'}
                        style={{ color: 'black' }}
                    />)}

                    {previewSource && (<button className="btn" type="submit">{(props.language === 'en') ? 'Upload' : 'Įkelti'}</button>)}
                    <h4 style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</h4>
                </form>
            </div>
        );
    }
}

export default UploadPage;
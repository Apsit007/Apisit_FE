import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface Props {
    VisitorName: string;
    VisitorCount: number;
}
interface Props {
    VisitorName: string;
    VisitorCount: number;
}
function Header({ VisitorName, VisitorCount }: Props) {
    const handleDownload = () => {
        const pdfUrl = 'https://github.com/Apsit007/Apisit_FE/raw/main/src/assets/Apisit_Purisan.pdf'; // Replace with the actual PDF URL
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Apisit_Purisan.pdf'; // Specify the desired downloaded file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };
    return (
        <>
            <div className='navbar d-flex justify-content-between p-3'>
                <p>Hi : {VisitorName}</p>
                <div className='d-flex gap-5'>
                    <div>
                        <FontAwesomeIcon icon={faUser} />   {VisitorCount}
                    </div>
                    <p onClick={handleDownload} style={{ cursor: 'pointer' }}>CV</p>
                </div>
            </div>
        </>
    )
}

export default Header
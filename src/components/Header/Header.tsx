import './Header.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface Props {
    VisitorName: string;
    VisitorCount: number;
}
function Header({ VisitorName, VisitorCount }: Props) {

    return (
        <>
            <div className='navbar d-flex justify-content-between p-3'>
                <p>Hi : {VisitorName}</p>
                <div className='d-flex gap-5'>
                    <div>
                        <FontAwesomeIcon icon={faUser} />   {VisitorCount}
                    </div>
                    <p>CV </p>
                </div>
            </div>
        </>
    )
}

export default Header
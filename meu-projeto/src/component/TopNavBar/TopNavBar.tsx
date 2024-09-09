import { Link } from 'react-router-dom';
import './topNavBar.css';

export const TopNavBar = () =>{
    return(
        <div>
            <div className="topNavbar">
                <p>Artisan Vault</p>
                <button className='logoutBTN'><Link to={"/"}><p>Logout</p> </Link></button>
            </div>
        </div>
    );
}
import './Sidebar.scss';
import { LogoIcon } from '../icons/Logo';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { menuItems } from './menuData';

const Sidebar = () => {
    const params = useParams();
    console.log('params', params)
    const [active, setActive] = useState('');


    return (
        <nav className="nav">
            <ul className="nav-list">
                <li key="logo" className="logo">
                    <Link to="/">
                        <LogoIcon />
                    </Link>
                </li>
                {menuItems.map(({ path, element }, idx) => {
                    return (
                        <li
                            key={idx}
                            className={`nav-item ${active === idx && "nav-active"}`}
                        >
                            <Link to={path} onClick={() => setActive(idx)}>{element}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )

}

export default Sidebar;
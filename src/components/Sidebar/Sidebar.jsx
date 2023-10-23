import './Sidebar.scss';
import { LogoIcon } from '../icons/Logo';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { menuItems } from './menuData';

const Sidebar = () => {
    const location = useLocation();
    const [active, setActive] = useState(location.pathname.slice(1));

    useEffect(() => {
        setActive(location.pathname.slice(1));
    }, [location.pathname])

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
                            className={`nav-item ${active === path && "nav-active"}`}
                        >
                            <Link to={path} onClick={() => setActive(path)}>{element}</Link>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )

}

export default Sidebar;
import { Outlet } from "react-router";
import Sidebar from "../Sidebar"

const DefaultLayout = () => {
    return (
        <>
            <Sidebar />
            <div className="page-container">
                <Outlet />
            </div>
        </>
    )
}

export default DefaultLayout;
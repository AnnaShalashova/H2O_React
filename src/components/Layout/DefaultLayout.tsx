import { Outlet } from 'react-router';
import Sidebar from '../Sidebar';

export const DefaultLayout = () => {
  return (
    <>
      <Sidebar />
      <div className="page-container">
        <Outlet />
      </div>
    </>
  );
};

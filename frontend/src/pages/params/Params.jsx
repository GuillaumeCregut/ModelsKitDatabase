import { Outlet } from 'react-router-dom';
import ParamsMenu from '../../components/parameters/paramsmenu/ParamsMenu';
import './Params.scss';

export const Params = () => {
  return (
    <div className='params'>
      <ParamsMenu />
      <Outlet />
    </div>
  )
}

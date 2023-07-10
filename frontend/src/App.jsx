import { useEffect,useState } from 'react';
import { Routes, Route } from 'react-router-dom';
/* Common components*/
import { NavBar } from './components/navbar/NavBar';
import { Footer } from './components/footer/Footer';
import { Header } from './components/header/Header';
import { NotFound } from './components/notfournd/NotFound';
import Login from './components/login/Login';
import SignUp from './components/signup/SignUp';
import { ToastContainer, toast } from 'react-toastify';
/* Pages principales*/
import { Home } from './pages/home/Home';
import { Params } from './pages/params/Params';
import { Profil } from './pages/profil/Profil';
import { Kits } from './pages/kits/Kits';
/* Composants de la page admin */
import AdminPage from './pages/adminpage/AdminPage';
/*Composants de la page paramètres */
import ParamsHome from './components/parameters/paramshome/ParamsHome'; 
import AreaContainer from './components/parameters/areacontainer/AreaContainer';
import BuilderContainer from './components/parameters/buildercontainer/BuilderContainer';
import BrandContainer from './components/parameters/brandcontainer/BrandContainer';
import CategoryContainer from './components/parameters/categorycontainer/CategoryContainer';
import ScaleContainer from './components/parameters/scalecontainer/ScaleContainer';
import CountryContainer from './components/parameters/countrycontainer/CountryContainer';
import ModelsContainer from './components/parameters/modelscontainer/ModelsContainer';
/*Secure files */
import RequireAuth from './components/requireauth/RequireAuth';
import ranks from './feature/ranks';
import useAuth from './hooks/useAuth';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import kitState from './feature/kitState';
/*User profil components */
import UserData from './components/userprofil/userdata/UserData';
import UserSupplier from './components/userprofil/usersupplier/UserSupplier';
import Orders from './components/userprofil/orders/Orders';
import Statistics from './components/userprofil/statistics/Statistics';
import PdfStats from './components/userprofil/pdfstats/PdfStats';
import Users from './components/userprofil/social/users/Users';
import Messages from './components/userprofil/messages/Messages';
/*User stock */
import KitsHome from './components/kits/home/KitsHome';
import KitManagement from './components/kits/kitmgmt/KitManagement';
import FinishedModel from './components/kits/finishedmodel/FinishedModel';
import KitDetails from './components/kits/kitdetails/KitDetails';
import KitInStock from './components/kits/kitinstock/KitInStock';
import Random from './components/kits/random/Random';
import KitDetailsPage from './components/kits/kitmgmt/kitcard/kitdetailspage/KitDetailsPage';
//Admin Menu
import Logs from './components/admin/logs/Logs';
import UserMgmt from './components/admin/usersmgmt/UserMgmt';





import './App.scss';
import './LeftMenu.scss';
import "react-toastify/dist/ReactToastify.css";


//Version of front end 
const LocalVersion="1.2";

function App() {
  const { auth, setAuth } = useAuth();
  const localStorageUser = JSON.parse(localStorage.getItem('ModelsKitUser'));
  const [versionChecker,setVersionChecker]=useState(true);

  useEffect(()=>{
    const url=`${import.meta.env.VITE_APP_URL}`;
    axios
      .get(url)
      .then((resp)=>{
        const {version}=resp.data;
        if(LocalVersion!==version){
          toast.error("Attention les versions diverges entre l'API et le site");
          setVersionChecker(false);
        }
      })
      .catch((err)=>{
        toast.error('Une erreur est survenue');
      })
  },[])

  useEffect( () => {
    const refreshContext = async () => {
      const url = `${import.meta.env.VITE_APP_API_URL}auth/reload`;
      await axios
        .post(url, localStorageUser, { withCredentials: true })
        .then((resp) => {
          const token = resp.data?.accessToken;
          if (token) {
            var decoded = jwt_decode(token);
            const user = {
              firstname: decoded.firstname,
              lastname: decoded.lastname,
              rank: decoded.rank,
              id:decoded.user_id,
              token: {accessToken : token}
            }
            const toto=setAuth(user);
          }
        })
        .catch((err) => {
         
        })
    }

    if (!auth?.firtsname) {
      const url = `${import.meta.env.VITE_APP_API_URL}auth/reload`;
      refreshContext()
    }
  }, []);


  return (
    <div className="App">
      <div className='app-container'>
        <ToastContainer />
        <Header />
        {versionChecker
          ?<NavBar />
            :null
        }
       
        <Routes>
          <Route index element={<Home />} />
          <Route path='accueil' element={<Home />} />
          <Route path='params' element={<Params />}>
            <Route index element={<ParamsHome />} />
            <Route path='periodes' element={<AreaContainer />} />
            <Route path='constructeurs' element={<BuilderContainer />} />
            <Route path='marques' element={<BrandContainer />} />
            <Route path='categorie' element={<CategoryContainer />} />
            <Route path='echelles' element={<ScaleContainer />} />
            <Route path='pays' element={<CountryContainer />} />
            <Route path='modeles' element={<ModelsContainer />} />
            <Route path='*' element={<NotFound />} />
          </Route>
          <Route path='profil' element={<Profil />} >
            <Route index element={<UserData />} />
            <Route path="infos" element={<UserData />} />
            <Route path="fournisseurs" element={<UserSupplier />} />
            <Route path="commandes" element={<Orders />} />
            <Route path='statistiques' element={<Statistics />} />
            <Route path="pdf" element={<PdfStats />} />
            <Route path="amis" element={<Users />} />
            <Route path='amis/messages/:id' element={<Messages />} />
            <Route path='*' element={<NotFound />} />
          </Route>
          <Route path='kits' element={<Kits />} >
            <Route index element={<KitsHome />} />
            <Route path="gestion" element={<KitManagement />}/>
            <Route path="inStock" element={<KitInStock keySearch={kitState.stock} title="en stock"/>}/>
            <Route path="ordered" element={<KitInStock keySearch={kitState.ordered} title="commandés"/>}/>
            <Route path="wip" element={<KitInStock keySearch={kitState.wip} title="en cours"/>}/>
            <Route path="random" element={<Random />} />
            <Route path="finis" element={<FinishedModel />} />
            <Route path="finis/details/:id" element={<KitDetails />}/>
            <Route path="detailskit/:id" element={<KitDetailsPage />} />
            <Route path='*' element={<NotFound />} />
          </Route>
          <Route path='login' element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path='*' element={<NotFound />} />
          {/* Admin routes*/}
          <Route element={<RequireAuth allowedRoles={ranks.admin} />}>
            <Route path='admin' element={<AdminPage />} >
              <Route path="logs" element={<Logs />} />
              <Route path="users" element={<UserMgmt />} />
              </Route>
          </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;

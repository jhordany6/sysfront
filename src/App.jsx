import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import Aside from './components/Aside';
import Header from './components/Header';
import NotificationsList from './components/NotificationsList';
import { useAlfabetizaciones } from './hooks/useAlfabetizaciones';
import { useAlumnos } from './hooks/useAlumnos';
import { useContratistas } from './hooks/useContratistas';
import { useEstablecimientos } from './hooks/useEstablecimientos';
import { useTareas } from './hooks/useTareas';
import { useUsuarios } from './hooks/useUsuarios';
import AgregarRol from './pages/AgregarRol';
import Alumnos from './pages/Alumnos';
import Contratistas from './pages/Contratistas';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Proyectos from './pages/Proyectos';
import Register from './pages/Register';
import Tareas from './pages/Tareas';
import UsuarioProfile from './pages/UsuarioProfile';

function App() {
  const token = useSelector(({ user }) => user?.results?.token);

  const { initAssociated: initAlumnos } = useAlumnos();
  const { init: initContratistas } = useContratistas();
  const { init: initEstablecimientos } = useEstablecimientos();
  const { init: initAlfabetizaciones } = useAlfabetizaciones();
  const { init: initTareas } = useTareas();
  const { init: initUsuarios } = useUsuarios();

  useEffect(() => {
    if (token) {
      initAlumnos([ 'cursos', 'usuarios.alumnos'], token);
      initContratistas(token);
      initEstablecimientos(token);
      initAlfabetizaciones(token);
      initTareas(token);
      initUsuarios(token);
    }
  }, [token]);

  return (
    <div className={styles.App}>
      <Header />
      <main className={styles.Main}>
        <Aside />
        <div className={styles.Content}>
          {token ? <PrivateRoutes /> : <PublicRoutes />}
        </div>
      </main>
      <NotificationsList />
    </div>
  );
}

export default App;

const PrivateRoutes = () => {
  /* const navigate = useNavigate();
  pages.forEach(page => {
    useHotkeys(page.key, () => navigate(page.path));
  }); */

  return (
    <Routes>
      <Route path={'/inicio'} element={<Inicio />} />
      <Route path={'/alumnos'} element={<Alumnos />} />
      <Route path={'/contratistas'} element={<Contratistas />} />
      <Route path={'/usuarios/:id/*'} element={<UsuarioProfile />} />
      <Route path={'/tareas'} element={<Tareas />} />
      <Route path={'/tareas/:id'} element={<Tareas />} />
      <Route path={'/proyectos'} element={<Proyectos />} />
      <Route path={'/proyectos/:id'} element={<Proyectos />} />
      <Route path={'*'} element={<Navigate to={'/inicio'} />} />
    </Routes>
  );
};

const PublicRoutes = () => (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
    <Route path={'/agregar/:rol'} element={<AgregarRol />} />
    <Route path='*' element={<Navigate to='/login' />} />
  </Routes>
);
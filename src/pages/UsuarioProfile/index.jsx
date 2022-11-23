import { memo } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Profile from '../../components/Profile';
import TareasList from '../../components/TareasList';
import styles from './usuarioProfile.module.css';

const UsuarioProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const usuario = useSelector(({ usuarios }) =>
    usuarios.find(({ id_usuario }) => id_usuario == id));

  const usuarioData = useSelector(state => usuario
    ? state.alumnos.find(({ id_usuario }) => id_usuario == usuario?.id_usuario) ||
    state.contratistas.find(({ id_usuario }) => id_usuario == usuario?.id_usuario)
    : null
  );

  const alfabetizacion = useSelector(({ alfabetizaciones }) => usuarioData
    ? alfabetizaciones.find((alfabetizacion) => alfabetizacion?.id_alumno == usuarioData?.id_alumno ||
      alfabetizacion?.id_contratista == usuarioData?.id_contratista)
    : null
  );

  const tareas = useSelector(({ tareas }) => alfabetizacion
    ? tareas.filter(({ id_alfabetizacion }) => id_alfabetizacion == alfabetizacion?.id_alfabetizacion)
    : null
  );

  const tareasLabel = {
    'alumno': 'Tareas asignadas',
    'contratista': 'Tareas designadas'
  };

  return (
    <div className={styles.AlumnoProfile}>
      <button className={styles.ReturnButton} onClick={() => navigate(-1)} >
        <AiOutlineArrowLeft />
        <span>Atras</span>
      </button>
      {usuarioData ? (
        <>
          <Profile usuario={{ ...usuario, ...usuarioData }} />
          <section className={styles.More}>
            <header className={styles.TareasHeader}>
              {tareas && (
                <>
                  <h2>{tareasLabel[usuario.rol]}</h2>
                  <span>{tareas.length}</span>
                </>
              )}
            </header>
            {tareas
              ? <TareasList tareas={tareas} />
              : <p className={styles.NoTareas}>No hay tareas</p>
            }
          </section>
        </>
      )
        : <p>No se encontró el usuario</p>
      }
    </div>
  );
};

export default memo(UsuarioProfile);

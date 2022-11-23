import { memo } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAlumnos } from '../../hooks/useAlumnos';
import { useAuth } from '../../hooks/useAuth';
import { useContratistas } from '../../hooks/useContratistas';
import { useNotification } from '../../hooks/useNotification';
import styles from './agregarRol.module.css';
import Alumno from './Alumno';
import Contratista from './Contratista';

const AgregarRol = () => {
  const { rol } = useParams();
  const alumno = useAlumnos();
  const contratista = useContratistas();
  const { state: { results }} = useLocation();
  const auth = useAuth();
  const notifications = useNotification();
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      nombres: e.target.nombres.value,
      apellidos: e.target.apellidos.value,
      edad: e.target.edad.value,
      nro_documento: e.target.nro_documento.value,
      id_tipo_documento: e.target.id_tipo_documento.value,
      telefono: e.target.telefono.value,
      id_usuario: results.user_info.id_usuario
    };

    if (rol == 'alumno') data.id_curso = e.target.id_curso.value;
    if (rol == 'contratista') data.id_establecimiento = e.target.id_establecimiento.value;

    notifications.add({ message: `Agregando datos de ${rol}...`, type: 'loading' });

    if (rol == 'alumno') alumno.add(data, results?.token);
    else if (rol == 'contratista') contratista.add(data, results?.token);
    else {
      notifications.add({ message: 'El rol no existe', type: 'error' });
      return;
    }

    auth.Logged({ email: results.user_info.email, password: results.user_info.password });
  };

  return (
    <section className={styles.AgregarRolSection}>
      <h1 className={styles.AgregarRolTitle}>Agregar {rol}</h1>
      <form
        onSubmit={handleSubmit}
        className={styles.AgregarRolForm}
      >
        {rol == 'alumno'
          ? <Alumno cursos={results.cursos} tipos_documento={results.tipos_documento} />
          : <Contratista establecimientos={results.establecimientos} tipos_documento={results.tipos_documento} />
        }
        <button type='submit' className={styles.SubmitButton}>Agregar</button>
      </form>
    </section>
  );
};

export default memo(AgregarRol);
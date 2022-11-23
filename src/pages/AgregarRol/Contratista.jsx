import { memo } from 'react';
import InputLabel from '../../components/Input/InputLabel';
import Select from '../../components/Select';
import { useField } from '../../hooks/useField';
import styles from './agregarRol.module.css';

const Contratista = ({ establecimientos, tipos_documento }) => {
  const nombres = useField({ type: 'text' });
  const apellidos = useField({ type: 'text' });
  const edad = useField({ type: 'number' });
  const documento = useField({ type: 'number' });
  const tipo_documento = useField({ type: 'number', defaultValue: tipos_documento[0].id_tipo_documento });
  const telefono = useField({ type: 'number' });
  const id_establecimiento = useField({ type: 'number', defaultValue: establecimientos[0].id_establecimiento });

  return (
    <div className={styles.InputsContainer}>
      <InputLabel {...nombres} id={'nombres'} labelText={'Nombres'} />
      <InputLabel {...apellidos} id={'apellidos'} labelText={'Apellidos'} />
      <InputLabel {...edad} id={'edad'} labelText={'Edad'} />
      <InputLabel {...documento} id={'nro_documento'} labelText={'Documento'} />
      <Select
        name='id_tipo_documento'
        field={tipo_documento}
        options={tipos_documento.map(({ id_tipo_documento, tipo }) => (
          { id: id_tipo_documento, label: tipo }
        ))}
      />
      <InputLabel {...telefono} id={'telefono'} labelText={'Telefono'} />
      <Select
        name='id_establecimiento'
        field={id_establecimiento}
        options={establecimientos.map(({ id_establecimiento, nombre }) => (
          { id: id_establecimiento, label: nombre }
        ))}
      />
    </div>
  );
};

export default memo(Contratista);
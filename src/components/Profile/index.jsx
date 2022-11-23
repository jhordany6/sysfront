import { memo } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import styles from './profile.module.css';

const Profile = ({ usuario }) => {
  const { nombres, apellidos, edad, foto_url, email, username } = usuario;

  return (
    <section className={styles.Profile}>
      <button className={styles.SettingsButton}>
        <FiEdit2 />
      </button>
      <picture className={styles.Foto}>
        <img src={foto_url} alt={nombres} width='150px' />
      </picture>
      <div className={styles.Body}>
        <div className={styles.Usuario}>
          <h4>@{username}</h4>
        </div>
        <p>{email}</p>
        <span>{edad} años</span>
        <h5>{nombres} {apellidos}</h5>
      </div>
    </section>
  );
};

export default memo(Profile);
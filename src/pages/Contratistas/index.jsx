import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CardContratista from '../../components/CardContratista';
import FilterInput from '../../components/FilterInput';
import SectionHeader from '../../components/SectionHeader';
import { filterItems } from '../../utils/filterItems';
import styles from './contratistas.module.css';

const Contratistas = () => {
  const [filterText, setFilterText] = useState('');
  const { id } = useParams();

  const contratistas = useSelector(({ contratistas }) => id
    ? contratistas.filter(({ id_contratista }) => id_contratista == id)
    : contratistas
  );

  const contratistasFiltered = filterItems(contratistas, filterText);

  return (
    <section className={styles.ContratistasSection}>
      <SectionHeader title='Contratistas' >
        <FilterInput filterText={filterText} setFilterText={setFilterText} />
      </SectionHeader>
      <div className={styles.CardList}>
        {contratistasFiltered.map(contratista => (
          <CardContratista
            key={contratista.id_contratista}
            contratista={contratista}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(Contratistas);

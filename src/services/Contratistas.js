const API_URL = 'https://systemica.herokuapp.com';
const API_PATH = '/contratistas';

export const createContratista = async (contratista, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(contratista),
  });
  return await response.json();
};

export const deleteContratista = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
  });
};

export const getContratistas = async (token) => {
  const response = await fetch(
    `${API_URL}${API_PATH}`,
    {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    }
  );
  return await response.json();
};

export const getContratistasAssoc = async (assocTables = [], token) => {
  const response = await fetch(
    `${API_URL}/alfabetizacion_tarea?assocTables=${assocTables.join(',')}`,
    {
      method: 'GET',
      headers: {
        'Authorization': token,
      },
    }
  );
  return await response.json();
};

export const updateContratista = async (contratista, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token,
    },
    body: JSON.stringify(contratista),
  });
  return await response.json();
};

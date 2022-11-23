const API_URL = 'https://systemica.herokuapp.com';
const API_PATH = '/alfabetizaciones';

export const createAlfabetizacion = async (alfabetizacion, token) => {
  const response = await fetch(`${API_URL}${API_PATH}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(alfabetizacion),
  });
  return await response.json();
};

export const deleteAlfabetizacion = async (id, token) => {
  await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
  });
};

export const getAlfabetizaciones = async (token) => {
  const response = await fetch(
    `${API_URL}${API_PATH}`,
    {
      method: 'GET',
      headers: {
        'Authorization': token
      },
    }
  );
  return await response.json();
};

export const getAlfabetizacionesAssoc = async (assocTables = [], token) => {
  const response = await fetch(
    `${API_URL}/alfabetizacion_tarea?assocTables=${assocTables.join(',')}`,
    {
      method: 'GET',
      headers: {
        'Authorization': token
      },
    }
  );
  return await response.json();
};

export const updateAlfabetizacion = async (id, alfabetizacion, token) => {
  const response = await fetch(`${API_URL}${API_PATH}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': token
    },
    body: JSON.stringify(alfabetizacion),
  });
  return await response.json();
};

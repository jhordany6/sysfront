export const usuariosReducer = (state = [], action) => {
  switch (action.type) {
    case '@usuarios/INIT':
      return action.payload;
    case '@usuarios/ADD':
      return [action.payload, ...state.filter(usuario => action.payload.id_usuario != usuario.id_usuario)];
    case '@usuarios/UPDATE':
      return state.map(usuario => (usuario.id_usuario === action.payload.id_usuario ? action.payload : usuario));
    case '@usuarios/DELETE':
      return state.filter(usuario => usuario.id_usuario !== action.payload);
    default:
      return state;
  }
};
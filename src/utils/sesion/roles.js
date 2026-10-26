// Objeto que define los identificadores numéricos únicos (IDs) para cada rol del sistema
export const ID_ROL = {
  ADMINISTRADOR: 1,
  OPERADOR: 2,
  CONSULTOR: 3,
};

// Diccionario o mapeo que relaciona cada ID numérico con su respectiva etiqueta legible en texto plano
export const ROLES = {
  [ID_ROL.ADMINISTRADOR]: 'Administrador',
  [ID_ROL.OPERADOR]: 'Operador',
  [ID_ROL.CONSULTOR]: 'Consultor',
};

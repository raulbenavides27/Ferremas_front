// environment.ts

import 'zone.js/plugins/zone-error';  // Importar zona de errores para Angular CLI

export const environment = {
  production: false, // Modo de producción (false para desarrollo)
  apiUrl: 'http://localhost:8080/api/v1' // URL de la API backend
};

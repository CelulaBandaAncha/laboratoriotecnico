import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { useDrawerContext } from '../container/contexts';
import {
  Dashboard,
  DetallePruebas,
  ListadoPruebas,
} from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: '',
        path: '/pagina-inicial',
        label: 'Página inicial',
      },
      {
        icon: '',
        path: '/pruebas',
        label: 'Pruebas',
      },
    ]);
  }, []);

  return (
    <Routes>
      <Route path="/pagina-inicial" element={<Dashboard />} />

      <Route path="/pruebas" element={<ListadoPruebas />} />
      <Route path="/pruebas/detalle/:id" element={<DetallePruebas />} />

      <Route path="*" element={<Navigate to="/pagina-inicial" />} />
    </Routes>
  );
};

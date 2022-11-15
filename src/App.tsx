import { BrowserRouter } from 'react-router-dom';

import { AppThemeProvider, DrawerProvider } from './container/contexts';
import { MenuLateral } from './container/components';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>

          <MenuLateral>
            <AppRoutes />
          </MenuLateral>

        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};


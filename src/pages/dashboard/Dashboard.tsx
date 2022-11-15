import { Detalle } from '../../container/components';
import { LayoutBaseDePagina } from '../../container/layouts';
import { Box, Button, LinearProgress, Paper, Typography } from '@mui/material';


export const Dashboard = () => {

  return (
    <LayoutBaseDePagina
      titulo='Laboratorio de pruebas de sangre R&R'
      barraDeFerramentas={(
        <Detalle
          //mostrarBotonNuevo
          //mostrarBotonGuardarCerrar
          //mostrarBotonGuardarCerrarCargando
         // mostrarBotonAtras={false}
        />
      )}
    >
       <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">
       
       </Box>
    
    </LayoutBaseDePagina>
  );
};

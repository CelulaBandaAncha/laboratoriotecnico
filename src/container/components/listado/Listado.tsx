import { Box, Button, Icon, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';


interface IListadoProps {
  BuscarTexto?: string;
  mostrarInputBusca?: boolean;
  onChangeSearchText?: (nuevoTexto: string) => void;
  textoBotonNuevo?: string;
  mostrarBotonNuevo?: boolean;
  onClickNuevo?: () => void;
}
export const Listado: React.FC<IListadoProps> = ({
  BuscarTexto = '',
  onChangeSearchText,
  mostrarInputBusca = true,
  onClickNuevo,
  textoBotonNuevo = 'Agregar',
  mostrarBotonNuevo = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      marginX={1}
      padding={1}
      paddingX={2}
      display="flex"
      alignItems="center"
      height={theme.spacing(5)}
      component={Paper}
    >
      {mostrarInputBusca && (
        <TextField
          size="small"
          value={BuscarTexto}
          placeholder={Environment.INPUTBUSCAR}
          onChange={(e) => onChangeSearchText?.(e.target.value)}
        />
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotonNuevo && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={onClickNuevo}
            endIcon={<Icon></Icon>}
          >{textoBotonNuevo}</Button>
        )}
      </Box>
    </Box>
  );
};

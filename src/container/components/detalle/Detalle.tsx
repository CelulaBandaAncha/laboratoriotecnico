import { Box, Button, Divider, Icon, Paper, Skeleton, Theme, Typography, useMediaQuery, useTheme } from '@mui/material';


interface IDetalleProps {
  textoBotonNuevo?: string;

  mostrarBotonNuevo?: boolean;
  mostrarBotonAtras?: boolean;
  mostrarBotonApagar?: boolean;
  mostrarBotonGuardar?: boolean;
  mostrarBotonGuardarCerrar?: boolean;

  mostrarBotonNuevoCargando?: boolean;
  mostrarBotonAtrasCargando?: boolean;
  mostrarBotonApagarCargando?: boolean;
  mostrarBotonGuardarCargando?: boolean;
  mostrarBotonGuardarCerrarCargando?: boolean;

  onClickNuevo?: () => void;
  onClickAtras?: () => void;
  onClickDelete?: () => void;
  onClickGuardar?: () => void;
  onClickGuardarCerrar?: () => void;
}
export const Detalle: React.FC<IDetalleProps> = ({
  textoBotonNuevo = 'Nuevo',

  mostrarBotonNuevo = true,
  mostrarBotonAtras = true,
  mostrarBotonApagar = true,
  mostrarBotonGuardar = true,
  mostrarBotonGuardarCerrar = false,

  mostrarBotonNuevoCargando = false,
  mostrarBotonAtrasCargando = false,
  mostrarBotonApagarCargando = false,
  mostrarBotonGuardarCargando = false,
  mostrarBotonGuardarCerrarCargando = false,

  onClickNuevo,
  onClickAtras,
  onClickDelete,
  onClickGuardar,
  onClickGuardarCerrar,
}) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
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
      {(mostrarBotonGuardar && !mostrarBotonGuardarCargando) && (
        <Button
          color='primary'
          disableElevation
          variant='contained'
          onClick={onClickGuardar}
          //startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Guardar
          </Typography>
        </Button>
      )}

      {mostrarBotonGuardarCargando && (
        <Skeleton width={110} height={60} />
      )}

      {(mostrarBotonGuardarCerrar && !mostrarBotonGuardarCerrarCargando && !smDown && !mdDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickGuardarCerrar}
          //startIcon={<Icon>save</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Guardar y cerrar
          </Typography>
        </Button>
      )}

      {(mostrarBotonGuardarCerrarCargando && !smDown && !mdDown) && (
        <Skeleton width={180} height={60} />
      )}

      {(mostrarBotonApagar && !mostrarBotonApagarCargando) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickDelete}
          //startIcon={<Icon>delete</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Eliminar
          </Typography>
        </Button>
      )}

      {mostrarBotonApagarCargando && (
        <Skeleton width={110} height={60} />
      )}

      {(mostrarBotonNuevo && !mostrarBotonNuevoCargando && !smDown) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickNuevo}
         // startIcon={<Icon>add</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            {textoBotonNuevo}
          </Typography>
        </Button>
      )}

      {(mostrarBotonNuevoCargando && !smDown) && (
        <Skeleton width={110} height={60} />
      )}

      {
        (
          mostrarBotonAtras &&
          (mostrarBotonNuevo || mostrarBotonApagar || mostrarBotonGuardar || mostrarBotonGuardarCerrar)
        ) && (
          <Divider variant='middle' orientation='vertical' />
        )
      }

      {(mostrarBotonAtras && !mostrarBotonAtrasCargando) && (
        <Button
          color='primary'
          disableElevation
          variant='outlined'
          onClick={onClickAtras}
          //startIcon={<Icon>arrow_back</Icon>}
        >
          <Typography variant='button' whiteSpace="nowrap" textOverflow="ellipsis" overflow="hidden">
            Regresar
          </Typography>
        </Button>
      )}

      {mostrarBotonAtrasCargando && (
        <Skeleton width={110} height={60} />
      )}
    </Box >
  );
};

import { useEffect, useState } from 'react';
import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';

import { PruebasService } from '../../container/services/api/pruebas/PruebasService';
import { VTextField, VForm, useVForm, IVFormErrors } from '../../container/forms';
import { Detalle } from '../../container/components';
import { LayoutBaseDePagina } from '../../container/layouts';


interface IFormData {
  nombres: string,
  email: string,
  identificacion: string,
  porcazucar: number ,
  porcgrasa: number,
  porcoxigeno: number,
}


const formValidationSchema: yup.SchemaOf<IFormData> = yup.object().shape({
  nombres: yup.string().required().min(3),
  email: yup.string().required().email(),
  identificacion: yup.string().required().min(5),
  porcazucar: yup.number().required().positive("No debe puede ingresar nuemeros negativos").max(100, "No puede ingresar numeros mayores a 100"),
  porcgrasa: yup.number().required().positive("No debe puede ingresar nuemeros negativos").max(100, "No puede ingresar numeros mayores a 100"),
  porcoxigeno: yup.number().required().positive("No debe puede ingresar nuemeros negativos").max(100, "No puede ingresar numeros mayores a 100")
});

export const DetallePruebas: React.FC = () => {
  const { formRef, save, saveAndClose, isSaveAndClose } = useVForm();
  const { id = 'nuevo' } = useParams<'id'>();
  const navigate = useNavigate();


  const [isLoading, setIsLoading] = useState(false);
  const [Nombre, setNombre] = useState('');
  const [Identifiacion, setIdentifiacion] = useState('');
  const [Email, setEmail] = useState('');

  useEffect(() => {
    if (id !== 'nuevo') {
      setIsLoading(true);

      PruebasService.getById(Number(id))
        .then((result) => {
          setIsLoading(false);

          if (result instanceof Error) {
            alert(result.message);
            navigate('/pruebas');
          } else {
            setNombre(result.nombres);
            formRef.current?.setData(result);
          }
        });
    } else {
      formRef.current?.setData({
        nombres: '',
        email: '',
        identificacion: '' ,
        porcazucar:'' ,
        porcgrasa:'' ,
        porcoxigeno: '',
        
      });
    }
  }, [id]);


  const handleSave = (dados: IFormData) => {
    formValidationSchema.
      validate(dados, { abortEarly: false })
      .then((dadosValidados) => {
        setIsLoading(true);

        if (id === 'nuevo') {
          PruebasService
            .create(dadosValidados)
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/pruebas');
                } else {
                  navigate(`/pruebas/detalle/${result}`);
                }
              }
            });
        } else {
          PruebasService
            .updateById(Number(id), { id: Number(id), ...dadosValidados })
            .then((result) => {
              setIsLoading(false);

              if (result instanceof Error) {
                alert(result.message);
              } else {
                if (isSaveAndClose()) {
                  navigate('/pruebas');
                }
              }
            });
        }
      })
      .catch((errors: yup.ValidationError) => {
        const validationErrors: IVFormErrors = {};

        errors.inner.forEach(error => {
          if (!error.path) return;

          validationErrors[error.path] = error.message;
        });

        formRef.current?.setErrors(validationErrors);
      });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Realmente desea eliminar?')) {
      PruebasService.deleteById(id)
        .then(result => {
          if (result instanceof Error) {
            alert(result.message);
          } else {
            alert('Registro eliminado con exito!');
            navigate('/pruebas');
          }
        });
    }
  };


  return (
    <LayoutBaseDePagina
      titulo={id === 'nuevo' ? 'Nuevo prueba' : Nombre}
      barraDeFerramentas={
        <Detalle
          textoBotonNuevo='Agregar'
          mostrarBotonGuardarCerrar
          mostrarBotonNuevo={id !== 'nuevo'}
          mostrarBotonApagar={id !== 'nuevo'}

          onClickGuardar={save}
          onClickGuardarCerrar={saveAndClose}
          onClickAtras={() => navigate('/pruebas')}
          onClickDelete={() => handleDelete(Number(id))}
          onClickNuevo={() => navigate('/pruebas/detalle/nuevo')}
        />
      }
    >
      <VForm ref={formRef} onSubmit={handleSave}>
        <Box margin={1} display="flex" flexDirection="column" component={Paper} variant="outlined">

          <Grid container direction="column" padding={2} spacing={2}>

            {isLoading && (
              <Grid item>
                <LinearProgress variant='indeterminate' />
              </Grid>
            )}

            <Grid item>
              <Typography variant='h6'>Formulario de prueba del paciente</Typography>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='nombres'
                  disabled={isLoading}
                  label='Nombre completo'
                  onChange={e => setNombre(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Porcazucar'
                  name='porcazucar'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  name='email'
                  label='Email'
                  disabled={isLoading}
                  onChange={e => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                  fullWidth
                  label='Porcgrasa'
                  name='porcgrasa'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

            <Grid container item direction="row" spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField
                fullWidth
                name='identificacion'
                disabled={isLoading}
                label='Identificación'
                onChange={e => setIdentifiacion(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4} xl={2}>
                <VTextField 
                  fullWidth
                  label='Porcoxigeno'
                  name='porcoxigeno'
                  disabled={isLoading}
                />
              </Grid>
            </Grid>

          </Grid>

        </Box>
      </VForm>
    </LayoutBaseDePagina>
  );
};

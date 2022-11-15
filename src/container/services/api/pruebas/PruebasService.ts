import { Environment } from '../../../environment';
import { Api } from '../axios-config';


export interface IListadoPruebas {
  id: number;
  nombres: string,
  email: string,
  identificacion: string,
  porcazucar: number ,
  porcgrasa: number,
  porcoxigeno: number,
  riesgo: string,
}

export interface IDetallePrueba {
  id: number;
  nombres: string,
  email: string,
  identificacion: string,
  porcazucar: number ,
  porcgrasa: number,
  porcoxigeno: number,
}

type TPessoasComTotalCount = {
  data: IListadoPruebas[];
  totalCount: number;
}

const getAll = async (page = 1, filter = '', nombreurl=''): Promise<TPessoasComTotalCount | Error> => {
  try {
 
    if(filter.length == 0){
      nombreurl = "nombres_like";
    }else {
      nombreurl = "nombres";
    }
    
    const urlRelativa = `/pruebas?_page=${page}&_limit=${Environment.LIMITELINEAS}&${nombreurl}=${filter}`;

    const { data, headers } = await Api.get(urlRelativa);

    if (data) {
      return {
        data,
        totalCount: Number(headers['x-total-count'] || Environment.LIMITELINEAS),
      };
    }

    return new Error('No se encontro en el  listado de registros.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Error listando registros.');
  }
};


const getById = async (id: number): Promise<IDetallePrueba | Error> => {
  try {
    const { data } = await Api.get(`/pruebas/${id}`);

    if (data) {
      return data;
    }

    return new Error('Error consultando registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Error consultando registro registro.');
  }
};

const create = async (datos: Omit<IDetallePrueba, 'id'>): Promise<number | Error> => {
  try {
    const { data } = await Api.post<IDetallePrueba>('/pruebas', datos);

    if (data) {
      return data.id;
    }

    return new Error('Error creando registro.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Error creando registro.');
  }
};

const updateById = async (id: number, datos: IDetallePrueba): Promise<void | Error> => {
  try {
    await Api.put(`/pruebas/${id}`, datos);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Error actualizando registro.');
  }
};

const deleteById = async (id: number): Promise<void | Error> => {
  try {
    await Api.delete(`/pruebas/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Error eliminando registro.');
  }
};


export const PruebasService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};

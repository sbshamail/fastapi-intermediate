import { api } from '../../../config';
import toast from 'react-hot-toast';
import {
  GetType,
  PostType,
  PutType,
  RemoveAllType,
  RemoveType,
} from './interface';

export const getData = async ({
  route,
  fetchData,
  revalidate,
  dispatch,
}: GetType) => {
  if (!api) {
    console.error('API base URL is not defined.');
    return false;
  }
  const baseUrl = `${api}/${route}`;
  try {
    const response = await fetch(baseUrl, {
      next: {
        revalidate: revalidate,
      },
    });
    if (response.ok) {
      const result = await response.json(); // Parse the JSON response
      if (dispatch) {
        dispatch(fetchData(result));
      }
      return result;
    } else {
      return false;
    }
  } catch (error) {
    console.error('Error Getting Data:', error);
    throw error;
  }
};

export const post = async ({ data, route, dispatch, fetchData }: PostType) => {
  const baseUrl = `${api}/${route}`;
  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if response is ok
    if (!response.ok) {
      toast.error('Cart is Empty', { position: 'top-center' });
      return { error: response.status };
      // throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Parse the JSON response
    if (dispatch) {
      dispatch(fetchData(result));
    }
    return { data: result };
  } catch (error) {
    console.error('Error posting data:', error);
    return toast.error('error', { position: 'top-center' });
  }
};

export const put = async ({ data, route, dispatch, fetchData }: PutType) => {
  const baseUrl = `${api}/${route}`;
  try {
    const response = await fetch(baseUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    // Check if response is ok
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Parse the JSON response
    if (dispatch) {
      dispatch(fetchData(result));
    }
    return { data: result };
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

export const remove = async ({ route, dispatch, fetchData }: RemoveType) => {
  const baseUrl = `${api}/${route}`;
  try {
    const response = await fetch(baseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Parse the JSON response

    if (dispatch) {
      dispatch(fetchData(result));
    }
    return { data: result };
  } catch (error) {
    console.error('Error removing data:', error);
    throw error;
  }
};

export const removeAll = async ({
  route,
  dispatch,
  fetchData,
}: RemoveAllType) => {
  const baseUrl = `${api}/${route}`;
  try {
    const response = await fetch(baseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json(); // Parse the JSON response
    if (dispatch) {
      dispatch(fetchData(result));
    }
    return { data: result };
  } catch (error) {
    console.error('Error deleting cart:', error);
    throw error;
  }
};

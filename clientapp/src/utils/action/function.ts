import { nextapi, authapi } from '../../../config';
import toast from 'react-hot-toast';

import {
  GetType,
  PostType,
  PutType,
  RemoveAllType,
  RemoveType,
} from './interface';
import { pickObj } from '../helper';
import { deleteCookie, getCookie } from '@/utils/action/cookies';

export const fetchGet = async ({
  route,
  app,
  position = 'top-center',
  fetchData,
  revalidate = 0,
  dispatch,
  token,
}: GetType) => {
  if (!nextapi) {
    console.error('API base URL is not defined.');
    return false;
  }
  const api = app === 'authapp' ? authapi : nextapi;
  const baseUrl = `${api}/${route}`;
  const access_token = await getCookie('access_token');
  try {
    const response = await fetch(baseUrl, {
      next: {
        revalidate: revalidate,
      },
      headers: {
        Authorization: `Bearer ${token ? token : access_token}`,
      },
    });
    // Check if response is ok
    if (!response.ok) {
      const error = await response.json();
      toast.error(error.detail, {
        position,
      });
      return undefined;
    }

    const result = await response.json(); // Parse the JSON response
    if (dispatch) {
      dispatch(fetchData(result));
    }
    return result;
  } catch (error) {
    console.error('Error Getting Data:', error);
    throw error;
  }
};

export const fetchPost = async ({
  data,
  route,
  dispatch,
  fetchData,
  app,
  reset,
  removeSelection,
  position = 'top-center',
  pickValues,
  toastMsg,
}: PostType) => {
  const api = app === 'authapp' ? authapi : nextapi;
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
      const error = await response.json();
      toast.error(error.detail, {
        position,
      });
      return undefined;
    }

    let result = await response.json(); // Parse the JSON response
    if (pickValues) {
      result = pickObj(result, pickValues);
    }
    if (dispatch) {
      dispatch(fetchData(result));
    }
    if (reset) {
      reset();
    }
    if (removeSelection) {
      removeSelection();
    }
    if (toastMsg || result.message) {
      toast.error(toastMsg ? toastMsg : result.message, {
        position,
      });
    }
    return result;
  } catch (error) {
    console.log('Error posting data:', error);
  }
};

export const put = async ({ data, route, dispatch, fetchData }: PutType) => {
  const baseUrl = `${nextapi}/${route}`;
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
  const baseUrl = `${nextapi}/${route}`;
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
  const baseUrl = `${nextapi}/${route}`;
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

export const logout = async () => {
  await deleteCookie('access_token');
  await deleteCookie('refresh_token');
  await deleteCookie('exp');
  await deleteCookie('user');

  return true;
};

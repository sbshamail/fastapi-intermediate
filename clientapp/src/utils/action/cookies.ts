'use server';

import { fetchGet } from '@/utils/action/function';
import { cookies } from 'next/headers';

type GetCookieName = 'access_token' | 'refresh_token' | 'exp' | 'user';

export async function createCookie(name: string, value: string) {
  const cookieStore = await cookies();

  cookieStore.set(name, JSON.stringify(value));
  // or
  //   cookieStore.set('name', 'lee', { secure: true });
  //   // or
  //   cookieStore.set({
  //     name: 'name',
  //     value: 'lee',
  //     httpOnly: true,
  //     path: '/',
  //   });
}

export async function getCookie(name: GetCookieName): Promise<any> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  // If the cookie exists, return its value, otherwise return null
  if (cookie) {
    const value = cookie.value;

    // Check if the value is non-empty before attempting to parse
    if (value && value.trim() !== '') {
      try {
        // Attempt to parse the cookie value into an object
        const parseUser = JSON.parse(value);
        return parseUser;
      } catch (error) {
        // Handle any errors that might occur if the value is not valid JSON
        console.warn('Failed to parse user cookie:', error);
      }
    } else {
      // Handle the case where the cookie value is empty
      console.warn('Cookie value is empty or invalid');
      return null;
    }
  }

  // Return null if the cookie doesn't exist
  return null;
}

export const deleteCookie = async (name: GetCookieName) => {
  (await cookies()).delete(name);
};
// ///////////////// AUTH //////////////////////

export const refreshToken = async () => {
  console.log('=======refresh token');
  try {
    const refresh_token = await getCookie('refresh_token');
    if (refresh_token) {
      const data = await fetchGet({
        route: 'refresh_token',
        app: 'authapp',
        token: refresh_token,
      });

      if (data.access_token) {
        await createCookie('access_token', data.access_token);
        await createCookie('exp', data.exp);
        return true;
      }
    }
    return false;
  } catch (err) {
    console.log('Error fetching token with refresh_token:', err);
    return false;
  }
};

export const IsAuth = async (): Promise<boolean> => {
  const access_token = await getCookie('access_token');
  const exp = await getCookie('exp');

  if (!access_token || !exp) {
    return false;
  } else {
    const expirationDate = new Date(exp);

    const currentTime = new Date();
    // console.log('zone', Intl.DateTimeFormat().resolvedOptions().timeZone);

    // Check if the current time is greater than the expiration time
    if (expirationDate > currentTime) {
      console.log('Token has expired.');
      const isToken = await refreshToken();
      return isToken;
    }

    return true;
  }
};

export const isAdmin = async () => {
  const access_token = await getCookie('access_token');
  const exp = await getCookie('exp');
  if (!access_token || !exp) {
    // If either the access token or exp is missing, consider the user not authenticated
    console.log('User is not authenticated or token is missing.');
    return false;
  }
  const expirationDate = new Date(exp);

  // Get the current time in UTC
  const currentTime = new Date();

  console.log(expirationDate, currentTime);
  // Check if the current time is greater than the expiration time
  if (currentTime > expirationDate) {
    console.log('Token has expired.');
    return false;
  }

  console.log('Token is still valid.');
  return true;
};

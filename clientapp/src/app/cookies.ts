'use server';

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

export async function getCookie(name: GetCookieName): Promise<string | null> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  // If the cookie exists, return its value, otherwise return null
  if (cookie) {
    const value = cookie.value;
    if (typeof value !== 'object') {
      return cookie.value;
    }
    try {
      // Attempt to parse the cookie value into an object
      const parseUser = JSON.parse(value);
      return parseUser;
    } catch (error) {
      // Handle any errors that might occur if the value is not valid JSON
      console.error('Failed to parse user cookie:', error);
    }
  }

  // Return null if the cookie doesn't exist
  return null;
}

export const deleteCookie = async (name: GetCookieName) => {
  (await cookies()).delete(name);
};

export const IsAuth = async () => {
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

  // console.log(expirationDate, currentTime);
  // Check if the current time is greater than the expiration time
  if (currentTime > expirationDate) {
    console.log('Token has expired.');
    return false;
  }

  console.log('Token is still valid.');
  return true;
};

export const isAdmin = async () => {
  const auth = await IsAuth();
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

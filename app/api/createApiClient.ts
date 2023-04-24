import { ApisauceInstance, create } from 'apisauce';

const TIMEOUT = 25000;

const getClient = (): ApisauceInstance => {
  const client = create({
    baseURL: '',
    timeout: TIMEOUT,
    headers: {},
  });
  return client;
};

export const client = getClient();

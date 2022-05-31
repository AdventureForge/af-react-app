import { useEffect, useRef } from 'react';
import axios from 'axios';
import type { AxiosInstance } from 'axios';

import { useKeycloak } from '@react-keycloak/web';

const useAxios = () => {
  const axiosInstance = useRef<AxiosInstance>();
  const { keycloak, initialized } = useKeycloak();
  const kcToken = keycloak?.token ?? '';

  useEffect(() => {
    const baseURL = 'http://localhost:8890';
    axiosInstance.current = axios.create({
      baseURL,
      headers: {
        Authorization: initialized ? `Bearer ${kcToken}` : '',
      },
    });

    return () => {
      axiosInstance.current = undefined;
    };
  }, [initialized, kcToken]);

  return axiosInstance;
};

export default useAxios;

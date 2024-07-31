// src/components/withAuth.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = Cookies.get('token');
      if (!token) {
        router.push('/LoginPage');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;

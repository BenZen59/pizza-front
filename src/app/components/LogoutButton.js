// src/components/LogoutButton.js
'use client';

import { useRouter } from 'next/navigation';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/LoginPage');
  };

  return (
    <button onClick={handleLogout}>Se déconnecter</button>
  );
};

export default LogoutButton;

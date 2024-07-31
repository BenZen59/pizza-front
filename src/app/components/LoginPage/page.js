'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import pizzaApi from '@/app/api/pizzaApi';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(pizzaApi.getLogin(), data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const { token } = response.data;
      Cookies.set('token', token, {
        expires: 7, // 7 jours
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });
      router.push('/');
    } catch (error) {
      setErrorMessage(
        "Nom d'utilisateur ou mot de passe incorrect ou compte non activé"
      );
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 text-black'>
      <div className='bg-white p-6 rounded-lg shadow-md w-full max-w-xs'>
        <h1 className='text-2xl font-bold text-center mb-4'>Connexion</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700'>
              Email
            </label>
            <input
              type='email'
              {...register('adresse_mail', { required: true })}
              className={`mt-1 block w-full p-2 border ${
                errors.adresse_mail ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
            />
            {errors.adresse_mail && (
              <span className='text-red-500 text-sm'>Ce champ est requis</span>
            )}
          </div>
          <div className='mb-6'>
            <label className='block text-sm font-medium text-gray-700'>
              Mot de passe
            </label>
            <input
              type='password'
              {...register('mot_de_passe', { required: true })}
              className={`mt-1 block w-full p-2 border ${
                errors.mot_de_passe ? 'border-red-500' : 'border-gray-300'
              } rounded-md focus:outline-none focus:ring focus:ring-blue-200`}
            />
            {errors.mot_de_passe && (
              <span className='text-red-500 text-sm'>Ce champ est requis</span>
            )}
          </div>
          <button
            type='submit'
            className='w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200'
          >
            Se connecter
          </button>
        </form>
        {errorMessage && (
          <p className='text-red-500 text-sm text-center mt-4'>
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

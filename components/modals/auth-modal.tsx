'use client';

import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './modal';
import Heading from '../heading';
import Input from '../ui/input';
import toast from 'react-hot-toast';
import Btn from '../ui/btn';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import { signIn } from 'next-auth/react';

import useModal from '@/hooks/use-auth-modal';
import { useRouter } from 'next/navigation';

type AuthModalProps = {};

const AuthModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const { modalType, isOpen, onOpen, onClose } = useModal();
  let auth;
  if (modalType === 'register') {
    auth = { name: '', email: '', password: '' };
  } else if (modalType === 'login') {
    auth = { email: '', password: '' };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: auth,
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (modalType === 'register') {
      axios
        .post('/api/register', data)
        .then(() => {
          onClose();
        })
        .catch((error) => {
          toast.error('Something Went Wrong');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (modalType === 'login') {
      signIn('credentials', {
        ...data,
        redirect: false,
      }).then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
          toast.success('Logged In');
          router.refresh();
          onClose();
        }

        if (callback?.error) {
          toast.error(callback.error);
        }
      });
    }
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Heading
        title={modalType === 'register' ? 'Welcome to Airbnb' : 'Welcome Back'}
        subtitle={
          modalType === 'register' ? 'Create an Account!' : 'Login to Account'
        }
      />
      <Input
        id='email'
        type='email'
        label='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      {modalType !== 'login' && modalType === 'register' && (
        <Input
          id='name'
          type='text'
          label='name'
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      )}
      <Input
        id='password'
        type='password'
        label='password'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className='flex flex-col gap-4 mt-3 '>
      <hr />
      <Btn
        outline
        label='Continue with Google'
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <Btn
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => signIn('github')}
      />

      <div className='text-neutral-500 text-center mt-4 font-light '>
        <div className='justify-center flex flex-row items-center gap-2 '>
          <div>
            {modalType === 'register'
              ? 'Already have an account?'
              : 'First time?'}
          </div>
          <div
            onClick={
              modalType === 'register'
                ? () => onOpen('login')
                : () => onOpen('register')
            }
            className='text-neutral-800 cursor-pointer hover:underline '
          >
            {modalType === 'register' ? ' Log in' : 'Register'}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={isOpen}
      title={modalType === 'register' ? 'Register' : 'Login'}
      actionLabel='Continue'
      onClose={() => onClose()}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AuthModal;

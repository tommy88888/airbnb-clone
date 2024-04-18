'use client';

import useRegisterModal from '@/hooks/use-register-modal';
import axios from 'axios';
import { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Modal from './modal';
import Heading from '../heading';
import Input from '../ui/input';
import toast from 'react-hot-toast';
import Btn from '../ui/btn';
import { FcGoogle } from 'react-icons/fc';
import { AiFillGithub } from 'react-icons/ai';
import useLoginModal from '@/hooks/use-login-modal';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type LoginModalProps = {};

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    }).then((callback) => {
      setIsLoading(false);

      if (callback?.ok) {
        toast.success('Logged In');
        router.refresh();
        loginModal.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className='flex flex-col gap-4 '>
      <Heading title='Welcome Back' subtitle='Login to Account!' />
      <Input
        id='email'
        type='email'
        label='email'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

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
        onClick={() => {}}
      />
      <Btn
        outline
        label='Continue with Github'
        icon={AiFillGithub}
        onClick={() => {}}
      />

      <div className='text-neutral-500 text-center mt-4 font-light '>
        <div className='justify-center flex flex-row items-center gap-2 '>
          <div>First time ?</div>
          <div
            onClick={toggle}
            className='text-neutral-800 cursor-pointer hover:underline '
          >
            Sign up
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Continue'
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;

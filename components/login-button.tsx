'use client';

import { Button } from './ui/button';

type LoginButtonProps = {
  onClick?: () => void;
};

const LoginButton = ({ onClick }: LoginButtonProps) => {
  return (
    <Button variant='ghost' type='button' onClick={() => onClick && onClick()}>
      Login
    </Button>
  );
};

export default LoginButton;

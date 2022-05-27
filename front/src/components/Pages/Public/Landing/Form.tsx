import { memo, MouseEvent } from 'react';

import useForm from '@eduzz/houston-forms/useForm';
import Button from '@eduzz/houston-ui/Button';
import Form from '@eduzz/houston-ui/Forms/Form';
import TextField from '@eduzz/houston-ui/Forms/Text';
import styled, { IStyledProp } from '@eduzz/houston-ui/styles/styled';
import Typography from '@eduzz/houston-ui/Typography';

import { ISubscription } from '@/interfaces/models/subscription';
import authService from '@/services/auth';

interface IProps extends IStyledProp {
  onCreate: (e: MouseEvent<HTMLElement>) => void;
  onRecoveryAccess: (e: MouseEvent<HTMLElement>) => void;
}

const LoginForm: React.FC<IProps> = ({ onRecoveryAccess, onCreate, className }) => {
  const form = useForm<ISubscription>({
    validationSchema: yup =>
      yup.object().shape({
        name: yup.string().required().min(3).max(250),
        email: yup.string().required().email().max(250),
        password: yup.string().required().min(6)
      }),
    async onSubmit(model) {
      await authService.subscription(model);
    }
  });

  return (
    <Form context={form} className={className}>
      <Typography size='large' fontWeight='bold' className='title'>
        Novidades
      </Typography>
      <Typography className='subtitle'>Receba novidades de serviços e atualizações por e-mail.</Typography>

      <TextField name='Name' label='Nome Completo' type='text' />
      <TextField name='email' label='Email' type='email' />

      <Typography className='resetButton' onClick={onRecoveryAccess}>
        Esqueci minha senha
      </Typography>

      <Button disabled={form.isSubmitting} type='submit' fullWidth>
        Inscrever
      </Button>

      <Typography className='link' onClick={onCreate}>
        Prefere criar uma conta? <span>Crie uma conta agora</span>
      </Typography>
    </Form>
  );
};

export default styled(memo(LoginForm))`
  & .resetButton {
    cursor: pointer;
    margin-bottom: ${({ theme }) => theme.spacing(4)};
    color: ${({ theme }) => theme.colors.primary.main};
    float: right;
  }
`;

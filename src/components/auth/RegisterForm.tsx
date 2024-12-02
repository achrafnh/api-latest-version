import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { useAuth } from '@/hooks/useAuth';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(2, 'Full name is required'),
  phoneNumber: z.string().optional(),
});

type RegisterFormData = z.infer<typeof registerSchema>;

export const RegisterForm = () => {
  const { register: registerUser, isLoading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Input
          placeholder="Full Name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
      </div>
      <div>
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>
      <div>
        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register('password')}
        />
      </div>
      <div>
        <Input
          placeholder="Phone Number (Optional)"
          error={errors.phoneNumber?.message}
          {...register('phoneNumber')}
        />
      </div>
      <Button type="submit" isLoading={isLoading} className="w-full">
        Create Account
      </Button>
    </form>
  );
};
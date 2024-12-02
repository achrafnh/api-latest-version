import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { setTokens, clearTokens } from '@/lib/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export const useAuth = () => {
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const { data } = await api.post<AuthResponse>('/users/signin', credentials);
      return data;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      navigate('/dashboard');
      toast.success('Welcome back!');
    },
    onError: () => {
      toast.error('Invalid credentials');
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: {
      email: string;
      password: string;
      fullName: string;
      phoneNumber?: string;
    }) => {
      const { data } = await api.post<AuthResponse>('/users/signup', userData);
      return data;
    },
    onSuccess: (data) => {
      setTokens(data.accessToken, data.refreshToken);
      navigate('/dashboard');
      toast.success('Account created successfully!');
    },
    onError: () => {
      toast.error('Registration failed');
    },
  });

  const logout = () => {
    clearTokens();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return {
    login: loginMutation.mutate,
    register: registerMutation.mutate,
    logout,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  };
};
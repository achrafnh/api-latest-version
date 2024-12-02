import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/axios';
import { Lawyer } from '@/types/lawyer';

interface SearchParams {
  q?: string;
  specialization?: string;
  minExperience?: number;
  maxRate?: number;
  languages?: string;
  location?: string;
  minRating?: number;
  page?: number;
  limit?: number;
}

interface SearchResponse {
  total: number;
  lawyers: Lawyer[];
}

export const useLawyers = (params: SearchParams) => {
  return useQuery({
    queryKey: ['lawyers', params],
    queryFn: async () => {
      const { data } = await api.get<SearchResponse>('/search/lawyers', {
        params,
      });
      return data;
    },
  });
};
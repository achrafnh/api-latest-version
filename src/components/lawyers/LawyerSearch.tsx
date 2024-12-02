import { useForm } from 'react-hook-form';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Search } from 'lucide-react';

interface SearchFormData {
  query: string;
  specialization: string;
  location: string;
}

interface LawyerSearchProps {
  onSearch: (data: SearchFormData) => void;
  isLoading?: boolean;
}

export const LawyerSearch = ({ onSearch, isLoading }: LawyerSearchProps) => {
  const { register, handleSubmit } = useForm<SearchFormData>();

  return (
    <form
      onSubmit={handleSubmit(onSearch)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          placeholder="Search lawyers..."
          {...register('query')}
          className="col-span-full md:col-span-1"
        />
        <Input
          placeholder="Specialization"
          {...register('specialization')}
        />
        <Input
          placeholder="Location"
          {...register('location')}
        />
      </div>
      <Button type="submit" isLoading={isLoading} className="w-full md:w-auto">
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </form>
  );
};
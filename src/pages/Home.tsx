import { useState } from 'react';
import { LawyerSearch } from '@/components/lawyers/LawyerSearch';
import { LawyerCard } from '@/components/lawyers/LawyerCard';
import { useLawyers } from '@/hooks/useLawyers';
import { Lawyer } from '@/types/lawyer';

export const Home = () => {
  const [searchParams, setSearchParams] = useState({
    page: 1,
    limit: 10,
  });

  const { data, isLoading } = useLawyers(searchParams);

  const handleSearch = (formData: any) => {
    setSearchParams((prev) => ({
      ...prev,
      ...formData,
      page: 1,
    }));
  };

  const handleBook = (lawyer: Lawyer) => {
    // Implement booking logic
    console.log('Booking lawyer:', lawyer);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Find Your Legal Expert
        </h1>

        <LawyerSearch onSearch={handleSearch} isLoading={isLoading} />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.lawyers.map((lawyer) => (
            <LawyerCard
              key={lawyer.id}
              lawyer={lawyer}
              onBook={handleBook}
            />
          ))}
        </div>

        {data?.lawyers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No lawyers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
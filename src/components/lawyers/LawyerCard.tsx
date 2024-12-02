import { Lawyer } from '@/types/lawyer';
import { Star } from 'lucide-react';
import { Button } from '../ui/Button';

interface LawyerCardProps {
  lawyer: Lawyer;
  onBook?: (lawyer: Lawyer) => void;
}

export const LawyerCard = ({ lawyer, onBook }: LawyerCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{lawyer.fullName}</h3>
          <p className="text-sm text-gray-500">{lawyer.specialization}</p>
        </div>
        <div className="flex items-center">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium">{lawyer.rating.toFixed(1)}</span>
        </div>
      </div>
      
      <div className="mt-4 space-y-2">
        <p className="text-sm">
          <span className="font-medium">Experience:</span> {lawyer.yearsOfExperience} years
        </p>
        <p className="text-sm">
          <span className="font-medium">Languages:</span> {lawyer.languagesSpoken}
        </p>
        <p className="text-sm">
          <span className="font-medium">Rate:</span> ${lawyer.hourlyRate}/hour
        </p>
      </div>

      {onBook && (
        <div className="mt-6">
          <Button
            onClick={() => onBook(lawyer)}
            variant="outline"
            className="w-full"
          >
            Book Consultation
          </Button>
        </div>
      )}
    </div>
  );
};
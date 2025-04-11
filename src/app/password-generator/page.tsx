import { PasswordGenerator } from '@/components/PasswordGenerator';

export default function PasswordGeneratorPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="max-w-md mx-auto">
        <PasswordGenerator />
      </div>
    </div>
  );
}
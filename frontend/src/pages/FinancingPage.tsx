import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import BillList from '../components/Financing/BillList';
import Spinner from '../components/Common/Spinner';
import { Financing } from '../types/financing';
import { financingService } from '../services/financingService';

const FinancingPage: React.FC = () => {
  const [financings, setFinancings] = useState<Financing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    financingService
      .getAll()
      .then(setFinancings)
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Financing Operations</h1>
        {isLoading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <BillList financings={financings} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default FinancingPage;

import React, { useState, useEffect } from 'react';
import Header from '../components/Common/Header';
import Footer from '../components/Common/Footer';
import DemandForm from '../components/Demand/DemandForm';
import DemandList from '../components/Demand/DemandList';
import DemandDetail from '../components/Demand/DemandDetail';
import Spinner from '../components/Common/Spinner';
import { Demand } from '../types/demand';
import { demandService } from '../services/demandService';

const DemandPage: React.FC = () => {
  const [demands, setDemands] = useState<Demand[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedDemand, setSelectedDemand] = useState<Demand | null>(null);

  const loadDemands = async () => {
    setIsLoading(true);
    try {
      const data = await demandService.getAll();
      setDemands(data.content);
    } catch {
      // Error handled by service layer
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadDemands();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Demand Management</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            {showForm ? 'Cancel' : '+ New Demand'}
          </button>
        </div>
        {showForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold mb-4">Create New Demand</h2>
            <DemandForm onSuccess={() => { setShowForm(false); void loadDemands(); }} />
          </div>
        )}
        {selectedDemand && (
          <div className="mb-6">
            <DemandDetail demand={selectedDemand} onClose={() => setSelectedDemand(null)} />
          </div>
        )}
        {isLoading ? (
          <div className="flex justify-center py-12"><Spinner size="lg" /></div>
        ) : (
          <div className="bg-white rounded-lg shadow">
            <DemandList demands={demands} onSelect={setSelectedDemand} />
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default DemandPage;

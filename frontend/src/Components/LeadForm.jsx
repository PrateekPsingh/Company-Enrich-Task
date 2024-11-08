import { useState } from 'react';
import axios from 'axios';

function LeadForm() {
  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [enrichedData, setEnrichedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setEnrichedData(null);

    try {
      const response = await axios.post('https://company-enrich-task.onrender.com/api/enrich', {
        company_name: companyName,
        website: website
      });
      setEnrichedData(response.data);
    } catch (err) {
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md w-full">
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Company Name:</span>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Website URL:</span>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 bg-gray-100 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
        >
          Enrich Lead
        </button>
      </form>

      {loading && <p className="mt-4 text-blue-500">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {enrichedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Enriched Data:</h3>
          <div className="grid gap-4">
            {Object.entries(enrichedData).map(([key, value]) => (
              <div
                key={key}
                className="flex flex-col bg-white p-3 rounded-md shadow-md"
                style={{ wordBreak: 'break-word' }}
              >
                <h4 className="text-gray-700 font-bold capitalize">{key.replace(/_/g, ' ')}</h4>
                <p className="text-gray-600">{String(value)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LeadForm;

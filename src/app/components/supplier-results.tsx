import { Supplier } from '../lib/suppliers';

interface SupplierResultsProps {
  suppliers: Supplier[];
}

export function SupplierResults({ suppliers }: SupplierResultsProps) {
  if (!suppliers || suppliers.length === 0) {
    return <div className="text-white">No suppliers found matching your criteria.</div>;
  }

  return (
    <div className="border rounded-lg overflow-hidden my-4">
      <table className="min-w-full divide-y divide-white/10">
        <thead className="bg-white/20">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Risk Score</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Industry</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">Risk Categories</th>
          </tr>
        </thead>
        <tbody className="bg-white/20 divide-y divide-white/10">
          {suppliers.map((supplier) => (
            <tr key={supplier.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{supplier.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  supplier.riskScore >= 7 ? 'bg-red-100 text-red-800' : 
                  supplier.riskScore >= 4 ? 'bg-yellow-100 text-yellow-800' : 
                  'bg-green-100 text-green-800'
                }`}>
                  {supplier.riskScore}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">{supplier.industry}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">{supplier.location}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white/50">
                <div className="flex flex-wrap gap-1">
                  {supplier.riskCategories.map((category, idx) => (
                    <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                      {category}
                    </span>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
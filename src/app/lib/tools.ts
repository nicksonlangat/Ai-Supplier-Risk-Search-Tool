import { tool } from 'ai';
import { z } from 'zod';
import {
  getSuppliersByRiskScore,
  getSuppliersByIndustry,
  getSuppliersByRiskCategory,
  getSuppliersByLocation,
  searchSuppliers,
  Supplier
} from './suppliers';

export const supplierSearchTool = tool({
  // name: 'searchSuppliers',
  description: 'Search for suppliers based on different criteria. ALWAYS use this tool for ANY supplier-related query.',
  parameters: z.object({
    action: z.enum(['byRiskScore', 'byIndustry', 'byRiskCategory', 'byLocation', 'search']),
    query: z.string().describe('The search query or parameter value'),
    count: z.number().optional().describe('Number of results to return for risk score queries'),
    order: z.enum(['highest', 'lowest']).optional().describe('Order for risk score queries')
  }),
  execute: async ({ action, query, count = 5, order = 'highest' }) => {
    console.log('Executing supplier search tool:', { action, query, count, order });
    
    let results: Supplier[] = [];
    
    try {
      switch (action) {
        case 'byRiskScore':
          results = getSuppliersByRiskScore(count, order);
          break;
        case 'byIndustry':
          results = getSuppliersByIndustry(query);
          break;
        case 'byRiskCategory':
          results = getSuppliersByRiskCategory(query);
          break;
        case 'byLocation':
          results = getSuppliersByLocation(query);
          break;
        case 'search':
          results = searchSuppliers(query);
          break;
      }
      
      console.log(`Found ${results.length} suppliers for query:`, { action, query });
      return results;
    } catch (error) {
      console.error('Error executing supplier search tool:', error);
      return [];
    }
  }
});

export const tools = {
  searchSuppliers: supplierSearchTool
};
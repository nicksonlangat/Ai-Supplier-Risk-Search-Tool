export interface Supplier {
  id: number
  name: string
  riskScore: number
  riskCategories: string[]
  location: string
  industry: string
}

// Mock supplier database
export const suppliers: Supplier[] = [
  {
    id: 1,
    name: "MediTech Solutions",
    riskScore: 8,
    riskCategories: ["Data Privacy", "Regulatory Compliance", "Financial"],
    location: "United States",
    industry: "Healthcare",
  },
  {
    id: 2,
    name: "GlobalFinance Corp",
    riskScore: 9,
    riskCategories: ["Financial", "Anti-Money Laundering", "Fraud"],
    location: "United Kingdom",
    industry: "Financial Services",
  },
  {
    id: 3,
    name: "EcoManufacturing Inc",
    riskScore: 4,
    riskCategories: ["Environmental", "Supply Chain"],
    location: "Germany",
    industry: "Manufacturing",
  },
  {
    id: 4,
    name: "TechInnovate Systems",
    riskScore: 6,
    riskCategories: ["Data Security", "Intellectual Property", "Financial"],
    location: "United States",
    industry: "Technology",
  },
  {
    id: 5,
    name: "HealthPlus Partners",
    riskScore: 7,
    riskCategories: ["Patient Privacy", "Regulatory Compliance"],
    location: "Canada",
    industry: "Healthcare",
  },
  {
    id: 6,
    name: "GlobalShip Logistics",
    riskScore: 5,
    riskCategories: ["Supply Chain", "Environmental", "Customs Compliance"],
    location: "Singapore",
    industry: "Logistics",
  },
  {
    id: 7,
    name: "SecureBank Financial",
    riskScore: 9,
    riskCategories: ["Financial", "Data Privacy", "Regulatory Compliance"],
    location: "Switzerland",
    industry: "Financial Services",
  },
  {
    id: 8,
    name: "PharmaGlobal Research",
    riskScore: 8,
    riskCategories: ["Clinical Compliance", "Data Integrity", "Regulatory"],
    location: "France",
    industry: "Healthcare",
  },
  {
    id: 9,
    name: "EnergyFuture Corp",
    riskScore: 7,
    riskCategories: ["Environmental", "Regulatory", "Safety"],
    location: "Australia",
    industry: "Energy",
  },
  {
    id: 10,
    name: "RetailDirect Group",
    riskScore: 5,
    riskCategories: ["Supply Chain", "Labor Practices", "Financial"],
    location: "United States",
    industry: "Retail",
  },
]

// Helper functions for supplier search
export function getSuppliersByRiskScore(count: number, order: "highest" | "lowest" = "highest"): Supplier[] {
  const sorted = [...suppliers].sort((a, b) =>
    order === "highest" ? b.riskScore - a.riskScore : a.riskScore - b.riskScore,
  )
  return sorted.slice(0, count)
}

export function getSuppliersByIndustry(industry: string): Supplier[] {
  return suppliers.filter((supplier) => supplier.industry.toLowerCase() === industry.toLowerCase())
}

export function getSuppliersByRiskCategory(category: string): Supplier[] {
  return suppliers.filter((supplier) =>
    supplier.riskCategories.some((cat) => cat.toLowerCase().includes(category.toLowerCase())),
  )
}

export function getSuppliersByLocation(location: string): Supplier[] {
  return suppliers.filter((supplier) => supplier.location.toLowerCase().includes(location.toLowerCase()))
}

export function searchSuppliers(query: string): Supplier[] {
  const lowercaseQuery = query.toLowerCase()
  return suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(lowercaseQuery) ||
      supplier.industry.toLowerCase().includes(lowercaseQuery) ||
      supplier.location.toLowerCase().includes(lowercaseQuery) ||
      supplier.riskCategories.some((cat) => cat.toLowerCase().includes(lowercaseQuery)),
  )
}


export type RiskLevel = 'High' | 'Moderate' | 'Low' | 'Normal';

export interface DiseaseData {
  date: string;
  fever: number;
  dengue: number;
  diarrhea: number;
  malaria: number;
}

export interface DistrictData {
  id: string;
  name: string;
  risk: RiskLevel;
  totalCases: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  coordinates: { x: number; y: number };
}

export interface CityData {
  id: string;
  name: string;
  risk: RiskLevel;
  totalCases: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  highestDisease: string;
  hospitalsReporting: number;
  coordinates: { x: number; y: number };
  districtId: string;
}

export interface HospitalData {
  id: string;
  name: string;
  cityId: string;
  totalBeds: number;
  occupiedBeds: number;
  icuTotal: number;
  icuOccupied: number;
  risk: RiskLevel;
  lastUpdated: string;
  reportingStatus: 'Submitted' | 'Pending' | 'Missing';
  dataFreshness: number; // percentage
}

export interface AlertData {
  id: string;
  type: string;
  location: string;
  reason: string;
  status: 'Active' | 'Resolved' | 'Escalated';
  officerAction: string;
  timestamp: string;
}

export interface ReportData {
  hospitalName: string;
  status: 'Submitted' | 'Pending' | 'Missing';
  freshness: number;
  lastUpdated: string;
}

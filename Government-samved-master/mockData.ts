import { CityData, HospitalData, AlertData, DiseaseData, ReportData, DistrictData } from './types';

export const DISTRICTS: DistrictData[] = [
  // North-West Coast (Mumbai Region)
  { id: 'palghar', name: 'Palghar', risk: 'Moderate', totalCases: 380, trend: 'stable', coordinates: { x: 12, y: 22 } },
  { id: 'thane', name: 'Thane', risk: 'High', totalCases: 2150, trend: 'increasing', coordinates: { x: 15, y: 32 } },
  { id: 'mumbai', name: 'Mumbai', risk: 'High', totalCases: 4520, trend: 'increasing', coordinates: { x: 10, y: 42 } },

  // West Coast (Konkan)
  { id: 'raigad', name: 'Raigad', risk: 'Moderate', totalCases: 450, trend: 'stable', coordinates: { x: 18, y: 52 } },
  { id: 'ratnagiri', name: 'Ratnagiri', risk: 'Low', totalCases: 180, trend: 'stable', coordinates: { x: 10, y: 68 } },
  { id: 'sindhudurg', name: 'Sindhudurg', risk: 'Low', totalCases: 120, trend: 'decreasing', coordinates: { x: 8, y: 88 } },

  // North Maharashtra
  { id: 'nandurbar', name: 'Nandurbar', risk: 'Low', totalCases: 150, trend: 'stable', coordinates: { x: 20, y: 10 } },
  { id: 'dhule', name: 'Dhule', risk: 'Moderate', totalCases: 380, trend: 'stable', coordinates: { x: 32, y: 14 } },
  { id: 'jalgaon', name: 'Jalgaon', risk: 'Moderate', totalCases: 520, trend: 'increasing', coordinates: { x: 48, y: 10 } },
  { id: 'nashik', name: 'Nashik', risk: 'High', totalCases: 1150, trend: 'increasing', coordinates: { x: 28, y: 28 } },

  // Western Maharashtra Interior
  { id: 'ahmednagar', name: 'Ahmednagar', risk: 'Moderate', totalCases: 720, trend: 'increasing', coordinates: { x: 42, y: 40 } },
  { id: 'pune', name: 'Pune', risk: 'High', totalCases: 2840, trend: 'increasing', coordinates: { x: 32, y: 56 } },
  { id: 'satara', name: 'Satara', risk: 'Moderate', totalCases: 620, trend: 'stable', coordinates: { x: 25, y: 72 } },
  { id: 'sangli', name: 'Sangli', risk: 'Moderate', totalCases: 485, trend: 'stable', coordinates: { x: 22, y: 88 } },
  { id: 'kolhapur', name: 'Kolhapur', risk: 'Low', totalCases: 310, trend: 'decreasing', coordinates: { x: 16, y: 96 } },

  // Central Maharashtra (Marathwada)
  { id: 'solapur', name: 'Solapur', risk: 'High', totalCases: 1051, trend: 'increasing', coordinates: { x: 50, y: 88 } },
  { id: 'osmanabad', name: 'Osmanabad', risk: 'Normal', totalCases: 220, trend: 'decreasing', coordinates: { x: 54, y: 74 } },
  { id: 'latur', name: 'Latur', risk: 'Low', totalCases: 340, trend: 'stable', coordinates: { x: 68, y: 78 } },
  { id: 'beed', name: 'Beed', risk: 'Moderate', totalCases: 510, trend: 'stable', coordinates: { x: 56, y: 60 } },
  { id: 'parbhani', name: 'Parbhani', risk: 'Moderate', totalCases: 340, trend: 'stable', coordinates: { x: 70, y: 58 } },
  { id: 'jalna', name: 'Jalna', risk: 'Low', totalCases: 280, trend: 'decreasing', coordinates: { x: 62, y: 44 } },
  { id: 'aurangabad', name: 'Aurangabad', risk: 'Moderate', totalCases: 890, trend: 'stable', coordinates: { x: 52, y: 36 } },
  { id: 'nanded', name: 'Nanded', risk: 'Moderate', totalCases: 520, trend: 'increasing', coordinates: { x: 82, y: 64 } },
  { id: 'hingoli', name: 'Hingoli', risk: 'Low', totalCases: 180, trend: 'decreasing', coordinates: { x: 76, y: 50 } },

  // Vidarbha (East Maharashtra)
  { id: 'akola', name: 'Akola', risk: 'Moderate', totalCases: 420, trend: 'increasing', coordinates: { x: 66, y: 20 } },
  { id: 'washim', name: 'Washim', risk: 'Low', totalCases: 165, trend: 'stable', coordinates: { x: 72, y: 34 } },
  { id: 'amravati', name: 'Amravati', risk: 'Moderate', totalCases: 580, trend: 'stable', coordinates: { x: 78, y: 24 } },
  { id: 'buldhana', name: 'Buldhana', risk: 'Low', totalCases: 240, trend: 'decreasing', coordinates: { x: 64, y: 28 } },
  { id: 'yavatmal', name: 'Yavatmal', risk: 'Low', totalCases: 310, trend: 'stable', coordinates: { x: 82, y: 44 } },
  { id: 'wardha', name: 'Wardha', risk: 'Moderate', totalCases: 290, trend: 'stable', coordinates: { x: 86, y: 36 } },
  { id: 'nagpur', name: 'Nagpur', risk: 'High', totalCases: 1680, trend: 'increasing', coordinates: { x: 92, y: 28 } },
  { id: 'bhandara', name: 'Bhandara', risk: 'Low', totalCases: 140, trend: 'decreasing', coordinates: { x: 94, y: 18 } },
  { id: 'gondia', name: 'Gondia', risk: 'Low', totalCases: 175, trend: 'stable', coordinates: { x: 96, y: 8 } },
  { id: 'chandrapur', name: 'Chandrapur', risk: 'Moderate', totalCases: 385, trend: 'stable', coordinates: { x: 88, y: 54 } },
  { id: 'gadchiroli', name: 'Gadchiroli', risk: 'Low', totalCases: 95, trend: 'decreasing', coordinates: { x: 94, y: 70 } },
];

export const CITIES: CityData[] = [
  // Solapur District
  { id: 'solapur-city', name: 'Solapur City', risk: 'High', totalCases: 452, trend: 'increasing', highestDisease: 'Fever/ILI', hospitalsReporting: 42, coordinates: { x: 49, y: 71 }, districtId: 'solapur' },
  { id: 'pandharpur', name: 'Pandharpur', risk: 'Moderate', totalCases: 184, trend: 'stable', highestDisease: 'Dengue', hospitalsReporting: 15, coordinates: { x: 35, y: 68 }, districtId: 'solapur' },
  { id: 'barshi', name: 'Barshi', risk: 'Low', totalCases: 95, trend: 'decreasing', highestDisease: 'Diarrhea', hospitalsReporting: 12, coordinates: { x: 56, y: 34 }, districtId: 'solapur' },
  { id: 'sangola', name: 'Sangola', risk: 'Normal', totalCases: 42, trend: 'decreasing', highestDisease: 'Fever/ILI', hospitalsReporting: 8, coordinates: { x: 28, y: 88 }, districtId: 'solapur' },
  { id: 'akkalkot', name: 'Akkalkot', risk: 'Moderate', totalCases: 120, trend: 'increasing', highestDisease: 'Malaria', hospitalsReporting: 10, coordinates: { x: 66, y: 77 }, districtId: 'solapur' },
  { id: 'mohol', name: 'Mohol', risk: 'Low', totalCases: 68, trend: 'stable', highestDisease: 'Fever/ILI', hospitalsReporting: 9, coordinates: { x: 46, y: 53 }, districtId: 'solapur' },
  { id: 'madha', name: 'Madha', risk: 'Normal', totalCases: 35, trend: 'decreasing', highestDisease: 'Diarrhea', hospitalsReporting: 7, coordinates: { x: 39, y: 44 }, districtId: 'solapur' },
  { id: 'karmala', name: 'Karmala', risk: 'Low', totalCases: 55, trend: 'stable', highestDisease: 'Fever/ILI', hospitalsReporting: 6, coordinates: { x: 32, y: 30 }, districtId: 'solapur' },
  { id: 'malshiras', name: 'Malshiras', risk: 'Moderate', totalCases: 142, trend: 'increasing', highestDisease: 'Dengue', hospitalsReporting: 11, coordinates: { x: 25, y: 58 }, districtId: 'solapur' },

  // Pune District
  { id: 'pune-city', name: 'Pune City', risk: 'High', totalCases: 1250, trend: 'increasing', highestDisease: 'Dengue', hospitalsReporting: 85, coordinates: { x: 30, y: 40 }, districtId: 'pune' },
  { id: 'baramati', name: 'Baramati', risk: 'Moderate', totalCases: 320, trend: 'stable', highestDisease: 'Fever/ILI', hospitalsReporting: 22, coordinates: { x: 60, y: 70 }, districtId: 'pune' },
  { id: 'lonavala', name: 'Lonavala', risk: 'Low', totalCases: 85, trend: 'decreasing', highestDisease: 'Malaria', hospitalsReporting: 10, coordinates: { x: 15, y: 25 }, districtId: 'pune' },
  { id: 'shirur', name: 'Shirur', risk: 'Moderate', totalCases: 110, trend: 'stable', highestDisease: 'Fever', hospitalsReporting: 8, coordinates: { x: 60, y: 30 }, districtId: 'pune' },
  { id: 'daund', name: 'Daund', risk: 'High', totalCases: 210, trend: 'increasing', highestDisease: 'Dengue', hospitalsReporting: 15, coordinates: { x: 70, y: 50 }, districtId: 'pune' },
  { id: 'indapur', name: 'Indapur', risk: 'Low', totalCases: 95, trend: 'decreasing', highestDisease: 'Flu', hospitalsReporting: 5, coordinates: { x: 80, y: 80 }, districtId: 'pune' },
  { id: 'saswad', name: 'Saswad', risk: 'Normal', totalCases: 60, trend: 'stable', highestDisease: 'Viral', hospitalsReporting: 6, coordinates: { x: 40, y: 60 }, districtId: 'pune' },

  // Mumbai District
  { id: 'south-mumbai', name: 'South Mumbai', risk: 'High', totalCases: 2100, trend: 'increasing', highestDisease: 'Malaria', hospitalsReporting: 50, coordinates: { x: 45, y: 85 }, districtId: 'mumbai' },
  { id: 'dadar', name: 'Dadar', risk: 'Moderate', totalCases: 1500, trend: 'stable', highestDisease: 'Dengue', hospitalsReporting: 40, coordinates: { x: 45, y: 65 }, districtId: 'mumbai' },
  { id: 'bandra', name: 'Bandra', risk: 'Moderate', totalCases: 850, trend: 'stable', highestDisease: 'Dengue', hospitalsReporting: 30, coordinates: { x: 30, y: 50 }, districtId: 'mumbai' },
  { id: 'andheri', name: 'Andheri', risk: 'High', totalCases: 1120, trend: 'increasing', highestDisease: 'Fever/ILI', hospitalsReporting: 45, coordinates: { x: 30, y: 35 }, districtId: 'mumbai' },
  { id: 'borivali', name: 'Borivali', risk: 'Low', totalCases: 600, trend: 'decreasing', highestDisease: 'Malaria', hospitalsReporting: 25, coordinates: { x: 30, y: 15 }, districtId: 'mumbai' },
  { id: 'ghatkopar', name: 'Ghatkopar', risk: 'Moderate', totalCases: 780, trend: 'increasing', highestDisease: 'Fever', hospitalsReporting: 20, coordinates: { x: 60, y: 35 }, districtId: 'mumbai' },
  { id: 'thane-city', name: 'Thane', risk: 'High', totalCases: 1200, trend: 'increasing', highestDisease: 'Dengue', hospitalsReporting: 35, coordinates: { x: 65, y: 20 }, districtId: 'mumbai' },
  // Nashik District
  { id: 'nashik-city', name: 'Nashik City', risk: 'High', totalCases: 1150, trend: 'increasing', highestDisease: 'Dengue', hospitalsReporting: 40, coordinates: { x: 35, y: 45 }, districtId: 'nashik' },
  { id: 'trimbak', name: 'Trimbak', risk: 'Low', totalCases: 120, trend: 'stable', highestDisease: 'Fever', hospitalsReporting: 8, coordinates: { x: 20, y: 45 }, districtId: 'nashik' },
  { id: 'igatpuri', name: 'Igatpuri', risk: 'Moderate', totalCases: 210, trend: 'increasing', highestDisease: 'Malaria', hospitalsReporting: 10, coordinates: { x: 25, y: 65 }, districtId: 'nashik' },
  { id: 'sinnar', name: 'Sinnar', risk: 'Moderate', totalCases: 340, trend: 'stable', highestDisease: 'Fever/ILI', hospitalsReporting: 12, coordinates: { x: 45, y: 60 }, districtId: 'nashik' },
  { id: 'niphad', name: 'Niphad', risk: 'High', totalCases: 450, trend: 'increasing', highestDisease: 'Dengue', hospitalsReporting: 15, coordinates: { x: 50, y: 35 }, districtId: 'nashik' },
  { id: 'malegaon', name: 'Malegaon', risk: 'High', totalCases: 890, trend: 'stable', highestDisease: 'Fever/ILI', hospitalsReporting: 25, coordinates: { x: 65, y: 20 }, districtId: 'nashik' },
  { id: 'yeola', name: 'Yeola', risk: 'Low', totalCases: 180, trend: 'decreasing', highestDisease: 'Malaria', hospitalsReporting: 9, coordinates: { x: 65, y: 50 }, districtId: 'nashik' },
  // Sangli District
  { id: 'sangli-city', name: 'Sangli City', risk: 'High', totalCases: 485, trend: 'increasing', highestDisease: 'Fever/ILI', hospitalsReporting: 30, coordinates: { x: 30, y: 70 }, districtId: 'sangli' },
  { id: 'miraj', name: 'Miraj', risk: 'High', totalCases: 620, trend: 'stable', highestDisease: 'Dengue', hospitalsReporting: 25, coordinates: { x: 40, y: 75 }, districtId: 'sangli' },
  { id: 'tasgaon', name: 'Tasgaon', risk: 'Moderate', totalCases: 180, trend: 'increasing', highestDisease: 'Malaria', hospitalsReporting: 10, coordinates: { x: 55, y: 60 }, districtId: 'sangli' },
  { id: 'islampur', name: 'Islampur', risk: 'Low', totalCases: 95, trend: 'decreasing', highestDisease: 'Diarrhea', hospitalsReporting: 8, coordinates: { x: 20, y: 50 }, districtId: 'sangli' },
  { id: 'vita', name: 'Vita', risk: 'Moderate', totalCases: 150, trend: 'stable', highestDisease: 'Fever', hospitalsReporting: 7, coordinates: { x: 60, y: 30 }, districtId: 'sangli' },
  { id: 'palus', name: 'Palus', risk: 'Normal', totalCases: 60, trend: 'stable', highestDisease: 'Viral', hospitalsReporting: 5, coordinates: { x: 40, y: 50 }, districtId: 'sangli' },
];

export const HOSPITALS: HospitalData[] = [
  // Solapur City
  { id: 'h1', cityId: 'solapur-city', name: 'Civil Hospital Solapur', totalBeds: 500, occupiedBeds: 460, icuTotal: 80, icuOccupied: 76, risk: 'High', lastUpdated: '10:30 AM', reportingStatus: 'Submitted', dataFreshness: 98 },
  { id: 'h2', cityId: 'solapur-city', name: 'Ashwini Sahakari Rugnalaya', totalBeds: 350, occupiedBeds: 280, icuTotal: 40, icuOccupied: 32, risk: 'Moderate', lastUpdated: '09:45 AM', reportingStatus: 'Submitted', dataFreshness: 95 },
  { id: 'h3', cityId: 'solapur-city', name: 'Chetana Hospital', totalBeds: 150, occupiedBeds: 120, icuTotal: 15, icuOccupied: 12, risk: 'Moderate', lastUpdated: '10:15 AM', reportingStatus: 'Submitted', dataFreshness: 90 },
  { id: 'h6', cityId: 'solapur-city', name: 'Yashodhara Hospital', totalBeds: 120, occupiedBeds: 105, icuTotal: 25, icuOccupied: 23, risk: 'High', lastUpdated: '10:55 AM', reportingStatus: 'Pending', dataFreshness: 60 },
  { id: 'h8', cityId: 'solapur-city', name: 'Markandeya Solapur Sahakari Rugnalaya', totalBeds: 200, occupiedBeds: 150, icuTotal: 20, icuOccupied: 15, risk: 'Low', lastUpdated: '11:15 AM', reportingStatus: 'Submitted', dataFreshness: 92 },
  { id: 'h9', cityId: 'solapur-city', name: 'Monarch Hospital', totalBeds: 80, occupiedBeds: 60, icuTotal: 10, icuOccupied: 8, risk: 'Normal', lastUpdated: '10:00 AM', reportingStatus: 'Submitted', dataFreshness: 96 },
  { id: 'h10', cityId: 'solapur-city', name: 'Sparsh Hospital', totalBeds: 100, occupiedBeds: 95, icuTotal: 12, icuOccupied: 11, risk: 'High', lastUpdated: '11:30 AM', reportingStatus: 'Submitted', dataFreshness: 99 },

  // Pandharpur
  { id: 'h4', cityId: 'pandharpur', name: 'Sub District Hospital Pandharpur', totalBeds: 200, occupiedBeds: 160, icuTotal: 20, icuOccupied: 18, risk: 'High', lastUpdated: '08:20 AM', reportingStatus: 'Submitted', dataFreshness: 100 },
  { id: 'h11', cityId: 'pandharpur', name: 'Lifeline Hospital', totalBeds: 120, occupiedBeds: 80, icuTotal: 15, icuOccupied: 5, risk: 'Low', lastUpdated: '09:00 AM', reportingStatus: 'Submitted', dataFreshness: 94 },
  { id: 'h12', cityId: 'pandharpur', name: 'Apex Hospital Pandharpur', totalBeds: 90, occupiedBeds: 45, icuTotal: 10, icuOccupied: 2, risk: 'Normal', lastUpdated: '10:45 AM', reportingStatus: 'Pending', dataFreshness: 70 },
  { id: 'h13', cityId: 'pandharpur', name: 'Vitthal Hospital', totalBeds: 150, occupiedBeds: 130, icuTotal: 18, icuOccupied: 16, risk: 'High', lastUpdated: '11:10 AM', reportingStatus: 'Submitted', dataFreshness: 98 },

  // Barshi
  { id: 'h5', cityId: 'barshi', name: 'Jagdale Mama Hospital', totalBeds: 180, occupiedBeds: 70, icuTotal: 15, icuOccupied: 4, risk: 'Low', lastUpdated: '11:00 AM', reportingStatus: 'Submitted', dataFreshness: 85 },
  { id: 'h14', cityId: 'barshi', name: 'Nargis Dutt Memorial Cancer Hospital', totalBeds: 250, occupiedBeds: 220, icuTotal: 30, icuOccupied: 28, risk: 'Moderate', lastUpdated: '09:30 AM', reportingStatus: 'Submitted', dataFreshness: 97 },
  { id: 'h15', cityId: 'barshi', name: 'Barshi City Hospital', totalBeds: 60, occupiedBeds: 20, icuTotal: 5, icuOccupied: 0, risk: 'Low', lastUpdated: '08:45 AM', reportingStatus: 'Submitted', dataFreshness: 90 },

  // Sangola
  { id: 'h16', cityId: 'sangola', name: 'Rural Hospital Sangola', totalBeds: 80, occupiedBeds: 50, icuTotal: 8, icuOccupied: 3, risk: 'Normal', lastUpdated: '10:10 AM', reportingStatus: 'Submitted', dataFreshness: 93 },
  { id: 'h17', cityId: 'sangola', name: 'Sai Hospital', totalBeds: 40, occupiedBeds: 15, icuTotal: 4, icuOccupied: 1, risk: 'Low', lastUpdated: '11:20 AM', reportingStatus: 'Submitted', dataFreshness: 88 },
  { id: 'h18', cityId: 'sangola', name: 'Sangola Superspeciality', totalBeds: 100, occupiedBeds: 85, icuTotal: 12, icuOccupied: 10, risk: 'High', lastUpdated: '09:50 AM', reportingStatus: 'Submitted', dataFreshness: 96 },

  // Akkalkot
  { id: 'h7', cityId: 'akkalkot', name: 'Akkalkot Rural Hospital', totalBeds: 100, occupiedBeds: 85, icuTotal: 10, icuOccupied: 9, risk: 'High', lastUpdated: '07:30 AM', reportingStatus: 'Submitted', dataFreshness: 100 },
  { id: 'h19', cityId: 'akkalkot', name: 'Swami Samarth Hospital', totalBeds: 50, occupiedBeds: 48, icuTotal: 5, icuOccupied: 5, risk: 'High', lastUpdated: '10:05 AM', reportingStatus: 'Pending', dataFreshness: 65 },

  // Mohol
  { id: 'h20', cityId: 'mohol', name: 'Rural Hospital Mohol', totalBeds: 70, occupiedBeds: 45, icuTotal: 6, icuOccupied: 2, risk: 'Normal', lastUpdated: '08:50 AM', reportingStatus: 'Submitted', dataFreshness: 91 },
  { id: 'h21', cityId: 'mohol', name: 'Dhanwantari Hospital', totalBeds: 30, occupiedBeds: 10, icuTotal: 2, icuOccupied: 0, risk: 'Low', lastUpdated: '11:45 AM', reportingStatus: 'Submitted', dataFreshness: 89 },

  // Madha
  { id: 'h22', cityId: 'madha', name: 'Sub District Hospital Madha', totalBeds: 60, occupiedBeds: 25, icuTotal: 5, icuOccupied: 1, risk: 'Low', lastUpdated: '10:25 AM', reportingStatus: 'Submitted', dataFreshness: 92 },
  { id: 'h23', cityId: 'madha', name: 'Kurduwadi Railway Hospital', totalBeds: 40, occupiedBeds: 38, icuTotal: 4, icuOccupied: 4, risk: 'Moderate', lastUpdated: '09:10 AM', reportingStatus: 'Submitted', dataFreshness: 95 },

  // Karmala
  { id: 'h24', cityId: 'karmala', name: 'Cottage Hospital Karmala', totalBeds: 90, occupiedBeds: 50, icuTotal: 10, icuOccupied: 3, risk: 'Normal', lastUpdated: '09:40 AM', reportingStatus: 'Submitted', dataFreshness: 93 },
  { id: 'h25', cityId: 'karmala', name: 'Kamala Bhavani Hospital', totalBeds: 45, occupiedBeds: 20, icuTotal: 0, icuOccupied: 0, risk: 'Low', lastUpdated: '11:05 AM', reportingStatus: 'Submitted', dataFreshness: 87 },

  // Malshiras
  { id: 'h26', cityId: 'malshiras', name: 'Rural Hospital Malshiras', totalBeds: 75, occupiedBeds: 60, icuTotal: 8, icuOccupied: 5, risk: 'Moderate', lastUpdated: '10:35 AM', reportingStatus: 'Submitted', dataFreshness: 94 },
  { id: 'h27', cityId: 'malshiras', name: 'Saswad Polyclinic', totalBeds: 35, occupiedBeds: 34, icuTotal: 0, icuOccupied: 0, risk: 'High', lastUpdated: '12:00 PM', reportingStatus: 'Pending', dataFreshness: 55 },
  { id: 'h28', cityId: 'malshiras', name: 'Akluj Critical Care', totalBeds: 80, occupiedBeds: 75, icuTotal: 15, icuOccupied: 14, risk: 'High', lastUpdated: '08:15 AM', reportingStatus: 'Submitted', dataFreshness: 99 },
];

export const ALERTS: AlertData[] = [
  { id: 'a1', type: 'High ICU Occupancy', location: 'Civil Hospital Solapur', reason: 'ICU capacity reached 95%', status: 'Active', officerAction: 'Directed patient diversion to Ashwini Rugnalaya', timestamp: '2026-11-20 10:45 AM' },
  { id: 'a2', type: 'Dengue Spike', location: 'Solapur City (North)', reason: '15 new cases reported in 24hrs', status: 'Active', officerAction: 'Fogging drive initiated', timestamp: '2026-11-20 09:15 AM' },
  { id: 'a3', type: 'Malaria Cluster', location: 'Akkalkot', reason: '8 cases from same locality', status: 'Escalated', officerAction: 'Health camp scheduled for tomorrow', timestamp: '2026-11-19 04:30 PM' },
  { id: 'a4', type: 'Data Lag', location: 'Yashodhara Hospital', reason: 'No update in last 6 hours', status: 'Active', officerAction: 'Call reminder sent to admin', timestamp: '2026-11-20 11:00 AM' },
];

export const DISTRICT_TRENDS: DiseaseData[] = [
  { date: 'Mon', fever: 120, dengue: 45, diarrhea: 30, malaria: 10 },
  { date: 'Tue', fever: 140, dengue: 48, diarrhea: 25, malaria: 12 },
  { date: 'Wed', fever: 135, dengue: 55, diarrhea: 28, malaria: 15 },
  { date: 'Thu', fever: 160, dengue: 62, diarrhea: 35, malaria: 18 },
  { date: 'Fri', fever: 185, dengue: 70, diarrhea: 40, malaria: 22 },
  { date: 'Sat', fever: 170, dengue: 68, diarrhea: 38, malaria: 20 },
  { date: 'Sun', fever: 195, dengue: 75, diarrhea: 42, malaria: 25 },
];
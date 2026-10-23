export interface ExportCountry {
  name: string;
  code: string;
  city: string;
  lat: number;
  lng: number;
  ports: string[];
  volumeTons: string;
  description: string;
}

export const exportOrigin = {
  name: 'India (Facility)',
  city: 'Tenkasi, Tamil Nadu',
  country: 'India',
  lat: 8.958,
  lng: 77.302,
  port: 'Tuticorin Port (V.O.C Port)',
};

export const exportDestinations: ExportCountry[] = [
  {
    name: 'United States',
    code: 'USA',
    city: 'New York / Los Angeles',
    lat: 40.7128,
    lng: -74.006,
    ports: ['Port of New York & New Jersey', 'Port of Los Angeles'],
    volumeTons: '450+ MT / Year',
    description: 'Premier eco-catering supplier across California, New York, and Texas zero-waste venues.',
  },
  {
    name: 'United Kingdom',
    code: 'GBR',
    city: 'London / Southampton',
    lat: 51.5074,
    lng: -0.1278,
    ports: ['Port of Felixstowe', 'Port of Southampton'],
    volumeTons: '280+ MT / Year',
    description: 'Supplying luxury wedding planners, royal garden parties, and eco-festivals across Britain.',
  },
  {
    name: 'Germany',
    code: 'DEU',
    city: 'Hamburg / Frankfurt',
    lat: 53.5511,
    lng: 9.9937,
    ports: ['Port of Hamburg', 'Bremen Port'],
    volumeTons: '320+ MT / Year',
    description: 'Strict DIN CERTCO & EU Single-Use Plastics Directive compliant commercial dispatches.',
  },
  {
    name: 'France',
    code: 'FRA',
    city: 'Paris / Le Havre',
    lat: 48.8566,
    lng: 2.3522,
    ports: ['Port of Le Havre', 'Marseille'],
    volumeTons: '190+ MT / Year',
    description: 'High-end hospitality and gastronomic patisseries seeking plastic-free French bistro service.',
  },
  {
    name: 'United Arab Emirates',
    code: 'ARE',
    city: 'Dubai',
    lat: 25.2048,
    lng: 55.2708,
    ports: ['Jebel Ali Port'],
    volumeTons: '220+ MT / Year',
    description: 'Luxury five-star hotel desert resorts, Ramadan banquets, and regional zero-waste initiatives.',
  },
  {
    name: 'Australia',
    code: 'AUS',
    city: 'Sydney / Melbourne',
    lat: -33.8688,
    lng: 151.2093,
    ports: ['Port Botany (Sydney)', 'Port of Melbourne'],
    volumeTons: '260+ MT / Year',
    description: 'Rigorous biosecurity cleared natural palm leaf tableware for coastal catering and winery events.',
  },
  {
    name: 'Canada',
    code: 'CAN',
    city: 'Toronto / Vancouver',
    lat: 43.6532,
    lng: -79.3832,
    ports: ['Port of Montreal', 'Port of Vancouver'],
    volumeTons: '160+ MT / Year',
    description: 'Compost Council of Canada certified tableware distributed to wholesale distributors.',
  },
  {
    name: 'Netherlands',
    code: 'NLD',
    city: 'Rotterdam',
    lat: 51.9244,
    lng: 4.4777,
    ports: ['Port of Rotterdam (Main European Gateway)'],
    volumeTons: '310+ MT / Year',
    description: 'Key central transshipment depot feeding Netherlands, Belgium, and Scandinavian eco-markets.',
  },
  {
    name: 'Singapore',
    code: 'SGP',
    city: 'Singapore City',
    lat: 1.3521,
    lng: 103.8198,
    ports: ['Port of Singapore'],
    volumeTons: '120+ MT / Year',
    description: 'Corporate catering, botanical garden galas, and South East Asian distributor hub.',
  },
  {
    name: 'Japan',
    code: 'JPN',
    city: 'Tokyo / Yokohama',
    lat: 35.6762,
    lng: 139.6503,
    ports: ['Port of Tokyo', 'Port of Yokohama'],
    volumeTons: '140+ MT / Year',
    description: 'Japanese Food Sanitation Law compliant natural vessels for traditional and modern events.',
  },
];

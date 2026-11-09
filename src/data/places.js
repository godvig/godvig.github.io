// Places on the map. Edit freely: add places, change texts.
//
// kind: "life"     = work, studies and major life events (yellow)
//       "visited"  = places I've visited (green)
//       "mountain" = mountains and hiking (mountain symbol)
//       "football" = places I've watched football (football symbol)
// coords: [longitude, latitude]
export const places = [
  // ---------- Work, studies and major life events ----------
  { id: 'luxembourg', city: 'Luxembourg', country: 'Luxembourg', coords: [6.13, 49.61], kind: 'life',
    when: '1998–2006',
    text: 'Grew up here. Later research analyst and business developer at Godvig Capital (2012–2014).' },
  { id: 'london', city: 'London', country: 'United Kingdom', coords: [-0.13, 51.51], kind: 'life',
    when: '2011',
    text: 'A semester at the Swedish School in London through the Europaprogrammet, living with a host family.' },
  { id: 'lund', city: 'Lund', country: 'Sweden', coords: [13.19, 55.70], kind: 'life',
    when: '',
    text: 'B.Sc. in Business and Economics at Lund University. Board member of Kurdistan Investment Company and part of Lundakarnevalen.' },
  { id: 'gothenburg', city: 'Gothenburg', country: 'Sweden', coords: [11.97, 57.71], kind: 'life',
    when: '2016–now',
    text: 'Chalmers (B.Sc. and M.Sc.), Volvo Cars, and since 2022 Application Specialist at Centiro. Home.' },
  { id: 'kingston', city: 'Kingston', country: 'Canada', coords: [-76.48, 44.23], kind: 'life',
    when: 'Exchange',
    text: 'Exchange at Queen\'s University, Smith School of Business: international business, negotiation, managing across cultures.' },
  { id: 'milan', city: 'Milan', country: 'Italy', coords: [9.19, 45.46], kind: 'life',
    when: 'Exchange',
    text: 'Exchange at Politecnico di Milano: design strategy, high-tech startups and social innovation.' },
  { id: 'taipei', city: 'Taipei', country: 'Taiwan', coords: [121.56, 25.03], kind: 'life',
    when: '2020–2021',
    text: 'Market intelligence analyst at Evonik Industries, then my master\'s thesis with IKEA Taiwan on refurbishing and reselling furniture.' },
  { id: 'barcelona', city: 'Barcelona', country: 'Spain', coords: [2.17, 41.39], kind: 'life',
    when: '4 months',
    text: 'Worked from Centiro\'s Barcelona office.' },
  { id: 'erbil', city: 'Erbil', country: 'Iraq', coords: [44.01, 36.19], kind: 'life',
    when: '2014',
    text: 'Erbil, Kurdistan Region of Iraq.' },
  { id: 'geneva', city: 'Geneva', country: 'Switzerland', coords: [6.14, 46.20], kind: 'life',
    when: '5+ visits',
    text: 'Client work on site for Centiro.' },
  { id: 'amsterdam', city: 'Amsterdam', country: 'Netherlands', coords: [4.90, 52.37], kind: 'life',
    when: '2 visits',
    text: 'Client work on site for Centiro.' },
  { id: 'derby', city: 'Derby', country: 'United Kingdom', coords: [-1.48, 52.92], kind: 'life',
    when: 'Work trip',
    text: 'On site for Centiro.' },
  { id: 'dallas', city: 'Dallas', country: 'United States of America', coords: [-96.80, 32.78], kind: 'life',
    when: 'Work trip',
    text: 'On site for Centiro.' },

  // ---------- Visited ----------
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', coords: [139.69, 35.69], kind: 'visited', when: '2011' },
  { id: 'kyoto', city: 'Kyoto', country: 'Japan', coords: [135.77, 35.01], kind: 'visited', when: '2012' },
  { id: 'himeji', city: 'Himeji', country: 'Japan', coords: [134.69, 34.82], kind: 'visited', when: '2012' },
  { id: 'hiroshima', city: 'Hiroshima', country: 'Japan', coords: [132.46, 34.39], kind: 'visited', when: '2012' },
  { id: 'beijing', city: 'Beijing', country: 'China', coords: [116.40, 39.90], kind: 'visited', when: '2013' },
  { id: 'new-delhi', city: 'New Delhi', country: 'India', coords: [77.21, 28.61], kind: 'visited', when: '2025' },
  { id: 'jaipur', city: 'Jaipur', country: 'India', coords: [75.79, 26.91], kind: 'visited', when: '2025' },
  { id: 'istanbul', city: 'Istanbul', country: 'Turkey', coords: [28.98, 41.01], kind: 'visited', when: '2014' },
  { id: 'nairobi', city: 'Nairobi', country: 'Kenya', coords: [36.82, -1.29], kind: 'visited', when: '2023' },
  { id: 'mombasa', city: 'Mombasa', country: 'Kenya', coords: [39.67, -4.04], kind: 'visited', when: '2023' },
  { id: 'new-york', city: 'New York', country: 'United States of America', coords: [-74.01, 40.71], kind: 'visited', when: '2008' },
  { id: 'washington', city: 'Washington, D.C.', country: 'United States of America', coords: [-77.04, 38.91], kind: 'visited', when: '2011' },
  { id: 'boston', city: 'Boston', country: 'United States of America', coords: [-71.06, 42.36], kind: 'visited', when: '2015' },
  { id: 'seattle', city: 'Seattle', country: 'United States of America', coords: [-122.33, 47.61], kind: 'visited', when: '2015' },
  { id: 'san-francisco', city: 'San Francisco', country: 'United States of America', coords: [-122.42, 37.77], kind: 'visited', when: '2015' },
  { id: 'los-angeles', city: 'Los Angeles', country: 'United States of America', coords: [-118.24, 34.05], kind: 'visited', when: '2015' },
  { id: 'las-vegas', city: 'Las Vegas', country: 'United States of America', coords: [-115.14, 36.17], kind: 'visited', when: '2015' },
  { id: 'montreal', city: 'Montreal', country: 'Canada', coords: [-73.57, 45.50], kind: 'visited', when: '2015' },
  { id: 'toronto', city: 'Toronto', country: 'Canada', coords: [-79.38, 43.65], kind: 'visited', when: '2015' },
  { id: 'ottawa', city: 'Ottawa', country: 'Canada', coords: [-75.70, 45.42], kind: 'visited', when: '2015' },
  { id: 'vancouver', city: 'Vancouver', country: 'Canada', coords: [-123.12, 49.28], kind: 'visited', when: '2015' },
  { id: 'kelowna', city: 'Kelowna', country: 'Canada', coords: [-119.50, 49.89], kind: 'visited', when: '2024' },
  { id: 'sarajevo', city: 'Sarajevo', country: 'Bosnia and Herz.', coords: [18.41, 43.86], kind: 'visited', when: '2021' },
  { id: 'lisbon', city: 'Lisbon', country: 'Portugal', coords: [-9.14, 38.72], kind: 'visited', when: '2023' },
  { id: 'dublin', city: 'Dublin', country: 'Ireland', coords: [-6.26, 53.35], kind: 'visited', when: '2023' },
  { id: 'san-marino', city: 'San Marino', country: 'San Marino', coords: [12.45, 43.94], kind: 'visited', when: '2019' },
  { id: 'vatican', city: 'Vatican City', country: 'Vatican City', coords: [12.45, 41.90], kind: 'visited', when: '2019' },
  { id: 'liechtenstein', city: 'Liechtenstein', country: 'Liechtenstein', coords: [9.52, 47.14], kind: 'visited', when: '2019' },
  { id: 'andorra', city: 'Andorra', country: 'Andorra', coords: [1.52, 42.51], kind: 'visited', when: '2020' },
  { id: 'malta', city: 'Malta', country: 'Malta', coords: [14.51, 35.90], kind: 'visited', when: '' },

  // ---------- Mountains ----------
  { id: 'kebnekaise', city: 'Kebnekaise', country: 'Sweden', coords: [18.53, 67.90], kind: 'mountain', when: '2018',
    text: 'Sweden\'s highest mountain.' },
  { id: 'galdhopiggen', city: 'Galdhøpiggen', country: 'Norway', coords: [8.31, 61.64], kind: 'mountain', when: '2024',
    text: 'Norway\'s highest mountain.' },
  { id: 'etna', city: 'Mount Etna', country: 'Italy', coords: [15.00, 37.75], kind: 'mountain', when: '2019',
    text: 'The volcano on Sicily.' },
  { id: 'olympus', city: 'Mount Olympus', country: 'Greece', coords: [22.36, 40.09], kind: 'mountain', when: '2026',
    text: 'Greece\'s highest mountain.' },
  { id: 'stubaital', city: 'Stubaital', country: 'Austria', coords: [11.30, 47.11], kind: 'mountain', when: '2003',
    text: 'Valley in the Tyrolean Alps.' },
  { id: 'lac-blanc', city: 'Lac Blanc', country: 'France', coords: [6.89, 45.98], kind: 'mountain', when: '2022',
    text: 'Alpine lake above Chamonix, facing Mont Blanc.' },
  { id: 'banff', city: 'Banff', country: 'Canada', coords: [-115.57, 51.18], kind: 'mountain', when: '2024',
    text: 'In the Canadian Rockies.' },

  // ---------- Football ----------
  { id: 'glasgow', city: 'Glasgow', country: 'United Kingdom', coords: [-4.25, 55.86], kind: 'football', when: '2015',
    text: 'Celtic – MFF' },
  { id: 'paris', city: 'Paris', country: 'France', coords: [2.35, 48.86], kind: 'football', when: '2015',
    text: 'PSG – MFF' },
  { id: 'lviv', city: 'Lviv', country: 'Ukraine', coords: [24.03, 49.84], kind: 'football', when: '2015',
    text: 'Shakhtar Donetsk – MFF' },
  { id: 'st-gallen', city: 'St. Gallen', country: 'Switzerland', coords: [9.37, 47.42], kind: 'football', when: '2019',
    text: 'Lugano – MFF' },
  { id: 'madrid', city: 'Madrid', country: 'Spain', coords: [-3.70, 40.42], kind: 'football', when: '2025',
    text: 'Real Madrid – MFF' },
];

// Countries I've visited that have no pin of their own (coloured green).
// Names must match the map data (e.g. "Czechia", "Bosnia and Herz.").
export const visitedCountries = [
  'Morocco', 'Belgium', 'Netherlands', 'Norway', 'Denmark', 'Latvia', 'Lithuania',
  'Czechia', 'Slovenia', 'Austria', 'Switzerland', 'Germany', 'France', 'Poland',
  'Croatia', 'Serbia', 'Hungary', 'Russia', 'Cyprus', 'Portugal', 'Ireland',
];

export const kinds = {
  life: 'Work, studies and life',
  visited: 'Visited',
  mountain: 'Mountains',
  football: 'Football',
};

// Map views. [[west, south], [east, north]] in degrees.
// When you pick a place outside the current view, the map jumps to the first view that contains it.
export const views = [
  { id: 'world', label: 'World' },
  { id: 'europe', label: 'Europe', bounds: [[-11, 35], [32, 69]] },
  { id: 'north-america', label: 'North America', bounds: [[-128, 24], [-66, 54]] },
  { id: 'asia', label: 'Asia', bounds: [[40, 18], [142, 44]] },
  { id: 'africa', label: 'Africa', bounds: [[-18, -8], [45, 37]] },
];

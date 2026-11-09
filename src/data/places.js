// Places on the map. Edit freely: add places, change texts.
//
// kind: "life"    = work, studies and major life events (yellow)
//       "visited" = places I've visited (green)
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
  { id: 'new-york', city: 'New York', country: 'United States of America', coords: [-74.01, 40.71], kind: 'visited', when: '2008' },
  { id: 'washington', city: 'Washington, D.C.', country: 'United States of America', coords: [-77.04, 38.91], kind: 'visited', when: '2011' },
  { id: 'boston', city: 'Boston', country: 'United States of America', coords: [-71.06, 42.36], kind: 'visited', when: '' },
  { id: 'seattle', city: 'Seattle', country: 'United States of America', coords: [-122.33, 47.61], kind: 'visited', when: '' },
  { id: 'san-francisco', city: 'San Francisco', country: 'United States of America', coords: [-122.42, 37.77], kind: 'visited', when: '' },
  { id: 'los-angeles', city: 'Los Angeles', country: 'United States of America', coords: [-118.24, 34.05], kind: 'visited', when: '' },
  { id: 'las-vegas', city: 'Las Vegas', country: 'United States of America', coords: [-115.14, 36.17], kind: 'visited', when: '' },
  { id: 'montreal', city: 'Montreal', country: 'Canada', coords: [-73.57, 45.50], kind: 'visited', when: '' },
  { id: 'toronto', city: 'Toronto', country: 'Canada', coords: [-79.38, 43.65], kind: 'visited', when: '' },
  { id: 'ottawa', city: 'Ottawa', country: 'Canada', coords: [-75.70, 45.42], kind: 'visited', when: '' },
  { id: 'vancouver', city: 'Vancouver', country: 'Canada', coords: [-123.12, 49.28], kind: 'visited', when: '' },
];

export const kinds = {
  life: 'Work, studies and life',
  visited: 'Visited',
};

// Map views. [[west, south], [east, north]] in degrees.
// When you pick a place outside the current view, the map jumps to the first view that contains it.
export const views = [
  { id: 'world', label: 'World' },
  { id: 'europe', label: 'Europe', bounds: [[-11, 36], [30, 62]] },
  { id: 'north-america', label: 'North America', bounds: [[-128, 24], [-66, 54]] },
  { id: 'asia', label: 'Asia', bounds: [[40, 18], [142, 44]] },
];

export const ROAD_TRIP_CODES = {
  TURTLES: 'tortuga',
  HANGOVER: 'vegas',
  BEIGNET: 'nola',
  WINE: 'glassblowing',
}

export const categories = [
  { id: 'romance', label: 'Romance', emoji: '🌹', color: 'bg-rose-100', border: 'border-rose-200', text: 'text-rose-700' },
  { id: 'fun', label: 'Fun', emoji: '😄', color: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-700' },
  { id: 'adventure', label: 'Adventure', emoji: '🌿', color: 'bg-green-100', border: 'border-green-200', text: 'text-green-700' },
  { id: 'food', label: 'Food', emoji: '🍜', color: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-700' },
  { id: 'roadtrip', label: 'Secret Special Dates', emoji: '✨', color: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-600', locked: true },
]

export const subMoods = {
  romance: [
    { id: 'nice', label: 'Nice', emoji: '🌸', description: 'Sweet & tender' },
    { id: 'naughty', label: 'Naughty', emoji: '🔥', description: 'A little spicy' },
  ],
  fun: [
    { id: 'out', label: 'Out & About', emoji: '🎉', description: 'Out in the world' },
    { id: 'creative', label: 'Creative', emoji: '🎨', description: 'Make something together' },
  ],
  adventure: [
    { id: 'outdoors', label: 'Outdoors', emoji: '🏕️', description: 'Into the wild' },
    { id: 'indoor', label: 'Indoor', emoji: '🧗', description: 'Adventure inside' },
  ],
  food: [
    { id: 'in', label: 'In', emoji: '🏠', description: 'Stay in & cook' },
    { id: 'out', label: 'Out', emoji: '🍽️', description: 'Go out & eat' },
  ],
}

export const dates = [
  // ── Romance / Nice / Day ──────────────────────────────────────────────────
  {
    id: 'romance-nice-day-1', category: 'romance', submood: 'nice', time: 'day',
    title: 'Ikebana Workshop at Kampong',
    description: 'A slow, beautiful morning arranging flowers together in a botanical paradise.',
    image: 'https://source.unsplash.com/featured/?flower-arrangement',
  },
  {
    id: 'romance-nice-day-2', category: 'romance', submood: 'nice', time: 'day',
    title: 'Rubell Museum',
    description: 'Wander through bold contemporary art and let the pieces spark conversation.',
    image: 'https://source.unsplash.com/featured/?art-museum',
  },
  {
    id: 'romance-nice-day-3', category: 'romance', submood: 'nice', time: 'day',
    title: 'Butterfly Museum',
    description: 'Step into a living kaleidoscope of color and flutter together.',
    image: 'https://source.unsplash.com/featured/?butterfly',
  },

  // ── Romance / Nice / Night ────────────────────────────────────────────────
  {
    id: 'romance-nice-night-1', category: 'romance', submood: 'nice', time: 'night',
    title: 'Bayfront Park Fountain Show + Dinner',
    description: 'Watch the lights and water dance at Bayfront, then steal a table nearby for dinner under the stars.',
    image: 'https://source.unsplash.com/featured/?fountain-night',
  },
  {
    id: 'romance-nice-night-2', category: 'romance', submood: 'nice', time: 'night',
    title: 'Night at the Theatre',
    description: 'Dress up, sit close, and let a live performance take you somewhere else entirely.',
    image: 'https://source.unsplash.com/featured/?theatre',
  },

  // ── Romance / Naughty / Day ───────────────────────────────────────────────
  {
    id: 'romance-naughty-day-1', category: 'romance', submood: 'naughty', time: 'day',
    title: 'Couples Massage',
    description: 'Side by side, melting into pure bliss together.',
    image: 'https://source.unsplash.com/featured/?spa-massage',
  },
  {
    id: 'romance-naughty-day-2', category: 'romance', submood: 'naughty', time: 'day',
    title: 'Turkish Baths',
    description: 'Steam, scrub, and soak in an ancient ritual made for two.',
    image: 'https://source.unsplash.com/featured/?hammam',
  },

  // ── Romance / Naughty / Night ─────────────────────────────────────────────
  {
    id: 'romance-naughty-night-1', category: 'romance', submood: 'naughty', time: 'night',
    title: 'Strangers at a Bar',
    description: 'Meet as strangers, flirt like you just found each other, and fall in love all over again.',
    image: 'https://source.unsplash.com/featured/?cocktail-bar',
  },
  {
    id: 'romance-naughty-night-2', category: 'romance', submood: 'naughty', time: 'night',
    title: 'Burlesque Show',
    description: 'An electrifying night of performance art, feathers, and fire.',
    image: 'https://source.unsplash.com/featured/?cabaret',
  },

  // ── Fun / Out & About / Day ───────────────────────────────────────────────
  {
    id: 'fun-out-day-1', category: 'fun', submood: 'out', time: 'day',
    title: 'Ice Skating',
    description: 'Glide (or wobble) around the rink hand in hand — falling is half the fun.',
    image: 'https://source.unsplash.com/featured/?ice-skating',
  },
  {
    id: 'fun-out-day-2', category: 'fun', submood: 'out', time: 'day',
    title: 'Puttery — Indoor Golf',
    description: 'Mini golf with cocktails, neon, and zero shame about your handicap.',
    image: 'https://source.unsplash.com/featured/?mini-golf',
  },
  {
    id: 'fun-out-day-3', category: 'fun', submood: 'out', time: 'day',
    title: 'Biscayne Bay Sightseeing Boat Tour',
    description: 'Cruise past the mansions of the rich and famous and pretend you belong there.',
    image: 'https://source.unsplash.com/featured/?boat-tour',
  },

  // ── Fun / Out & About / Night ─────────────────────────────────────────────
  {
    id: 'fun-out-night-1', category: 'fun', submood: 'out', time: 'night',
    title: 'Movie Night',
    description: 'Pick something neither of you has seen and share the popcorn.',
    image: 'https://source.unsplash.com/featured/?cinema',
  },
  {
    id: 'fun-out-night-2', category: 'fun', submood: 'out', time: 'night',
    title: 'Cooking Class',
    description: 'Learn a new dish together — messy aprons and all.',
    image: 'https://source.unsplash.com/featured/?cooking-class',
  },
  {
    id: 'fun-out-night-3', category: 'fun', submood: 'out', time: 'night',
    title: 'Laser Show',
    description: 'Lie back and let the universe put on a show just for you.',
    image: 'https://source.unsplash.com/featured/?laser-light',
  },

  // ── Fun / Creative / Day ─────────────────────────────────────────────────
  {
    id: 'fun-creative-day-1', category: 'fun', submood: 'creative', time: 'day',
    title: 'The Jury Experience',
    description: 'Step into an immersive live courtroom drama and decide the verdict together.',
    image: 'https://source.unsplash.com/featured/?courtroom',
  },
  {
    id: 'fun-creative-day-2', category: 'fun', submood: 'creative', time: 'day',
    title: 'Scrapbooking Together',
    description: "Dig out the photos, grab the glue, and build a little memory book of us.",
    image: 'https://source.unsplash.com/featured/?scrapbook',
  },
  {
    id: 'fun-creative-day-3', category: 'fun', submood: 'creative', time: 'day',
    title: 'Master Chocolate Class',
    description: 'Temper, mold, and taste your way through an afternoon of pure chocolate magic.',
    image: 'https://source.unsplash.com/featured/?chocolate',
  },

  // ── Fun / Creative / Night ────────────────────────────────────────────────
  {
    id: 'fun-creative-night-1', category: 'fun', submood: 'creative', time: 'night',
    title: 'Artisans Playhouse',
    description: 'A night of live performance, creativity, and unexpected magic.',
    image: 'https://source.unsplash.com/featured/?theater-stage',
  },
  {
    id: 'fun-creative-night-2', category: 'fun', submood: 'creative', time: 'night',
    title: 'Lego Night',
    description: 'Pick a set, clear the table, and build something ridiculous together.',
    image: 'https://source.unsplash.com/featured/?lego',
  },
  {
    id: 'fun-creative-night-3', category: 'fun', submood: 'creative', time: 'night',
    title: 'Jewelry Making Night',
    description: 'Beads, wire, and a little patience — make something you can both wear.',
    image: 'https://source.unsplash.com/featured/?jewelry-making',
  },

  // ── Adventure / Outdoors / Day ────────────────────────────────────────────
  {
    id: 'adventure-outdoors-day-1', category: 'adventure', submood: 'outdoors', time: 'day',
    title: 'Special Kayaking Experience',
    description: 'Paddle through calm waters and discover hidden spots together.',
    image: 'https://source.unsplash.com/featured/?kayaking',
  },
  {
    id: 'adventure-outdoors-day-2', category: 'adventure', submood: 'outdoors', time: 'day',
    title: 'Full Hiking Day + Picnic',
    description: 'Hit the trail, breathe fresh air, and earn that view at the top — then picnic like royalty.',
    image: 'https://source.unsplash.com/featured/?hiking',
  },
  {
    id: 'adventure-outdoors-day-3', category: 'adventure', submood: 'outdoors', time: 'day',
    title: 'Tigertail Aqua Challenge',
    description: 'An inflatable obstacle course on the water — equal parts chaos and laughter.',
    image: 'https://source.unsplash.com/featured/?water-sports',
  },

  // ── Adventure / Outdoors / Night ──────────────────────────────────────────
  {
    id: 'adventure-outdoors-night-1', category: 'adventure', submood: 'outdoors', time: 'night',
    title: 'Glow-in-the-Dark ATV Adventure',
    description: 'Tear through trails in the dark with neon glowing all around you. Extreme optional.',
    image: 'https://source.unsplash.com/featured/?atv-night',
  },
  {
    id: 'adventure-outdoors-night-2', category: 'adventure', submood: 'outdoors', time: 'night',
    title: 'Private Romantic Air Tour with Champagne',
    description: 'Float above the city lights with a glass of champagne and nowhere else to be.',
    image: 'https://source.unsplash.com/featured/?aerial-city-night',
  },

  // ── Adventure / Indoor / Day ──────────────────────────────────────────────
  {
    id: 'adventure-indoor-day-1', category: 'adventure', submood: 'indoor', time: 'day',
    title: 'Velocity Rock Climbing',
    description: 'Scale the wall, trust the belay, and cheer each other to the top.',
    image: 'https://source.unsplash.com/featured/?rock-climbing',
  },

  // ── Adventure / Indoor / Night ────────────────────────────────────────────
  {
    id: 'adventure-indoor-night-1', category: 'adventure', submood: 'indoor', time: 'night',
    title: 'NightLAB at Frost Science',
    description: 'The museum after dark — cocktails, exhibits, and a planetarium show overhead.',
    image: 'https://source.unsplash.com/featured/?planetarium',
  },
  {
    id: 'adventure-indoor-night-2', category: 'adventure', submood: 'indoor', time: 'night',
    title: 'Just Us — Clubbing Night',
    description: 'Just the two of you on the dance floor. No plan. Just music and movement.',
    image: 'https://source.unsplash.com/featured/?nightclub',
  },

  // ── Food / In / Day ───────────────────────────────────────────────────────
  {
    id: 'food-in-day-1', category: 'food', submood: 'in', time: 'day',
    title: 'Backyard Coffee + Pastries',
    description: 'A slow morning, good coffee, flaky pastries, and even flakier company. (+ pasties 😏)',
    image: 'https://source.unsplash.com/featured/?coffee-pastry',
  },
  {
    id: 'food-in-day-2', category: 'food', submood: 'in', time: 'day',
    title: 'Waffle Bar + Mimosas',
    description: 'Build-your-own waffles, bottomless mimosas, and absolutely no rush.',
    image: 'https://source.unsplash.com/featured/?waffles',
  },
  {
    id: 'food-in-day-3', category: 'food', submood: 'in', time: 'day',
    title: 'Crepe Station + Rosé',
    description: 'Sweet and savory crepes with a glass of something pink and perfect.',
    image: 'https://source.unsplash.com/featured/?crepes',
  },

  // ── Food / In / Night ─────────────────────────────────────────────────────
  {
    id: 'food-in-night-1', category: 'food', submood: 'in', time: 'night',
    title: 'Homemade Pasta from Scratch',
    description: 'Roll the dough, choose your sauce, and make dinner a full event.',
    image: 'https://source.unsplash.com/featured/?pasta-making',
  },
  {
    id: 'food-in-night-2', category: 'food', submood: 'in', time: 'night',
    title: 'Mezze & Wine Night',
    description: 'Spread out a feast of dips, bites, and breads and graze the night away.',
    image: 'https://source.unsplash.com/featured/?mezze',
  },
  {
    id: 'food-in-night-3', category: 'food', submood: 'in', time: 'night',
    title: "Chef's Food Roulette 🎲",
    description: 'Spin the wheel, pick random ingredients, and cook something totally unplanned together.',
    image: 'https://source.unsplash.com/featured/?cooking',
  },

  // ── Food / Out / Day ──────────────────────────────────────────────────────
  {
    id: 'food-out-day-1', category: 'food', submood: 'out', time: 'day',
    title: "Chuy's for Chalupa",
    description: 'Dive into cheesy, saucy Tex-Mex comfort at the best booth in town.',
    image: 'https://source.unsplash.com/featured/?mexican-food',
  },
  {
    id: 'food-out-day-2', category: 'food', submood: 'out', time: 'day',
    title: "Frankie & Wally's",
    description: 'A neighborhood gem for relaxed bites and easy conversation.',
    image: 'https://source.unsplash.com/featured/?restaurant',
  },
  {
    id: 'food-out-day-3', category: 'food', submood: 'out', time: 'day',
    title: "Sunny's",
    description: 'Bright, laid-back, and exactly right for a daytime eat-out that feels like a treat.',
    image: 'https://source.unsplash.com/featured/?brunch',
  },

  // ── Food / Out / Night ────────────────────────────────────────────────────
  {
    id: 'food-out-night-1', category: 'food', submood: 'out', time: 'night',
    title: 'Hiyakawa',
    description: 'Sleek omakase vibes, impeccable fish, and a night that feels quietly special.',
    image: 'https://source.unsplash.com/featured/?sushi',
  },
  {
    id: 'food-out-night-2', category: 'food', submood: 'out', time: 'night',
    title: 'Aviv',
    description: 'Modern Israeli flavors in a setting that earns every candle on the table.',
    image: 'https://source.unsplash.com/featured/?fine-dining',
  },
  {
    id: 'food-out-night-3', category: 'food', submood: 'out', time: 'night',
    title: "L'Atelier",
    description: 'Counter dining at its finest — watch the kitchen and eat something extraordinary.',
    image: 'https://source.unsplash.com/featured/?french-restaurant',
  },

  // ── Road Trips ────────────────────────────────────────────────────────────
  {
    id: 'roadtrip-tortuga', category: 'roadtrip', submood: null, time: 'any',
    title: 'Tortuga Seaplane',
    description: 'Take off from the water and soar over turquoise seas to a secret island paradise.',
    image: 'https://source.unsplash.com/featured/?seaplane',
    roadTripCode: 'tortuga',
  },
  {
    id: 'roadtrip-vegas', category: 'roadtrip', submood: null, time: 'any',
    title: 'Vegas — The Sphere + RuPaul',
    description: "Viva Las Vegas: a mind-bending show inside the world's largest screen, plus a legendary drag queen.",
    image: 'https://source.unsplash.com/featured/?las-vegas',
    roadTripCode: 'vegas',
  },
  {
    id: 'roadtrip-nola', category: 'roadtrip', submood: null, time: 'any',
    title: 'Beignets in New Orleans',
    description: 'Powdered sugar on your nose, jazz in the air, and the magic of the Quarter all around you.',
    image: 'https://source.unsplash.com/featured/?new-orleans',
    roadTripCode: 'nola',
  },
  {
    id: 'roadtrip-glassblowing', category: 'roadtrip', submood: null, time: 'any',
    title: 'Zen Glass Studios — St. Pete',
    description: 'Watch molten glass become art at the hands of a master, then try it yourself. Beautiful chaos.',
    image: 'https://source.unsplash.com/featured/?glassblowing',
    roadTripCode: 'glassblowing',
  },
]

export function getDateOptions(category, submood, time) {
  return dates.filter(
    d => d.category === category &&
      (submood === null || d.submood === submood) &&
      (d.time === time || d.time === 'any')
  )
}

export const ROAD_TRIP_CODES = {
  TURTLES: 'tortuga',
  HANGOVER: 'vegas',
  BEIGNET: 'nola',
}

export const categories = [
  { id: 'romance', label: 'Romance', emoji: '🌹', color: 'bg-rose-100', border: 'border-rose-200', text: 'text-rose-700' },
  { id: 'fun', label: 'Fun', emoji: '😄', color: 'bg-yellow-100', border: 'border-yellow-200', text: 'text-yellow-700' },
  { id: 'adventure', label: 'Adventure', emoji: '🌿', color: 'bg-green-100', border: 'border-green-200', text: 'text-green-700' },
  { id: 'food', label: 'Food', emoji: '🍜', color: 'bg-orange-100', border: 'border-orange-200', text: 'text-orange-700' },
  { id: 'roadtrip', label: 'Road Trip', emoji: '🚗', color: 'bg-slate-100', border: 'border-slate-200', text: 'text-slate-600', locked: true },
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
    { id: 'skill', label: 'Skill', emoji: '⚔️', description: 'Level up together' },
    { id: 'indoor', label: 'Indoor', emoji: '🧗', description: 'Adventure inside' },
  ],
  food: [
    { id: 'homecooked', label: 'Home Cooked', emoji: '🍳', description: 'We cook it' },
    { id: 'fancy', label: 'Fancy', emoji: '🥂', description: 'Treat yourselves' },
    { id: 'cozy', label: 'Cozy', emoji: '☕', description: 'Chill bites' },
  ],
}

const placeholder = {
  title: 'Coming soon 🥚',
  description: 'Something special is being planned…',
}

export const dates = [
  // Romance / Nice / Day
  { id: 'romance-nice-day-1', category: 'romance', submood: 'nice', time: 'day', title: 'Ikebana Workshop at Kampong', description: 'A slow, beautiful morning arranging flowers together in a botanical paradise.' },
  { id: 'romance-nice-day-2', category: 'romance', submood: 'nice', time: 'day', title: 'Rubell Museum', description: 'Wander through bold contemporary art and let the pieces spark conversation.' },
  { id: 'romance-nice-day-3', category: 'romance', submood: 'nice', time: 'day', title: 'Butterfly Museum', description: 'Step into a living kaleidoscope of color and flutter together.' },

  // Romance / Nice / Night
  { id: 'romance-nice-night-1', category: 'romance', submood: 'nice', time: 'night', ...placeholder },

  // Romance / Naughty / Day
  { id: 'romance-naughty-day-1', category: 'romance', submood: 'naughty', time: 'day', title: 'Couples Massage', description: 'Side by side, melting into pure bliss together.' },

  // Romance / Naughty / Night
  { id: 'romance-naughty-night-1', category: 'romance', submood: 'naughty', time: 'night', title: 'Strangers at a Bar', description: 'Meet as strangers, flirt like you just found each other, and fall in love all over again.' },
  { id: 'romance-naughty-night-2', category: 'romance', submood: 'naughty', time: 'night', title: 'Burlesque Show', description: 'An electrifying night of performance art, feathers, and fire.' },

  // Fun / Out & About / Day
  { id: 'fun-out-day-1', category: 'fun', submood: 'out', time: 'day', title: 'Ice Skating', description: 'Glide (or wobble) around the rink hand in hand — falling is half the fun.' },

  // Fun / Out & About / Night
  { id: 'fun-out-night-1', category: 'fun', submood: 'out', time: 'night', title: 'Movie Night', description: 'Pick something neither of you has seen and share the popcorn.' },
  { id: 'fun-out-night-2', category: 'fun', submood: 'out', time: 'night', title: 'Cooking Class', description: 'Learn a new dish together — messy aprons and all.' },
  { id: 'fun-out-night-3', category: 'fun', submood: 'out', time: 'night', title: 'Laser Show', description: 'Lie back and let the universe put on a show just for you.' },

  // Fun / Creative / Day
  { id: 'fun-creative-day-1', category: 'fun', submood: 'creative', time: 'day', title: 'The Jury Experience', description: 'Step into an immersive live theater courtroom drama and decide the verdict together.' },

  // Fun / Creative / Night
  { id: 'fun-creative-night-1', category: 'fun', submood: 'creative', time: 'night', title: 'Artisans Playhouse', description: 'A night of live performance, creativity, and unexpected magic.' },

  // Adventure / Outdoors / Day
  { id: 'adventure-outdoors-day-1', category: 'adventure', submood: 'outdoors', time: 'day', title: 'Kayaking', description: 'Paddle through calm waters and discover hidden spots together.' },
  { id: 'adventure-outdoors-day-2', category: 'adventure', submood: 'outdoors', time: 'day', title: 'Hiking', description: 'Hit the trail, breathe fresh air, and earn that view at the top.' },
  { id: 'adventure-outdoors-day-3', category: 'adventure', submood: 'outdoors', time: 'day', title: 'Archery', description: 'Channel your inner archer — steady aim, steady heart.' },
  { id: 'adventure-outdoors-night-1', category: 'adventure', submood: 'outdoors', time: 'night', ...placeholder },

  // Adventure / Skill / Day
  { id: 'adventure-skill-day-1', category: 'adventure', submood: 'skill', time: 'day', title: 'Dance Workshop', description: 'Learn new moves together and let the rhythm take over.' },
  { id: 'adventure-skill-day-2', category: 'adventure', submood: 'skill', time: 'day', title: 'Axe Throwing', description: 'Release the stress and let the axes fly — competition optional.' },
  { id: 'adventure-skill-day-3', category: 'adventure', submood: 'skill', time: 'day', title: 'Obstacle Course', description: 'Tackle every challenge as a team and cross the finish line together.' },
  { id: 'adventure-skill-night-1', category: 'adventure', submood: 'skill', time: 'night', ...placeholder },

  // Adventure / Indoor / Day
  { id: 'adventure-indoor-day-1', category: 'adventure', submood: 'indoor', time: 'day', title: 'Rock Climbing', description: 'Scale new heights and trust each other every step of the way.' },
  { id: 'adventure-indoor-day-2', category: 'adventure', submood: 'indoor', time: 'day', title: 'Escape Room', description: 'Crack the clues, beat the clock, and escape together (hopefully).' },
  { id: 'adventure-indoor-day-3', category: 'adventure', submood: 'indoor', time: 'day', title: 'VR Experience', description: 'Step into another world, side by side, no passport required.' },
  { id: 'adventure-indoor-night-1', category: 'adventure', submood: 'indoor', time: 'night', ...placeholder },

  // Food / Home Cooked / Day
  { id: 'food-homecooked-day-1', category: 'food', submood: 'homecooked', time: 'day', title: 'Backyard Coffee + Pastries (+ pasties 😏)', description: 'A slow morning, good coffee, flaky pastries, and even flakier company.' },
  { id: 'food-homecooked-day-2', category: 'food', submood: 'homecooked', time: 'day', title: 'Waffle Bar + Mimosas', description: 'Build-your-own waffles, bottomless mimosas, and absolutely no rush.' },
  { id: 'food-homecooked-day-3', category: 'food', submood: 'homecooked', time: 'day', title: 'Crepe Station + Rosé', description: 'Sweet and savory crepes with a glass of something pink and perfect.' },

  // Food / Home Cooked / Night
  { id: 'food-homecooked-night-1', category: 'food', submood: 'homecooked', time: 'night', title: 'Homemade Pasta from Scratch', description: 'Roll the dough, choose your sauce, and make dinner a full event.' },
  { id: 'food-homecooked-night-2', category: 'food', submood: 'homecooked', time: 'night', title: 'Mezze & Wine Night', description: 'Spread out a feast of dips, bites, and breads and graze the night away.' },

  // Food / Fancy / Day
  { id: 'food-fancy-day-1', category: 'food', submood: 'fancy', time: 'day', ...placeholder },

  // Food / Fancy / Night
  { id: 'food-fancy-night-1', category: 'food', submood: 'fancy', time: 'night', ...placeholder },

  // Food / Cozy / Day
  { id: 'food-cozy-day-1', category: 'food', submood: 'cozy', time: 'day', title: "Chuy's for Chalupa", description: 'Dive into cheesy, saucy Tex-Mex comfort at the best booth in town.' },
  { id: 'food-cozy-day-2', category: 'food', submood: 'cozy', time: 'day', title: "Frankie & Wally's", description: 'A neighborhood gem for relaxed, cozy bites and easy conversation.' },

  // Food / Cozy / Night
  { id: 'food-cozy-night-1', category: 'food', submood: 'cozy', time: 'night', ...placeholder },

  // Road Trips
  { id: 'roadtrip-tortuga', category: 'roadtrip', submood: null, time: 'any', title: 'Tortuga Seaplane', description: 'Take off from the water and soar over turquoise seas to a secret island paradise.', roadTripCode: 'tortuga' },
  { id: 'roadtrip-vegas', category: 'roadtrip', submood: null, time: 'any', title: 'Vegas — The Sphere + RuPaul', description: 'Viva Las Vegas: a mind-bending show inside the world\'s largest screen, plus a legendary drag queen.', roadTripCode: 'vegas' },
  { id: 'roadtrip-nola', category: 'roadtrip', submood: null, time: 'any', title: 'Beignets in New Orleans', description: 'Powdered sugar on your nose, jazz in the air, and the magic of the Quarter all around you.', roadTripCode: 'nola' },
]

export function getDateOptions(category, submood, time) {
  return dates.filter(
    d => d.category === category &&
      (submood === null || d.submood === submood) &&
      (d.time === time || d.time === 'any')
  )
}

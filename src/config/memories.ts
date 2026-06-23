// ============================================================
// 🌌 365 Constellations of Us — Master Config File
// ============================================================
// Edit everything here to personalize the website.
// No other files need to be changed.
// ============================================================

export const SITE_CONFIG = {
  title: "365 Constellations of Us",
  subtitle: "A story written across distance, memories and time.",
  partnerName: "Subbu",
  anniversaryDate: new Date("2026-06-24T00:00:00"), // Anniversary date
  startDate: new Date("2026-06-24T00:00:00"), // First day together
};

// ============================================================
// 📸 PHOTOS — Replace these paths with your actual photos
// ============================================================
// Drop your photos into public/photos/ and update the paths below

export const PHOTOS = {
  PHOTO_1: "/photos/photo1.png", // First Meet section (parallax full-screen photo)
  PHOTO_2: "/photos/photo2.png", // Then & Now — "Then" column (first meeting photo)
  PHOTO_3: "/photos/photo3.png", // Then & Now — "Now" column (recent/current photo)
};

// ============================================================
// 🎵 MUSIC — Drop your mp3 into public/music/ and update
// ============================================================
export const MUSIC = {
  src: "/music/piano.mp3",
  autoplay: false,
  loop: true,
};

// ============================================================
// 🌍 MAP LOCATIONS (Hyderabad & Vizag)
// ============================================================
export const LOCATIONS = {
  location1: {
    name: "Subbu's Location",
    city: "Hyderabad",
    lat: 17.385044,
    lng: 78.486671,
  },
  location2: {
    name: " My Location",
    city: "Visakhapatnam",
    lat: 17.6868,
    lng: 83.2185,
  },
};

// ============================================================
// ⭐ MEMORY CONSTELLATION STARS
// ============================================================
export const MEMORIES = [
  {
    id: "proposal",
    title: "The Beginning",
    emoji: "💍",
    date: "24 June 2025",
    x: 20, // SVG position percentage
    y: 15,
    text: "I still remember your voice, your nervousness and the way my heart refused to stay calm. That moment you proposed, everything changed. The world paused. And I knew — this was the beginning of something beautiful.",
    image: null,
  },
  {
    id: "first-video-call",
    title: "First Video Call",
    emoji: "📱",
    date: "June 2025",
    x: 45,
    y: 25,
    text: "Even through a screen, you somehow felt closer than anyone else. Your smile, your laugh, the way your eyes lit up — I realized I was in trouble. The best kind of trouble.",
    image: null,
  },
  {
    id: "first-meet",
    title: "First Meet",
    emoji: "🌟",
    date: "22 January 2026",
    x: 70,
    y: 15,
    text: "After months of calls, waiting, missing each other and dreaming about this moment... I finally got to see the smile I had only known through a screen. You were even more beautiful in person.",
    image: PHOTOS.PHOTO_1,
  },
  {
    id: "first-hug",
    title: "First Hug",
    emoji: "🤗",
    date: "24 January 2026",
    x: 85,
    y: 45,
    text: "Months of waiting disappeared in a few seconds. The moment your arms wrapped around me, everything felt right. No more screens. No more distance. Just us.",
    image: null,
  },
  {
    id: "auto-ride",
    title: "Auto Ride",
    emoji: "🛺",
    date: "24 January 2026",
    x: 60,
    y: 60,
    text: "The city was moving around us, but that moment felt frozen in time. The cool air, the city lights, your hand in mine — I wanted that ride to last forever.",
    image: null,
  },
  {
    id: "first-kiss",
    title: "First Kiss",
    emoji: "💋",
    date: "24 January 2026",
    x: 30,
    y: 55,
    text: "A memory that still makes me smile. Still makes my heart race. Some moments don't need words — they just live in the quiet corners of your heart forever.",
    image: null,
  },
  {
    id: "reunion",
    title: "Reunion",
    emoji: "🌅",
    date: "12 June 2026",
    x: 15,
    y: 45,
    text: "No matter how far life took us, somehow we found our way back. Every reunion reminded me why the distance was worth it. Because coming back to you always felt like coming home.",
    image: null,
  },
];

// ============================================================
// ❤️ HEART CONSTELLATION CARDS
// ============================================================
export const HEART_CARDS = [
  {
    id: "love-about",
    title: "What I Love About You",
    emoji: "⭐",
    content: "Your laugh that fills up every room. The way you care so deeply about the people you love. Your strength through distance and silence. The way you make ordinary moments feel extraordinary. Everything about you, Subbu — every single thing.",
  },
  {
    id: "distance-taught",
    title: "What Distance Taught Me",
    emoji: "⭐",
    content: "Distance taught me that love isn't about proximity — it's about presence. Even 650 kilometers away, you were in every song I heard, every sunset I saw, every quiet moment I lived. Distance didn't separate us. It proved us.",
  },
  {
    id: "miss-most",
    title: "What I Miss Most",
    emoji: "⭐",
    content: "The sound of your voice in real life. The way you look when you laugh without thinking. Just sitting next to you in comfortable silence. The small moments that no video call can capture. You — just you, being near.",
  },
  {
    id: "favorite-memory",
    title: "My Favorite Memory",
    emoji: "⭐",
    content: "January. Our first meeting. The look on your face when you finally saw me after months of waiting. That moment when everything we had built through screens became real. I replay it on every difficult day.",
  },
  {
    id: "promise",
    title: "My Promise",
    emoji: "⭐",
    content: "No matter the distance, the silence, or the storms — I will always find my way back to you. I promise to keep choosing you, every single day. Through every timezone, every season, every version of us. Always.",
  },
];

// ============================================================
// 💌 LOVE LETTER
// ============================================================
export const LOVE_LETTER = {
  heading: "A Letter To Subbu",
  subtitle: "The most beautiful part of my last 365 days.",
  paragraphs: [
    "Oye Subbu ❤️,",
    "Exactly one year back, manam strangers. Oka simple conversation tho start ayina mana journey, ivvala naa life lo chala beautiful part ayipoyindhi.",
    "Naku ippatiki aa moment gurthundhi... nuvvu nannu propose chesina aa second. Nee voice lo unna aa nervousness, aa siggu, aa prema... aa roju nundi naa heart lo permanent ga nilichipoyayi. Appudu manaki teliyadu, mana journey easy kaadani. Kani mana iddaram kalisi nadustham ani nammakam undhi.",
    "Mana story lo chala special thing enti ante... mana long-distance. Chala mandi distance prema ni taggistundi anukuntaru. Kani mana vishayam lo distance mana premani inka strong chesindhi. Kilometers manalni dooram pettayi gani, mana manasulani eppudu dooram cheyalekapoyayi.",
    "Enno late-night calls, enno endless chats, enno muga video calls... matalu lekunda okari presence ni inkokaru feel ayina rojulu. Konni rojulu chala kashtamga undevi. Ninnu kalavalani anipinchi kalavalekapoyina rojulu. Hug kavali anipinchi phone screen chudalsina rojulu. Badha vachinappudu nee pakkana undalani anipinchi, voice vinadam tho saripettukunnam.",
    "Kani aa distance manaki oka vishayam nerpinchindhi — love ante pakkana undadam maatrame kaadhu, dooramga unna kuda okariki okaru support ga undadam ani.",
    "June nundi December varaku mana memories, mana conversations, mana navvulu... anni naa heart lo treasures laga unnayi.",
    "January lo mana first meet... aa roju gurinchi alochisthe ippatiki smile vasthundi. Nee face lo aa siggu, aa happiness chusi naa heart full ayipoyindhi. Nuvvu naa bhujam pattukunna aa moment lo, inni months wait chesina prati second worth anipinchindhi. Ninnu chusthu, \"Finally, she's here\" ani anipinchindhi.",
    "Mana second meet lo aa auto ride, aa hug, aa kiss... aa moments anni naa gundello permanent ga nilichipoyayi. Aa few hours manaki months of distance ki answer laga anipinchayi.",
    "Tarvatha malli distance vachindhi. Oka stage lo 5 months proper connection kuda ledu. Kani nijam cheppali ante, nuvvu eppudu naa nundi dooram kaaledu. Prati song lo, prati memory lo, prati happy moment lo, prati lonely night lo nuvve unnave.",
    "Konni relationships time tho maripothayi. Kani mana relationship time ni, distance ni, silence ni kuda survive chesindhi. Adhe mana story ni special chesthundi.",
    "Subbu, nuvvu naa life loki vachinanduku thank you.",
    "Naa happiest moments lo navvinanduku thank you.",
    "Naa darkest moments lo kuda vadilipettakunda unnanduku thank you.",
    "Distance unna kuda nannu prema cheyadam aapaledu kabatti thank you.",
    "Ee oka year lo manam perfect ga undaledu. Mistakes chesam, misunderstandings vachayi, distance kuda manalni test chesindhi. Kani prati sari mana iddaram malli okari daggariki okaram vacham. Adhe naa favourite part.",
    "Nuvvu naa pakkana leni rojulu chala unnayi, kani naa heart lo leni roju okkati kuda ledu. ❤️",
    "Distance manalni separate cheyyaledu, adi mana premani entha nijamga undo prove chesindhi.",
    "I love you, Subbu. Happy One Year of Us. 🫂❤️✨",
  ],
};

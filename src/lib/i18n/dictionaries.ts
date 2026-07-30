import type { Locale } from "../types";

export const dictionaries = {
  en: {
    // Nav
    nav: {
      home: "Home",
      about: "About",
      leadership: "Leadership",
      regions: "Regions",
      visit: "Plan Your Visit",
      sermons: "Sermons",
      live: "Live",
      events: "Events",
      ministries: "Ministries",
      give: "Give",
      blog: "Blog",
      membership: "Membership",
      contact: "Contact",
      more: "More",
    },
    // Common
    common: {
      learnMore: "Learn more",
      viewAll: "View all",
      submit: "Submit",
      loading: "Loading…",
      search: "Search",
      comingSoon: "Coming soon",
      readMore: "Read more",
      back: "Back",
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email",
      name: "Name",
      message: "Message",
      branch: "Branch",
      region: "Region",
      selectBranch: "Select a branch",
      selectRegion: "Select a region",
    },
    // Home
    home: {
      heroTagline:
        "“Not by might, nor by power, but by My Spirit,” says the Lord of hosts. — Zechariah 4:6",
      heroTitle: "Jesus Christ Ministries",
      heroSubtitle:
        "A Spirit-filled Pentecostal ministry across Kenya — raising disciples, planting churches, and advancing the Kingdom of God.",
      ctaVisit: "Plan Your Visit",
      ctaGive: "Give",
      ctaSermons: "Watch Sermons",
      findBranch: "Find Your Branch",
      findBranchHint: "Search by name or region…",
      latestSermon: "Latest Sermon",
      upcomingEvents: "Upcoming Events",
      regionsTitle: "Our Seven Regions",
      regionsSubtitle:
        "From Nairobi to the coast, Western to the North Rift — one ministry, many houses of worship.",
      welcomeTitle: "You Are Welcome Here",
      welcomeBody:
        "Whether you are seeking God for the first time or looking for a Spirit-filled church family, Jesus Christ Ministries is a place to grow in faith, experience the power of the Holy Spirit, and serve with purpose.",
      leadershipCta: "Meet Our Leadership",
      livestreamBanner: "Join us live for service",
      watchLive: "Watch Live",
    },
    // About
    about: {
      title: "About the Ministry",
      subtitle: "Who we are and what we believe",
      missionTitle: "Our Mission",
      missionBody:
        "To proclaim the Gospel of Jesus Christ in the power of the Holy Spirit, make disciples, plant and strengthen local churches, and transform communities across Kenya and beyond.",
      visionTitle: "Our Vision",
      visionBody:
        "A growing, Spirit-filled family of believers united under Christ — marked by prayer, holiness, evangelism, and love.",
      beliefsTitle: "What We Believe",
    },
    // Leadership
    leadership: {
      title: "Organizational Leadership",
      subtitle:
        "Bishop, national officers, regional overseers, and ministry leaders serving Jesus Christ Ministries.",
      bishop: "Bishop",
      founder: "Founder",
      overseer: "Regional Overseer",
      assistantBishop: "Assistant Bishop",
      assistantBishops: "Assistant Bishops",
      secretaryGeneral: "Secretary General",
      ministryCoordinator: "Ministry Coordinator",
      treasurer: "Treasurer",
      pastor: "Branch Pastor",
      expand: "Show branches & pastors",
      collapse: "Hide branches & pastors",
      viewBio: "View bio",
      close: "Close",
      branches: "branches",
      pastors: "pastors",
      regionalOverseers: "Regional Overseers",
      andSpouse: "and",
      nationalDepartmentsTitle: "National Ministry Leaders",
      nationalDepartmentsSubtitle:
        "Women's, men's, and youth leadership serving the whole ministry.",
      pastorsWelfareTitle: "Pastors Welfare",
      pastorsWelfareSubtitle:
        "Committee supporting the welfare of pastors across the ministry.",
      welfareChairman: "Chairman",
      welfareSecretary: "Secretary",
      welfareTreasurer: "Treasurer",
    },
    // Regions
    regions: {
      title: "Our Regions",
      subtitle: "Seven major regions. Twenty-plus branches. One ministry.",
      viewRegion: "View region",
      overseer: "Overseer",
      branchesInRegion: "Branches in this region",
    },
    // Branch
    branch: {
      serviceTimes: "Service Times",
      pastor: "Branch Pastor",
      location: "Location",
      contact: "Contact",
      localEvents: "Local Events",
      localMinistries: "Local Ministries",
      planVisit: "Plan a visit to this branch",
    },
    // Visit
    visit: {
      title: "Plan Your Visit",
      subtitle:
        "We would love to welcome you. Tell us a little about yourself and which branch you plan to visit.",
      howHeard: "How did you hear about us?",
      success: "Thank you! Your branch team will be glad to receive you.",
    },
    // Sermons
    sermons: {
      title: "Sermons & Livestream",
      subtitle: "Watch live services and browse the archive.",
      liveNow: "Live Now",
      offline: "Next service soon",
      filterSpeaker: "Speaker",
      filterSeries: "Series",
      archive: "Sermon Archive",
    },
    // Events
    events: {
      title: "Events Calendar",
      subtitle: "Conferences, crusades, and gatherings across the ministry.",
      filterAll: "All events",
      filterGlobal: "Ministry-wide",
      scope: {
        global: "Ministry-wide",
        region: "Regional",
        branch: "Branch",
      },
    },
    // Ministries
    ministries: {
      title: "Ministries & Small Groups",
      subtitle: "Find a place to serve and grow — nationally or at your local branch.",
      national: "Ministry-wide",
      local: "Branch ministries",
    },
    // Give
    give: {
      title: "Give",
      subtitle:
        "Partner with us in advancing the Gospel. Giving details will be published here soon.",
      whyTitle: "Why We Give",
      whyBody:
        "Giving is an act of worship. We honour the Lord with our tithes and offerings so that the Gospel may go forth and the local church may thrive.",
      scripture:
        '"Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver." — 2 Corinthians 9:7',
      detailsSoon:
        "Paybill, Till, and bank details will be added here. Thank you for your patience as we set this up carefully.",
    },
    // Blog
    blog: {
      title: "Devotionals & Blog",
      subtitle: "News, testimonies, and daily bread from the Word.",
      categories: {
        devotional: "Devotional",
        news: "News",
        testimony: "Testimony",
      },
    },
    // Membership
    membership: {
      title: "Membership Registration",
      subtitle:
        "Join the Jesus Christ Ministries family. Complete the form below and your branch leadership will follow up.",
      dob: "Date of birth",
      previousChurch: "Previous church (optional)",
      previousChurchHint: "Leave blank if you are a new believer",
      success: "Application received. Status: pending review.",
    },
    // Contact
    contact: {
      title: "Contact Us",
      subtitle: "General inquiries, prayer, or partnership.",
      success: "Message sent. We will respond as soon as we can.",
    },
    // Footer
    footer: {
      tagline: "Spirit-filled. Kingdom-minded. Family-centred.",
      quickLinks: "Quick links",
      regions: "Regions",
      legal: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Use",
      rights: "All rights reserved.",
      social: "Connect with us",
    },
    legal: {
      privacyTitle: "Privacy Policy",
      termsTitle: "Terms of Use",
      placeholder:
        "This page will be finalized before public launch. We respect your privacy and will only use contact information to serve you as part of this ministry.",
    },
  },
  sw: {
    nav: {
      home: "Nyumbani",
      about: "Kuhusu",
      leadership: "Uongozi",
      regions: "Mikoa",
      visit: "Panga Ziara",
      sermons: "Mahubiri",
      live: "Moja kwa Moja",
      events: "Matukio",
      ministries: "Huduma",
      give: "Toa",
      blog: "Blogu",
      membership: "Uanachama",
      contact: "Wasiliana",
      more: "Zaidi",
    },
    common: {
      learnMore: "Jifunze zaidi",
      viewAll: "Angalia zote",
      submit: "Wasilisha",
      loading: "Inapakia…",
      search: "Tafuta",
      comingSoon: "Inakuja hivi karibuni",
      readMore: "Soma zaidi",
      back: "Rudi",
      phone: "Simu",
      whatsapp: "WhatsApp",
      email: "Barua pepe",
      name: "Jina",
      message: "Ujumbe",
      branch: "Tawi",
      region: "Mkoa",
      selectBranch: "Chagua tawi",
      selectRegion: "Chagua mkoa",
    },
    home: {
      heroTagline:
        "“Si kwa uwezo, wala si kwa nguvu, bali ni kwa Roho wangu,” asema BWANA wa majeshi. — Zekaria 4:6",
      heroTitle: "Jesus Christ Ministries",
      heroSubtitle:
        "Huduma ya Kipentekoste yenye nguvu ya Roho Mtakatifu nchini Kenya — kuwafanya wanafunzi, kupanda makanisa, na kuendeleza Ufalme wa Mungu.",
      ctaVisit: "Panga Ziara Yako",
      ctaGive: "Toa",
      ctaSermons: "Tazama Mahubiri",
      findBranch: "Tafuta Tawi Lako",
      findBranchHint: "Tafuta kwa jina au mkoa…",
      latestSermon: "Hubiri la Hivi Karibuni",
      upcomingEvents: "Matukio Yanayokuja",
      regionsTitle: "Mikoa Yetu Saba",
      regionsSubtitle:
        "Kutoka Nairobi hadi pwani, Magharibi hadi North Rift — huduma moja, nyumba nyingi za ibada.",
      welcomeTitle: "Karibu Sana",
      welcomeBody:
        "Iwe unamtafuta Mungu kwa mara ya kwanza au unatafuta familia ya kanisa yenye Roho, Jesus Christ Ministries ni mahali pa kukua katika imani, kupata nguvu za Roho Mtakatifu, na kutumikia kwa kusudi.",
      leadershipCta: "Kutana na Uongozi Wetu",
      livestreamBanner: "Jiunge nasi moja kwa moja kwa ibada",
      watchLive: "Tazama Moja kwa Moja",
    },
    about: {
      title: "Kuhusu Huduma",
      subtitle: "Sisi ni nani na tunaamini nini",
      missionTitle: "Dhamira Yetu",
      missionBody:
        "Kutangaza Injili ya Yesu Kristo kwa nguvu za Roho Mtakatifu, kuwafanya wanafunzi, kupanda na kuimarisha makanisa ya mitaa, na kubadilisha jamii nchini Kenya na kwingineko.",
      visionTitle: "Maono Yetu",
      visionBody:
        "Familia inayokua ya waumini wenye Roho, wameunganishwa chini ya Kristo — wanaojulikana kwa maombi, utakatifu, uinjilisti, na upendo.",
      beliefsTitle: "Tunachoamini",
    },
    leadership: {
      title: "Uongozi wa Shirika",
      subtitle:
        "Askofu, maafisa wa kitaifa, waangalizi wa mikoa, na viongozi wa huduma wanaohudumu Jesus Christ Ministries.",
      bishop: "Askofu",
      founder: "Mwanzilishi",
      overseer: "Mwangalizi wa Mkoa",
      assistantBishop: "Askofu Msaidizi",
      assistantBishops: "Maaskofu Wasaidizi",
      secretaryGeneral: "Katibu Mkuu",
      ministryCoordinator: "Mratibu wa Huduma",
      treasurer: "Mhazini",
      pastor: "Mchungaji wa Tawi",
      expand: "Onyesha matawi na wachungaji",
      collapse: "Ficha matawi na wachungaji",
      viewBio: "Soma wasifu",
      close: "Funga",
      branches: "matawi",
      pastors: "wachungaji",
      regionalOverseers: "Waangalizi wa Mikoa",
      andSpouse: "na",
      nationalDepartmentsTitle: "Viongozi wa Huduma za Kitaifa",
      nationalDepartmentsSubtitle:
        "Uongozi wa wanawake, wanaume, na vijana unaohudumu huduma yote.",
      pastorsWelfareTitle: "Ustawi wa Wachungaji",
      pastorsWelfareSubtitle:
        "Kamati inayosaidia ustawi wa wachungaji katika huduma yote.",
      welfareChairman: "Mwenyekiti",
      welfareSecretary: "Katibu",
      welfareTreasurer: "Mhazini",
    },
    regions: {
      title: "Mikoa Yetu",
      subtitle: "Mikoa saba mikuu. Matawi zaidi ya ishirini. Huduma moja.",
      viewRegion: "Angalia mkoa",
      overseer: "Mwangalizi",
      branchesInRegion: "Matawi katika mkoa huu",
    },
    branch: {
      serviceTimes: "Nyakati za Ibada",
      pastor: "Mchungaji wa Tawi",
      location: "Mahali",
      contact: "Mawasiliano",
      localEvents: "Matukio ya Tawi",
      localMinistries: "Huduma za Tawi",
      planVisit: "Panga ziara katika tawi hili",
    },
    visit: {
      title: "Panga Ziara Yako",
      subtitle:
        "Tutapenda kukupokea. Tuambie kidogo kuhusu wewe na tawi unalokusudia kutembelea.",
      howHeard: "Ulitujuaje?",
      success: "Asante! Timu ya tawi lako itafurahi kukupokea.",
    },
    sermons: {
      title: "Mahubiri na Matangazo Moja kwa Moja",
      subtitle: "Tazama ibada moja kwa moja na kumbukumbu za mahubiri.",
      liveNow: "Moja kwa Moja Sasa",
      offline: "Ibada ijayo hivi karibuni",
      filterSpeaker: "Mhubiri",
      filterSeries: "Mfululizo",
      archive: "Kumbukumbu ya Mahubiri",
    },
    events: {
      title: "Kalenda ya Matukio",
      subtitle: "Mikutano, misalaba, na mikusanyiko katika huduma yote.",
      filterAll: "Matukio yote",
      filterGlobal: "Ya huduma yote",
      scope: {
        global: "Huduma yote",
        region: "Mkoa",
        branch: "Tawi",
      },
    },
    ministries: {
      title: "Huduma na Vikundi Vidogo",
      subtitle: "Pata mahali pa kutumikia na kukua — kitaifa au katika tawi lako.",
      national: "Huduma yote",
      local: "Huduma za tawi",
    },
    give: {
      title: "Toa",
      subtitle:
        "Shirikiana nasi kuendeleza Injili. Maelezo ya utoaji yatachapishwa hapa hivi karibuni.",
      whyTitle: "Kwa Nini Tunatoa",
      whyBody:
        "Kutoa ni ibada. Tunamheshimu Bwana kwa zaka na sadaka zetu ili Injili iendelee na kanisa la mtaa lisitawi.",
      scripture:
        '"Kila mmoja na atoe kama alivyokusudia moyoni mwake, si kwa huzuni wala kwa lazima; maana Mungu humpenda mtoaji mwenye furaha." — 2 Wakorintho 9:7',
      detailsSoon:
        "Nambari za Paybill, Till, na maelezo ya benki yataongezwa hapa. Asante kwa uvumilivu wetu tunapoweka hii kwa uangalifu.",
    },
    blog: {
      title: "Devosheni na Blogu",
      subtitle: "Habari, ushuhuda, na mkate wa kila siku kutoka Neno.",
      categories: {
        devotional: "Devosheni",
        news: "Habari",
        testimony: "Ushuhuda",
      },
    },
    membership: {
      title: "Usajili wa Uanachama",
      subtitle:
        "Jiunge na familia ya Jesus Christ Ministries. Jaza fomu hapa chini na uongozi wa tawi lako utafuatilia.",
      dob: "Tarehe ya kuzaliwa",
      previousChurch: "Kanisa la awali (si lazima)",
      previousChurchHint: "Acha tupu kama wewe ni mwamini mpya",
      success: "Ombi limepokelewa. Hali: inasubiri ukaguzi.",
    },
    contact: {
      title: "Wasiliana Nasi",
      subtitle: "Maswali ya jumla, maombi, au ushirikiano.",
      success: "Ujumbe umetumwa. Tutajibu haraka iwezekanavyo.",
    },
    footer: {
      tagline: "Yenye Roho. Inayolenga Ufalme. Inayozingatia familia.",
      quickLinks: "Viungo vya haraka",
      regions: "Mikoa",
      legal: "Kisheria",
      privacy: "Sera ya Faragha",
      terms: "Masharti ya Matumizi",
      rights: "Haki zote zimehifadhiwa.",
      social: "Tufuatilie",
    },
    legal: {
      privacyTitle: "Sera ya Faragha",
      termsTitle: "Masharti ya Matumizi",
      placeholder:
        "Ukurasa huu utakamilishwa kabla ya uzinduzi wa umma. Tunaheshimu faragha yako na tutatumia taarifa za mawasiliano tu kukuhudumia kama sehemu ya huduma hii.",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)["en"];

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] as Dictionary;
}

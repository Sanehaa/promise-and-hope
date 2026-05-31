import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const IMG = {
  hero: {
    home: "/images/hero/home-hero.png",
    about: "/images/hero/about-hero.jpg",
    services: "/images/hero/services-hero.jpg",
    projects: "/images/hero/projects-hero.jpg",
    stories: "/images/hero/stories-hero.jpg",
    offices: "/images/hero/offices-hero.jpg",
    gallery: "/images/hero/gallery-hero.jpg",
    contact: "/images/hero/contact-hero.jpg",
    donate: "/images/hero/donate-hero.jpg",
    mission: "/images/hero/mission.jpg",
    cta: "/images/hero/donation-cta.jpg",
  },
  projects: {
    water: "/images/projects/clean-water.jpg",
    education: "/images/projects/education.jpg",
    food: "/images/projects/food-relief.jpg",
    shelter: "/images/projects/shelter.jpg",
    healthcare: "/images/projects/healthcare.jpg",
    community: "/images/projects/community.jpg",
  },
  stories: {
    family: "/images/stories/family-support.jpg",
    education: "/images/stories/education-hope.jpg",
    relief: "/images/stories/emergency-relief.jpg",
    community: "/images/stories/community-garden.jpg",
    healthcare: "/images/stories/healthcare-access.jpg",
    shelter: "/images/stories/shelter-warmth.jpg",
  },
  gallery: {
    community1: "/images/gallery/community-work-1.jpg",
    community2: "/images/gallery/community-work-2.jpg",
    event1: "/images/gallery/event-1.jpg",
    event2: "/images/gallery/event-2.jpg",
    relief1: "/images/gallery/relief-1.jpg",
    relief2: "/images/gallery/relief-2.jpg",
    volunteer1: "/images/gallery/volunteer-1.jpg",
    volunteer2: "/images/gallery/volunteer-2.jpg",
    volunteer3: "/images/gallery/volunteer-3.jpg",
  },
  team: {
    director: "/images/team/director.jpg",
    operations: "/images/team/operations.jpg",
    programs: "/images/team/programs.jpg",
    partnerships: "/images/team/partnerships.jpg",
  },
  offices: {
    london: "/images/offices/london.jpg",
    birmingham: "/images/offices/birmingham.jpg",
    manchester: "/images/offices/manchester.jpg",
    eastAfrica: "/images/offices/east-africa.jpg",
    southAsia: "/images/offices/south-asia.jpg",
  },
};

async function main() {
  await prisma.donation.deleteMany();
  await prisma.contactMessage.deleteMany();
  await prisma.newsletterSubscriber.deleteMany();
  await prisma.project.deleteMany();
  await prisma.caseStory.deleteMany();
  await prisma.service.deleteMany();
  await prisma.regionalOffice.deleteMany();
  await prisma.galleryItem.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.impactStat.deleteMany();
  await prisma.coreValue.deleteMany();
  await prisma.timelineEvent.deleteMany();
  await prisma.teamMember.deleteMany();
  await prisma.donationCause.deleteMany();
  await prisma.pageHero.deleteMany();
  await prisma.navLink.deleteMany();
  await prisma.siteSetting.deleteMany();

  await prisma.siteSetting.createMany({
    data: [
      { key: "org.name", value: "Promise and Hope" },
      { key: "org.tagline", value: "Faith in Action. Hope in Every Heart." },
      { key: "org.summary", value: "A faith-inspired charity committed to serving vulnerable communities through compassion, practical support, and lasting change." },
      { key: "org.email", value: "info@promiseandhope.org" },
      { key: "org.phone", value: "+44 20 7946 0958" },
      { key: "org.address", value: "Promise and Hope House, 42 Hope Street, London, EC2A 4NE" },
      { key: "org.charity_number", value: "1234567" },
      { key: "donation.suggested_amounts", value: JSON.stringify([10, 25, 50, 100, 250]) },
      { key: "home.hero.title", value: "Restoring Hope. Transforming Lives." },
      { key: "home.hero.description", value: "Promise and Hope is a faith-inspired charity committed to serving vulnerable communities through compassion, practical support, and lasting change." },
      { key: "home.hero.trust_line", value: "Every act of kindness creates a brighter tomorrow." },
      { key: "home.mission.title", value: "Serving with Faith, Compassion and Purpose" },
      { key: "home.mission.description", value: "Promise and Hope exists to bring practical help and renewed hope to people facing hardship, guided by values of faith, mercy, dignity and service." },
      { key: "donation.cta.title", value: "Your Giving Can Become Someone's Answered Prayer" },
      { key: "donation.cta.description", value: "Every donation, no matter the size, helps us bring food, shelter, education, and hope to families who need it most." },
      { key: "about.story.title", value: "A Journey of Faith and Service" },
      { key: "about.story.description", value: "What began as a small group of volunteers sharing food parcels has grown into a charity touching thousands of lives across the UK and beyond." },
      { key: "about.story.body", value: "Promise and Hope exists to bring practical help and renewed hope to people facing hardship." },
      { key: "about.mission", value: "To serve vulnerable communities with compassion and practical support, restoring dignity and hope through faith-inspired action." },
      { key: "about.vision", value: "A world where every person facing hardship encounters kindness, receives practical help, and discovers renewed hope for tomorrow." },
    ],
  });

  const heroes = [
    { pageKey: "home", imageUrl: IMG.hero.home, imageAlt: "Community supported by Promise and Hope" },
    { pageKey: "about", title: "About Promise and Hope", description: "Bringing practical help and renewed hope.", imageUrl: IMG.hero.about, imageAlt: "About Promise and Hope" },
    { pageKey: "services", title: "Our Services", description: "Compassionate, practical support.", imageUrl: IMG.hero.services, imageAlt: "Charity services" },
    { pageKey: "projects", title: "Our Projects", description: "Every project is a promise kept.", imageUrl: IMG.hero.projects, imageAlt: "Charity projects" },
    { pageKey: "case-stories", title: "Case Stories", description: "Stories of resilience and hope.", imageUrl: IMG.hero.stories, imageAlt: "Impact stories" },
    { pageKey: "regional-offices", title: "Regional Offices", description: "Our network of offices.", imageUrl: IMG.hero.offices, imageAlt: "Regional offices" },
    { pageKey: "gallery", title: "Gallery", description: "Moments of hope and service.", imageUrl: IMG.hero.gallery, imageAlt: "Gallery" },
    { pageKey: "contact", title: "Contact Us", description: "We would love to hear from you.", imageUrl: IMG.hero.contact, imageAlt: "Contact" },
    { pageKey: "donate", title: "Give Hope Today", description: "Your generosity provides food, education, and hope.", imageUrl: IMG.hero.donate, imageAlt: "Donate" },
    { pageKey: "privacy-policy", title: "Privacy Policy", description: "How we protect your information.", imageUrl: IMG.hero.about, imageAlt: "Privacy" },
    { pageKey: "terms", title: "Terms & Conditions", description: "Terms governing use of this website.", imageUrl: IMG.hero.about, imageAlt: "Terms" },
    { pageKey: "mission", imageUrl: IMG.hero.mission, imageAlt: "Mission" },
    { pageKey: "donation-cta", imageUrl: IMG.hero.cta, imageAlt: "Donation CTA" },
  ];
  await prisma.pageHero.createMany({ data: heroes });

  const mainNav = [
    { label: "Home", href: "/", group: "main", sortOrder: 0 },
    { label: "About Us", href: "/about", group: "main", sortOrder: 1 },
    { label: "Services", href: "/services", group: "main", sortOrder: 2 },
    { label: "Projects", href: "/projects", group: "main", sortOrder: 3 },
    { label: "Case Stories", href: "/case-stories", group: "main", sortOrder: 4 },
    { label: "Regional Offices", href: "/regional-offices", group: "main", sortOrder: 5 },
    { label: "Gallery", href: "/gallery", group: "main", sortOrder: 6 },
    { label: "Contact Us", href: "/contact", group: "main", sortOrder: 7 },
  ];
  const footerQuick = [
    { label: "Home", href: "/", group: "footer_quick", sortOrder: 0 },
    { label: "About Us", href: "/about", group: "footer_quick", sortOrder: 1 },
    { label: "Services", href: "/services", group: "footer_quick", sortOrder: 2 },
    { label: "Projects", href: "/projects", group: "footer_quick", sortOrder: 3 },
    { label: "Donate", href: "/donate", group: "footer_quick", sortOrder: 4 },
  ];
  const footerUseful = [
    { label: "Case Stories", href: "/case-stories", group: "footer_useful", sortOrder: 0 },
    { label: "Regional Offices", href: "/regional-offices", group: "footer_useful", sortOrder: 1 },
    { label: "Gallery", href: "/gallery", group: "footer_useful", sortOrder: 2 },
    { label: "Contact Us", href: "/contact", group: "footer_useful", sortOrder: 3 },
    { label: "Privacy Policy", href: "/privacy-policy", group: "footer_useful", sortOrder: 4 },
    { label: "Terms & Conditions", href: "/terms", group: "footer_useful", sortOrder: 5 },
  ];
  await prisma.navLink.createMany({ data: [...mainNav, ...footerQuick, ...footerUseful] });

  const causes = await Promise.all(
    [
      { slug: "most-needed", label: "Where Most Needed", sortOrder: 0 },
      { slug: "food-relief", label: "Food Relief", sortOrder: 1 },
      { slug: "education", label: "Education Support", sortOrder: 2 },
      { slug: "healthcare", label: "Healthcare Assistance", sortOrder: 3 },
      { slug: "emergency", label: "Emergency Appeal", sortOrder: 4 },
      { slug: "orphan-family", label: "Orphan and Family Support", sortOrder: 5 },
    ].map((c) => prisma.donationCause.create({ data: c }))
  );

  await prisma.service.createMany({
    data: [
      { slug: "food-essential-supplies", title: "Food and Essential Supplies", shortDescription: "Providing nutritious meals and essential household items to families facing hardship.", description: "Our food and essential supplies programme delivers dignity to households experiencing food insecurity.", iconName: "Package", imageUrl: IMG.projects.food, sortOrder: 0, showOnHome: true, homeTitle: "Food & Essential Aid", homeDescription: "Nourishing meals and essentials for families in need.", homeIconName: "Apple" },
      { slug: "education-child-welfare", title: "Education and Child Welfare", shortDescription: "Supporting children with school supplies, tutoring, and safe learning environments.", description: "We believe every child deserves the opportunity to learn and thrive.", iconName: "BookOpen", imageUrl: IMG.projects.education, sortOrder: 1, showOnHome: true, homeTitle: "Education Support", homeDescription: "Helping children learn, grow, and dream without limits.", homeIconName: "BookOpen" },
      { slug: "healthcare-support", title: "Healthcare Support", shortDescription: "Connecting communities with medical care, health education, and wellness resources.", description: "Access to healthcare should never be a privilege.", iconName: "HeartPulse", imageUrl: IMG.projects.healthcare, sortOrder: 2, showOnHome: true, homeTitle: "Healthcare Assistance", homeDescription: "Medical care and wellness for underserved communities.", homeIconName: "HeartPulse" },
      { slug: "emergency-disaster-relief", title: "Emergency Disaster Relief", shortDescription: "Rapid response when disaster strikes.", description: "When crisis hits, Promise and Hope responds quickly.", iconName: "ShieldAlert", imageUrl: IMG.stories.relief, sortOrder: 3, showOnHome: true, homeTitle: "Emergency Relief", homeDescription: "Rapid, compassionate response when crisis strikes.", homeIconName: "ShieldAlert" },
      { slug: "shelter-rehabilitation", title: "Shelter and Rehabilitation", shortDescription: "Safe housing, warmth, and pathways to stability.", description: "Everyone deserves a safe place to rest.", iconName: "Home", imageUrl: IMG.projects.shelter, sortOrder: 4 },
      { slug: "spiritual-community-support", title: "Spiritual and Community Support", shortDescription: "Pastoral care, fellowship, and community programmes.", description: "Faith inspires our service, and community sustains it.", iconName: "Church", imageUrl: IMG.stories.community, sortOrder: 5, showOnHome: true, homeTitle: "Community Development", homeDescription: "Building stronger, self-sustaining communities together.", homeIconName: "Church" },
    ],
  });

  await prisma.project.createMany({
    data: [
      { slug: "clean-water-rural-families", title: "Clean Water for Rural Families", location: "East Africa", category: "Community Development", shortDescription: "Bringing safe, clean drinking water to remote villages.", description: "In rural communities across East Africa, families spend hours each day collecting water from unsafe sources.", goals: JSON.stringify(["Install 5 deep-water wells", "Provide water purification training", "Establish maintenance committees"]), expectedImpact: "Reduced waterborne illness and healthier families.", imageUrl: IMG.projects.water, targetAmount: 75000, raisedAmount: 48200, featured: true, sortOrder: 0 },
      { slug: "education-for-every-child", title: "Education for Every Child", location: "South Asia", category: "Education", shortDescription: "School supplies and learning support for children.", description: "Education opens doors to a brighter future.", goals: JSON.stringify(["Support 500 children with school kits", "Fund after-school tutoring", "Train 30 volunteer teachers"]), expectedImpact: "Higher school attendance and improved literacy.", imageUrl: IMG.projects.education, targetAmount: 50000, raisedAmount: 31500, featured: true, sortOrder: 1 },
      { slug: "emergency-food-relief", title: "Emergency Food Relief", location: "United Kingdom", category: "Food Support", shortDescription: "Emergency food parcels for families facing sudden hardship.", description: "When families face unexpected crisis, our emergency food relief programme provides immediate support.", goals: JSON.stringify(["Distribute 5,000 food parcels", "Serve 10,000 community meals", "Partner with 20 food banks"]), expectedImpact: "Families fed during their hardest moments.", imageUrl: IMG.projects.food, targetAmount: 40000, raisedAmount: 28750, featured: true, sortOrder: 2 },
      { slug: "shelter-warmth-appeal", title: "Shelter and Warmth Appeal", location: "United Kingdom", category: "Emergency Relief", shortDescription: "Winter coats, blankets, and emergency shelter.", description: "No one should face winter without warmth.", goals: JSON.stringify(["Provide 1,000 winter warmth packs", "Fund 50 nights of emergency shelter", "Support heating costs for 200 households"]), expectedImpact: "Lives protected during harsh winters.", imageUrl: IMG.projects.shelter, targetAmount: 60000, raisedAmount: 42100, featured: true, sortOrder: 3 },
      { slug: "mobile-health-clinic", title: "Mobile Health Clinic", location: "East Africa", category: "Healthcare", shortDescription: "A mobile clinic bringing essential healthcare to remote communities.", description: "Remote villages often lack access to basic healthcare.", goals: JSON.stringify(["Operate clinic for 12 months", "Serve 3,000 patients", "Train 20 health volunteers"]), expectedImpact: "Earlier diagnosis and healthier communities.", imageUrl: IMG.projects.healthcare, targetAmount: 85000, raisedAmount: 53800, sortOrder: 4 },
      { slug: "community-garden-initiative", title: "Community Garden Initiative", location: "Birmingham, UK", category: "Community Development", shortDescription: "Transforming unused land into community gardens.", description: "Community gardens nourish both body and spirit.", goals: JSON.stringify(["Establish 3 community gardens", "Engage 150 families", "Run monthly harvest events"]), expectedImpact: "Food security and community cohesion.", imageUrl: IMG.projects.community, targetAmount: 25000, raisedAmount: 18900, sortOrder: 5 },
    ],
  });

  await prisma.caseStory.createMany({
    data: [
      { slug: "a-family-finds-stability", title: "A Family Finds Stability After Hardship", location: "Birmingham, UK", category: "Family Support", excerpt: "When unexpected hardship left the Ahmed family without essentials, compassionate support helped them rebuild.", content: JSON.stringify(["The Ahmed family had always worked hard to provide for their three children.", "Through Promise and Hope's family support programme, they received food parcels and school supplies.", "Today, both parents are back on their feet."]), impactSummary: "A family restored to stability and hope renewed.", imageUrl: IMG.stories.family, featured: true, sortOrder: 0 },
      { slug: "learning-opens-new-doors", title: "Learning Opens New Doors", location: "South Asia", category: "Education", excerpt: "With school supplies and tutoring support, Priya discovered a love for learning.", content: JSON.stringify(["Priya's family could not afford the books and uniform she needed.", "Our education programme provided everything she needed to return to class.", "Priya now dreams of becoming a teacher."]), impactSummary: "One child returned to education; a future teacher inspired.", imageUrl: IMG.stories.education, featured: true, sortOrder: 1 },
      { slug: "hope-arrives-after-the-storm", title: "Hope Arrives After the Storm", location: "East Africa", category: "Emergency Relief", excerpt: "When flooding destroyed homes and crops, rapid relief brought food, shelter, and promise.", content: JSON.stringify(["Heavy rains brought floods that swept through villages overnight.", "Promise and Hope's emergency team arrived within days with supplies.", "Months later, families are rebuilding stronger homes."]), impactSummary: "Immediate relief followed by sustained recovery support.", imageUrl: IMG.stories.relief, featured: true, sortOrder: 2 },
      { slug: "community-grows-together", title: "A Community Grows Together", location: "Manchester, UK", category: "Community", excerpt: "A vacant lot became a garden where neighbours share harvests and belonging.", content: JSON.stringify(["For years, an empty plot attracted litter and neglect.", "Our team partnered with families to transform the space into a thriving garden.", "The garden now feeds dozens of families."]), impactSummary: "Green space created and a neighbourhood strengthened.", imageUrl: IMG.stories.community, sortOrder: 3 },
      { slug: "healthcare-reaches-a-village", title: "Healthcare Reaches a Remote Village", location: "East Africa", category: "Healthcare", excerpt: "A mobile clinic brought check-ups and vaccinations to families who had never seen a doctor.", content: JSON.stringify(["In a remote village, the nearest clinic was a day's journey away.", "Our mobile health clinic visited monthly.", "Infant mortality has decreased."]), impactSummary: "Healthcare access established and lives saved.", imageUrl: IMG.stories.healthcare, sortOrder: 4 },
      { slug: "warmth-in-the-coldest-month", title: "Warmth in the Coldest Month", location: "London, UK", category: "Family Support", excerpt: "Winter warmth packs and emergency shelter gave James a safe place to begin again.", content: JSON.stringify(["James had lost his job and his flat within the same difficult month.", "He received a warm coat, blankets, and transitional housing.", "With support, James found employment within three months."]), impactSummary: "Emergency shelter and pathways to employment.", imageUrl: IMG.stories.shelter, sortOrder: 5 },
    ],
  });

  await prisma.regionalOffice.createMany({
    data: [
      { slug: "london", name: "London Head Office", region: "United Kingdom", address: "Promise and Hope House, 42 Hope Street, London, EC2A 4NE", phone: "+44 20 7946 0958", email: "london@promiseandhope.org", hours: "Monday – Friday: 9:00 AM – 5:30 PM", imageUrl: IMG.offices.london, mapUrl: "https://maps.google.com/?q=London+EC2A", isHeadOffice: true, sortOrder: 0 },
      { slug: "birmingham", name: "Birmingham Regional Office", region: "United Kingdom", address: "12 Compassion Way, Birmingham, B1 2AA", phone: "+44 121 496 0823", email: "birmingham@promiseandhope.org", hours: "Monday – Friday: 9:00 AM – 5:00 PM", imageUrl: IMG.offices.birmingham, mapUrl: "https://maps.google.com/?q=Birmingham+B1", sortOrder: 1 },
      { slug: "manchester", name: "Manchester Regional Office", region: "United Kingdom", address: "8 Community Lane, Manchester, M1 4BT", phone: "+44 161 496 0734", email: "manchester@promiseandhope.org", hours: "Monday – Friday: 9:00 AM – 5:00 PM", imageUrl: IMG.offices.manchester, mapUrl: "https://maps.google.com/?q=Manchester+M1", sortOrder: 2 },
      { slug: "east-africa", name: "East Africa Office", region: "East Africa", address: "Promise and Hope Centre, Nairobi, Kenya", phone: "+254 20 123 4567", email: "eastafrica@promiseandhope.org", hours: "Monday – Friday: 8:00 AM – 4:30 PM (EAT)", imageUrl: IMG.offices.eastAfrica, mapUrl: "https://maps.google.com/?q=Nairobi+Kenya", sortOrder: 3 },
      { slug: "south-asia", name: "South Asia Office", region: "South Asia", address: "Hope Foundation Building, Lahore, Pakistan", phone: "+92 42 123 4567", email: "southasia@promiseandhope.org", hours: "Monday – Friday: 9:00 AM – 5:00 PM (PKT)", imageUrl: IMG.offices.southAsia, mapUrl: "https://maps.google.com/?q=Lahore+Pakistan", sortOrder: 4 },
    ],
  });

  await prisma.galleryItem.createMany({
    data: [
      { title: "Community Outreach Day", category: "Community Work", imageUrl: IMG.gallery.community1, alt: "Volunteers at community outreach", sortOrder: 0 },
      { title: "Neighbourhood Support Programme", category: "Community Work", imageUrl: IMG.gallery.community2, alt: "Families at community centre", sortOrder: 1 },
      { title: "Annual Hope Gala", category: "Events", imageUrl: IMG.gallery.event1, alt: "Annual charity gala", sortOrder: 2 },
      { title: "Volunteer Appreciation Evening", category: "Events", imageUrl: IMG.gallery.event2, alt: "Volunteer appreciation event", sortOrder: 3 },
      { title: "Emergency Food Distribution", category: "Relief Projects", imageUrl: IMG.gallery.relief1, alt: "Food parcels for distribution", sortOrder: 4 },
      { title: "Winter Warmth Appeal", category: "Relief Projects", imageUrl: IMG.gallery.relief2, alt: "Winter clothing and blankets", sortOrder: 5 },
      { title: "Dedicated Volunteers", category: "Volunteers", imageUrl: IMG.gallery.volunteer1, alt: "Volunteers at community project", sortOrder: 6 },
      { title: "Youth Volunteer Programme", category: "Volunteers", imageUrl: IMG.gallery.volunteer2, alt: "Young volunteers", sortOrder: 7 },
      { title: "Team Serving Together", category: "Volunteers", imageUrl: IMG.gallery.volunteer3, alt: "Volunteer team", sortOrder: 8 },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      { name: "Margaret T.", role: "Monthly Supporter", quote: "Giving to Promise and Hope has become part of my faith journey. I know my donations reach real families with real needs.", sortOrder: 0 },
      { name: "David & Sarah K.", role: "Legacy Donors", quote: "We chose Promise and Hope because of their transparency and compassion.", sortOrder: 1 },
      { name: "Reverend James O.", role: "Community Partner", quote: "Working alongside Promise and Hope has strengthened our parish outreach.", sortOrder: 2 },
      { name: "Amelia R.", role: "Volunteer", quote: "Volunteering here reminded me why hope matters.", sortOrder: 3 },
    ],
  });

  await prisma.impactStat.createMany({
    data: [
      { value: 10000, suffix: "+", label: "Lives Supported", sortOrder: 0 },
      { value: 45, suffix: "+", label: "Community Projects", sortOrder: 1 },
      { value: 12, suffix: "", label: "Regional Offices", sortOrder: 2 },
      { value: 5000, suffix: "+", label: "Generous Donors", sortOrder: 3 },
    ],
  });

  await prisma.coreValue.createMany({
    data: [
      { title: "Faith", description: "Our work is inspired by faith in a loving God who calls us to serve with humility and grace.", iconName: "Sparkles", sortOrder: 0 },
      { title: "Compassion", description: "We meet every person with empathy and care that honours their dignity.", iconName: "Heart", sortOrder: 1 },
      { title: "Integrity", description: "Transparency, accountability, and honest stewardship guide every decision.", iconName: "Shield", sortOrder: 2 },
      { title: "Service", description: "We exist to serve — putting the needs of vulnerable communities first.", iconName: "HandHeart", sortOrder: 3 },
      { title: "Hope", description: "We believe in brighter tomorrows and work tirelessly to make them possible.", iconName: "Award", sortOrder: 4 },
    ],
  });

  await prisma.timelineEvent.createMany({
    data: [
      { year: "2008", title: "A Seed of Compassion", description: "Promise and Hope began as volunteers distributing food parcels.", sortOrder: 0 },
      { year: "2012", title: "Formal Registration", description: "Registered as a charity, expanding education and healthcare.", sortOrder: 1 },
      { year: "2016", title: "International Expansion", description: "Regional offices opened in East Africa and South Asia.", sortOrder: 2 },
      { year: "2020", title: "Emergency Response Growth", description: "Emergency relief scaled to serve thousands in urgent need.", sortOrder: 3 },
      { year: "2024", title: "A Vision for Tomorrow", description: "Supporting 10,000+ lives annually across 12 regional offices.", sortOrder: 4 },
    ],
  });

  await prisma.teamMember.createMany({
    data: [
      { name: "Reverend David Thompson", role: "Founder & Director", bio: "Leading Promise and Hope with over 25 years of service.", imageUrl: IMG.team.director, sortOrder: 0 },
      { name: "Sarah Mitchell", role: "Director of Operations", bio: "Ensuring programmes run efficiently.", imageUrl: IMG.team.operations, sortOrder: 1 },
      { name: "James Okonkwo", role: "Head of Programmes", bio: "Designing community projects across the UK and abroad.", imageUrl: IMG.team.programs, sortOrder: 2 },
      { name: "Fatima Hassan", role: "Partnerships Manager", bio: "Building relationships with churches and businesses.", imageUrl: IMG.team.partnerships, sortOrder: 3 },
    ],
  });

  console.log("Seed complete:", { causes: causes.length });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());

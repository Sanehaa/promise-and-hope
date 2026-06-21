import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ORG_EMAIL = "promiseandhope@outlook.com";
const ORG_PHONE = "+44 7477 860805";
const ORG_ADDRESS = "47 Findern Green, Sneinton, Nottingham, NG3 7BU";

const IMG = {
  hero: {
    home: "/images/hero/home-hero.jpg",
    about: "/images/hero/about-hero.png",
    services: "/images/hero/services-hero.jpeg",
    projects: "/images/hero/projects-hero.jpeg",
    stories: "/images/hero/stories-hero.jpeg",
    offices: "/images/hero/offices-hero.jpeg",
    gallery: "/images/hero/gallery-hero.jpg",
    contact: "/images/hero/contact-hero.jpg",
    donate: "/images/hero/donate-hero.jpg",
    mission: "/images/hero/mission.png",
    cta: "/images/hero/donation-cta.jpg",
  },
  projects: {
    water: "/images/projects/clean-water.jpg",
    education: "/images/projects/education.jpg",
    education01: "/images/projects/education01.jpg",
    education_lahore: "/images/projects/education_lahore.jpg",
    food: "/images/projects/food-relief.jpg",
    food01: "/images/projects/food-relief01.jpg",
    shelter: "/images/projects/shelter.jpg",
    healthcare: "/images/projects/healthcare.jpg",
    community: "/images/projects/community.jpg",
    ssa: "/images/projects/ssa.jpg",
    fpl: "/images/projects/community.jpg",
    efs: "/images/projects/efs.jpg",
    familyrelief: "/images/projects/familyrelief.jpg",
  },
  stories: {
    family: "/images/stories/family-support.jpg",
    education: "/images/stories/education-hope.jpg",
    education01: "/images/stories/emergency-relief.jpg",
    relief: "/images/stories/relief.jpg",
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
    volunteer1: "/images/gallery/volunteer-1.jpeg",
    volunteer2: "/images/gallery/volunteer-2.jpeg",
    volunteer3: "/images/gallery/volunteer-3.jpeg",
  },
  team: {
    director: "/images/team/mamu.jpg",
    operations: "/images/team/me.png",
    programs: "/images/team/mami.jpg",
    partnerships: "/images/team/sbhai.jpg",
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
      { key: "org.summary", value: "A faith-inspired charity serving families in Lahore and Sheikhupura through school support, food relief, and compassionate practical help." },
      { key: "org.email", value: ORG_EMAIL },
      { key: "org.phone", value: ORG_PHONE },
      { key: "org.address", value: ORG_ADDRESS },
      { key: "org.charity_number", value: "1234567" },
      { key: "donation.suggested_amounts", value: JSON.stringify([10, 25, 50, 100, 250]) },
      { key: "home.hero.title", value: "Restoring Hope. Transforming Lives." },
      { key: "home.hero.description", value: "Promise and Hope is a faith-inspired charity helping children stay in school and supporting families with food relief in Lahore and Sheikhupura." },
      { key: "home.hero.trust_line", value: "Every act of kindness creates a brighter tomorrow." },
      { key: "home.mission.title", value: "Serving with Faith, Compassion and Purpose" },
      { key: "home.mission.description", value: "Promise and Hope serves families in Lahore and Sheikhupura with school support and food relief, guided by faith, mercy, dignity, and service." },
      { key: "donation.cta.title", value: "Your Giving Can Become Someone's Answered Prayer" },
      { key: "donation.cta.description", value: "Every donation, no matter the size, helps us provide school support, food parcels, and hope to families who need it most." },
      { key: "about.story.title", value: "A Journey of Faith and Service" },
      { key: "about.story.description", value: "From a small community initiative in 2015 to a growing charity serving Lahore and Sheikhupura today." },
      {
        key: "about.story.paragraph1",
        value:
          "At Promise and Hope, we believe every child deserves the chance to learn. Many families in Lahore and Sheikhupura struggle to afford school fees, uniforms, books, and basic supplies — and without support, children can fall behind or leave education altogether. Through our school support projects, we walk alongside parents who want better futures for their children, providing practical help that keeps young people in the classroom and opens doors to learning, confidence, and opportunity. Our work is rooted in compassion and faith, and every child we support reminds us that small acts of kindness can change a life.",
      },
      {
        key: "about.story.paragraph2",
        value:
          "Alongside education, we serve families facing hunger and sudden hardship. During the COVID pandemic, we distributed food in Lahore and Sheikhupura to households who had lost income and could not afford daily meals. Today, our food relief and family support programmes continue to offer emergency food parcels, practical assistance, and a message of dignity and hope to vulnerable families. Promise and Hope is expanding its current projects and needs your donations to continue existing work and to support future projects — so that no family has to face hardship alone, and every gift of generosity becomes a promise kept.",
      },
      { key: "about.mission", value: "To serve vulnerable families in Lahore and Sheikhupura with school support and food relief, restoring dignity and hope through faith-inspired action." },
      { key: "about.vision", value: "Communities where children can learn without barriers and families facing hardship receive practical help, compassion, and renewed hope." },
    ],
  });

  const heroes = [
    { pageKey: "home", imageUrl: IMG.hero.home, imageAlt: "Community supported by Promise and Hope" },
    { pageKey: "about", title: "About Promise and Hope", description: "Bringing practical help and renewed hope.", imageUrl: IMG.hero.about, imageAlt: "About Promise and Hope" },
    { pageKey: "services", title: "Our Services", description: "Compassionate, practical support.", imageUrl: IMG.hero.services, imageAlt: "Charity services" },
    { pageKey: "projects", title: "Our Projects", description: "Every project is a promise kept.", imageUrl: IMG.hero.projects, imageAlt: "Charity projects" },
    { pageKey: "case-stories", title: "Case Stories", description: "Stories of resilience and hope.", imageUrl: IMG.hero.stories, imageAlt: "Impact stories" },
    { pageKey: "regional-offices", title: "Regional Offices", description: "Our offices in Lahore and Sheikhupura.", imageUrl: IMG.hero.offices, imageAlt: "Regional offices" },
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
      { slug: "humanitarian", label: "Humanitarian Assistance", sortOrder: 3 },
      { slug: "emergency", label: "Emergency Appeal", sortOrder: 4 },
      { slug: "orphan-family", label: "Orphan and Family Support", sortOrder: 5 },
    ].map((c) => prisma.donationCause.create({ data: c }))
  );

  await prisma.service.createMany({
    data: [
      { slug: "food-essential-supplies", title: "Food and Essential Supplies", shortDescription: "Providing nutritious meals and essential household items to families facing hardship.", description: "Our food and essential supplies programme delivers dignity to households experiencing food insecurity.", iconName: "Package", imageUrl: IMG.projects.food, sortOrder: 0, showOnHome: true, homeTitle: "Food & Essential Aid", homeDescription: "Nourishing meals and essentials for families in need.", homeIconName: "Apple" },
      { slug: "education-child-welfare", title: "Education and Child Welfare", shortDescription: "Supporting children with school supplies, tutoring, and safe learning environments.", description: "We believe every child deserves the opportunity to learn and thrive.", iconName: "BookOpen", imageUrl: IMG.projects.education, sortOrder: 1, showOnHome: true, homeTitle: "Education Support", homeDescription: "Helping children learn, grow, and dream without limits.", homeIconName: "BookOpen" },
      { slug: "humanitarian-assistance", title: "Humanitarian Assistance", shortDescription: "Practical support for families facing hardship, delivered with dignity and compassion.", description: "When families struggle with daily essentials, we respond with practical humanitarian assistance rooted in faith and mercy.", iconName: "HandHeart", imageUrl: IMG.projects.community, sortOrder: 2, showOnHome: true, homeTitle: "Humanitarian Assistance", homeDescription: "Practical help for families facing hardship, offered with dignity.", homeIconName: "HandHeart" },
      { slug: "emergency-disaster-relief", title: "Emergency Food Support", shortDescription: "Emergency food parcels for families facing sudden crisis.", description: "When crisis leaves families without food, Promise and Hope responds quickly with emergency food support.", iconName: "ShieldAlert", imageUrl: IMG.stories.relief, sortOrder: 3, showOnHome: true, homeTitle: "Emergency Food Support", homeDescription: "Rapid food relief when families face sudden hardship.", homeIconName: "ShieldAlert" },
      { slug: "family-relief", title: "Family Relief", shortDescription: "Supporting households with essentials during difficult seasons.", description: "We stand with families through seasons of loss, unemployment, and uncertainty with practical relief.", iconName: "Home", imageUrl: IMG.projects.shelter, sortOrder: 4, showOnHome: true, homeTitle: "Family Relief", homeDescription: "Standing with families through difficult seasons.", homeIconName: "Home" },
    ],
  });

  await prisma.project.createMany({
    data: [
      { slug: "school-support-lahore", title: "School Support Project — Lahore", location: "Lahore, Pakistan", category: "Education", shortDescription: "School fees, uniforms, and learning materials for children in Lahore.", description: "Many families in Lahore cannot afford the basic costs of keeping their children in school. This project provides school fees, uniforms, books, and supplies so that children can continue learning with dignity.", goals: JSON.stringify(["Support 40 children with school fees", "Provide uniforms and books for the academic year", "Visit families to assess ongoing educational needs"]), expectedImpact: "Children remain in school and families gain relief from educational costs.", imageUrl: IMG.projects.education, targetAmount: 7500, raisedAmount: 4100, featured: true, sortOrder: 0 },
      { slug: "school-support-sheikhupura", title: "School Support Project — Sheikhupura", location: "Sheikhupura, Pakistan", category: "Education", shortDescription: "Helping children in Sheikhupura stay in school with practical support.", description: "In Sheikhupura, Promise and Hope supports children whose families cannot cover school expenses. We provide targeted assistance so that learning is not interrupted by poverty.", goals: JSON.stringify(["Support 30 children with school supplies", "Cover partial school fees for vulnerable households", "Coordinate with local schools to identify need"]), expectedImpact: "More children attending school regularly with the materials they need.", imageUrl: IMG.projects.education01, targetAmount: 6000, raisedAmount: 2750, featured: true, sortOrder: 1 },
      { slug: "covid-food-lahore", title: "Food Distribution During COVID — Lahore", location: "Lahore, Pakistan", category: "Food Support", shortDescription: "Emergency food parcels for families affected by COVID in Lahore.", description: "During the COVID pandemic, many households in Lahore lost income overnight. Promise and Hope distributed food parcels to families who could not afford daily meals, offering practical relief and hope in a difficult season.", goals: JSON.stringify(["Distribute monthly food parcels to 50 families", "Prioritise households with children and elderly members", "Coordinate with local volunteers for delivery"]), expectedImpact: "Families fed during lockdowns and economic hardship.", imageUrl: IMG.projects.food, targetAmount: 5000, raisedAmount: 3200, featured: true, sortOrder: 2 },
      { slug: "covid-food-sheikhupura", title: "Food Distribution During COVID — Sheikhupura", location: "Sheikhupura, Pakistan", category: "Food Support", shortDescription: "Food relief for vulnerable families in Sheikhupura during COVID.", description: "When COVID disrupted livelihoods in Sheikhupura, Promise and Hope responded with food distribution to families facing hunger. This project reflects our commitment to standing with communities in their hardest moments.", goals: JSON.stringify(["Provide food parcels to 35 families", "Support widows and daily-wage workers", "Continue periodic distributions as needs arise"]), expectedImpact: "Vulnerable families received food when they needed it most.", imageUrl: IMG.projects.food01, targetAmount: 4500, raisedAmount: 2100, featured: true, sortOrder: 3 },
      { slug: "education-support-lahore", title: "Education Support — Lahore", location: "Lahore, Pakistan", category: "Education", shortDescription: "Tutoring and learning support for children falling behind in school.", description: "Some children need extra help to keep up with their studies. This modest programme offers tutoring support and encouragement for pupils whose families cannot afford private tuition.", goals: JSON.stringify(["Support 20 children with tutoring materials", "Run monthly learning check-ins", "Encourage regular school attendance"]), expectedImpact: "Children gain confidence and improve their learning outcomes.", imageUrl: IMG.projects.education_lahore, targetAmount: 4000, raisedAmount: 1200, sortOrder: 4 },
      { slug: "school-supplies-sheikhupura", title: "School Supplies Appeal — Sheikhupura", location: "Sheikhupura, Pakistan", category: "Education", shortDescription: "Books, bags, and stationery for children starting the school year.", description: "At the start of each term, many families struggle to buy basic school supplies. This appeal provides books, bags, and stationery so children can begin the year ready to learn.", goals: JSON.stringify(["Provide supply packs for 25 children", "Include notebooks, pens, and school bags", "Distribute before the new term begins"]), expectedImpact: "Children start school equipped with the essentials they need.", imageUrl: IMG.projects.ssa, targetAmount: 3500, raisedAmount: 1800, sortOrder: 5 },
      { slug: "food-parcels-lahore", title: "Food Parcels for Families — Lahore", location: "Lahore, Pakistan", category: "Food Support", shortDescription: "Monthly food parcels for households facing ongoing hardship.", description: "For families who continue to struggle with food insecurity, this project provides monthly parcels of essential groceries — a simple but vital source of stability and dignity.", goals: JSON.stringify(["Support 20 families with monthly food parcels", "Include rice, flour, oil, and basic staples", "Review needs every three months"]), expectedImpact: "Families receive consistent food support through difficult seasons.", imageUrl: IMG.projects.fpl, targetAmount: 5500, raisedAmount: 3900, sortOrder: 6 },
      { slug: "family-relief-sheikhupura", title: "Family Relief Fund — Sheikhupura", location: "Sheikhupura, Pakistan", category: "Family Relief", shortDescription: "Essential support for households facing sudden loss or hardship.", description: "When a family faces bereavement, job loss, or unexpected crisis, this fund provides modest practical help — groceries, basic essentials, and compassionate support.", goals: JSON.stringify(["Assist 15 families facing sudden hardship", "Provide essentials within one week of referral", "Follow up with pastoral and practical care"]), expectedImpact: "Families receive timely help when crisis strikes.", imageUrl: IMG.projects.familyrelief, targetAmount: 3000, raisedAmount: 950, sortOrder: 7 },
      { slug: "emergency-food-lahore", title: "Emergency Food Support — Lahore", location: "Lahore, Pakistan", category: "Emergency Relief", shortDescription: "Rapid food support for families in urgent need.", description: "When hunger becomes immediate, this emergency fund allows Promise and Hope to respond quickly with food parcels for families referred by volunteers and local contacts.", goals: JSON.stringify(["Respond to urgent referrals within 48 hours", "Provide food parcels to 25 households", "Maintain a small reserve for unexpected need"]), expectedImpact: "Urgent food needs met quickly with compassion and discretion.", imageUrl: IMG.projects.efs, targetAmount: 8000, raisedAmount: 4600, sortOrder: 8 },
    ],
  });

  await prisma.caseStory.createMany({
    data: [
      {
        slug: "school-support-changes-a-familys-future",
        title: "School Support Changes a Family's Future",
        location: "Lahore, Pakistan",
        category: "Education",
        excerpt:
          "When rising costs threatened to pull two children out of school, educational assistance from Promise and Hope kept their studies on track.",
        content: JSON.stringify([
          "For one Lahore family, every month brought a difficult choice: pay for school or put food on the table. As costs rose, keeping both children in education felt increasingly out of reach.",
          "Promise and Hope stepped in with educational assistance — helping cover school-related expenses so the children could continue learning without interruption.",
          "Their parents shared that the support lifted a heavy burden. Today, both children remain in school, studying with the hope of building a brighter future for themselves and their family.",
        ]),
        impactSummary: "Two children stayed in school; a family regained hope for the years ahead.",
        imageUrl: IMG.stories.education,
        featured: true,
        sortOrder: 0,
      },
      {
        slug: "books-and-hope-in-sheikhupura",
        title: "Books and Hope in Sheikhupura",
        location: "Sheikhupura, Pakistan",
        category: "Education",
        excerpt:
          "When Ayesha's parents could not afford school supplies, our education programme provided the books and materials she needed for the year.",
        content: JSON.stringify([
          "Ayesha loves learning, but her parents were struggling to afford the books, stationery, and learning materials required for the academic year.",
          "Through Promise and Hope's education programme in Sheikhupura, she received the supplies she needed — notebooks, pens, textbooks, and everything else to return to class prepared.",
          "With the practical barriers removed, Ayesha continues her education with confidence. She attends school regularly and carries a renewed sense of hope for what lies ahead.",
        ]),
        impactSummary: "One child equipped for school; confidence and hope restored.",
        imageUrl: IMG.projects.education01,
        featured: true,
        sortOrder: 1,
      },
      {
        slug: "food-parcels-during-covid-19",
        title: "Food Parcels During COVID-19",
        location: "Lahore, Pakistan",
        category: "Food Relief",
        excerpt:
          "When lockdowns left daily wage earners without income, food parcels helped vulnerable families meet their basic needs.",
        content: JSON.stringify([
          "During the COVID-19 lockdowns, many daily wage earners in Lahore suddenly lost their source of income. With no savings to fall back on, families faced empty cupboards and growing anxiety.",
          "Promise and Hope distributed food parcels containing essential groceries — rice, flour, cooking oil, and other staples — to households referred by local volunteers and community contacts.",
          "For families who did not know where their next meal would come from, the parcels offered more than food. They brought relief, dignity, and a reminder that they were not forgotten.",
        ]),
        impactSummary: "Vulnerable families fed during lockdown; practical help in an uncertain time.",
        imageUrl: IMG.stories.relief,
        featured: true,
        sortOrder: 2,
      },
      {
        slug: "family-relief-in-a-difficult-season",
        title: "Family Relief in a Difficult Season",
        location: "Sheikhupura, Pakistan",
        category: "Family Support",
        excerpt:
          "After losing the family's primary breadwinner, a mother of three received food assistance and community support through a difficult period.",
        content: JSON.stringify([
          "Following the loss of the family's primary breadwinner, a mother of three in Sheikhupura faced significant financial challenges. Daily expenses, rent, and feeding her children became an overwhelming struggle.",
          "Promise and Hope responded with food assistance and practical community support — groceries, essentials, and compassionate visits from volunteers who listened and prayed alongside the family.",
          "While the road ahead remains challenging, the family has been able to navigate this difficult season with greater stability, knowing that practical help and human kindness are still within reach.",
        ]),
        impactSummary: "A grieving family supported with food and compassion as they worked towards stability.",
        imageUrl: IMG.stories.family,
        sortOrder: 3,
      },
    ],
  });

  await prisma.regionalOffice.createMany({
    data: [
      {
        slug: "lahore",
        name: "Lahore Programme Office",
        region: "Punjab, Pakistan",
        address: "Promise and Hope Office, Gulberg III, Lahore, Pakistan",
        phone: ORG_PHONE,
        email: ORG_EMAIL,
        hours: "Monday – Friday: 9:00 AM – 5:00 PM (PKT)",
        imageUrl: IMG.offices.southAsia,
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Gulberg+III+Lahore+Pakistan",
        isHeadOffice: true,
        sortOrder: 0,
      },
      {
        slug: "sheikhupura",
        name: "Sheikhupura Programme Office",
        region: "Punjab, Pakistan",
        address: "Promise and Hope Centre, Civil Lines, Sheikhupura, Pakistan",
        phone: ORG_PHONE,
        email: ORG_EMAIL,
        hours: "Monday – Friday: 9:00 AM – 4:30 PM (PKT)",
        imageUrl: IMG.offices.southAsia,
        mapUrl: "https://www.google.com/maps/search/?api=1&query=Sheikhupura+Pakistan",
        sortOrder: 1,
      },
    ],
  });

  await prisma.galleryItem.createMany({
    data: [
      { title: "Community Outreach Day", category: "Community Work", imageUrl: IMG.gallery.community1, alt: "Volunteers at community outreach", sortOrder: 0 },
      { title: "Neighbourhood Support Programme", category: "Community Work", imageUrl: IMG.gallery.community2, alt: "Families at community centre", sortOrder: 1 },
      { title: "Annual Hope Gala", category: "Events", imageUrl: IMG.gallery.event1, alt: "Annual charity gala", sortOrder: 2 },
      { title: "Volunteer Appreciation Evening", category: "Events", imageUrl: IMG.gallery.event2, alt: "Volunteer appreciation event", sortOrder: 3 },
      { title: "School Support Day", category: "Relief Projects", imageUrl: IMG.gallery.relief1, alt: "School supplies for distribution", sortOrder: 4 },
      { title: "Food Parcel Distribution", category: "Relief Projects", imageUrl: IMG.gallery.relief2, alt: "Food parcels for families", sortOrder: 5 },
      { title: "Dedicated Volunteers", category: "Volunteers", imageUrl: IMG.gallery.volunteer1, alt: "Volunteers at community project", sortOrder: 6 },
      { title: "Youth Volunteer Programme", category: "Volunteers", imageUrl: IMG.gallery.volunteer2, alt: "Young volunteers", sortOrder: 7 },
      { title: "Team Serving Together", category: "Volunteers", imageUrl: IMG.gallery.volunteer3, alt: "Volunteer team", sortOrder: 8 },
    ],
  });

  await prisma.testimonial.createMany({
    data: [
      {
        name: "Sadia Khan",
        role: "Lahore, Pakistan",
        quote:
          "Seeing children in our community receive educational support through Promise and Hope has been truly encouraging.",
        sortOrder: 0,
      },
      {
        name: "Imran Ali",
        role: "Sheikhupura, Pakistan",
        quote:
          "The food assistance programme helped several families in our area during difficult times. We are grateful for their efforts.",
        sortOrder: 1,
      },
      {
        name: "Pastor Emmanuel Yousaf",
        role: "Community Leader, Lahore",
        quote:
          "Supporting education and food assistance is one of the most meaningful ways we can serve our communities. Promise and Hope is bringing practical help and lasting hope to families in need.",
        sortOrder: 2,
      },
    ],
  });

  await prisma.impactStat.createMany({
    data: [
      { value: 1200, suffix: "+", label: "Lives Saved", sortOrder: 0 },
      { value: 5, suffix: "+", label: "Community Projects", sortOrder: 1 },
      { value: 2, suffix: "", label: "Regional Offices", sortOrder: 2 },
      { value: 50, suffix: "+", label: "Generous Donors", sortOrder: 3 },
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
      { year: "2015", title: "A Small Community Initiative", description: "Promise and Hope began as a small community initiative serving families in need.", sortOrder: 0 },
      { year: "2017", title: "Education Support Begins", description: "Started supporting children with school supplies and education assistance.", sortOrder: 1 },
      { year: "2020", title: "COVID Food Distribution", description: "Provided food distribution during COVID in Lahore and Sheikhupura.", sortOrder: 2 },
      { year: "2023", title: "Expanded Relief Work", description: "Expanded food relief and family support for vulnerable households.", sortOrder: 3 },
      { year: "2026", title: "Growing With Donor Support", description: "Continuing to grow education and food relief projects with donor support.", sortOrder: 4 },
    ],
  });

  await prisma.teamMember.createMany({
    data: [
      {
        name: "Pervaiz Sardar",
        role: "Founder & Director",
        bio: "Leading Promise and Hope with a vision for education and compassionate service in Lahore and Sheikhupura.",
        imageUrl: IMG.team.director,
        sortOrder: 0,
      },
      {
        name: "Rakhil Shama",
        role: "Programmes Coordinator",
        bio: "Coordinating school support and food relief projects with local volunteers and partner communities.",
        imageUrl: IMG.team.programs,
        sortOrder: 1,
      },
      {
        name: "Saneha Gill",
        role: "Operations & Outreach",
        bio: "Supporting day-to-day operations, donor communication, and outreach across Promise and Hope's programmes.",
        imageUrl: IMG.team.operations,
        sortOrder: 2,
      },
      {
        name: "Sunny",
        role: "Community Liaison",
        bio: "Building relationships with families, volunteers, and community leaders on the ground in Pakistan.",
        imageUrl: IMG.team.partnerships,
        sortOrder: 3,
      },
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

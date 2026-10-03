// Temporary offers stay separate from permanent enrollment and membership sections.
const sidekicksSignupUrl = 'https://docs.google.com/forms/d/e/1FAIpQLSdlkspLxR5glkGz_iOgDIr5CWPjnzqWe6WcUtSxllFTaL0uAQ/viewform';
const sidekicksOffers = [{
  id: 'one-year-paid-in-full-october-2026',
  status: 'active',
  featured: true,
  kicker: 'One year. Big commitment. Big savings!',
  title: 'One-Year Paid-in-Full Special',
  description: 'For new students and current active students: commit to a full year of Taekwondo and enjoy tuition savings plus free extras.',
  price: 'Save 25% through October 5',
  laterPrice: 'Save 20% through October 10',
  discountChangesAt: '2026-10-06T00:00:00-07:00',
  family: 'Paid in full · Families may split the total into 2 payments',
  bullets: ['1 FREE Premium Birthday Party', '1 FREE 50-Minute Massage', 'Your choice: a Deluxe Uniform OR a Set of 4 T-Shirts'],
  note: 'Your monthly tuition rate × 12 months, minus 25% through October 5, 2026, or 20% October 6–10, 2026. Current active students use their existing rate, based on when they started Sidekicks; new students use their starting rate. Message us “ONE YEAR” for your personalized total. Offer ends October 10, 2026.',
  image: 'images/offers/one-year-special-2026.png',
  imageAlt: 'Sidekicks one-year paid-in-full special: 25% off through October 5, 20% off October 6–10, free Premium Birthday Party and 50-minute massage, choice of black Deluxe Uniform with yellow belt or four T-shirts. Families may split into two payments.',
  signupUrl: 'https://m.me/sidekicksmerced',
  buttonLabel: 'Message Us for Your One-Year Total',
  startsAt: '2026-10-03T00:00:00-07:00',
  endsAt: '2026-10-11T00:00:00-07:00'
}, {
  id: 'beginner-week-autumn-2026',
  status: 'archived',
  kicker: 'Want to try it first?',
  title: 'Beginner Week',
  description: 'Meet Master Moe, attend age- and level-appropriate classes offered during your trial week, and see how Sidekicks feels before deciding to enroll.',
  price: 'Your first step',
  bullets: ['Your trial week runs Monday through Saturday', 'If you do not enroll, you owe nothing', 'If you enroll, the trial is included in your first paid period'],
  note: 'Starting later in the week does not extend the Saturday end date. If you then choose the Four-Week Starter Special, your trial week is part of those four weeks.',
  image: 'images/offers/beginner-week.png',
  imageAlt: 'Sidekicks Kickstart Confidence beginner week campaign',
  signupUrl: sidekicksSignupUrl + '?entry.1896718406=' + encodeURIComponent('Beginner Week — try it first'),
  buttonLabel: 'Request Your Beginner Week',
  startsAt: null,
  endsAt: null
}, {
  id: 'meet-and-greet-2026',
  status: 'active',
  kicker: 'Come meet us',
  title: 'Meet & Greet',
  description: 'Get to know Moe’s Sidekicks with a free 15-minute visit. Take a quick mini lesson, tour the studio, and get information and answers to your questions.',
  price: 'FREE · 15 minutes',
  bullets: ['Quick mini lesson', 'Studio tour', 'Information and time for your questions'],
  note: 'A simple first step to check out the studio. Master Moe personally confirms your visit time.',
  image: 'images/moes-sidekicks-logo.jpg',
  imageAlt: 'Moe’s Sidekicks Martial Arts logo',
  signupUrl: sidekicksSignupUrl + '?entry.1896718406=' + encodeURIComponent('Meet & Greet — free 15-minute visit'),
  buttonLabel: 'Request Your Meet & Greet',
  startsAt: null,
  endsAt: null
}, {
  id: 'four-week-starter-2026',
  status: 'active',
  kicker: 'Ready to get started?',
  title: 'Four-Week Starter Special',
  description: 'Start building confidence and a training routine with our introductory four-week offer.',
  price: '$99 for four weeks',
  family: '$79 for each additional family member',
  bullets: ['Free uniform for each student', 'No registration fee', 'Sign up online or register in person'],
  note: 'Master Moe confirms the included class schedule and exact start/end dates before payment. Regular membership options follow the introductory period.',
  image: 'images/moes-sidekicks-logo.jpg',
  imageAlt: 'Moe’s Sidekicks Martial Arts logo',
  signupUrl: sidekicksSignupUrl + '?entry.1896718406=' + encodeURIComponent('Four-Week Starter Special — $99 first student / $79 additional family member'),
  buttonLabel: 'Start Your Four-Week Special',
  startsAt: null,
  endsAt: null
}];

(() => {
  const root = document.getElementById('active-offers-list');
  if (!root) return;
  const preview = ['localhost', '127.0.0.1'].includes(location.hostname);
  const now = Date.now();
  const shown = sidekicksOffers.filter(offer => {
    if (preview && offer.status === 'draft') return true;
    return offer.status === 'active' && /^https:\/\//.test(offer.signupUrl)
      && (!offer.startsAt || now >= Date.parse(offer.startsAt))
      && (!offer.endsAt || now < Date.parse(offer.endsAt));
  });
  if (!shown.length) {
    root.textContent = 'Ask us about upcoming beginner opportunities.';
    return;
  }
  root.replaceChildren();
  shown.forEach(offer => {
    const card = document.createElement('article');
    card.className = 'offer-card' + (offer.featured ? ' offer-card-featured' : '');
    const header = document.createElement('div');
    header.className = 'offer-card-header';
    const picture = document.createElement('img');
    picture.src = offer.image;
    picture.alt = offer.imageAlt || offer.title;
    picture.width = 90;
    picture.height = 90;
    picture.loading = 'lazy';
    const heading = document.createElement('div');
    const kicker = document.createElement('p');
    kicker.className = 'offer-kicker';
    kicker.textContent = offer.kicker;
    const title = document.createElement('h3');
    title.textContent = offer.title;
    heading.append(kicker, title);
    if (offer.featured) {
      const flyerLink = document.createElement('a');
      flyerLink.href = offer.image;
      flyerLink.className = 'offer-flyer-link';
      flyerLink.setAttribute('aria-label', 'View the full one-year special flyer');
      flyerLink.append(picture);
      card.append(flyerLink);
      header.append(heading);
    } else {
      header.append(picture, heading);
    }
    card.append(header);
    const paragraph = (text, className = '') => {
      if (!text) return;
      const element = document.createElement('p');
      element.textContent = text;
      element.className = className;
      card.append(element);
    };
    paragraph(offer.description);
    paragraph(offer.discountChangesAt && now >= Date.parse(offer.discountChangesAt) ? offer.laterPrice : offer.price, 'offer-price');
    paragraph(offer.family, 'offer-family');
    const list = document.createElement('ul');
    (offer.bullets || []).forEach(text => {
      const item = document.createElement('li');
      item.textContent = text;
      list.append(item);
    });
    card.append(list);
    paragraph(offer.note, 'offer-note');
    if (offer.status === 'draft') {
      paragraph('Local draft — signup form and offer terms are being finalized.', 'offer-note');
    } else {
      const link = document.createElement('a');
      link.className = 'btn btn-primary';
      link.href = offer.signupUrl;
      link.textContent = offer.buttonLabel || 'Request Your First Lesson';
      card.append(link);
    }
    root.append(card);
  });
})();

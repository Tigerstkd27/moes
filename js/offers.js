// Seasonal campaigns live here; the permanent enrollment offer stays in index.html.
const sidekicksOffers = [{
  id: 'beginner-week-autumn-2026',
  status: 'active',
  title: 'Kickstart Confidence',
  description: 'Explore Taekwondo in Atwater and Merced. Master Moe personally schedules your first lesson. Trial weeks run Monday through Sunday.',
  image: 'images/offers/beginner-week.png',
  signupUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdlkspLxR5glkGz_iOgDIr5CWPjnzqWe6WcUtSxllFTaL0uAQ/viewform',
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
    card.className = 'offer-card';
    const picture = document.createElement('img');
    picture.src = offer.image;
    picture.alt = 'Moe’s Sidekicks beginner week campaign featuring a student high kick';
    picture.loading = 'lazy';
    const content = document.createElement('div');
    const title = document.createElement('h3');
    title.textContent = offer.title;
    const description = document.createElement('p');
    description.textContent = offer.description;
    content.append(title, description);
    if (offer.status === 'draft') {
      const notice = document.createElement('p');
      notice.textContent = 'Local draft — signup form and offer terms are being finalized.';
      content.append(notice);
    } else {
      const link = document.createElement('a');
      link.className = 'btn btn-primary';
      link.href = offer.signupUrl;
      link.textContent = 'Request Your First Lesson';
      content.append(link);
    }
    card.append(picture, content);
    root.append(card);
  });
})();

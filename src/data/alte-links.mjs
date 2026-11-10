// Weiterleitungen von der alten Website (dein-bizz.de / deinbizz.de) auf di-coco.com.
// Die alten Domains leiten per 301 auf di-coco.com weiter und behalten dabei den Pfad.
// Ohne diese Liste würden alte Links und Lesezeichen auf der 404-Seite landen.
//
// Wird an zwei Stellen genutzt:
// - astro.config.mjs: baut für jeden Pfad aus ALTE_PFADE eine echte Weiterleitungsseite
// - 404.astro: fängt alles ab, was nicht exakt in der Liste steht (z. B. ohne Schrägstrich)

// Exakte Zuordnungen. Schlüssel ohne Schrägstrich am Ende, kleingeschrieben.
const EXAKT = {
  // Kontakt
  "/kontakt": "/#kontakt",
  "/contact": "/#kontakt",
  "/allgemeine-infos/kontakt-anfahrt": "/#kontakt",
  "/termine": "/#kontakt",

  // Über uns, Team, Referenzen
  "/ueber-uns": "/#ueber-uns",
  "/about": "/#ueber-uns",
  "/allgemeine-infos/team": "/#ueber-uns",
  "/allgemeine-infos/referenzen": "/#referenzen",
  "/allgemeine-infos/partner/netzwerk/kooperation": "/#referenzen",
  "/allgemeine-infos/preise": "/faq",
  "/allgemeine-infos/agb": "/agb",

  // Leistungen
  "/linkedin-programme": "/linkedin-account-management",
  "/executive-coaching": "/cxo-communication",
  "/linkedin-pro-workshop": "/schulungen",
  "/warteliste-linkedin-pro-workshop": "/schulungen",
  "/6-linkedin-profil-hacks": "/schulungen",
  "/smartworkshop": "/schulungen",
  "/struktur-workshop-selbstmanagement": "/schulungen",

  // Presse
  "/2018/02/01/top-netzwerkerin-der-region": "/presse",
  "/2017/09/27/vor-allem-spaß": "/presse",
  "/interview-jgrotenhoefer": "/presse",

  // Blog-Artikel, die thematisch zu einer Leistung passen
  "/blog/business-influencer-vs-corporate-influencer-guideline": "/corporate-influencer-programme",
  "/blog/corporate-influencing-mehr-als-marketing": "/corporate-influencer-programme",
  "/blog/markenbotschafterprogramm-optimal-initiiert": "/corporate-influencer-programme",
  "/blog/markenbotschafterprogramme-wie-mitarbeitende-und-fuehrungskraefte-zu-wertvollen-markenbotschaftern-werden": "/corporate-influencer-programme",
  "/blog/unternehmenskommunikation-von-der-kommunikativen-stille-zur-relevanten-stimme": "/corporate-influencer-programme",
  "/blog/tag/corporate-influencer": "/corporate-influencer-programme",
  "/blog/tag/markenbotschafter": "/corporate-influencer-programme",
  "/blog/category/markenbotschafter": "/corporate-influencer-programme",
  "/blog/ceo-kommunikation-warum-sie-fuer-den-erfolg-deines-unternehmens-entscheidend-ist": "/cxo-communication",
  "/blog/die-cxo-angst-vor-der-linkedin-sichtbarkeit": "/cxo-communication",
  "/blog/linkedin-strategien-fuer-fuehrungskraefte-so-baust-du-deine-digitale-praesenz-aus": "/cxo-communication",
  "/blog/warum-thought-leadership-2025-unverzichtbar-ist": "/cxo-communication",
  "/blog/tag/thought-leadership": "/cxo-communication",
  "/blog/content-formate-fuer-linkedin-welche-formate-du-2025-nutzen-solltest-um-sichtbar-und-relevant-zu-bleiben": "/linkedin-account-management",
  "/blog/content-strategien-fuer-linkedin-bewaehrte-praktiken-und-warum-erfahrungsberichte-entscheidend-sind": "/linkedin-account-management",
  "/blog/tag/linkedin": "/linkedin-account-management",
};

// Ganze Bereiche der alten Seite. Erster Treffer gewinnt.
const BEREICHE = [
  ["/blog/", "/presse"], // alle übrigen Blog-Artikel, Tags, Kategorien, Autoren
  ["/blog", "/presse"],
  ["/allgemeine-infos", "/"],
  ["/beratung", "/"],
  ["/aktion-schule", "/"],
  ["/jobs-stellenangebote", "/"],
  ["/20", "/presse"], // alte Datums-Links wie /2018/02/01/…
];

// Alte Seiten, die es nicht mehr gibt und die zur Startseite führen
// (Schul- und Coaching-Angebote, Anmelde- und Danke-Seiten, Freebies).
const ZUR_STARTSEITE = [
  "/home", "/links", "/sitemap", "/verschenken",
  "/business-karriere-coaching", "/team-coaching", "/organisationsentwicklung",
  "/persoenlichkeitsentwicklung", "/wenn-profession-keine-passion-mehr-ist-businesscoaching",
  "/studien-und-berufsorientierung", "/schueler", "/praktikum-entscheidungshilfe-schluessel-zum-erfolg",
  "/deinbizz-abitur-2019", "/nullbockaufnichts", "/mut-vorstellungsgespräch", "/erfolgistmut",
  "/blog-lasst-sie-ziehen", "/reflexion", "/selbstmanagement-checkliste", "/freebie-technik-set-up",
  "/6li-anmeldung-danke", "/rcu-anmeldung-danke", "/danke-dein-bizz-akademie", "/angemeldet",
  "/anmeldung-bestaetigen", "/e-mail-bestaetigung-reflexion",
];

/** Normalisiert einen Pfad: dekodiert Umlaute, kleingeschrieben, ohne Schrägstrich am Ende. */
function normalisieren(pfad) {
  let p = pfad;
  try {
    p = decodeURIComponent(p);
  } catch {
    // kaputt kodierter Pfad: so lassen
  }
  p = p.toLowerCase().replace(/\/index\.html?$/, "").replace(/\/+$/, "");
  return p || "/";
}

/** Liefert das neue Ziel für einen alten Pfad oder null, wenn er unbekannt ist. */
export function neuesZiel(pfad) {
  const p = normalisieren(pfad);
  if (EXAKT[p]) return EXAKT[p];
  if (ZUR_STARTSEITE.includes(p)) return "/";
  for (const [anfang, ziel] of BEREICHE) {
    if (p === anfang || p.startsWith(anfang.endsWith("/") ? anfang : anfang + "/")) return ziel;
  }
  return null;
}

// Alle bekannten alten Pfade (aus dem Web-Archiv, Stand 10.11.2026).
// Für jeden davon baut Astro eine eigene Weiterleitungsseite.
export const ALTE_PFADE = [
  "/kontakt", "/contact", "/ueber-uns", "/about", "/home", "/links", "/sitemap", "/termine", "/verschenken",
  "/linkedin-programme", "/executive-coaching", "/linkedin-pro-workshop", "/warteliste-linkedin-pro-workshop",
  "/6-linkedin-profil-hacks", "/smartworkshop", "/struktur-workshop-selbstmanagement",
  "/business-karriere-coaching", "/team-coaching", "/organisationsentwicklung", "/persoenlichkeitsentwicklung",
  "/wenn-profession-keine-passion-mehr-ist-businesscoaching", "/studien-und-berufsorientierung", "/schueler",
  "/praktikum-entscheidungshilfe-schluessel-zum-erfolg", "/deinbizz-abitur-2019", "/nullbockaufnichts",
  "/erfolgistmut", "/blog-lasst-sie-ziehen", "/reflexion", "/selbstmanagement-checkliste", "/freebie-technik-set-up",
  "/6li-anmeldung-danke", "/rcu-anmeldung-danke", "/danke-dein-bizz-akademie", "/angemeldet",
  "/anmeldung-bestaetigen", "/e-mail-bestaetigung-reflexion", "/interview-jgrotenhoefer",
  "/2018/02/01/top-netzwerkerin-der-region",
  "/allgemeine-infos", "/allgemeine-infos/agb", "/allgemeine-infos/kontakt-anfahrt", "/allgemeine-infos/news-tipps-stellen",
  "/allgemeine-infos/partner/netzwerk/kooperation", "/allgemeine-infos/preise", "/allgemeine-infos/referenzen",
  "/allgemeine-infos/team",
  "/beratung", "/beratung/beruf/neuorientierung", "/beratung/bewerbung/training/coaching",
  "/beratung/karriere/karrierecoaching", "/beratung/liebe-eltern",
  "/aktion-schule", "/jobs-stellenangebote",
  "/blog", "/blog/page/2", "/blog/page/3", "/blog/author/bi", "/blog/author/bi/page/2", "/blog/author/dbadmin",
  "/blog/author/marika", "/blog/category/allgemein", "/blog/category/allgemein/page/2",
  "/blog/category/allgemein/page/3", "/blog/category/leadership", "/blog/category/markenbotschafter",
  "/blog/category/podcast",
  "/blog/7-buecher-leadership", "/blog/aus-der-praxis", "/blog/berufsorientierung-berufberatung-koeln",
  "/blog/bianca-schiffgens-top-10-kommunikationsexperten-deutschland-2025",
  "/blog/business-influencer-vs-corporate-influencer-guideline",
  "/blog/ceo-kommunikation-warum-sie-fuer-den-erfolg-deines-unternehmens-entscheidend-ist",
  "/blog/content-formate-fuer-linkedin-welche-formate-du-2025-nutzen-solltest-um-sichtbar-und-relevant-zu-bleiben",
  "/blog/content-strategien-fuer-linkedin-bewaehrte-praktiken-und-warum-erfahrungsberichte-entscheidend-sind",
  "/blog/corporate-influencing-mehr-als-marketing", "/blog/der-gute-chef", "/blog/die-cxo-angst-vor-der-linkedin-sichtbarkeit",
  "/blog/erfolg-ist-mut", "/blog/erfolg_ist_mut", "/blog/erfolgsgeschichten", "/blog/fuehrungskraefte-coaching",
  "/blog/gruender-krise", "/blog/im-just-a-teenage-dirtbag-baby-null-bock-wer-kennts-nicht",
  "/blog/ist-technik-im-home-office-notwendig", "/blog/keine-angst-vor-veraenderung",
  "/blog/linkedin-strategien-fuer-fuehrungskraefte-so-baust-du-deine-digitale-praesenz-aus",
  "/blog/markenbotschafterprogramm-optimal-initiiert",
  "/blog/markenbotschafterprogramme-wie-mitarbeitende-und-fuehrungskraefte-zu-wertvollen-markenbotschaftern-werden",
  "/blog/persoenlichkeitsentwicklung-ist-ein-prozess", "/blog/ploetzlich-fuehrungskraft-was-nun",
  "/blog/praktikum-jugendliche-berufsorientierung", "/blog/presse-top-netzwerkerin-der-region",
  "/blog/profession-burn-out-erfahrung", "/blog/schulabschluss-abitur-mit-allen-konsequenzen",
  "/blog/selbstmanagement-im-business-alltag", "/blog/spannende-berufe-entdecken", "/blog/tipps-erfolgreich-bewerben",
  "/blog/unternehmenskommunikation-von-der-kommunikativen-stille-zur-relevanten-stimme", "/blog/vergiftete-auftraege",
  "/blog/warum-thought-leadership-2025-unverzichtbar-ist", "/blog/was-ist-der-schluessel-zu-deinem-erfolg",
  "/blog/tag/corporate-influencer", "/blog/tag/markenbotschafter", "/blog/tag/linkedin", "/blog/tag/thought-leadership",
  "/blog/tag/leadership", "/blog/tag/personal-branding", "/blog/tag/unternehmenskommunikation",
  "/blog/tag/employer-branding", "/blog/tag/kommunikation", "/blog/tag/b2b",
];

/** Zuordnung für astro.config.mjs: { "/alter-pfad": "/neues-ziel" } */
export function astroRedirects() {
  const ergebnis = {};
  for (const pfad of ALTE_PFADE) {
    const ziel = neuesZiel(pfad);
    if (ziel) ergebnis[pfad] = ziel;
  }
  return ergebnis;
}

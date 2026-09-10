// Google Analytics 4 Mess-ID. Öffentlich by design – steht im Quelltext jeder
// Seite, die GA nutzt, und ist deshalb kein Secret. Bewusst hier und nicht in
// .env, weil .env nicht im Repo liegt und der GitHub-Actions-Build sie sonst
// nicht kennt. Leerer String schaltet Analytics samt Consent-Banner ab.
export const GA_MEASUREMENT_ID = "G-BW471Q8BJC";

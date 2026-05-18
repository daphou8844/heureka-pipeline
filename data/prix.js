// data/prix.js — Catalogue produits GBM · Février 2026
// 'GBM' = prix réel GBM | 'coussiné' = estimation marché

const PRODUITS = {

  // ── REVÊTEMENTS ─────────────────────────────────────────────────────────────
  revetements: [
    // CanExel
    {id:'ce-bb-nat',   nom:'CanExel Board & Batten Nature',          marque:'CanExel',    prix:118, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ce-bb-cls',   nom:'CanExel Board & Batten Classique',       marque:'CanExel',    prix:112, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ce-r5-nat',   nom:'CanExel Ridgewood D5 Nature',            marque:'CanExel',    prix:108, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ce-r5-cls',   nom:'CanExel Ridgewood D5 Classique',         marque:'CanExel',    prix:102, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ce-r5-ins',   nom:'CanExel Ridgewood D5 Inspiration',       marque:'CanExel',    prix:115, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ce-vs-nat',   nom:'CanExel V-Style Nature',                 marque:'CanExel',    prix:105, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ce-vs-cls',   nom:'CanExel V-Style Classique',              marque:'CanExel',    prix: 99, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ce-vs-ins',   nom:'CanExel V-Style Inspiration',            marque:'CanExel',    prix:112, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ce-cv9',      nom:"CanExel Ced'r Vue 9\"",                  marque:'CanExel',    prix:125, unite:'boite', couverture:100, note:'coussiné'},
    // Vinyle Gentek
    {id:'gt-fo-d4-cls',nom:'Vinyle Gentek Fair Oaks D4 Classique',   marque:'Gentek',     prix: 72, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-fo-d4-des',nom:'Vinyle Gentek Fair Oaks D4 Designer',    marque:'Gentek',     prix: 82, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-fo-d4d-cls',nom:'Vinyle Gentek Fair Oaks D4D Classique', marque:'Gentek',     prix: 74, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-fo-d4d-des',nom:'Vinyle Gentek Fair Oaks D4D Designer',  marque:'Gentek',     prix: 84, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-sq-d4-cls',nom:'Vinyle Gentek Sequoia D4 Classique',     marque:'Gentek',     prix: 75, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-sq-d4-des',nom:'Vinyle Gentek Sequoia D4 Designer',      marque:'Gentek',     prix: 87, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-sq-d45-cls',nom:'Vinyle Gentek Sequoia D4.5 Classique',  marque:'Gentek',     prix: 78, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-sq-d45-des',nom:'Vinyle Gentek Sequoia D4.5 Designer',   marque:'Gentek',     prix: 90, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-sq-d5-cls',nom:'Vinyle Gentek Sequoia D5 Classique',     marque:'Gentek',     prix: 80, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-sq-d5-des',nom:'Vinyle Gentek Sequoia D5 Designer',      marque:'Gentek',     prix: 92, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-vb-cls',   nom:'Vinyle Gentek Vertical Baguette Classique',marque:'Gentek',   prix: 85, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-vb-des',   nom:'Vinyle Gentek Vertical Baguette Designer', marque:'Gentek',   prix: 95, unite:'boite', couverture:100, note:'coussiné'},
    // Vinyle Kaycan
    {id:'kc-dv-d4',    nom:'Vinyle Kaycan Da Vinci D4',              marque:'Kaycan',     prix: 71, unite:'boite', couverture:100, note:'coussiné'},
    {id:'kc-dv-d4d',   nom:'Vinyle Kaycan Da Vinci D4D',             marque:'Kaycan',     prix: 73, unite:'boite', couverture:100, note:'coussiné'},
    {id:'kc-tm-d4',    nom:'Vinyle Kaycan Timberlake Marquis D4',    marque:'Kaycan',     prix: 79, unite:'boite', couverture:100, note:'coussiné'},
    {id:'kc-bb',       nom:'Vinyle Kaycan Board & Batten',           marque:'Kaycan',     prix: 86, unite:'boite', couverture:100, note:'coussiné'},
    // Aluminium Gentek
    {id:'gt-al-d4',    nom:'Aluminium Gentek Horizontal D4 GB',      marque:'Gentek',     prix: 95, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-al-d4d',   nom:'Aluminium Gentek Horizontal D4D GB',     marque:'Gentek',     prix: 97, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-al-vg',    nom:'Aluminium Gentek V-Groove',              marque:'Gentek',     prix: 98, unite:'boite', couverture:100, note:'coussiné'},
    // Acier Gentek
    {id:'gt-ac-dist',  nom:"Acier Gentek Distinction 5¼\" × 12'",   marque:'Gentek',     prix: 28.50, unite:'piece', couverture:5.25, note:'coussiné'},
    {id:'gt-ac-mod',   nom:'Acier Gentek Moderno',                   marque:'Gentek',     prix:105, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-ac-sd4',   nom:'Acier Gentek Sierra Steel D4',           marque:'Gentek',     prix:110, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-ac-sd5',   nom:'Acier Gentek Sierra Steel D5',           marque:'Gentek',     prix:112, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-ac-s8',    nom:'Acier Gentek Sierra Steel 8"',           marque:'Gentek',     prix:115, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-ac-sv',    nom:'Acier Gentek Sierra Steel Vertical',     marque:'Gentek',     prix:118, unite:'boite', couverture:100, note:'coussiné'},
    {id:'gt-ac-sk',    nom:'Acier Gentek Sierra Steel Kynar',        marque:'Gentek',     prix:135, unite:'boite', couverture:100, note:'coussiné'},
    // Acier Qualité Ext
    {id:'qe-v5-8u',    nom:"Acier Vesta 5\" × 8' Uni",              marque:'Qualité Ext',prix: 18.50, unite:'piece', couverture:3.33, note:'coussiné'},
    {id:'qe-v5-12u',   nom:"Acier Vesta 5\" × 12' Uni",             marque:'Qualité Ext',prix: 27.50, unite:'piece', couverture:5.00, note:'coussiné'},
    {id:'qe-v5-8b',    nom:"Acier Vesta 5\" × 8' 2 tons",           marque:'Qualité Ext',prix: 19.50, unite:'piece', couverture:3.33, note:'coussiné'},
    {id:'qe-v5-12b',   nom:"Acier Vesta 5\" × 12' 2 tons",          marque:'Qualité Ext',prix: 28.50, unite:'piece', couverture:5.00, note:'coussiné'},
    // Acier MAC
    {id:'mac-ms1',     nom:'Acier MAC MS1',                          marque:'MAC',        prix:115, unite:'boite', couverture:100, note:'coussiné'},
    {id:'mac-ms2',     nom:'Acier MAC MS2',                          marque:'MAC',        prix:118, unite:'boite', couverture:100, note:'coussiné'},
    {id:'mac-nor',     nom:'Acier MAC Norwood',                      marque:'MAC',        prix:122, unite:'boite', couverture:100, note:'coussiné'},
    {id:'mac-har',     nom:'Acier MAC Harrywood',                    marque:'MAC',        prix:125, unite:'boite', couverture:100, note:'coussiné'},
    {id:'mac-ver',     nom:'Acier MAC Versa',                        marque:'MAC',        prix:120, unite:'boite', couverture:100, note:'coussiné'},
    {id:'mac-mb',      nom:'Acier MAC MetalBlock',                   marque:'MAC',        prix:130, unite:'boite', couverture:100, note:'coussiné'},
    // Acier Vicwest
    {id:'vw-bl-clrs',  nom:'Acier Vicwest Bellara CLRS',             marque:'Vicwest',    prix:128, unite:'boite', couverture:100, note:'coussiné'},
    {id:'vw-bl-gb',    nom:'Acier Vicwest Bellara GB',               marque:'Vicwest',    prix:125, unite:'boite', couverture:100, note:'coussiné'},
    {id:'vw-bl-gbp',   nom:'Acier Vicwest Bellara GB Premium',       marque:'Vicwest',    prix:138, unite:'boite', couverture:100, note:'coussiné'},
    {id:'vw-bl-mat',   nom:'Acier Vicwest Bellara Mat',              marque:'Vicwest',    prix:135, unite:'boite', couverture:100, note:'coussiné'},
    // Acier Rialux
    {id:'rl-tb-std',   nom:'Acier Rialux Timberland Standard',       marque:'Rialux',     prix:120, unite:'boite', couverture:100, note:'coussiné'},
    {id:'rl-tb-prm',   nom:'Acier Rialux Timberland Premium',        marque:'Rialux',     prix:135, unite:'boite', couverture:100, note:'coussiné'},
    {id:'rl-ti-std',   nom:'Acier Rialux Tiago Standard',            marque:'Rialux',     prix:118, unite:'boite', couverture:100, note:'coussiné'},
    {id:'rl-ti-prm',   nom:'Acier Rialux Tiago Premium',             marque:'Rialux',     prix:132, unite:'boite', couverture:100, note:'coussiné'},
    {id:'rl-bo-std',   nom:'Acier Rialux Bosco Standard',            marque:'Rialux',     prix:122, unite:'boite', couverture:100, note:'coussiné'},
    {id:'rl-bo-prm',   nom:'Acier Rialux Bosco Premium',             marque:'Rialux',     prix:136, unite:'boite', couverture:100, note:'coussiné'},
    // Fibrociment James Hardie
    {id:'jh-ced-6',    nom:'Hardie Cedarmill 6¼"',                   marque:'Hardie',     prix: 52, unite:'boite', couverture:100, note:'coussiné'},
    {id:'jh-lis-6',    nom:'Hardie Lisse 6¼"',                       marque:'Hardie',     prix: 50, unite:'boite', couverture:100, note:'coussiné'},
    {id:'jh-ced-8',    nom:'Hardie Cedarmill 8¼"',                   marque:'Hardie',     prix: 55, unite:'boite', couverture:100, note:'coussiné'},
    {id:'jh-lis-8',    nom:'Hardie Lisse 8¼"',                       marque:'Hardie',     prix: 53, unite:'boite', couverture:100, note:'coussiné'},
    {id:'jh-p48',      nom:'Hardie Panneau 4×8',                     marque:'Hardie',     prix: 48, unite:'feuille', couverture:32, note:'coussiné'},
    {id:'jh-p410',     nom:'Hardie Panneau 4×10',                    marque:'Hardie',     prix: 58, unite:'feuille', couverture:40, note:'coussiné'},
    // Fibre de bois St-Laurent
    {id:'sl-vj',       nom:'Fibre de bois St-Laurent V-Joint',       marque:'St-Laurent', prix: 88, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sl-bar',      nom:'Fibre de bois St-Laurent Bardeau',       marque:'St-Laurent', prix: 92, unite:'boite', couverture:100, note:'coussiné'},
    // NewTechWood
    {id:'ntw-clin',    nom:'NewTechWood Revêtement à clin',          marque:'NewTechWood',prix:145, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ntw-yaki',    nom:'NewTechWood Bois brûlé',                 marque:'NewTechWood',prix:165, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ntw-bel',     nom:'NewTechWood Belge',                      marque:'NewTechWood',prix:150, unite:'boite', couverture:100, note:'coussiné'},
    {id:'ntw-nor',     nom:'NewTechWood Norvégien',                  marque:'NewTechWood',prix:155, unite:'boite', couverture:100, note:'coussiné'},
    // Taiga ExpertFinish
    {id:'tg-lap6',     nom:'Taiga ExpertFinish Lap 6"',              marque:'Taiga',      prix: 58, unite:'boite', couverture:100, note:'coussiné'},
    {id:'tg-lap8',     nom:'Taiga ExpertFinish Lap 8"',              marque:'Taiga',      prix: 62, unite:'boite', couverture:100, note:'coussiné'},
    {id:'tg-planche',  nom:'Taiga ExpertFinish Planches',            marque:'Taiga',      prix: 48, unite:'boite', couverture:100, note:'coussiné'},
    {id:'tg-pan',      nom:'Taiga ExpertFinish Panneaux',            marque:'Taiga',      prix: 52, unite:'boite', couverture:100, note:'coussiné'},
  ],

  // ── COINS EXTÉRIEURS ──────────────────────────────────────────────────────
  coinsExt: [
    {id:'cx-gt-fo',    nom:'Coin ext. Vinyle Fair Oaks',             marque:'Gentek',     prix: 8.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-gt-sq-cls',nom:'Coin ext. Vinyle Sequoia Classique',     marque:'Gentek',     prix: 9.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-gt-sq-des',nom:'Coin ext. Vinyle Sequoia Designer',      marque:'Gentek',     prix:10.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-gt-al',    nom:'Coin ext. Aluminium Gentek',             marque:'Gentek',     prix:12.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-kc-al',    nom:'Coin ext. Aluminium Kaycan',             marque:'Kaycan',     prix:11.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-gt-dist',  nom:'Coin ext. Acier Distinction',            marque:'Gentek',     prix:16.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-gt-mod',   nom:'Coin ext. Acier Moderno',                marque:'Gentek',     prix:17.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-gt-ss',    nom:'Coin ext. Acier Sierra Steel',           marque:'Gentek',     prix:18.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-qe-vesta', nom:'Coin ext. Acier Vesta',                  marque:'Qualité Ext',prix:18.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-mac',      nom:'Coin ext. Acier MAC',                    marque:'MAC',        prix:17.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'cx-vw-bl',    nom:'Coin ext. Vicwest Bellara',              marque:'Vicwest',    prix:19.00, unite:'piece', longueur:10, note:'coussiné'},
  ],

  // ── COINS INTÉRIEURS ──────────────────────────────────────────────────────
  coinsInt: [
    {id:'ci-vl-cls',   nom:'Coin int. Vinyle Classique',             marque:'Gentek',     prix: 7.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'ci-vl-des',   nom:'Coin int. Vinyle Designer',              marque:'Gentek',     prix: 8.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'ci-gt-dist',  nom:'Coin int. Acier Distinction',            marque:'Gentek',     prix:15.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'ci-gt-mod',   nom:'Coin int. Acier Moderno',                marque:'Gentek',     prix:16.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'ci-vw-bl',    nom:'Coin int. Vicwest Bellara',              marque:'Vicwest',    prix:18.00, unite:'piece', longueur:10, note:'coussiné'},
  ],

  // ── J-TRIM ────────────────────────────────────────────────────────────────
  jTrim: [
    {id:'jt-vl-12-cls',nom:'J-Trim Vinyle ½" Classique',            marque:'Gentek',     prix: 4.25, unite:'piece', longueur:12, note:'coussiné'},
    {id:'jt-vl-12-des',nom:'J-Trim Vinyle ½" Designer',             marque:'Gentek',     prix: 5.00, unite:'piece', longueur:12, note:'coussiné'},
    {id:'jt-sq-34-cls',nom:'J-Trim Sequoia ¾" Classique',           marque:'Gentek',     prix: 5.25, unite:'piece', longueur:12, note:'coussiné'},
    {id:'jt-sq-34-des',nom:'J-Trim Sequoia ¾" Designer',            marque:'Gentek',     prix: 6.00, unite:'piece', longueur:12, note:'coussiné'},
    {id:'jt-al-12',    nom:'J-Trim Aluminium ½"',                   marque:'Gentek',     prix: 6.50, unite:'piece', longueur:12, note:'coussiné'},
    {id:'jt-ac-dist-j',nom:'J-Trim Acier Distinction J',            marque:'Gentek',     prix: 8.50, unite:'piece', longueur:12, note:'coussiné'},
    {id:'jt-ac-dist-dj',nom:'J-Trim Acier Distinction Double J',    marque:'Gentek',     prix: 9.50, unite:'piece', longueur:12, note:'coussiné'},
    {id:'jt-gt-ss',    nom:'J-Trim Sierra Steel',                   marque:'Gentek',     prix: 9.00, unite:'piece', longueur:12, note:'coussiné'},
    {id:'jt-qe-vesta', nom:'J-Trim Acier Vesta',                    marque:'Qualité Ext',prix: 9.00, unite:'piece', longueur:12, note:'coussiné'},
  ],

  // ── SOFFITES ──────────────────────────────────────────────────────────────
  soffites: [
    {id:'sf-gt-al12',  nom:"Soffite Gentek Alu Ventilé 4PA 12'",    marque:'Gentek',     prix: 72, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-kc-p16',   nom:'Soffite Kaycan Alu Perforé Deluxe 16"', marque:'Kaycan',     prix: 78, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-kc-4pa',   nom:'Soffite Kaycan Quad 4PA',               marque:'Kaycan',     prix: 70, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-kc-sp100', nom:'Soffite Kaycan SP100',                  marque:'Kaycan',     prix: 65, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-kc-sp600', nom:'Soffite Kaycan SP600',                  marque:'Kaycan',     prix: 68, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-qe-tr12',  nom:'Soffite Qualité Ext Truvent 12"',       marque:'Qualité Ext',prix: 75, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-rl-tb-std',nom:"Soffite Rialux Timberland 12'6\" Std",  marque:'Rialux',     prix: 80, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-rl-ti-std',nom:"Soffite Rialux Tiago 12'6\" Std",       marque:'Rialux',     prix: 80, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-rl-tb-prm',nom:"Soffite Rialux Timberland 12'6\" Prm",  marque:'Rialux',     prix: 92, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-rl-ti-prm',nom:"Soffite Rialux Tiago 12'6\" Prm",       marque:'Rialux',     prix: 92, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-vw-clrs',  nom:'Soffite Vicwest Bellara Perforé CLRS',  marque:'Vicwest',    prix: 88, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-vw-gb',    nom:'Soffite Vicwest Bellara Perforé GB',    marque:'Vicwest',    prix: 85, unite:'boite', couverture:100, note:'coussiné'},
    {id:'sf-vw-mat',   nom:'Soffite Vicwest Bellara Perforé Mat',   marque:'Vicwest',    prix: 90, unite:'boite', couverture:100, note:'coussiné'},
  ],

  // ── FASCIAS ───────────────────────────────────────────────────────────────
  fascias: [
    {id:'fa-gt-p1c-blc',nom:"Fascia Gentek P1C BLC 50'",            marque:'Gentek',     prix:195, unite:'rouleau', longueur:50, note:'coussiné'},
    {id:'fa-gt-p2c-blc',nom:"Fascia Gentek P2C BLC 50'",            marque:'Gentek',     prix:210, unite:'rouleau', longueur:50, note:'coussiné'},
    {id:'fa-gt-p2c-cls',nom:"Fascia Gentek P2C CLRS 50'",           marque:'Gentek',     prix:218, unite:'rouleau', longueur:50, note:'coussiné'},
    {id:'fa-gt-cex',   nom:"Fascia Gentek CanExel-XL 50'",          marque:'Gentek',     prix:235, unite:'rouleau', longueur:50, note:'coussiné'},
    {id:'fa-kc-hg-blc',nom:"Fascia Kaycan HG BLC 50'",              marque:'Kaycan',     prix:200, unite:'rouleau', longueur:50, note:'coussiné'},
    {id:'fa-kc-hg-cls',nom:"Fascia Kaycan HG CLRS 50'",             marque:'Kaycan',     prix:208, unite:'rouleau', longueur:50, note:'coussiné'},
    {id:'fa-ry-blc',   nom:"Fascia Royal BLC 50'",                  marque:'Royal',      prix:192, unite:'rouleau', longueur:50, note:'coussiné'},
    {id:'fa-ry-cls',   nom:"Fascia Royal CLRS 50'",                 marque:'Royal',      prix:198, unite:'rouleau', longueur:50, note:'coussiné'},
    {id:'fa-oam-nr',   nom:"Fascia OAM Noir 50'",                   marque:'OAM',        prix:220, unite:'rouleau', longueur:50, note:'coussiné'},
  ],

  // ── GOUTTIÈRES — DESCENTES ────────────────────────────────────────────────
  gouttiereDescentes: [
    {id:'gd-gt-23-blc',nom:"Descente 2×3 Gentek BLC 10'",           marque:'Gentek',     prix:14.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'gd-gt-23-cls',nom:"Descente 2×3 Gentek CLRS 10'",          marque:'Gentek',     prix:15.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'gd-gt-23-xl', nom:"Descente 2×3 Gentek XL 10'",            marque:'Gentek',     prix:16.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'gd-ry-23-blc',nom:"Descente 2×3 Royal BLC 10'",            marque:'Royal',      prix:13.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'gd-ry-23-cls',nom:"Descente 2×3 Royal CLRS 10'",           marque:'Royal',      prix:14.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'gd-ry-34-blc',nom:"Descente 3×4 Royal BLC 10'",            marque:'Royal',      prix:18.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'gd-ry-34-cls',nom:"Descente 3×4 Royal CLRS 10'",           marque:'Royal',      prix:19.00, unite:'piece', longueur:10, note:'coussiné'},
  ],

  // ── GOUTTIÈRES — COUDES ───────────────────────────────────────────────────
  gouttiereCoudes: [
    {id:'gc-gt-23-90', nom:'Coude 90° 2×3 Gentek',                  marque:'Gentek',     prix: 5.50, unite:'piece', note:'coussiné'},
    {id:'gc-gt-34-90', nom:'Coude 90° 3×4 Gentek',                  marque:'Gentek',     prix: 7.50, unite:'piece', note:'coussiné'},
    {id:'gc-ry-30',    nom:'Coude 30° Royal',                       marque:'Royal',      prix: 4.75, unite:'piece', note:'coussiné'},
    {id:'gc-ry-90',    nom:'Coude 90° Royal',                       marque:'Royal',      prix: 5.25, unite:'piece', note:'coussiné'},
  ],

  // ── GOUTTIÈRES — CAPUCHONS ────────────────────────────────────────────────
  gouttiereCapuchons: [
    {id:'gca-gt-5',    nom:'Cap 5" Gentek',                         marque:'Gentek',     prix: 3.50, unite:'piece', note:'coussiné'},
    {id:'gca-ry',      nom:'Cap Royal',                             marque:'Royal',      prix: 3.25, unite:'piece', note:'coussiné'},
  ],

  // ── GOUTTIÈRES — SUPPORTS ─────────────────────────────────────────────────
  gouttiereSupports: [
    {id:'gs-gt-std',   nom:'Support Gentek Standard',               marque:'Gentek',     prix: 1.85, unite:'piece', note:'coussiné'},
    {id:'gs-gt-rob',   nom:'Support Gentek Rob',                    marque:'Gentek',     prix: 2.25, unite:'piece', note:'coussiné'},
    {id:'gs-ry-std',   nom:'Support Royal Standard',                marque:'Royal',      prix: 1.75, unite:'piece', note:'coussiné'},
    {id:'gs-ry-qs',    nom:'Support Royal Quick-Screw',             marque:'Royal',      prix: 2.50, unite:'piece', note:'coussiné'},
    {id:'gs-ry-hd',    nom:'Support Royal HD',                      marque:'Royal',      prix: 3.25, unite:'piece', note:'coussiné'},
  ],

  // ── MOULURES DE DÉPART ────────────────────────────────────────────────────
  moulurasDepart: [
    {id:'md-gt-dist',  nom:"Départ Acier Distinction Gentek 10'",   marque:'Gentek',     prix: 6.50, unite:'piece', longueur:10, note:'coussiné'},
    {id:'md-gt-fo',    nom:"Départ Vinyle Fair Oaks Gentek 12'",    marque:'Gentek',     prix: 4.25, unite:'piece', longueur:12, note:'coussiné'},
    {id:'md-gt-alu',   nom:"Départ Aluminium Universel Gentek 12'", marque:'Gentek',     prix: 5.00, unite:'piece', longueur:12, note:'coussiné'},
    {id:'md-kc-urb',   nom:"Départ Kaycan Urbanix 12'",             marque:'Kaycan',     prix: 4.50, unite:'piece', longueur:12, note:'coussiné'},
    {id:'md-kc-tm',    nom:"Départ Kaycan Timberlake 12'",          marque:'Kaycan',     prix: 4.75, unite:'piece', longueur:12, note:'coussiné'},
    {id:'md-qe-uni',   nom:"Départ Vesta Uni 10'",                  marque:'Qualité Ext',prix: 6.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'md-qe-2t',    nom:"Départ Vesta 2 tons 10'",               marque:'Qualité Ext',prix: 6.25, unite:'piece', longueur:10, note:'coussiné'},
    {id:'md-vw-galv',  nom:"Départ Vicwest Bellara Galvanisé 10'",  marque:'Vicwest',    prix: 7.00, unite:'piece', longueur:10, note:'coussiné'},
    {id:'md-vw-ar',    nom:"Départ Vicwest Bellara Anti-rongeur 10'",marque:'Vicwest',   prix: 7.50, unite:'piece', longueur:10, note:'coussiné'},
  ],

  // ── ISOLATION ─────────────────────────────────────────────────────────────
  isolation: [
    {id:'iso-1',       nom:'Isoclad 1" format 4×9',                 marque:'Isoclad',    prix: 32, unite:'panneau', couverture:36, note:'coussiné'},
    {id:'iso-125',     nom:'Isoclad 1¼" format 4×9',                marque:'Isoclad',    prix: 42, unite:'panneau', couverture:36, note:'coussiné'},
    {id:'iso-225',     nom:'Isoclad 2¼" format 4×9',                marque:'Isoclad',    prix: 65, unite:'panneau', couverture:36, note:'coussiné'},
  ],

  // ── FOURRURES ─────────────────────────────────────────────────────────────
  fourrures: [
    {id:'fo-8',        nom:"Fourrure 1×3 × 8'",                     marque:'',           prix: 4.25, unite:'piece', longueur: 8, note:'coussiné'},
    {id:'fo-10',       nom:"Fourrure 1×3 × 10'",                    marque:'',           prix: 5.25, unite:'piece', longueur:10, note:'coussiné'},
    {id:'fo-12',       nom:"Fourrure 1×3 × 12'",                    marque:'',           prix: 6.25, unite:'piece', longueur:12, note:'coussiné'},
  ],

  // ── MEMBRANE ──────────────────────────────────────────────────────────────
  membranes: [
    {id:'mb-typar',    nom:"Typar 9' × 100'",                       marque:'Typar',      prix:135, unite:'rouleau', longueur:100, note:'coussiné'},
  ],
  rubanMembrane: [
    {id:'rb-typar',    nom:'Ruban Typar',                           marque:'Typar',      prix: 18, unite:'rouleau', note:'coussiné'},
  ],

  // ── FIXATIONS ─────────────────────────────────────────────────────────────
  fixations: [
    {id:'fix-vis-soff', nom:'Vis soffite 6×5/8 (100 pcs)',          marque:'GBM', prix:  5.06, unite:'100pcs', note:'GBM'},
    {id:'fix-vis-fas',  nom:'Vis fascia #8×1½ (100 pcs)',           marque:'GBM', prix: 13.95, unite:'100pcs', note:'GBM'},
    {id:'fix-clou-fas', nom:'Clous alu fascia 1¼ (lb)',             marque:'GBM', prix: 14.48, unite:'lb',     note:'GBM'},
    {id:'fix-vis-ramp', nom:'Vis à rampe alu (24 pcs)',             marque:'GBM', prix:  7.29, unite:'24pcs',  note:'GBM'},
    {id:'fix-clou-ann', nom:'Clous annelés galv 2" (1000 pcs)',     marque:'GBM', prix: 19.19, unite:'1000pcs',note:'GBM'},
  ],

  // ── SCELLANTS ─────────────────────────────────────────────────────────────
  scellants: [
    {id:'sc-adfast',   nom:'Scellant Adfast Revêtement 304ml',      marque:'Adfast', prix:  7.36, unite:'tube', note:'GBM'},
    {id:'mo-adfast',   nom:'Mousse polyuréthane Adfast 750ml',      marque:'Adfast', prix: 13.07, unite:'can',  note:'GBM'},
  ],
};

function findProduit(categorie, id) {
  if (!PRODUITS[categorie]) return null;
  return PRODUITS[categorie].find(p => p.id === id) || null;
}

// buildSelect est défini dans pipeline-heureka.html (revBuildSelect) avec support selectedId

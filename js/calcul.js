// js/calcul.js — Moteur de calcul des quantités

const RATIOS = {
  fourrureEspacement: 1.33,   // pi entre rangées
  clousParFourrure:   6,       // clous 2" par pièce de fourrure
  visRevPi2:          2.5,     // vis/clous revêtement par pi²
  visSoffitePiLin:    1,       // vis soffite par pi linéaire
  membraneEffLargeur: 8.5,     // largeur effective par rangée Typar (9'-6" overlap)
  rubanPiLin:         200,     // pi lin. de joints par rouleau de ruban
  scellantPiLin:      50,      // pi lin. de joints par tube
  mousseParOuverture: 1,       // can de mousse par ouverture
  coudesParDescente:  3,       // coudes par descente
  supportsParPiLin:   0.5,     // supports par pi linéaire de gouttière (1 par 2 pi)
  visFasciaParPiLin:  0.2,     // sac de vis fascia par pi linéaire (1/5 pi)
};

function toFeet(pieds, pouces) {
  return (parseFloat(pieds) || 0) + (parseFloat(pouces) || 0) / 12;
}

function calcMurAire(mur) {
  const h = toFeet(mur.hauteurPieds, mur.hauteurPouces);
  const l = toFeet(mur.longueurPieds, mur.longueurPouces);
  const brut = h * l;
  const net  = Math.max(0, brut - (parseFloat(mur.ouvertures) || 0));
  return net * (1 + (parseFloat(mur.pertePct) || 10) / 100);
}

function calculerTotaux(murs) {
  let totalAire = 0, totalLongueur = 0, totalHauteur = 0;
  let totalSoffite = 0, totalDescentes = 0, totalOuverturesPi2 = 0;

  murs.forEach(m => {
    const h = toFeet(m.hauteurPieds, m.hauteurPouces);
    const l = toFeet(m.longueurPieds, m.longueurPouces);
    totalAire       += calcMurAire(m);
    totalLongueur   += l;
    totalHauteur    += h;
    totalSoffite    += l * (parseFloat(m.soffiteLargeur) || 0);
    totalDescentes  += parseInt(m.nbDescentes) || 0;
    totalOuverturesPi2 += parseFloat(m.ouvertures) || 0;
  });

  const nbOuvertures = totalOuverturesPi2 > 0
    ? Math.max(1, Math.round(totalOuverturesPi2 / 15))
    : 0;

  return { totalAire, totalLongueur, totalHauteur, totalSoffite, totalDescentes, totalOuverturesPi2, nbOuvertures };
}

function calculerQuantites(state) {
  const { murs, selections: sel, nbCoinsExt, nbCoinsInt } = state;
  const t = calculerTotaux(murs);
  const q = {}; // résultats

  // ── Revêtement ────────────────────────────────────────────────────────────
  if (sel.revetement) {
    const p = findProduit('revetements', sel.revetement);
    if (p && t.totalAire > 0) {
      q.revetement = { prod: p, qte: Math.ceil(t.totalAire / p.couverture), aire: t.totalAire };
    }
  }

  // ── Fourrures 1×3 ─────────────────────────────────────────────────────────
  if (sel.fourrure) {
    const p = findProduit('fourrures', sel.fourrure);
    if (p) {
      let piLin = 0;
      murs.forEach(m => {
        const h = toFeet(m.hauteurPieds, m.hauteurPouces);
        const l = toFeet(m.longueurPieds, m.longueurPouces);
        const rangees = Math.ceil(h / RATIOS.fourrureEspacement);
        piLin += rangees * l;
      });
      q.fourrure = { prod: p, qte: Math.ceil(piLin / p.longueur), piLin };
    }
  }

  // ── Isolation Isoclad ─────────────────────────────────────────────────────
  if (sel.isolation) {
    const p = findProduit('isolation', sel.isolation);
    if (p && t.totalAire > 0) {
      q.isolation = { prod: p, qte: Math.ceil(t.totalAire / p.couverture) };
    }
  }

  // ── Coins extérieurs ──────────────────────────────────────────────────────
  if (sel.coinExt && nbCoinsExt > 0) {
    const p = findProduit('coinsExt', sel.coinExt);
    if (p) {
      const avgH = t.totalHauteur / Math.max(murs.length, 1);
      q.coinExt = { prod: p, qte: nbCoinsExt * Math.ceil(avgH / p.longueur) };
    }
  }

  // ── Coins intérieurs ──────────────────────────────────────────────────────
  if (sel.coinInt && nbCoinsInt > 0) {
    const p = findProduit('coinsInt', sel.coinInt);
    if (p) {
      const avgH = t.totalHauteur / Math.max(murs.length, 1);
      q.coinInt = { prod: p, qte: nbCoinsInt * Math.ceil(avgH / p.longueur) };
    }
  }

  // ── J-Trim ────────────────────────────────────────────────────────────────
  if (sel.jTrim) {
    const p = findProduit('jTrim', sel.jTrim);
    if (p) {
      let ouvertPerim = 0;
      murs.forEach(m => {
        const oa = parseFloat(m.ouvertures) || 0;
        if (oa > 0) ouvertPerim += 4 * Math.sqrt(oa);
      });
      const piLin = 2 * t.totalLongueur + ouvertPerim;
      q.jTrim = { prod: p, qte: Math.ceil(piLin / p.longueur), piLin };
    }
  }

  // ── Moulure de départ ─────────────────────────────────────────────────────
  if (sel.moulureDepart) {
    const p = findProduit('moulurasDepart', sel.moulureDepart);
    if (p) {
      q.moulureDepart = { prod: p, qte: Math.ceil(t.totalLongueur / p.longueur) };
    }
  }

  // ── Soffites ──────────────────────────────────────────────────────────────
  if (sel.soffite && t.totalSoffite > 0) {
    const p = findProduit('soffites', sel.soffite);
    if (p) {
      q.soffite = { prod: p, qte: Math.ceil(t.totalSoffite / p.couverture), aire: t.totalSoffite };
    }
  }

  // ── Fascia ────────────────────────────────────────────────────────────────
  if (sel.fascia) {
    const p = findProduit('fascias', sel.fascia);
    if (p) {
      const piLin = t.totalLongueur;
      q.fascia = { prod: p, qte: Math.ceil(piLin / p.longueur), piLin };
    }
  }

  // ── Membrane pare-air ─────────────────────────────────────────────────────
  {
    const p = PRODUITS.membranes[0];
    let piLinTotal = 0;
    murs.forEach(m => {
      const h = toFeet(m.hauteurPieds, m.hauteurPouces);
      const l = toFeet(m.longueurPieds, m.longueurPouces);
      const rangees = Math.ceil(h / RATIOS.membraneEffLargeur);
      piLinTotal += rangees * l;
    });
    q.membrane = { prod: p, qte: Math.ceil(piLinTotal / 100) }; // rouleau 100'
  }

  // ── Ruban membrane ────────────────────────────────────────────────────────
  {
    const p = PRODUITS.rubanMembrane[0];
    const piLinRuban = t.totalLongueur * 2;
    q.rubanMembrane = { prod: p, qte: Math.max(1, Math.ceil(piLinRuban / RATIOS.rubanPiLin)) };
  }

  // ── Gouttières — descentes ────────────────────────────────────────────────
  if (sel.gouttiereDescente && t.totalDescentes > 0) {
    const p = findProduit('gouttiereDescentes', sel.gouttiereDescente);
    if (p) {
      const avgH = t.totalHauteur / Math.max(murs.length, 1);
      q.gouttiereDescente = { prod: p, qte: t.totalDescentes * Math.ceil(avgH / p.longueur) };
    }
  }

  // ── Gouttières — coudes ───────────────────────────────────────────────────
  if (sel.gouttiereCoude && t.totalDescentes > 0) {
    const p = findProduit('gouttiereCoudes', sel.gouttiereCoude);
    if (p) {
      q.gouttiereCoude = { prod: p, qte: t.totalDescentes * RATIOS.coudesParDescente };
    }
  }

  // ── Gouttières — capuchons ────────────────────────────────────────────────
  if (sel.gouttiereCapuchon && t.totalDescentes > 0) {
    const p = findProduit('gouttiereCapuchons', sel.gouttiereCapuchon);
    if (p) {
      q.gouttiereCapuchon = { prod: p, qte: t.totalDescentes * 2 };
    }
  }

  // ── Gouttières — supports ─────────────────────────────────────────────────
  if (sel.gouttiereSupport && t.totalLongueur > 0) {
    const p = findProduit('gouttiereSupports', sel.gouttiereSupport);
    if (p) {
      q.gouttiereSupport = { prod: p, qte: Math.ceil(t.totalLongueur * RATIOS.supportsParPiLin) };
    }
  }

  // ── Fixations — clous annelés revêtement ──────────────────────────────────
  if (t.totalAire > 0) {
    const p = PRODUITS.fixations.find(f => f.id === 'fix-clou-ann');
    const totalVis = Math.ceil(t.totalAire * RATIOS.visRevPi2);
    q.fixRevetement = { prod: p, qte: Math.ceil(totalVis / 1000), label: `${totalVis} clous` };
  }

  // ── Fixations — clous fourrures ───────────────────────────────────────────
  if (q.fourrure) {
    const p = PRODUITS.fixations.find(f => f.id === 'fix-clou-ann');
    const total = q.fourrure.qte * RATIOS.clousParFourrure;
    q.fixFourrure = { prod: p, qte: Math.max(1, Math.ceil(total / 1000)), label: `${total} clous` };
  }

  // ── Fixations — vis soffite ───────────────────────────────────────────────
  if (t.totalSoffite > 0) {
    const p = PRODUITS.fixations.find(f => f.id === 'fix-vis-soff');
    const total = Math.ceil(t.totalLongueur * RATIOS.visSoffitePiLin);
    q.fixSoffite = { prod: p, qte: Math.ceil(total / 100) };
  }

  // ── Fixations — vis fascia ────────────────────────────────────────────────
  if (sel.fascia) {
    const p = PRODUITS.fixations.find(f => f.id === 'fix-vis-fas');
    q.fixFascia = { prod: p, qte: Math.max(1, Math.ceil(t.totalLongueur * RATIOS.visFasciaParPiLin)) };
  }

  // ── Scellant ──────────────────────────────────────────────────────────────
  {
    const p = PRODUITS.scellants.find(s => s.id === 'sc-adfast');
    const piLin = t.totalLongueur * 2 + (nbCoinsExt || 0) * 10 + (nbCoinsInt || 0) * 10;
    q.scellant = { prod: p, qte: Math.max(1, Math.ceil(piLin / RATIOS.scellantPiLin)) };
  }

  // ── Mousse polyuréthane ───────────────────────────────────────────────────
  if (t.nbOuvertures > 0) {
    const p = PRODUITS.scellants.find(s => s.id === 'mo-adfast');
    q.mousse = { prod: p, qte: t.nbOuvertures };
  }

  q._totaux = t;
  return q;
}

function calculerCoutMateriaux(quantites) {
  let cout = 0;
  const items = Object.entries(quantites).filter(([k]) => k !== '_totaux');
  items.forEach(([, v]) => {
    if (v && v.prod && v.qte) cout += v.prod.prix * v.qte;
  });
  return cout;
}

function calculerFinancier(state) {
  const quantites = calculerQuantites(state);
  const coutMat   = calculerCoutMateriaux(quantites);
  const margeMat  = (parseFloat(state.margeMateriaux) || 20) / 100;
  const prixMat   = coutMat / (1 - margeMat);
  const profitMat = prixMat - coutMat;

  const mo = state.mainOeuvre;
  const heures     = (parseInt(mo.hommes) || 0) * (parseInt(mo.jours) || 0) * (parseFloat(mo.heuresParJour) || 9);
  const coutMO     = heures * (parseFloat(mo.tauxHoraire) || 105);
  const margeMO    = (parseFloat(mo.marge) || 25) / 100;
  const prixMO     = coutMO / (1 - margeMO);
  const profitMO   = prixMO - coutMO;

  const sousTotal  = prixMat + prixMO;
  const TPS        = sousTotal * 0.05;
  const TVQ        = sousTotal * 0.09975;
  const total      = sousTotal + TPS + TVQ;

  return { quantites, coutMat, prixMat, profitMat, heures, coutMO, prixMO, profitMO, sousTotal, TPS, TVQ, total };
}

const fmt$ = n => '$' + (n || 0).toLocaleString('fr-CA', {minimumFractionDigits:2, maximumFractionDigits:2});
const fmt2  = n => (n || 0).toFixed(2);

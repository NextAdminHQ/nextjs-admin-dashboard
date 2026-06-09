export async function getOverviewData() {
  await new Promise((r) => setTimeout(r, 1000));
  return {
    tauxOccupation: { value: 78, growthRate: 4.2 },
    arriveesAujourdhui: { value: 7, growthRate: 16.7 },
    departsAujourdhui: { value: 5, growthRate: -5.0 },
    revenuMois: { value: 3_840_000, growthRate: 11.3 },
    logementsDisponibles: { value: 12, growthRate: -8.3 },
    enMaintenance: { value: 3, growthRate: 0 },
  };
}

export async function getArriveesDepartsData() {
  await new Promise((r) => setTimeout(r, 800));
  return {
    arrivees: [
      { id: "RES-021", client: "Aïcha Coulibaly", logement: "Suite 3B — Les Palmiers", heure: "14:00", statut: "Prêt" },
      { id: "RES-022", client: "Mamadou Bah", logement: "Villa Complète — Djemila", heure: "16:00", statut: "En attente" },
      { id: "RES-023", client: "Yasmina Traoré", logement: "Studio 2C — Oasis", heure: "11:00", statut: "Arrivé" },
      { id: "RES-024", client: "Souleymane Diop", logement: "Chambre 5 — Sahel", heure: "09:30", statut: "Arrivé" },
      { id: "RES-025", client: "Nadia Camara", logement: "Appart T2 — Central", heure: "18:00", statut: "Prêt" },
    ],
    departs: [
      { id: "RES-011", client: "Oumar Kane", logement: "Appart T3 — Palmiers", heure: "10:00", paye: true },
      { id: "RES-012", client: "Amina Sow", logement: "Villa 2 — Djemila", heure: "12:00", paye: false },
      { id: "RES-013", client: "Boubacar Koné", logement: "Chambre 12 — Sahel", heure: "11:00", paye: true },
    ],
  };
}

export async function getOccupationData() {
  await new Promise((r) => setTimeout(r, 600));
  return [
    { etablissement: "Résidence Les Palmiers", total: 20, occupes: 16, type: "Résidence" },
    { etablissement: "Villa Djemila", total: 8, occupes: 5, type: "Villa" },
    { etablissement: "Auberge du Sahel", total: 15, occupes: 10, type: "Auberge" },
    { etablissement: "Appart'Hôtel Central", total: 12, occupes: 9, type: "Appart-Hôtel" },
    { etablissement: "Résidence Oasis", total: 10, occupes: 7, type: "Résidence" },
  ];
}

export async function getAlertesData() {
  await new Promise((r) => setTimeout(r, 500));
  return [
    { type: "maintenance", message: "Climatisation en panne — Villa Complète", heure: "08:45", priorite: "haute" },
    { type: "stock", message: "Stock de linge critique — seuil atteint", heure: "09:10", priorite: "moyenne" },
    { type: "paiement", message: "Paiement en attente — RES-012 (Amina Sow)", heure: "10:30", priorite: "haute" },
    { type: "housekeeping", message: "3 chambres à préparer avant 14h", heure: "11:00", priorite: "moyenne" },
  ];
}

export async function getChatsData() {
  await new Promise((r) => setTimeout(r, 1000));
  return [
    {
      name: "Aïcha Coulibaly",
      profile: "/images/user/user-01.png",
      isActive: true,
      lastMessage: { content: "La suite 3B est prête pour l'arrivée.", type: "text", timestamp: "2025-06-08T08:25:00Z", isRead: false },
      unreadCount: 3,
    },
    {
      name: "Nadia Bah",
      profile: "/images/user/user-03.png",
      isActive: true,
      lastMessage: { content: "Le linge de maison est rechargé.", type: "text", timestamp: "2025-06-08T09:10:00Z", isRead: true },
      unreadCount: 0,
    },
    {
      name: "Cheikh Diouf",
      profile: "/images/user/user-04.png",
      isActive: false,
      lastMessage: { content: "Intervention de maintenance prévue à 14h.", type: "text", timestamp: "2025-06-08T10:15:00Z", isRead: true },
      unreadCount: 0,
    },
    {
      name: "Awa Traoré",
      profile: "/images/user/user-05.png",
      isActive: false,
      lastMessage: { content: "Une nouvelle réservation a été confirmée.", type: "text", timestamp: "2025-06-08T11:00:00Z", isRead: true },
      unreadCount: 2,
    },
  ];
}

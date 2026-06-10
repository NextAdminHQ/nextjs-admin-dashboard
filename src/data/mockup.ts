export type StatutReservation = "confirmee" | "attente" | "annulee" | "checkin" | "checkout";

export type Reservation = {
  id: number;
  client: string;
  telephone: string;
  chambre: string;
  type: string;
  etablissement: string;
  debut: string; // YYYY-MM-DD
  fin: string;   // YYYY-MM-DD
  montant: number;
  devise: string;
  statut: StatutReservation;
  paiement: "orange_money" | "mtn_money" | "wave" | "carte" | "especes";
  notes?: string;
};

export const RESERVATIONS_MOCKUP: Reservation[] = [
  {
    id: 1,
    client: "Kofi Mensah",
    telephone: "+225 07 12 34 56",
    chambre: "Chambre 101",
    type: "Chambre Standard",
    etablissement: "Djem's Stay Abidjan",
    debut: "2025-07-01",
    fin: "2025-07-04",
    montant: 75000,
    devise: "FCFA",
    statut: "confirmee",
    paiement: "orange_money",
  },
  {
    id: 2,
    client: "Aminata Diallo",
    telephone: "+221 77 98 76 54",
    chambre: "Suite 201",
    type: "Suite Junior",
    etablissement: "Djem's Stay Dakar",
    debut: "2025-07-03",
    fin: "2025-07-07",
    montant: 180000,
    devise: "FCFA",
    statut: "attente",
    paiement: "wave",
  },
  {
    id: 3,
    client: "Jean-Baptiste Dupont",
    telephone: "+33 6 45 67 89 10",
    chambre: "Chambre 103",
    type: "Chambre Deluxe",
    etablissement: "Djem's Stay Abidjan",
    debut: "2025-07-06",
    fin: "2025-07-10",
    montant: 120000,
    devise: "FCFA",
    statut: "checkin",
    paiement: "carte",
    notes: "Client VIP, vue sur mer demandée",
  },
  {
    id: 4,
    client: "Fatou Traoré",
    telephone: "+223 66 11 22 33",
    chambre: "Appartement 301",
    type: "Appartement Meublé",
    etablissement: "Djem's Stay Bamako",
    debut: "2025-07-08",
    fin: "2025-07-15",
    montant: 350000,
    devise: "FCFA",
    statut: "annulee",
    paiement: "mtn_money",
    notes: "Annulé suite à changement de programme",
  },
  {
    id: 5,
    client: "Moussa Coulibaly",
    telephone: "+225 05 98 76 54",
    chambre: "Chambre 102",
    type: "Chambre Standard",
    etablissement: "Djem's Stay Abidjan",
    debut: "2025-07-10",
    fin: "2025-07-13",
    montant: 75000,
    devise: "FCFA",
    statut: "confirmee",
    paiement: "especes",
  },
  {
    id: 6,
    client: "Aïcha Konaté",
    telephone: "+226 70 55 44 33",
    chambre: "Suite 202",
    type: "Suite Familiale",
    etablissement: "Djem's Stay Ouagadougou",
    debut: "2025-07-12",
    fin: "2025-07-18",
    montant: 240000,
    devise: "FCFA",
    statut: "attente",
    paiement: "orange_money",
  },
  {
    id: 7,
    client: "Ibrahim Sawadogo",
    telephone: "+226 65 33 22 11",
    chambre: "Villa 01",
    type: "Villa Privée",
    etablissement: "Djem's Stay Ouagadougou",
    debut: "2025-07-14",
    fin: "2025-07-21",
    montant: 560000,
    devise: "FCFA",
    statut: "confirmee",
    paiement: "carte",
    notes: "Séjour lune de miel, décoration fleurie demandée",
  },
  {
    id: 8,
    client: "Marie-Claire Gbagbo",
    telephone: "+225 01 23 45 67",
    chambre: "Chambre 205",
    type: "Chambre Deluxe",
    etablissement: "Djem's Stay Abidjan",
    debut: "2025-07-16",
    fin: "2025-07-19",
    montant: 120000,
    devise: "FCFA",
    statut: "confirmee",
    paiement: "wave",
  },
  {
    id: 9,
    client: "Seydou Ouédraogo",
    telephone: "+226 78 90 12 34",
    chambre: "Chambre 104",
    type: "Chambre Standard",
    etablissement: "Djem's Stay Abidjan",
    debut: "2025-07-18",
    fin: "2025-07-20",
    montant: 50000,
    devise: "FCFA",
    statut: "checkout",
    paiement: "especes",
  },
  {
    id: 10,
    client: "Nadia Touré",
    telephone: "+225 07 77 88 99",
    chambre: "Appartement 302",
    type: "Appartement Meublé",
    etablissement: "Djem's Stay Abidjan",
    debut: "2025-07-20",
    fin: "2025-07-27",
    montant: 350000,
    devise: "FCFA",
    statut: "confirmee",
    paiement: "orange_money",
  },
  {
    id: 11,
    client: "Luc Attiogbé",
    telephone: "+228 90 11 22 33",
    chambre: "Chambre 106",
    type: "Chambre Standard",
    etablissement: "Djem's Stay Lomé",
    debut: "2025-07-22",
    fin: "2025-07-24",
    montant: 60000,
    devise: "FCFA",
    statut: "attente",
    paiement: "mtn_money",
  },
  {
    id: 12,
    client: "Rokia Sanogo",
    telephone: "+223 79 55 66 77",
    chambre: "Suite 203",
    type: "Suite Junior",
    etablissement: "Djem's Stay Bamako",
    debut: "2025-07-25",
    fin: "2025-07-30",
    montant: 200000,
    devise: "FCFA",
    statut: "confirmee",
    paiement: "wave",
    notes: "Conférence d'affaires, salle de réunion réservée",
  },
];

export type StatutChambre = "disponible" | "occupee" | "reservee" | "nettoyage" | "maintenance";

export type Chambre = {
  id: number;
  numero: string;
  type: "standard" | "deluxe" | "suite" | "appartement" | "villa";
  etage: number;
  capacite: number;
  prixNuit: number;
  statut: StatutChambre;
  equipements: string[];
  image: string;
};

export type Residence = {
  id: number;
  nom: string;
  ville: string;
  pays: string;
  adresse: string;
  telephone: string;
  email: string;
  type: "hotel" | "residence" | "appartement" | "villa" | "auberge";
  etoiles: number;
  chambres: Chambre[];
  image: string;
  description: string;
  tauxOccupation: number;
  revenuMois: number;
};

export const RESIDENCES_MOCKUP: Residence[] = [
  {
    id: 1,
    nom: "Djem's Stay Abidjan",
    ville: "Abidjan",
    pays: "Côte d'Ivoire",
    adresse: "Rue des Jardins, Cocody, Abidjan",
    telephone: "+225 27 22 41 00 00",
    email: "abidjan@djemsstay.com",
    type: "hotel",
    etoiles: 4,
    image: "/images/user/user-01.png",
    description: "Hôtel moderne au cœur de Cocody, offrant un cadre luxueux avec piscine, restaurant et salle de conférence.",
    tauxOccupation: 78,
    revenuMois: 4850000,
    chambres: [
      { id: 1, numero: "101", type: "standard",    etage: 1, capacite: 2, prixNuit: 25000,  statut: "occupee",     equipements: ["WiFi", "Climatisation", "TV"], image: "/images/user/user-01.png" },
      { id: 2, numero: "102", type: "standard",    etage: 1, capacite: 2, prixNuit: 25000,  statut: "disponible",  equipements: ["WiFi", "Climatisation", "TV"], image: "/images/user/user-01.png" },
      { id: 3, numero: "103", type: "deluxe",      etage: 1, capacite: 2, prixNuit: 40000,  statut: "reservee",    equipements: ["WiFi", "Climatisation", "TV", "Minibar"], image: "/images/user/user-01.png" },
      { id: 4, numero: "201", type: "suite",       etage: 2, capacite: 3, prixNuit: 65000,  statut: "disponible",  equipements: ["WiFi", "Climatisation", "TV", "Minibar", "Jacuzzi"], image: "/images/user/user-01.png" },
      { id: 5, numero: "202", type: "suite",       etage: 2, capacite: 4, prixNuit: 75000,  statut: "nettoyage",   equipements: ["WiFi", "Climatisation", "TV", "Minibar", "Jacuzzi"], image: "/images/user/user-01.png" },
      { id: 6, numero: "301", type: "appartement", etage: 3, capacite: 4, prixNuit: 90000,  statut: "occupee",     equipements: ["WiFi", "Climatisation", "TV", "Cuisine", "Lave-linge"], image: "/images/user/user-01.png" },
    ],
  },
  {
    id: 2,
    nom: "Djem's Stay Dakar",
    ville: "Dakar",
    pays: "Sénégal",
    adresse: "Avenue Cheikh Anta Diop, Plateau, Dakar",
    telephone: "+221 33 821 00 00",
    email: "dakar@djemsstay.com",
    type: "residence",
    etoiles: 3,
    image: "/images/user/user-02.png",
    description: "Résidence meublée idéalement située sur le Plateau, parfaite pour les séjours d'affaires et touristiques.",
    tauxOccupation: 65,
    revenuMois: 3200000,
    chambres: [
      { id: 7,  numero: "101", type: "standard",    etage: 1, capacite: 2, prixNuit: 30000,  statut: "disponible",  equipements: ["WiFi", "Climatisation", "TV"], image: "/images/user/user-02.png" },
      { id: 8,  numero: "201", type: "suite",       etage: 2, capacite: 3, prixNuit: 60000,  statut: "occupee",     equipements: ["WiFi", "Climatisation", "TV", "Minibar"], image: "/images/user/user-02.png" },
      { id: 9,  numero: "202", type: "appartement", etage: 2, capacite: 5, prixNuit: 85000,  statut: "reservee",    equipements: ["WiFi", "Climatisation", "TV", "Cuisine"], image: "/images/user/user-02.png" },
      { id: 10, numero: "301", type: "appartement", etage: 3, capacite: 4, prixNuit: 80000,  statut: "maintenance", equipements: ["WiFi", "Climatisation", "TV", "Cuisine"], image: "/images/user/user-02.png" },
    ],
  },
  {
    id: 3,
    nom: "Djem's Stay Bamako",
    ville: "Bamako",
    pays: "Mali",
    adresse: "Quartier du Fleuve, Bamako",
    telephone: "+223 20 22 00 00",
    email: "bamako@djemsstay.com",
    type: "hotel",
    etoiles: 3,
    image: "/images/user/user-03.png",
    description: "Hôtel confortable au bord du fleuve Niger, idéal pour les voyageurs d'affaires et touristes.",
    tauxOccupation: 55,
    revenuMois: 2100000,
    chambres: [
      { id: 11, numero: "101", type: "standard",    etage: 1, capacite: 2, prixNuit: 20000,  statut: "occupee",    equipements: ["WiFi", "Climatisation", "TV"], image: "/images/user/user-03.png" },
      { id: 12, numero: "102", type: "standard",    etage: 1, capacite: 2, prixNuit: 20000,  statut: "disponible", equipements: ["WiFi", "Climatisation", "TV"], image: "/images/user/user-03.png" },
      { id: 13, numero: "201", type: "suite",       etage: 2, capacite: 3, prixNuit: 50000,  statut: "disponible", equipements: ["WiFi", "Climatisation", "TV", "Minibar"], image: "/images/user/user-03.png" },
      { id: 14, numero: "301", type: "appartement", etage: 3, capacite: 4, prixNuit: 75000,  statut: "reservee",   equipements: ["WiFi", "Climatisation", "TV", "Cuisine"], image: "/images/user/user-03.png" },
    ],
  },
  {
    id: 4,
    nom: "Djem's Stay Ouagadougou",
    ville: "Ouagadougou",
    pays: "Burkina Faso",
    adresse: "Avenue Kwame Nkrumah, Ouagadougou",
    telephone: "+226 25 30 00 00",
    email: "ouaga@djemsstay.com",
    type: "villa",
    etoiles: 5,
    image: "/images/user/user-04.png",
    description: "Complexe de villas privées haut de gamme avec piscine individuelle, jardin et service personnalisé.",
    tauxOccupation: 90,
    revenuMois: 8400000,
    chambres: [
      { id: 15, numero: "V01", type: "villa", etage: 0, capacite: 6, prixNuit: 200000, statut: "occupee",    equipements: ["WiFi", "Climatisation", "TV", "Piscine", "Cuisine", "Jardin"], image: "/images/user/user-04.png" },
      { id: 16, numero: "V02", type: "villa", etage: 0, capacite: 6, prixNuit: 200000, statut: "reservee",   equipements: ["WiFi", "Climatisation", "TV", "Piscine", "Cuisine", "Jardin"], image: "/images/user/user-04.png" },
      { id: 17, numero: "V03", type: "villa", etage: 0, capacite: 8, prixNuit: 250000, statut: "disponible", equipements: ["WiFi", "Climatisation", "TV", "Piscine", "Cuisine", "Jardin", "Salle de sport"], image: "/images/user/user-04.png" },
    ],
  },
];

export const TYPE_RESIDENCE_LABEL: Record<Residence["type"], string> = {
  hotel:      "Hôtel",
  residence:  "Résidence",
  appartement:"Appartements",
  villa:      "Villas",
  auberge:    "Auberge",
};

export const TYPE_CHAMBRE_LABEL: Record<Chambre["type"], string> = {
  standard:    "Standard",
  deluxe:      "Deluxe",
  suite:       "Suite",
  appartement: "Appartement",
  villa:       "Villa",
};

export const STATUT_CHAMBRE_STYLE: Record<StatutChambre, string> = {
  disponible:  "bg-green-100  text-green-700  dark:bg-green-900/30 dark:text-green-400",
  occupee:     "bg-red-100    text-red-700    dark:bg-red-900/30   dark:text-red-400",
  reservee:    "bg-blue-100   text-blue-700   dark:bg-blue-900/30  dark:text-blue-400",
  nettoyage:   "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  maintenance: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
};

export const STATUT_CHAMBRE_LABEL: Record<StatutChambre, string> = {
  disponible:  "Disponible",
  occupee:     "Occupée",
  reservee:    "Réservée",
  nettoyage:   "En nettoyage",
  maintenance: "En maintenance",
};

export const PAIEMENT_LABEL: Record<Reservation["paiement"], string> = {
  orange_money: "Orange Money",
  mtn_money:    "MTN Money",
  wave:         "Wave",
  carte:        "Carte bancaire",
  especes:      "Espèces",
};

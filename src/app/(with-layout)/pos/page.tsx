"use client";

import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { KPIData } from "@/types/pos";
import { reportService } from "@/services/pos.service";

const kpiCards = [
  { label: "CA du jour", value: "12 430 F CFA" },
  { label: "Commandes en cours", value: "24" },
  { label: "Tables occupées", value: "8 / 12" },
  { label: "Articles en rupture", value: "3" },
  { label: "Ticket moyen", value: "7 850 F CFA" },
  { label: "Paiements Mobile Money", value: "56 %" },
];

const menuLinks = [
  { label: "Prise de commande", href: "/pos/order-entry" },
  { label: "Plan de salle", href: "/pos/tables" },
  { label: "Commandes", href: "/pos/orders" },
  { label: "Cuisine (KDS)", href: "/pos/kitchen" },
  { label: "Encaissement", href: "/pos/checkout" },
  { label: "Menus", href: "/pos/menu" },
  { label: "Stocks", href: "/pos/stock" },
  { label: "Rapports", href: "/pos/reports" },
];

export default function PosDashboardPage() {
  const [kpiData, setKpiData] = useState<KPIData | null>(null);

  useEffect(() => {
    const loadKPI = async () => {
      try {
        const data = await reportService.getKPIData();
        setKpiData(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    loadKPI();
  }, []);

  return (
    <>
      <Breadcrumb pageName="POS Restaurant" />

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {kpiCards.map((card) => (
          <section
            key={card.label}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-gray-700 dark:bg-gray-dark"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-gray-500 dark:text-gray-400">
                  {card.label}
                </p>
                <p className="mt-4 text-3xl font-semibold text-dark dark:text-white">
                  {card.value}
                </p>
              </div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                {card.label
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
          </section>
        ))}
      </div>

      {/* Quick Links */}
      <div className="mt-8">
        <h3 className="text-lg font-semibold text-dark dark:text-white mb-4">
          Navigation rapide
        </h3>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {menuLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:border-blue-300 dark:border-gray-700 dark:bg-gray-dark dark:hover:border-blue-600"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-slate-700 dark:text-slate-100">
                  {link.label
                    .split(" ")
                    .map((word) => word[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <p className="font-medium text-dark dark:text-white">
                  {link.label}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Features Overview */}
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
          <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
            Prise de commande
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Accédez rapidement aux catégories, aux produits, sélectionnez une table et ajoutez des articles au panier avec gestion des notes spéciales.
          </p>
          <Link
            href="/pos/order-entry"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
          >
            Aller à la prise de commande
          </Link>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
          <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
            Suivi cuisine (KDS)
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Gérez les commandes en cuisine en temps réel, suivez le statut des plats avec timers de préparation et notifiez les serveurs.
          </p>
          <Link
            href="/pos/kitchen"
            className="inline-block px-4 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600"
          >
            Aller à la cuisine
          </Link>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
          <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
            Encaissement
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Clôturez les paiements avec support multi-méthodes (espèces, carte, Orange Money, MTN MoMo, Wave, chambre).
          </p>
          <Link
            href="/pos/checkout"
            className="inline-block px-4 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600"
          >
            Aller à l'encaissement
          </Link>
        </section>

        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-dark">
          <h3 className="text-lg font-semibold text-dark dark:text-white mb-3">
            Rapports
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Consultez les statistiques de ventes, analysez les top produits et serveurs, exportez en PDF/Excel.
          </p>
          <Link
            href="/pos/reports"
            className="inline-block px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600"
          >
            Voir les rapports
          </Link>
        </section>
      </div>
    </>
  );
}

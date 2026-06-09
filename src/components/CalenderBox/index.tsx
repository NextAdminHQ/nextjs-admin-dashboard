"use client";

import { cn } from "@/lib/utils";
import { PAIEMENT_LABEL, RESERVATIONS_MOCKUP, type Reservation, type StatutReservation } from "@/data/mockup";
import { useState } from "react";

const JOURS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
const MOIS  = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const STATUT_STYLE: Record<StatutReservation, string> = {
  confirmee: "border-green-500  bg-green-50  text-green-700  dark:bg-green-900/30  dark:text-green-400",
  attente:   "border-yellow-500 bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  annulee:   "border-red-500    bg-red-50    text-red-700    dark:bg-red-900/30    dark:text-red-400",
  checkin:   "border-blue-500   bg-blue-50   text-blue-700   dark:bg-blue-900/30   dark:text-blue-400",
  checkout:  "border-gray-500   bg-gray-50   text-gray-600   dark:bg-gray-800      dark:text-gray-400",
};

const STATUT_LABEL: Record<StatutReservation, string> = {
  confirmee: "Confirmée",
  attente:   "En attente",
  annulee:   "Annulée",
  checkin:   "Check-in",
  checkout:  "Check-out",
};

function toYMD(d: Date) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getReservationsForDay(day: Date): Reservation[] {
  const d = toYMD(day);
  return RESERVATIONS_MOCKUP.filter((r) => r.debut <= d && r.fin >= d);
}

const CalendarBox = () => {
  const today = new Date();
  const [current, setCurrent]   = useState(new Date(2025, 6, 1)); // Juillet 2025 — données mockup
  const [selected, setSelected] = useState<Reservation | null>(null);

  const year  = current.getFullYear();
  const month = current.getMonth();

  const firstDay    = new Date(year, month, 1);
  const startOffset = (firstDay.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev  = new Date(year, month, 0).getDate();

  const cells: { date: Date; current: boolean }[] = [];
  for (let i = startOffset - 1; i >= 0; i--)
    cells.push({ date: new Date(year, month - 1, daysInPrev - i), current: false });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ date: new Date(year, month, d), current: true });
  let nextDay = 1;
  while (cells.length < 42)
    cells.push({ date: new Date(year, month + 1, nextDay++), current: false });

  return (
    <div className="w-full rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">

      {/* Header navigation */}
      <div className="flex items-center justify-between rounded-t-[10px] bg-primary px-6 py-4 text-white">
        <button
          onClick={() => setCurrent(new Date(year, month - 1, 1))}
          className="flex size-8 items-center justify-center rounded-full transition hover:bg-white/20"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-lg font-semibold">{MOIS[month]} {year}</h2>
        <button
          onClick={() => setCurrent(new Date(year, month + 1, 1))}
          className="flex size-8 items-center justify-center rounded-full transition hover:bg-white/20"
        >
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1 1L7 7L1 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Légende statuts */}
      <div className="flex flex-wrap gap-4 border-b border-stroke px-6 py-3 text-sm dark:border-dark-3">
        {(Object.keys(STATUT_LABEL) as StatutReservation[]).map((s) => (
          <span key={s} className="flex items-center gap-1.5">
            <span className={cn("inline-block size-2.5 rounded-full border", STATUT_STYLE[s].split(" ").slice(0, 1).join(" "))} />
            <span className="text-dark-4 dark:text-dark-6">{STATUT_LABEL[s]}</span>
          </span>
        ))}
      </div>

      {/* En-têtes jours */}
      <div className="grid grid-cols-7 border-b border-stroke dark:border-dark-3">
        {JOURS.map((j) => (
          <div key={j} className="py-2 text-center text-xs font-semibold uppercase tracking-wide text-dark-4 dark:text-dark-6">
            {j}
          </div>
        ))}
      </div>

      {/* Grille jours */}
      <div className="grid grid-cols-7">
        {cells.map(({ date, current: isCurrent }, i) => {
          const isToday  = toYMD(date) === toYMD(today);
          const reservs  = getReservationsForDay(date);
          const isLast   = i >= 35;
          const col      = i % 7;

          return (
            <div
              key={i}
              className={cn(
                "relative min-h-20 border border-stroke p-1.5 dark:border-dark-3 md:min-h-25 md:p-2",
                !isCurrent && "bg-gray-1 dark:bg-dark-2",
                isLast && col === 0 && "rounded-bl-[10px]",
                isLast && col === 6 && "rounded-br-[10px]",
              )}
            >
              <span className={cn(
                "mb-1 flex size-6 items-center justify-center rounded-full text-xs font-medium",
                isToday
                  ? "bg-primary text-white"
                  : isCurrent
                  ? "text-dark dark:text-white"
                  : "text-dark-4 dark:text-dark-6",
              )}>
                {date.getDate()}
              </span>

              <div className="space-y-0.5">
                {reservs.slice(0, 2).map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelected(r)}
                    className={cn(
                      "w-full truncate rounded border-l-2 px-1 py-0.5 text-left text-[10px] font-medium transition hover:opacity-75",
                      STATUT_STYLE[r.statut],
                    )}
                  >
                    {r.client}
                  </button>
                ))}
                {reservs.length > 2 && (
                  <span className="text-[10px] text-dark-4 dark:text-dark-6">
                    +{reservs.length - 2} autres
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal détail */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl dark:bg-gray-dark"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold text-dark dark:text-white">Détail réservation</h3>
              <button onClick={() => setSelected(null)} className="text-dark-4 hover:text-dark dark:hover:text-white">✕</button>
            </div>

            <div className="space-y-2.5 text-sm">
              <Row label="Client"        value={selected.client}                    />
              <Row label="Téléphone"     value={selected.telephone}                 />
              <Row label="Établissement" value={selected.etablissement}             />
              <Row label="Chambre"       value={`${selected.chambre} — ${selected.type}`} />
              <Row label="Arrivée"       value={selected.debut}                     />
              <Row label="Départ"        value={selected.fin}                       />
              <Row label="Montant"       value={`${selected.montant.toLocaleString("fr-FR")} ${selected.devise}`} />
              <Row label="Paiement"      value={PAIEMENT_LABEL[selected.paiement]}  />
              <div className="flex items-center justify-between">
                <span className="text-dark-4 dark:text-dark-6">Statut</span>
                <span className={cn("rounded border-l-2 px-2 py-0.5 text-xs font-medium", STATUT_STYLE[selected.statut])}>
                  {STATUT_LABEL[selected.statut]}
                </span>
              </div>
              {selected.notes && (
                <div className="rounded-lg bg-gray-1 p-2.5 text-xs text-dark-4 dark:bg-dark-2 dark:text-dark-6">
                  📝 {selected.notes}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="shrink-0 text-dark-4 dark:text-dark-6">{label}</span>
      <span className="text-right font-medium text-dark dark:text-white">{value}</span>
    </div>
  );
}

export default CalendarBox;

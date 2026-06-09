import Link from "next/link";
import { getArriveesDepartsData } from "../fetch";

const STATUT_STYLE: Record<string, string> = {
  "Prêt": "bg-green-light-7 text-green",
  "En attente": "bg-yellow-light-4 text-yellow-dark-2",
  "Arrivé": "bg-blue-light-5 text-blue",
};

export async function ArriveesDeparts() {
  const { arrivees, departs } = await getArriveesDepartsData();

  return (
    <div className="col-span-12 grid gap-4 md:grid-cols-2 xl:col-span-8">
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between border-b border-stroke px-5 py-4 dark:border-dark-3">
          <h2 className="font-bold text-dark dark:text-white">
            Arrivées du jour
            <span className="ml-2 rounded-full bg-green-light-7 px-2 py-0.5 text-xs font-medium text-green">{arrivees.length}</span>
          </h2>
          <Link href="/check-in" className="text-xs font-medium text-primary hover:underline">Voir tout</Link>
        </div>
        <ul className="divide-y divide-stroke dark:divide-dark-3">
          {arrivees.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-dark dark:text-white">{item.client}</p>
                <p className="text-xs text-gray-500 dark:text-dark-6">{item.logement}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-400">{item.heure}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUT_STYLE[item.statut] ?? ""}`}>{item.statut}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between border-b border-stroke px-5 py-4 dark:border-dark-3">
          <h2 className="font-bold text-dark dark:text-white">
            Départs du jour
            <span className="ml-2 rounded-full bg-blue-light-5 px-2 py-0.5 text-xs font-medium text-blue">{departs.length}</span>
          </h2>
          <Link href="/check-out" className="text-xs font-medium text-primary hover:underline">Voir tout</Link>
        </div>
        <ul className="divide-y divide-stroke dark:divide-dark-3">
          {departs.map((item) => (
            <li key={item.id} className="flex items-center justify-between px-5 py-3">
              <div>
                <p className="text-sm font-medium text-dark dark:text-white">{item.client}</p>
                <p className="text-xs text-gray-500 dark:text-dark-6">{item.logement}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-xs text-gray-400">{item.heure}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${item.paye ? "bg-green-light-7 text-green" : "bg-red-light-5 text-red"}`}>
                  {item.paye ? "Payé" : "Non payé"}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

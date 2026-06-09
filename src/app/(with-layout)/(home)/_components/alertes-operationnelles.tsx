import { getAlertesData } from "../fetch";

const PRIORITE_STYLE: Record<string, string> = {
  haute: "border-l-red bg-red-light-6 dark:bg-red-light-6/10",
  moyenne: "border-l-yellow-dark bg-yellow-light-4 dark:bg-yellow-light-4/10",
};

const PRIORITE_BADGE: Record<string, string> = {
  haute: "bg-red-light-5 text-red",
  moyenne: "bg-yellow-light-4 text-yellow-dark-2",
};

function IconMaintenance() {
  return (
    <svg className="shrink-0" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

function IconStock() {
  return (
    <svg className="shrink-0" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    </svg>
  );
}

function IconPaiement() {
  return (
    <svg className="shrink-0" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x={1} y={4} width={22} height={16} rx={2} ry={2} />
      <line x1={1} y1={10} x2={23} y2={10} />
    </svg>
  );
}

function IconHousekeeping() {
  return (
    <svg className="shrink-0" width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

const TYPE_ICON: Record<string, React.ReactNode> = {
  maintenance: <IconMaintenance />,
  stock: <IconStock />,
  paiement: <IconPaiement />,
  housekeeping: <IconHousekeeping />,
};

export async function AlertesOperationnelles() {
  const alertes = await getAlertesData();

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h2 className="mb-5 text-body-2xlg font-bold text-dark dark:text-white">
        Alertes opérationnelles
      </h2>
      <ul className="space-y-3">
        {alertes.map((alerte, i) => (
          <li key={i} className={`rounded-lg border-l-4 p-3.5 ${PRIORITE_STYLE[alerte.priorite] ?? ""}`}>
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-start gap-2 text-dark dark:text-white">
                {TYPE_ICON[alerte.type]}
                <p className="text-sm font-medium">{alerte.message}</p>
              </div>
              <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${PRIORITE_BADGE[alerte.priorite] ?? ""}`}>
                {alerte.priorite}
              </span>
            </div>
            <p className="mt-1.5 pl-6 text-xs text-gray-400 dark:text-dark-6">{alerte.heure}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

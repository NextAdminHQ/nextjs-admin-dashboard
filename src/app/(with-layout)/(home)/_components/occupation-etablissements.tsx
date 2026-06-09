import { getOccupationData } from "../fetch";

export async function OccupationEtablissements() {
  const data = await getOccupationData();

  return (
    <div className="col-span-12 rounded-[10px] bg-white p-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-8">
      <h2 className="mb-5 text-body-2xlg font-bold text-dark dark:text-white">
        Occupation par établissement
      </h2>
      <ul className="space-y-4">
        {data.map((item) => {
          const taux = Math.round((item.occupes / item.total) * 100);
          const color = taux >= 80 ? "bg-green" : taux >= 50 ? "bg-primary" : "bg-orange-light";
          const textColor = taux >= 80 ? "text-green" : taux >= 50 ? "text-primary" : "text-orange-light";

          return (
            <li key={item.etablissement}>
              <div className="mb-1.5 flex items-center justify-between text-sm">
                <span className="font-medium text-dark dark:text-white">
                  {item.etablissement}
                  <span className="ml-2 text-xs text-gray-500 dark:text-dark-6">{item.type}</span>
                </span>
                <span className="font-semibold text-dark dark:text-white">
                  {item.occupes}/{item.total}&nbsp;
                  <span className={`text-xs font-medium ${textColor}`}>{taux}%</span>
                </span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-gray-2 dark:bg-dark-2">
                <div className={`h-full rounded-full transition-all duration-500 ${color}`} style={{ width: `${taux}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

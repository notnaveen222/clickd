import { getAuditLogs } from "@/lib/audit-log";

export const revalidate = 0;

function actionClasses(action: string) {
  const base =
    "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold";
  if (action.includes("failed")) {
    return `${base} bg-red-100 text-red-700 ring-1 ring-red-200`;
  }
  if (action.startsWith("admin.")) {
    return `${base} bg-blue-100 text-blue-700 ring-1 ring-blue-200`;
  }
  if (action.startsWith("price.")) {
    return `${base} bg-purple-100 text-purple-700 ring-1 ring-purple-200`;
  }
  return `${base} bg-green-100 text-green-700 ring-1 ring-green-200`;
}

export default async function LogsPage() {
  const logs = await getAuditLogs(200);

  return (
    <div className="p-5">
      <div className="mb-1 text-3xl font-semibold">Logs</div>
      <div className="mb-5 text-sm font-medium text-gray-600">
        Most recent {logs.length} events.
      </div>

      {logs.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-sm text-gray-600">
          No activity logged yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b bg-gray-50 text-xs font-medium uppercase text-gray-500">
              <tr>
                <th className="px-4 py-3">Time</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Actor</th>
                <th className="px-4 py-3">Target</th>
                <th className="px-4 py-3">Details</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-b last:border-0">
                  <td className="whitespace-nowrap px-4 py-3 text-xs text-gray-500">
                    {new Date(log.created_at).toLocaleString()}
                  </td>
                  <td className="px-4 py-3">
                    <span className={actionClasses(log.action)}>
                      {log.action}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {log.actor ?? "—"}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {log.target ?? "—"}
                  </td>
                  <td className="max-w-[320px] truncate px-4 py-3 font-mono text-xs text-gray-500">
                    {log.metadata ? JSON.stringify(log.metadata) : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

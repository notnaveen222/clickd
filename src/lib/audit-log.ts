import { supabaseAdmin } from "./supabaseAdmin";

export type AuditAction =
  | "order.created"
  | "order.paid"
  | "order.payment_failed"
  | "order.shipped"
  | "admin.login_success"
  | "admin.login_failed"
  | "price.updated";

export type AuditLogRow = {
  id: string;
  created_at: string;
  action: string;
  actor: string | null;
  target: string | null;
  metadata: Record<string, unknown> | null;
};

export async function logAudit({
  action,
  actor,
  target,
  metadata,
}: {
  action: AuditAction;
  actor?: string | null;
  target?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const { error } = await supabaseAdmin.from("audit_logs").insert({
    action,
    actor: actor ?? null,
    target: target ?? null,
    metadata: metadata ?? null,
  });
  if (error) {
    console.error("Failed to write audit log:", error);
  }
}

export async function getAuditLogs(limit = 200): Promise<AuditLogRow[]> {
  const { data, error } = await supabaseAdmin
    .from("audit_logs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) {
    console.error("Failed to fetch audit logs:", error);
    return [];
  }
  return data ?? [];
}

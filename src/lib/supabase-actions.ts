import { supabase } from "./supabase";
import { BUCKET, supabaseAdmin } from "./supabaseAdmin";

export async function generateClientOrderId() {
  let unique = false;
  let id = "";
  while (!unique) {
    id = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit
    const { data } = await supabase
      .from("orders")
      .select("id")
      .eq("client_order_id", id)
      .limit(1);

    if (!data || data.length === 0) {
      unique = true;
    }
  }
  return id;
}

export async function confirmUploadedPhotos({
  sessionId,
  clientOrderId,
}: {
  sessionId: string;
  clientOrderId: string;
}) {
  try {
    // 1. List all files in temp/{sessionId}/ folder
    const { data: tempFiles, error: listError } = await supabaseAdmin.storage
      .from(BUCKET)
      .list(`temp/${sessionId}`);

    if (listError) {
      console.error("Error listing temp files:", listError);
      return { success: false, error: listError.message };
    }

    if (!tempFiles || tempFiles.length === 0) {
      console.log("No temp files found for session:", sessionId);
      return { success: true, message: "No files to move" };
    }

    const movedFiles: string[] = [];
    const errors: string[] = [];

    // 2. Move each file from temp to orders/{clientOrderId}/
    for (const file of tempFiles) {
      try {
        const sourcePath = `temp/${sessionId}/${file.name}`;
        const targetPath = `orders/${clientOrderId}/${file.name}`;
        const { error: moveError } = await supabaseAdmin.storage
          .from(BUCKET)
          .move(sourcePath, targetPath);
        if (moveError) {
          console.error(`Error Moving ${file.name}: `, moveError);
          errors.push(`Failed to copy ${file.name}: ${moveError.message}`);
          continue;
        }
        movedFiles.push(targetPath);
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        errors.push(`Failed to process ${file.name}`);
      }
    }

    // // 4. Clean up empty temp folder
    // try {
    //   await supabaseAdmin.storage.from(BUCKET).remove([`temp/${sessionId}`]);
    // } catch (cleanupError) {
    //   console.error("Error cleaning up temp folder:", cleanupError);
    // }

    return {
      success: true,
      movedFiles,
      errors,
      message: `Successfully moved ${movedFiles.length} files to order ${clientOrderId}`,
    };
  } catch (error) {
    console.error("Error in moveFilesFromTempToOrder:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

const COLUMNS =
  "id,client_order_id, name, email, address, city, state, zipcode, phone, status, total_inr, created_at";

export async function getUnshippedOrders() {
  const { data, error, count } = await supabaseAdmin
    .from("orders")
    .select(COLUMNS, { count: "exact" })
    .is("shipped", false) // or .eq("undelivered", true)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return { orders: data ?? [], total: count ?? 0 };
}

export async function markOrderShipped(id: string) {
  const { error } = await supabaseAdmin
    .from("orders")
    .update({ shipped: true })
    .eq("client_order_id", id);
  if (error) {
    return { ok: false as const };
  }
  return { ok: true as const };
}

export async function getLayoutPrice(id: string): Promise<number> {
  const { data, error } = await supabase
    .from("prices")
    .select("layoutPrice")
    .eq("layoutId", id)
    .single();
  if (error) {
    throw error;
  }
  return data.layoutPrice as number;
}

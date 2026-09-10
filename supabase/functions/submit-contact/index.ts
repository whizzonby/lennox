import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.208.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

async function hashIP(ip: string): Promise<string> {
  const data = new TextEncoder().encode(ip + Deno.env.get("SUPABASE_SERVICE_ROLE_KEY"));
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const { name, email, message } = await req.json();

    // Server-side validation
    if (!name || typeof name !== "string" || name.trim().length < 1 || name.trim().length > 100) {
      return new Response(JSON.stringify({ error: "Name must be between 1 and 100 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!email || typeof email !== "string" || email.trim().length > 254) {
      return new Response(JSON.stringify({ error: "Invalid email" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return new Response(JSON.stringify({ error: "Invalid email format" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!message || typeof message !== "string" || message.trim().length < 10 || message.trim().length > 5000) {
      return new Response(JSON.stringify({ error: "Message must be between 10 and 5000 characters" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Rate limiting: max 3 submissions per hour per IP
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const ipHash = await hashIP(ip);
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { count } = await supabase
      .from("submission_rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_hash", ipHash)
      .eq("table_name", "contact_submissions")
      .gte("created_at", oneHourAgo);

    if (count !== null && count >= 3) {
      return new Response(JSON.stringify({ error: "Too many submissions. Please try again later." }), {
        status: 429,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Record rate limit entry
    await supabase.from("submission_rate_limits").insert({
      ip_hash: ipHash,
      table_name: "contact_submissions",
    });

    // Insert the submission
    const { error } = await supabase.from("contact_submissions").insert({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    if (error) {
      return new Response(JSON.stringify({ error: "Failed to submit. Please try again." }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

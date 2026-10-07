const PASSWORD = "2005515";

export default async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "content-type": "application/json;charset=UTF-8" }
    });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const ok = String(body.password || "") === PASSWORD;
    return new Response(JSON.stringify(ok ? { ok: true } : { ok: false, error: "Unauthorized" }), {
      status: ok ? 200 : 401,
      headers: { "content-type": "application/json;charset=UTF-8", "cache-control": "no-store" }
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Invalid request" }), {
      status: 400,
      headers: { "content-type": "application/json;charset=UTF-8", "cache-control": "no-store" }
    });
  }
};

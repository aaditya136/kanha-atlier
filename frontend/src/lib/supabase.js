// Supabase connection for the Reviews section.
// The "publishable" key is PUBLIC by design (safe to keep in website code):
// the database rules (row level security) decide what visitors may do.
// NEVER put a "secret" / "service_role" key in this file.
export const SUPABASE_URL = "https://vzlcktfppmwqoyqqlbnz.supabase.co";
export const SUPABASE_KEY = "sb_publishable_Fh4k_T1Ckwoqc7PEWuV_Ng_wpVg5Gs8";

const headers = () => {
  const h = { apikey: SUPABASE_KEY, "Content-Type": "application/json" };
  // old-style (JWT) anon keys also go in Authorization; new publishable keys must not
  if (SUPABASE_KEY.startsWith("eyJ")) h.Authorization = `Bearer ${SUPABASE_KEY}`;
  return h;
};

export async function fetchReviews() {
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/reviews?select=id,created_at,name,city,rating,product,body&hidden=eq.false&order=created_at.desc&limit=60`,
    { headers: headers() }
  );
  if (!res.ok) throw new Error("load failed");
  return res.json();
}

export async function addReview(review) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/reviews`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify(review),
  });
  if (!res.ok) throw new Error("save failed");
}

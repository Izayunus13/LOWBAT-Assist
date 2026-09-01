const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

const FIELDS = [
  "id",
  "template_title",
  "faculty",
  "mikat_name",
  "sport",
  "event_date",
  "event_time",
  "event_place",
  "generated_text",
  "created_by",
  "created_at"
];

function tursoValue(value) {
  if (value === null || value === undefined) {
    return { type: "null" };
  }

  if (typeof value === "number" && Number.isInteger(value)) {
    return { type: "integer", value: String(value) };
  }

  if (typeof value === "number") {
    return { type: "float", value: String(value) };
  }

  return { type: "text", value: String(value) };
}

async function tursoRequest(sql, args = []) {
  if (!TURSO_DATABASE_URL || !TURSO_AUTH_TOKEN) {
    throw new Error("TURSO_DATABASE_URL atau TURSO_AUTH_TOKEN belum diatur.");
  }

  const baseUrl = TURSO_DATABASE_URL
    .replace(/^libsql:\/\//, "https://")
    .replace(/\/+$/, "");

  const response = await fetch(`${baseUrl}/v2/pipeline`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${TURSO_AUTH_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      requests: [
        {
          type: "execute",
          stmt: {
            sql,
            args: args.map(tursoValue)
          }
        },
        { type: "close" }
      ]
    })
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(payload?.error?.message || "Turso HTTP request gagal.");
  }

  const result = payload?.results?.[0];

  if (!result || result.type === "error") {
    throw new Error(result?.error?.message || "Query Turso gagal.");
  }

  return result.response?.result || {};
}

function rowToObject(cols, row) {
  return Object.fromEntries(
    cols.map((col, index) => [col.name, row[index]?.value ?? null])
  );
}

function json(res, status, body) {
  res.status(status).setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (!["GET", "POST"].includes(req.method)) {
    res.setHeader("Allow", "GET, POST");
    return json(res, 405, { error: "Method tidak diizinkan." });
  }

  try {
    if (req.method === "GET") {
      const result = await tursoRequest(`
        SELECT
          id,
          template_title,
          faculty,
          mikat_name,
          sport,
          event_date,
          event_time,
          event_place,
          generated_text,
          created_by,
          created_at
        FROM jarkoman_history
        ORDER BY created_at DESC
        LIMIT 200
      `);

      const rows = (result.rows || []).map((row) =>
        rowToObject(result.cols || [], row)
      );

      return json(res, 200, { rows });
    }

    const body = req.body || {};

    for (const field of FIELDS) {
      if (field !== "mikat_name" && field !== "sport" &&
          field !== "event_date" && field !== "event_time" &&
          field !== "event_place" && field !== "created_by") {
        if (typeof body[field] !== "string" || !body[field].trim()) {
          return json(res, 400, { error: `Field ${field} wajib diisi.` });
        }
      }
    }

    const values = FIELDS.map((field) =>
      body[field] === undefined || body[field] === "" ? null : body[field]
    );

    await tursoRequest(
      `INSERT OR IGNORE INTO jarkoman_history
       (${FIELDS.join(", ")})
       VALUES (${FIELDS.map(() => "?").join(", ")})`,
      values
    );

    return json(res, 201, { ok: true });
  } catch (error) {
    console.error("Turso API error:", error);
    return json(res, 500, {
      error: error?.message || "Terjadi kesalahan pada database."
    });
  }
}

import { createClient } from "@supabase/supabase-js";

import { seedProjects, seedTravelPosts } from "../siteContent";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const travelBucket = import.meta.env.VITE_SUPABASE_TRAVEL_BUCKET || "travel-images";

export const hasSupabase = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = hasSupabase
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    })
  : null;

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function normalizeStringList(value) {
  if (Array.isArray(value)) {
    return value
      .map((item) => String(item).trim())
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function normalizeGallery(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((item) => item && item.url)
    .map((item, index) => ({
      slot: Number.isInteger(item.slot) ? item.slot : index,
      url: item.url,
      path: item.path || "",
      alt: item.alt || ""
    }))
    .sort((left, right) => left.slot - right.slot);
}

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function mapProject(row, index = 0) {
  return {
    id: row.id || row.slug || `project-${index}`,
    slug: row.slug || slugify(row.title || `project-${index}`),
    title: row.title || "",
    year: row.year || "",
    type: row.type || "",
    description: row.description || "",
    stack: normalizeStringList(row.stack),
    linkUrl: row.link_url || row.linkUrl || "",
    displayOrder:
      typeof row.display_order === "number"
        ? row.display_order
        : row.displayOrder || index + 1
  };
}

function mapTravelPost(row, index = 0) {
  return {
    id: row.id || row.slug || `travel-${index}`,
    slug: row.slug || slugify(row.title || `travel-${index}`),
    title: row.title || "",
    city: row.city || "",
    dateLabel: row.date_label || row.dateLabel || "",
    summary: row.summary || "",
    body: row.body || "",
    gallery: normalizeGallery(row.gallery),
    displayOrder:
      typeof row.display_order === "number"
        ? row.display_order
        : row.displayOrder || index + 1
  };
}

function getSeedContent() {
  return {
    projects: clone(seedProjects).map(mapProject),
    travelPosts: clone(seedTravelPosts).map(mapTravelPost)
  };
}

function requireSupabase() {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
    );
  }

  return supabase;
}

function normalizeProjectPayload(projectDraft) {
  const title = projectDraft.title.trim();
  const slug = slugify(projectDraft.slug || projectDraft.title);

  if (!title || !slug) {
    throw new Error("Projects need at least a title and slug.");
  }

  return {
    title,
    slug,
    year: projectDraft.year.trim(),
    type: projectDraft.type.trim(),
    description: projectDraft.description.trim(),
    stack: normalizeStringList(projectDraft.stackText),
    link_url: projectDraft.linkUrl.trim() || null,
    display_order: Number(projectDraft.displayOrder) || 0,
    updated_at: new Date().toISOString()
  };
}

function normalizeTravelPayload(travelDraft) {
  const title = travelDraft.title.trim();
  const slug = slugify(travelDraft.slug || travelDraft.title);

  if (!title || !slug) {
    throw new Error("Travel posts need at least a title and slug.");
  }

  return {
    title,
    slug,
    city: travelDraft.city.trim(),
    date_label: travelDraft.dateLabel.trim(),
    summary: travelDraft.summary.trim(),
    body: travelDraft.body.trim(),
    gallery: (travelDraft.gallery || [])
      .map((item, slot) =>
        item && item.url
          ? {
              slot,
              url: item.url,
              path: item.path || "",
              alt: item.alt?.trim() || ""
            }
          : null
      )
      .filter(Boolean),
    display_order: Number(travelDraft.displayOrder) || 0,
    updated_at: new Date().toISOString()
  };
}

export async function loadPortfolioContent() {
  if (!supabase) {
    return {
      ...getSeedContent(),
      source: "seed",
      error: null
    };
  }

  try {
    const [projectsResponse, travelResponse] = await Promise.all([
      supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),
      supabase
        .from("travel_posts")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false })
    ]);

    if (projectsResponse.error) {
      throw projectsResponse.error;
    }

    if (travelResponse.error) {
      throw travelResponse.error;
    }

    return {
      projects: (projectsResponse.data || []).map(mapProject),
      travelPosts: (travelResponse.data || []).map(mapTravelPost),
      source: "supabase",
      error: null
    };
  } catch (error) {
    return {
      ...getSeedContent(),
      source: "seed",
      error: error.message || "Supabase content could not be loaded."
    };
  }
}

export async function getAdminSession() {
  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase.auth.getSession();

  if (error) {
    throw error;
  }

  return data.session;
}

export function subscribeToAuthChanges(callback) {
  if (!supabase) {
    return () => {};
  }

  const {
    data: { subscription }
  } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session);
  });

  return () => subscription.unsubscribe();
}

export async function signInAdmin({ email, password }) {
  const client = requireSupabase();
  const { error } = await client.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }
}

export async function signOutAdmin() {
  const client = requireSupabase();
  const { error } = await client.auth.signOut();

  if (error) {
    throw error;
  }
}

export async function saveProject(projectDraft) {
  const client = requireSupabase();
  const payload = normalizeProjectPayload(projectDraft);

  const query = projectDraft.id
    ? client
        .from("projects")
        .update(payload)
        .eq("id", projectDraft.id)
    : client.from("projects").insert(payload);

  const { data, error } = await query.select().single();

  if (error) {
    throw error;
  }

  return mapProject(data);
}

export async function deleteProject(projectId) {
  const client = requireSupabase();
  const { error } = await client.from("projects").delete().eq("id", projectId);

  if (error) {
    throw error;
  }
}

export async function saveTravelPost(travelDraft) {
  const client = requireSupabase();
  const payload = normalizeTravelPayload(travelDraft);

  const query = travelDraft.id
    ? client
        .from("travel_posts")
        .update(payload)
        .eq("id", travelDraft.id)
    : client.from("travel_posts").insert(payload);

  const { data, error } = await query.select().single();

  if (error) {
    throw error;
  }

  return mapTravelPost(data);
}

export async function deleteTravelPost(travelPost) {
  const client = requireSupabase();
  const galleryPaths = normalizeGallery(travelPost.gallery)
    .map((item) => item.path)
    .filter(Boolean);

  if (galleryPaths.length) {
    const { error: storageError } = await client.storage
      .from(travelBucket)
      .remove(galleryPaths);

    if (storageError) {
      throw storageError;
    }
  }

  const { error } = await client
    .from("travel_posts")
    .delete()
    .eq("id", travelPost.id);

  if (error) {
    throw error;
  }
}

export async function uploadTravelImage(file, postSlug) {
  const client = requireSupabase();
  const extension = file.name.split(".").pop() || "png";
  const safeSlug = slugify(postSlug || file.name || "travel-post");
  const filePath = `${safeSlug}/${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await client.storage
    .from(travelBucket)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (error) {
    throw error;
  }

  const { data } = client.storage.from(travelBucket).getPublicUrl(filePath);

  return {
    url: data.publicUrl,
    path: filePath
  };
}

export async function removeTravelImage(path) {
  if (!path || !supabase) {
    return;
  }

  const { error } = await supabase.storage.from(travelBucket).remove([path]);

  if (error) {
    throw error;
  }
}

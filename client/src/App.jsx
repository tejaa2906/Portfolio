import { useCallback, useEffect, useMemo, useState } from "react";

import SparklesText from "./components/SparklesText";
import TravelBlogPage from "./features/travel/TravelBlogPage";
import TravelDetailPage from "./features/travel/TravelDetailPage";
import {
  makeEmptyTravelDraft,
  toTravelDraft
} from "./features/travel/travelDrafts";
import {
  education,
  introParagraphs,
  navItems,
  technicalSkills,
  volunteeringExperience,
  workExperience
} from "./siteContent";
import {
  hasSupabase,
  loadPortfolioContent,
  slugify
} from "./lib/portfolioApi";

function getRouteFromHash() {
  if (typeof window === "undefined") {
    return "/";
  }

  const hash = window.location.hash.replace(/^#/, "");

  if (!hash || hash === "/" || hash === "/admin") {
    return "/";
  }

  return hash.startsWith("/") ? hash : `/${hash}`;
}

function getTravelSlugFromRoute(route) {
  if (!route.startsWith("/travel-blog/")) {
    return "";
  }

  return decodeURIComponent(route.slice("/travel-blog/".length));
}

function isActiveRoute(route, href) {
  if (href === "/travel-blog") {
    return route === href || route.startsWith("/travel-blog/");
  }

  return route === href;
}

function makeEmptyProjectDraft() {
  return {
    id: "",
    title: "",
    slug: "",
    year: "",
    type: "",
    description: "",
    stackText: "",
    linkUrl: "",
    displayOrder: 0
  };
}

function toProjectDraft(project) {
  if (!project) {
    return makeEmptyProjectDraft();
  }

  return {
    id: project.id || "",
    title: project.title || "",
    slug: project.slug || "",
    year: project.year || "",
    type: project.type || "",
    description: project.description || "",
    stackText: Array.isArray(project.stack) ? project.stack.join(", ") : "",
    linkUrl: project.linkUrl || "",
    displayOrder: project.displayOrder || 0
  };
}

function StatusBanner({ tone = "neutral", children }) {
  return <div className={`status-banner status-banner-${tone}`}>{children}</div>;
}

function LoadingPage({ message = "Loading content..." }) {
  return (
    <main className="page-view">
      <section className="content-card">
        <p className="page-note">{message}</p>
      </section>
    </main>
  );
}

function ExperiencePage() {
  return (
    <main className="page-view">
      <section className="content-card">
        <div className="section-heading">
          <p className="section-kicker">Profile</p>
          <h2>About</h2>
        </div>
        <div className="experience-grid">
          <section className="experience-panel">
            <h3>Education</h3>
            <div className="timeline-list">
              {education.map((item) => (
                <article key={`${item.degree}-${item.institution}`} className="timeline-card">
                  <div className="timeline-head">
                    <div>
                      <h4>{item.degree}</h4>
                      <p className="timeline-org">{item.institution}</p>
                    </div>
                    <div className="timeline-meta">
                      <span>{item.location}</span>
                      <span>{item.period}</span>
                    </div>
                  </div>
                  <ul className="detail-list">
                    {item.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="experience-panel">
            <h3>Technical Skills</h3>
            <div className="skills-groups">
              {technicalSkills.map((group) => (
                <article key={group.label} className="skills-group">
                  <h4>{group.label}</h4>
                  <ul className="pill-list">
                    {group.items.map((item) => (
                      <li key={`${group.label}-${item}`}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        </div>

        <section className="experience-section">
          <h3>Work Experience</h3>
          <div className="timeline-list">
            {workExperience.map((item) => (
              <article key={`${item.role}-${item.organization}`} className="timeline-card">
                <div className="timeline-head">
                  <div>
                    <h4>{item.role}</h4>
                    <p className="timeline-org">{item.organization}</p>
                  </div>
                  <div className="timeline-meta">
                    <span>{item.location}</span>
                    <span>{item.period}</span>
                  </div>
                </div>
                <ul className="detail-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="experience-section">
          <h3>Volunteering Experience</h3>
          <div className="timeline-list">
            {volunteeringExperience.map((item) => (
              <article key={`${item.role}-${item.organization}`} className="timeline-card">
                <div className="timeline-head">
                  <div>
                    <h4>{item.role}</h4>
                    <p className="timeline-org">{item.organization}</p>
                  </div>
                  <div className="timeline-meta">
                    <span>{item.location}</span>
                    <span>{item.period}</span>
                  </div>
                </div>
                <ul className="detail-list">
                  {item.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function ProjectsPage({ projects }) {
  return (
    <main className="page-view">
      <section className="content-card">
        <div className="section-heading">
          <p className="section-kicker">Selected Work</p>
          <h2>Projects</h2>
        </div>
        {projects.length ? (
          <div className="card-grid">
            {projects.map((project) => (
              <article key={project.id} className="info-card">
                {(project.year || project.type) && (
                  <div className="meta-row">
                    {project.year ? <span>{project.year}</span> : null}
                    {project.type ? <span>{project.type}</span> : null}
                  </div>
                )}
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                {project.stack.length ? (
                  <ul className="tag-list">
                    {project.stack.map((item) => (
                      <li key={`${project.id}-${item}`}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {project.linkUrl ? (
                  <a
                    className="inline-link"
                    href={project.linkUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View project
                  </a>
                ) : null}
              </article>
            ))}
          </div>
        ) : (
          <p className="page-note">Projects will appear here once you add them.</p>
        )}
      </section>
    </main>
  );
}

function AdminPage({
  authReady,
  contentError,
  contentSource,
  onDeleteProject,
  onDeleteTravelPost,
  onRemoveTravelImage,
  onSaveProject,
  onSaveTravelPost,
  onSignIn,
  onSignOut,
  onUploadTravelImage,
  projects,
  session,
  travelPosts
}) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [projectDraft, setProjectDraft] = useState(makeEmptyProjectDraft);
  const [travelDraft, setTravelDraft] = useState(makeEmptyTravelDraft);
  const [busyAction, setBusyAction] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const signedInEmail = session?.user?.email || "";

  const clearMessages = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleCredentialChange = (field, value) => {
    setCredentials((current) => ({
      ...current,
      [field]: value
    }));
  };

  const handleProjectFieldChange = (field, value) => {
    setProjectDraft((current) => ({
      ...current,
      [field]: value,
      slug:
        field === "title" && !current.id && !current.slug
          ? slugify(value)
          : field === "slug"
            ? slugify(value)
            : current.slug
    }));
  };

  const handleTravelFieldChange = (field, value) => {
    setTravelDraft((current) => ({
      ...current,
      [field]: value,
      slug:
        field === "title" && !current.id && !current.slug
          ? slugify(value)
          : field === "slug"
            ? slugify(value)
            : current.slug
    }));
  };

  const handleSignInSubmit = async (event) => {
    event.preventDefault();
    clearMessages();
    setBusyAction("Signing in...");

    try {
      await onSignIn(credentials);
      setCredentials({ email: "", password: "" });
      setSuccessMessage("Signed in. You can edit projects and travel posts now.");
    } catch (error) {
      setErrorMessage(error.message || "Sign-in failed.");
    } finally {
      setBusyAction("");
    }
  };

  const handleProjectSubmit = async (event) => {
    event.preventDefault();
    clearMessages();
    setBusyAction(projectDraft.id ? "Saving project..." : "Creating project...");

    try {
      const savedProject = await onSaveProject(projectDraft);
      setProjectDraft(toProjectDraft(savedProject));
      setSuccessMessage(projectDraft.id ? "Project updated." : "Project created.");
    } catch (error) {
      setErrorMessage(error.message || "Project could not be saved.");
    } finally {
      setBusyAction("");
    }
  };

  const handleTravelSubmit = async (event) => {
    event.preventDefault();
    clearMessages();
    setBusyAction(travelDraft.id ? "Saving story..." : "Creating story...");

    try {
      const savedPost = await onSaveTravelPost(travelDraft);
      setTravelDraft(toTravelDraft(savedPost));
      setSuccessMessage(travelDraft.id ? "Travel story updated." : "Travel story created.");
    } catch (error) {
      setErrorMessage(error.message || "Travel story could not be saved.");
    } finally {
      setBusyAction("");
    }
  };

  const handleDeleteProjectClick = async (project) => {
    const shouldDelete = window.confirm(`Delete "${project.title}"?`);

    if (!shouldDelete) {
      return;
    }

    clearMessages();
    setBusyAction("Deleting project...");

    try {
      await onDeleteProject(project.id);

      if (projectDraft.id === project.id) {
        setProjectDraft(makeEmptyProjectDraft());
      }

      setSuccessMessage("Project deleted.");
    } catch (error) {
      setErrorMessage(error.message || "Project could not be deleted.");
    } finally {
      setBusyAction("");
    }
  };

  const handleDeleteTravelClick = async (post) => {
    const shouldDelete = window.confirm(`Delete "${post.title}"?`);

    if (!shouldDelete) {
      return;
    }

    clearMessages();
    setBusyAction("Deleting travel story...");

    try {
      await onDeleteTravelPost(post);

      if (travelDraft.id === post.id) {
        setTravelDraft(makeEmptyTravelDraft());
      }

      setSuccessMessage("Travel story deleted.");
    } catch (error) {
      setErrorMessage(error.message || "Travel story could not be deleted.");
    } finally {
      setBusyAction("");
    }
  };

  const handleTravelImageChange = async (slot, event) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) {
      return;
    }

    clearMessages();
    setBusyAction(`Uploading image ${slot + 1}...`);

    try {
      const previousImage = travelDraft.gallery[slot];
      const uploadedImage = await onUploadTravelImage(
        file,
        travelDraft.slug || travelDraft.title || `travel-${slot + 1}`
      );

      if (previousImage?.path) {
        await onRemoveTravelImage(previousImage.path);
      }

      setTravelDraft((current) => {
        const nextGallery = [...current.gallery];
        nextGallery[slot] = {
          ...uploadedImage,
          alt: previousImage?.alt || `${current.title || current.city || "Travel"} photo ${slot + 1}`
        };

        return {
          ...current,
          gallery: nextGallery
        };
      });

      setSuccessMessage(`Image ${slot + 1} uploaded.`);
    } catch (error) {
      setErrorMessage(error.message || "Image upload failed.");
    } finally {
      setBusyAction("");
    }
  };

  const handleTravelImageAltChange = (slot, value) => {
    setTravelDraft((current) => {
      const nextGallery = [...current.gallery];
      const currentSlot = nextGallery[slot];

      if (!currentSlot) {
        return current;
      }

      nextGallery[slot] = {
        ...currentSlot,
        alt: value
      };

      return {
        ...current,
        gallery: nextGallery
      };
    });
  };

  const handleTravelImageRemove = async (slot) => {
    const currentImage = travelDraft.gallery[slot];

    if (!currentImage) {
      return;
    }

    clearMessages();
    setBusyAction(`Removing image ${slot + 1}...`);

    try {
      if (currentImage.path) {
        await onRemoveTravelImage(currentImage.path);
      }

      setTravelDraft((current) => {
        const nextGallery = [...current.gallery];
        nextGallery[slot] = null;

        return {
          ...current,
          gallery: nextGallery
        };
      });

      setSuccessMessage(`Image ${slot + 1} removed.`);
    } catch (error) {
      setErrorMessage(error.message || "Image could not be removed.");
    } finally {
      setBusyAction("");
    }
  };

  if (!hasSupabase) {
    return (
      <main className="page-view">
        <section className="content-card admin-setup-card">
          <div className="section-heading">
            <p className="section-kicker">Admin</p>
            <h2>Supabase setup required</h2>
          </div>
          <p className="page-note">
            The admin login and editor are wired for Supabase Auth, Database, and
            Storage. Add your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`,
            run the SQL in `supabase/schema.sql`, and then create your admin user in
            Supabase Authentication.
          </p>
          <ul className="setup-list">
            <li>Set the frontend env vars from `client/.env.example`.</li>
            <li>Create one admin user with email and password in Supabase Auth.</li>
            <li>Run the SQL schema and policies before signing in here.</li>
          </ul>
        </section>
      </main>
    );
  }

  if (!authReady) {
    return <LoadingPage message="Checking admin session..." />;
  }

  if (!session) {
    return (
      <main className="page-view">
        <section className="content-card login-card">
          <div className="section-heading">
            <p className="section-kicker">Admin</p>
            <h2>Sign in</h2>
          </div>
          {contentSource === "seed" && contentError ? (
            <StatusBanner tone="warning">
              Supabase credentials are present, but the app could not load live data:
              {` ${contentError}`}
            </StatusBanner>
          ) : null}
          {errorMessage ? <StatusBanner tone="error">{errorMessage}</StatusBanner> : null}
          {successMessage ? (
            <StatusBanner tone="success">{successMessage}</StatusBanner>
          ) : null}
          <form className="admin-form" onSubmit={handleSignInSubmit}>
            <label className="field">
              <span>Email</span>
              <input
                autoComplete="email"
                type="email"
                value={credentials.email}
                onChange={(event) =>
                  handleCredentialChange("email", event.target.value)
                }
                required
              />
            </label>
            <label className="field">
              <span>Password</span>
              <input
                autoComplete="current-password"
                type="password"
                value={credentials.password}
                onChange={(event) =>
                  handleCredentialChange("password", event.target.value)
                }
                required
              />
            </label>
            <div className="action-row">
              <button className="primary-button" type="submit" disabled={Boolean(busyAction)}>
                {busyAction || "Sign in"}
              </button>
            </div>
          </form>
        </section>
      </main>
    );
  }

  return (
    <main className="page-view admin-page">
      <section className="content-card">
        <div className="admin-header">
          <div className="section-heading">
            <p className="section-kicker">Admin</p>
            <h2>Content Manager</h2>
          </div>
          <div className="admin-header-actions">
            <span className="source-pill">
              {contentSource === "supabase" ? "Live Supabase content" : "Seed fallback"}
            </span>
            <span className="signed-in-email">{signedInEmail}</span>
            <button className="secondary-button" type="button" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        </div>

        {contentError ? <StatusBanner tone="warning">{contentError}</StatusBanner> : null}
        {errorMessage ? <StatusBanner tone="error">{errorMessage}</StatusBanner> : null}
        {successMessage ? <StatusBanner tone="success">{successMessage}</StatusBanner> : null}

        <div className="admin-grid">
          <section className="admin-section">
            <div className="admin-section-header">
              <h3>Projects</h3>
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  clearMessages();
                  setProjectDraft(makeEmptyProjectDraft());
                }}
              >
                New project
              </button>
            </div>
            <div className="admin-list">
              {projects.length ? (
                projects.map((project) => (
                  <article key={project.id} className="admin-list-item">
                    <div>
                      <p className="admin-list-heading">{project.title}</p>
                      <p className="admin-list-meta">
                        {project.year || "No year"} · {project.type || "Project"}
                      </p>
                    </div>
                    <div className="list-actions">
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={() => {
                          clearMessages();
                          setProjectDraft(toProjectDraft(project));
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="danger-button"
                        type="button"
                        onClick={() => handleDeleteProjectClick(project)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="page-note">No projects yet.</p>
              )}
            </div>
            <form className="admin-form" onSubmit={handleProjectSubmit}>
              <div className="field-row">
                <label className="field">
                  <span>Title</span>
                  <input
                    type="text"
                    value={projectDraft.title}
                    onChange={(event) =>
                      handleProjectFieldChange("title", event.target.value)
                    }
                    required
                  />
                </label>
                <label className="field">
                  <span>Slug</span>
                  <input
                    type="text"
                    value={projectDraft.slug}
                    onChange={(event) =>
                      handleProjectFieldChange("slug", event.target.value)
                    }
                    required
                  />
                </label>
              </div>
              <div className="field-row">
                <label className="field">
                  <span>Year</span>
                  <input
                    type="text"
                    value={projectDraft.year}
                    onChange={(event) =>
                      handleProjectFieldChange("year", event.target.value)
                    }
                  />
                </label>
                <label className="field">
                  <span>Type</span>
                  <input
                    type="text"
                    value={projectDraft.type}
                    onChange={(event) =>
                      handleProjectFieldChange("type", event.target.value)
                    }
                  />
                </label>
                <label className="field">
                  <span>Display order</span>
                  <input
                    type="number"
                    value={projectDraft.displayOrder}
                    onChange={(event) =>
                      handleProjectFieldChange("displayOrder", event.target.value)
                    }
                  />
                </label>
              </div>
              <label className="field">
                <span>Description</span>
                <textarea
                  rows="4"
                  value={projectDraft.description}
                  onChange={(event) =>
                    handleProjectFieldChange("description", event.target.value)
                  }
                  required
                />
              </label>
              <div className="field-row">
                <label className="field">
                  <span>Stack</span>
                  <input
                    type="text"
                    value={projectDraft.stackText}
                    onChange={(event) =>
                      handleProjectFieldChange("stackText", event.target.value)
                    }
                    placeholder="React, Vite, CSS"
                  />
                </label>
                <label className="field">
                  <span>Project link</span>
                  <input
                    type="url"
                    value={projectDraft.linkUrl}
                    onChange={(event) =>
                      handleProjectFieldChange("linkUrl", event.target.value)
                    }
                    placeholder="https://..."
                  />
                </label>
              </div>
              <div className="action-row">
                <button className="primary-button" type="submit" disabled={Boolean(busyAction)}>
                  {busyAction.startsWith("Saving project") ||
                  busyAction.startsWith("Creating project")
                    ? busyAction
                    : projectDraft.id
                      ? "Update project"
                      : "Create project"}
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setProjectDraft(makeEmptyProjectDraft())}
                >
                  Clear
                </button>
              </div>
            </form>
          </section>

          <section className="admin-section">
            <div className="admin-section-header">
              <h3>Travel Blog</h3>
              <button
                className="secondary-button"
                type="button"
                onClick={() => {
                  clearMessages();
                  setTravelDraft(makeEmptyTravelDraft());
                }}
              >
                New story
              </button>
            </div>
            <div className="admin-list">
              {travelPosts.length ? (
                travelPosts.map((post) => (
                  <article key={post.id} className="admin-list-item">
                    <div>
                      <p className="admin-list-heading">{post.title}</p>
                      <p className="admin-list-meta">
                        {post.city || "No city"} · {post.dateLabel || "No date"}
                      </p>
                    </div>
                    <div className="list-actions">
                      <button
                        className="secondary-button"
                        type="button"
                        onClick={() => {
                          clearMessages();
                          setTravelDraft(toTravelDraft(post));
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="danger-button"
                        type="button"
                        onClick={() => handleDeleteTravelClick(post)}
                      >
                        Delete
                      </button>
                    </div>
                  </article>
                ))
              ) : (
                <p className="page-note">No travel stories yet.</p>
              )}
            </div>
            <form className="admin-form" onSubmit={handleTravelSubmit}>
              <div className="field-row">
                <label className="field">
                  <span>Title</span>
                  <input
                    type="text"
                    value={travelDraft.title}
                    onChange={(event) =>
                      handleTravelFieldChange("title", event.target.value)
                    }
                    required
                  />
                </label>
                <label className="field">
                  <span>Slug</span>
                  <input
                    type="text"
                    value={travelDraft.slug}
                    onChange={(event) =>
                      handleTravelFieldChange("slug", event.target.value)
                    }
                    required
                  />
                </label>
              </div>
              <div className="field-row">
                <label className="field">
                  <span>City</span>
                  <input
                    type="text"
                    value={travelDraft.city}
                    onChange={(event) =>
                      handleTravelFieldChange("city", event.target.value)
                    }
                    required
                  />
                </label>
                <label className="field">
                  <span>Date label</span>
                  <input
                    type="text"
                    value={travelDraft.dateLabel}
                    onChange={(event) =>
                      handleTravelFieldChange("dateLabel", event.target.value)
                    }
                    placeholder="March 2026"
                  />
                </label>
                <label className="field">
                  <span>Display order</span>
                  <input
                    type="number"
                    value={travelDraft.displayOrder}
                    onChange={(event) =>
                      handleTravelFieldChange("displayOrder", event.target.value)
                    }
                  />
                </label>
              </div>
              <label className="field">
                <span>Summary</span>
                <textarea
                  rows="3"
                  value={travelDraft.summary}
                  onChange={(event) =>
                    handleTravelFieldChange("summary", event.target.value)
                  }
                  required
                />
              </label>
              <label className="field">
                <span>Story body</span>
                <textarea
                  rows="7"
                  value={travelDraft.body}
                  onChange={(event) => handleTravelFieldChange("body", event.target.value)}
                  required
                />
              </label>

              <div className="gallery-editor">
                {travelDraft.gallery.map((image, slot) => (
                  <div key={`gallery-slot-${slot}`} className="gallery-slot">
                    <div className="gallery-slot-header">
                      <span>Image {slot + 1}</span>
                      {image ? (
                        <button
                          className="danger-button"
                          type="button"
                          onClick={() => handleTravelImageRemove(slot)}
                        >
                          Remove
                        </button>
                      ) : null}
                    </div>
                    <div className="travel-image-frame gallery-frame">
                      {image?.url ? (
                        <img
                          className="travel-image"
                          src={image.url}
                          alt={image.alt || `Travel image ${slot + 1}`}
                        />
                      ) : (
                        <div className="travel-image-placeholder">
                          <span>Upload a city image</span>
                        </div>
                      )}
                    </div>
                    <label className="upload-button upload-button-wide">
                      Upload file
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => handleTravelImageChange(slot, event)}
                      />
                    </label>
                    <label className="field">
                      <span>Alt text</span>
                      <input
                        type="text"
                        value={image?.alt || ""}
                        onChange={(event) =>
                          handleTravelImageAltChange(slot, event.target.value)
                        }
                        placeholder="Describe this image"
                        disabled={!image}
                      />
                    </label>
                  </div>
                ))}
              </div>

              <div className="action-row">
                <button className="primary-button" type="submit" disabled={Boolean(busyAction)}>
                  {busyAction.startsWith("Saving story") ||
                  busyAction.startsWith("Creating story")
                    ? busyAction
                    : travelDraft.id
                      ? "Update story"
                      : "Create story"}
                </button>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => setTravelDraft(makeEmptyTravelDraft())}
                >
                  Clear
                </button>
              </div>
            </form>
          </section>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [route, setRoute] = useState(getRouteFromHash);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portfolioContent, setPortfolioContent] = useState({
    projects: [],
    travelPosts: [],
    source: "seed",
    error: null
  });
  const [contentReady, setContentReady] = useState(false);

  const refreshContent = useCallback(async () => {
    const nextContent = await loadPortfolioContent();
    setPortfolioContent(nextContent);
    setContentReady(true);
  }, []);

  useEffect(() => {
    refreshContent();
  }, [refreshContent]);

  useEffect(() => {
    const onHashChange = () => {
      setRoute(getRouteFromHash());
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    window.addEventListener("hashchange", onHashChange);

    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const activeTravelPost = useMemo(() => {
    const travelSlug = getTravelSlugFromRoute(route);

    if (!travelSlug) {
      return null;
    }

    return portfolioContent.travelPosts.find((post) => post.slug === travelSlug) || null;
  }, [portfolioContent.travelPosts, route]);

  const renderCurrentPage = () => {
    if (!contentReady) {
      return <LoadingPage />;
    }

    if (route === "/about" || route === "/experience") {
      return <ExperiencePage />;
    }

    if (route === "/projects") {
      return <ProjectsPage projects={portfolioContent.projects} />;
    }

    if (route === "/travel-blog") {
      return <TravelBlogPage travelPosts={portfolioContent.travelPosts} />;
    }

    if (route.startsWith("/travel-blog/")) {
      return <TravelDetailPage post={activeTravelPost} />;
    }

    return (
      <section className="landing">
        <main id="top" className="hero">
          <section className="hero-copy">
            <p className="small-title">HELLO, I&apos;M</p>
            <h1 className="hero-name">
              <SparklesText
                className="sparkle-title"
                sparklesCount={14}
                colors={{ first: "#f3c969", second: "#ef9fc4" }}
              >
                <span>Tejaswini</span>
                <span>Gude</span>
              </SparklesText>
            </h1>
            {introParagraphs.map((paragraph) => (
              <p key={paragraph} className="intro">
                {paragraph}
              </p>
            ))}
          </section>
          <aside className="hero-portrait-wrap" aria-label="Portrait">
            <div className="hero-portrait-frame">
              <div className="hero-portrait-window">
                <img
                  className="hero-portrait"
                  src={`${import.meta.env.BASE_URL}landing-portrait.jpg`}
                  alt="Tejaswini Gude"
                />
              </div>
              <img
                className="hero-ornate-frame"
                src={`${import.meta.env.BASE_URL}elegant-gold-border.png`}
                alt=""
                aria-hidden="true"
              />
            </div>
          </aside>
        </main>
      </section>
    );
  };

  return (
    <div className="page-shell">
      <header className={`topbar${mobileMenuOpen ? " is-open" : ""}`}>
        <a className="brand" href="#/">
          My Journey
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={mobileMenuOpen}
          aria-controls="main-menu"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setMobileMenuOpen((current) => !current)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav id="main-menu" className="menu" aria-label="Main">
          {navItems.map((item) => {
            const isExternalLink = Boolean(item.external);

            return (
              <a
                key={item.href}
                className={`menu-link${
                  !isExternalLink && isActiveRoute(route, item.href) ? " is-active" : ""
                }`}
                href={
                  isExternalLink
                    ? `${import.meta.env.BASE_URL}${item.href}`
                    : `#${item.href}`
                }
                target={isExternalLink ? "_blank" : undefined}
                rel={isExternalLink ? "noreferrer" : undefined}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </header>

      {renderCurrentPage()}
    </div>
  );
}

export default App;

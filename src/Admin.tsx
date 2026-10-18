import { useEffect, useState, type FormEvent } from "react";
import type { Session } from "@supabase/supabase-js";
import { defaultContent, type Content } from "./content";
import { CONTENT_ROW_ID, CONTENT_TABLE, supabase } from "./supabase";

type FieldType = "text" | "textarea" | "lines";

type Field = { key: string; label: string; type: FieldType; hint?: string };

type Props = {
  content: Content;
  onChange: (next: Content) => void;
  onClose: () => void;
};

const sections: Array<{
  id: string;
  label: string;
}> = [
  { id: "hero", label: "Intro" },
  { id: "about", label: "About" },
  { id: "skillGroups", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "references", label: "References" },
  { id: "techStack", label: "Tech pills" },
];

const mediaFields: Field[] = [
  { key: "title", label: "Title", type: "text" },
  { key: "tech", label: "Tech / subtitle (optional)", type: "text" },
  { key: "description", label: "Description", type: "textarea" },
  {
    key: "image",
    label: "Image URL or path",
    type: "text",
    hint: "e.g. /media/my-project.png (put the file in public/media) or a full https:// link",
  },
];

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: unknown;
  onChange: (value: unknown) => void;
}) {
  if (field.type === "lines") {
    const text = Array.isArray(value) ? (value as string[]).join("\n") : "";
    return (
      <textarea
        rows={Math.max(3, Math.min(10, text.split("\n").length + 1))}
        value={text}
        onChange={(e) => onChange(e.target.value.split("\n"))}
      />
    );
  }
  if (field.type === "textarea") {
    return (
      <textarea
        rows={3}
        value={String(value ?? "")}
        onChange={(e) => onChange(e.target.value)}
      />
    );
  }
  return (
    <input
      type="text"
      value={String(value ?? "")}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

function ListEditor<T extends Record<string, unknown>>({
  items,
  fields,
  titleKey,
  blank,
  onChange,
}: {
  items: T[];
  fields: Field[];
  titleKey: string;
  blank: T;
  onChange: (items: T[]) => void;
}) {
  const update = (index: number, key: string, value: unknown) =>
    onChange(items.map((item, i) => (i === index ? { ...item, [key]: value } : item)));

  const move = (index: number, delta: number) => {
    const target = index + delta;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const remove = (index: number) => {
    if (window.confirm("Delete this item?")) {
      onChange(items.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="adm-list">
      {items.length === 0 ? <p className="adm-empty">Nothing here yet.</p> : null}
      {items.map((item, index) => (
        <div className="adm-item" key={index}>
          <div className="adm-item-head">
            <strong>{String(item[titleKey] || `Item ${index + 1}`)}</strong>
            <span className="adm-item-actions">
              <button type="button" onClick={() => move(index, -1)} aria-label="Move up">
                ↑
              </button>
              <button type="button" onClick={() => move(index, 1)} aria-label="Move down">
                ↓
              </button>
              <button type="button" className="danger" onClick={() => remove(index)}>
                Delete
              </button>
            </span>
          </div>
          {fields.map((field) => (
            <label className="adm-field" key={field.key}>
              <span>
                {field.label}
                {field.type === "lines" ? " (one per line)" : ""}
              </span>
              <FieldInput
                field={field}
                value={item[field.key]}
                onChange={(value) => update(index, field.key, value)}
              />
              {field.hint ? <small>{field.hint}</small> : null}
            </label>
          ))}
        </div>
      ))}
      <button
        type="button"
        className="adm-btn"
        onClick={() => onChange([...items, structuredClone(blank)])}>
        + Add new
      </button>
    </div>
  );
}

function Admin({ content, onChange, onClose }: Props) {
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(Boolean(supabase));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [active, setActive] = useState("skillGroups");
  const [saveState, setSaveState] = useState<{
    tone: "idle" | "ok" | "error";
    message: string;
  }>({ tone: "idle", message: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data } = supabase.auth.onAuthStateChange((_event, next) =>
      setSession(next),
    );
    return () => data.subscription.unsubscribe();
  }, []);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (!supabase) return;
    setAuthError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setAuthError(error.message);
    setPassword("");
  };

  const handleSave = async () => {
    if (!supabase) return;
    setSaving(true);
    setSaveState({ tone: "idle", message: "" });
    const { error } = await supabase.from(CONTENT_TABLE).upsert({
      id: CONTENT_ROW_ID,
      data: content,
      updated_at: new Date().toISOString(),
    });
    setSaving(false);
    setSaveState(
      error
        ? { tone: "error", message: `Save failed: ${error.message}` }
        : { tone: "ok", message: "Saved. Visitors will see this now." },
    );
  };

  const handleLogout = async () => {
    await supabase?.auth.signOut();
    onClose();
  };

  const set = <K extends keyof Content>(key: K, value: Content[K]) =>
    onChange({ ...content, [key]: value });

  let body;
  switch (active) {
    case "hero":
      body = (
        <div className="adm-item">
          {(
            [
              ["greeting", "Greeting", "text"],
              ["headlineTop", "Headline (first line)", "text"],
              ["headlineAccent", "Headline (blue line)", "text"],
              ["lead", "Intro paragraph", "textarea"],
            ] as Array<[keyof Content["hero"], string, FieldType]>
          ).map(([key, label, type]) => (
            <label className="adm-field" key={key}>
              <span>{label}</span>
              <FieldInput
                field={{ key, label, type }}
                value={content.hero[key]}
                onChange={(value) =>
                  set("hero", { ...content.hero, [key]: value as string })
                }
              />
            </label>
          ))}
        </div>
      );
      break;
    case "about":
      body = (
        <div className="adm-item">
          <label className="adm-field">
            <span>About paragraphs (one paragraph per line)</span>
            <FieldInput
              field={{ key: "about", label: "About", type: "lines" }}
              value={content.about}
              onChange={(value) => set("about", value as string[])}
            />
          </label>
        </div>
      );
      break;
    case "techStack":
      body = (
        <div className="adm-item">
          <label className="adm-field">
            <span>Tech pills (one per line)</span>
            <FieldInput
              field={{ key: "techStack", label: "Tech", type: "lines" }}
              value={content.techStack}
              onChange={(value) =>
                set(
                  "techStack",
                  (value as string[]),
                )
              }
            />
          </label>
        </div>
      );
      break;
    case "skillGroups":
      body = (
        <ListEditor
          items={content.skillGroups}
          titleKey="title"
          blank={{ title: "New category", skills: [] }}
          fields={[
            { key: "title", label: "Category title", type: "text" },
            { key: "skills", label: "Skills", type: "lines" },
          ]}
          onChange={(items) => set("skillGroups", items)}
        />
      );
      break;
    case "experience":
      body = (
        <ListEditor
          items={content.experience}
          titleKey="company"
          blank={{ company: "", role: "", period: "", tech: "", highlights: [] }}
          fields={[
            { key: "company", label: "Company", type: "text" },
            { key: "role", label: "Role", type: "text" },
            { key: "period", label: "Period", type: "text", hint: "e.g. Jan 2025 – Present" },
            { key: "tech", label: "Tech used", type: "text", hint: "comma separated" },
            { key: "highlights", label: "Highlights", type: "lines" },
          ]}
          onChange={(items) => set("experience", items)}
        />
      );
      break;
    case "education":
      body = (
        <ListEditor
          items={content.education}
          titleKey="degree"
          blank={{ degree: "", school: "", period: "" }}
          fields={[
            { key: "degree", label: "Degree / course", type: "text" },
            { key: "school", label: "School", type: "text" },
            { key: "period", label: "Period", type: "text", hint: "e.g. 2021 – 2024" },
          ]}
          onChange={(items) => set("education", items)}
        />
      );
      break;
    case "projects":
      body = (
        <ListEditor
          items={content.projects}
          titleKey="title"
          blank={{ title: "", tech: "", description: "", image: "" }}
          fields={mediaFields}
          onChange={(items) => set("projects", items)}
        />
      );
      break;
    case "certificates":
      body = (
        <ListEditor
          items={content.certificates}
          titleKey="title"
          blank={{ title: "", tech: "", description: "", image: "" }}
          fields={mediaFields}
          onChange={(items) => set("certificates", items)}
        />
      );
      break;
    default:
      body = (
        <ListEditor
          items={content.references}
          titleKey="name"
          blank={{ name: "", role: "", email: "", phone: "" }}
          fields={[
            { key: "name", label: "Name", type: "text" },
            { key: "role", label: "Role", type: "text" },
            { key: "email", label: "Email", type: "text" },
            { key: "phone", label: "Phone", type: "text" },
            { key: "link", label: "Website (optional)", type: "text" },
          ]}
          onChange={(items) => set("references", items)}
        />
      );
  }

  return (
    <div className="adm-overlay" role="dialog" aria-modal="true" aria-label="Site editor">
      <div className="adm-panel">
        <div className="adm-top">
          <strong>Site editor</strong>
          <button type="button" className="adm-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        {!supabase ? (
          <div className="adm-pad">
            <p>
              Supabase isn't configured yet. Add <code>VITE_SUPABASE_URL</code>{" "}
              and <code>VITE_SUPABASE_ANON_KEY</code> to your <code>.env</code>{" "}
              file, then restart the dev server. See the README steps.
            </p>
          </div>
        ) : checking ? (
          <div className="adm-pad">
            <p>Loading…</p>
          </div>
        ) : !session ? (
          <form className="adm-pad adm-login" onSubmit={handleLogin}>
            <label className="adm-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                required
              />
            </label>
            <label className="adm-field">
              <span>Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>
            {authError ? <p className="adm-error">{authError}</p> : null}
            <button type="submit" className="adm-btn primary">
              Log in
            </button>
          </form>
        ) : (
          <>
            <div className="adm-tabs">
              {sections.map((section) => (
                <button
                  key={section.id}
                  type="button"
                  className={active === section.id ? "is-active" : ""}
                  onClick={() => setActive(section.id)}>
                  {section.label}
                </button>
              ))}
            </div>
            <div className="adm-body">{body}</div>
            <div className="adm-foot">
              <span className={`adm-status is-${saveState.tone}`}>
                {saveState.message || "Changes show on the page behind. Save to publish."}
              </span>
              <button
                type="button"
                className="adm-btn"
                onClick={() => {
                  if (
                    window.confirm(
                      "Replace everything in the editor with the resume content built into the site? Click Save & publish afterwards to make it live.",
                    )
                  ) {
                    onChange(structuredClone(defaultContent));
                  }
                }}>
                Reset to resume
              </button>
              <button type="button" className="adm-btn" onClick={handleLogout}>
                Log out
              </button>
              <button
                type="button"
                className="adm-btn primary"
                onClick={handleSave}
                disabled={saving}>
                {saving ? "Saving…" : "Save & publish"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Admin;

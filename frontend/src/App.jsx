import { useState, useEffect } from "react";

const API = "https://your-render-url.onrender.com"

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:ital,wght@0,300;0,400;1,300&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #0e0e0e;
    --surface: #161616;
    --border: #2a2a2a;
    --accent: #c8f135;
    --accent-dim: #9bb82a;
    --text: #f0f0f0;
    --muted: #666;
    --danger: #ff4d4d;
    --radius: 10px;
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'DM Mono', monospace;
    min-height: 100vh;
  }

  .app {
    max-width: 720px;
    margin: 0 auto;
    padding: 40px 20px;
    min-height: 100vh;
  }

  /* Header */
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
  }

  .logo {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 1.5rem;
    letter-spacing: -0.03em;
  }

  .logo span { color: var(--accent); }

  .user-pill {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 100px;
    padding: 6px 14px 6px 8px;
    font-size: 0.75rem;
    color: var(--muted);
  }

  .user-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: var(--accent);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .logout-btn {
    background: none;
    border: none;
    color: var(--muted);
    cursor: pointer;
    font-family: inherit;
    font-size: 0.75rem;
    padding: 4px 8px;
    border-radius: 4px;
    transition: color 0.2s;
  }

  .logout-btn:hover { color: var(--danger); }

  /* Auth */
  .auth-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 32px;
  }

  .auth-title {
    font-family: 'Syne', sans-serif;
    font-weight: 800;
    font-size: 2.5rem;
    letter-spacing: -0.04em;
    text-align: center;
    line-height: 1.1;
  }

  .auth-title span { color: var(--accent); }

  .auth-sub {
    color: var(--muted);
    font-size: 0.8rem;
    text-align: center;
    margin-top: -20px;
  }

  .auth-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 32px;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .auth-tabs {
    display: flex;
    gap: 4px;
    background: var(--bg);
    border-radius: 8px;
    padding: 4px;
    margin-bottom: 8px;
  }

  .auth-tab {
    flex: 1;
    padding: 8px;
    border: none;
    border-radius: 6px;
    background: none;
    color: var(--muted);
    font-family: inherit;
    font-size: 0.78rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .auth-tab.active {
    background: var(--accent);
    color: #000;
    font-weight: 600;
  }

  .input {
    width: 100%;
    background: var(--bg);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 12px 14px;
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 0.82rem;
    outline: none;
    transition: border-color 0.2s;
  }

  .input:focus { border-color: var(--accent); }
  .input::placeholder { color: var(--muted); }

  .btn {
    width: 100%;
    padding: 12px;
    border: none;
    border-radius: 8px;
    background: var(--accent);
    color: #000;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.85rem;
    cursor: pointer;
    transition: opacity 0.2s, transform 0.1s;
    letter-spacing: 0.02em;
  }

  .btn:hover { opacity: 0.88; }
  .btn:active { transform: scale(0.98); }
  .btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .error-msg {
    font-size: 0.75rem;
    color: var(--danger);
    text-align: center;
  }

  /* Notes */
  .compose {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px;
    margin-bottom: 32px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .compose-label {
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .textarea {
    width: 100%;
    background: none;
    border: none;
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 0.88rem;
    line-height: 1.6;
    resize: none;
    outline: none;
    min-height: 80px;
  }

  .textarea::placeholder { color: var(--muted); }

  .compose-footer {
    display: flex;
    justify-content: flex-end;
  }

  .compose-btn {
    padding: 8px 20px;
    border: none;
    border-radius: 6px;
    background: var(--accent);
    color: #000;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.78rem;
    cursor: pointer;
    transition: opacity 0.2s;
  }

  .compose-btn:hover { opacity: 0.85; }
  .compose-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  .notes-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
  }

  .notes-label {
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .notes-count {
    font-size: 0.7rem;
    color: var(--muted);
  }

  .notes-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .note-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    animation: slideIn 0.2s ease;
    transition: border-color 0.2s;
  }

  .note-card:hover { border-color: #3a3a3a; }

  @keyframes slideIn {
    from { opacity: 0; transform: translateY(6px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .note-content {
    font-size: 0.88rem;
    line-height: 1.65;
    color: var(--text);
    white-space: pre-wrap;
    word-break: break-word;
  }

  .note-edit-input {
    width: 100%;
    background: var(--bg);
    border: 1px solid var(--accent);
    border-radius: 6px;
    padding: 10px 12px;
    color: var(--text);
    font-family: 'DM Mono', monospace;
    font-size: 0.88rem;
    line-height: 1.65;
    resize: none;
    outline: none;
    min-height: 80px;
  }

  .note-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .note-id {
    font-size: 0.68rem;
    color: var(--muted);
    font-style: italic;
  }

  .note-actions {
    display: flex;
    gap: 6px;
  }

  .action-btn {
    padding: 4px 12px;
    border-radius: 5px;
    border: 1px solid var(--border);
    background: none;
    font-family: 'DM Mono', monospace;
    font-size: 0.72rem;
    cursor: pointer;
    transition: all 0.2s;
    color: var(--muted);
  }

  .action-btn:hover { color: var(--text); border-color: var(--text); }

  .action-btn.save {
    border-color: var(--accent);
    color: var(--accent);
  }

  .action-btn.save:hover {
    background: var(--accent);
    color: #000;
  }

  .action-btn.delete:hover {
    border-color: var(--danger);
    color: var(--danger);
  }

  .empty {
    text-align: center;
    color: var(--muted);
    font-size: 0.82rem;
    padding: 60px 0;
    line-height: 1.8;
  }

  .empty-icon {
    font-size: 2rem;
    margin-bottom: 12px;
    display: block;
    opacity: 0.4;
  }

  .loading {
    text-align: center;
    color: var(--muted);
    font-size: 0.8rem;
    padding: 40px 0;
  }
`;

export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("qn_token") || "");
  const [username, setUsername] = useState(() => localStorage.getItem("qn_user") || "");
  const [tab, setTab] = useState("login");
  const [authForm, setAuthForm] = useState({ username: "", password: "" });
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [notesLoading, setNotesLoading] = useState(false);

  useEffect(() => {
    if (token) fetchNotes();
  }, [token]);

  async function fetchNotes() {
    setNotesLoading(true);
    try {
      const res = await fetch(`${API}/notes`, {
        headers: { Authorization: token },
      });
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch {
      setNotes([]);
    } finally {
      setNotesLoading(false);
    }
  }

  async function handleAuth() {
    setAuthError("");
    setAuthLoading(true);
    try {
      const res = await fetch(`${API}/auth/${tab}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(authForm),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Something went wrong");
      if (tab === "login") {
        setToken(data.token);
        setUsername(authForm.username);
        localStorage.setItem("qn_token", data.token);
        localStorage.setItem("qn_user", authForm.username);
      } else {
        setTab("login");
        setAuthForm({ ...authForm, password: "" });
      }
    } catch (e) {
      setAuthError(e.message);
    } finally {
      setAuthLoading(false);
    }
  }

  function logout() {
    setToken("");
    setUsername("");
    setNotes([]);
    localStorage.removeItem("qn_token");
    localStorage.removeItem("qn_user");
  }

  async function createNote() {
    if (!newNote.trim()) return;
    try {
      const res = await fetch(`${API}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ content: newNote }),
      });
      if (res.ok) { setNewNote(""); fetchNotes(); }
    } catch(err) {
      console.log(err)
    }
  }

  async function deleteNote(id) {
    try {
      await fetch(`${API}/notes/${id}`, {
        method: "DELETE",
        headers: { Authorization: token },
      });
      fetchNotes();
    } catch(err) {
      console.log(err)
    }
  }

  async function saveEdit(id) {
    try {
      await fetch(`${API}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: token },
        body: JSON.stringify({ content: editContent }),
      });
      setEditingId(null);
      fetchNotes();
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="header">
          <div className="logo">Quick<span>Notes</span></div>
          {token && (
            <div className="user-pill">
              <div className="user-dot" />
              {username}
              <button className="logout-btn" onClick={logout}>logout</button>
            </div>
          )}
        </div>

        {!token ? (
          <div className="auth-wrap">
            <div>
              <div className="auth-title">Your notes.<br /><span>Always there.</span></div>
              <div className="auth-sub">Simple. Fast. Yours only.</div>
            </div>
            <div className="auth-card">
              <div className="auth-tabs">
                <button className={`auth-tab ${tab === "login" ? "active" : ""}`} onClick={() => { setTab("login"); setAuthError(""); }}>Login</button>
                <button className={`auth-tab ${tab === "register" ? "active" : ""}`} onClick={() => { setTab("register"); setAuthError(""); }}>Register</button>
              </div>
              <input
                className="input"
                placeholder="username"
                value={authForm.username}
                onChange={e => setAuthForm({ ...authForm, username: e.target.value })}
              />
              <input
                className="input"
                type="password"
                placeholder="password"
                value={authForm.password}
                onChange={e => setAuthForm({ ...authForm, password: e.target.value })}
                onKeyDown={e => e.key === "Enter" && handleAuth()}
              />
              {authError && <div className="error-msg">{authError}</div>}
              <button className="btn" onClick={handleAuth} disabled={authLoading}>
                {authLoading ? "..." : tab === "login" ? "Login" : "Create Account"}
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="compose">
              <div className="compose-label">New Note</div>
              <textarea
                className="textarea"
                placeholder="What's on your mind..."
                value={newNote}
                onChange={e => setNewNote(e.target.value)}
                onKeyDown={e => e.key === "Enter" && e.metaKey && createNote()}
              />
              <div className="compose-footer">
                <button className="compose-btn" onClick={createNote} disabled={!newNote.trim()}>
                  Add Note
                </button>
              </div>
            </div>

            <div className="notes-header">
              <div className="notes-label">Your Notes</div>
              <div className="notes-count">{notes.length} note{notes.length !== 1 ? "s" : ""}</div>
            </div>

            {notesLoading ? (
              <div className="loading">loading...</div>
            ) : notes.length === 0 ? (
              <div className="empty">
                <span className="empty-icon">◎</span>
                No notes yet.<br />Add one above.
              </div>
            ) : (
              <div className="notes-list">
                {notes.map(note => (
                  <div className="note-card" key={note.id}>
                    {editingId === note.id ? (
                      <textarea
                        className="note-edit-input"
                        value={editContent}
                        onChange={e => setEditContent(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      <div className="note-content">{note.content}</div>
                    )}
                    <div className="note-footer">
                      <div className="note-id">#{note.id}</div>
                      <div className="note-actions">
                        {editingId === note.id ? (
                          <>
                            <button className="action-btn save" onClick={() => saveEdit(note.id)}>save</button>
                            <button className="action-btn" onClick={() => setEditingId(null)}>cancel</button>
                          </>
                        ) : (
                          <>
                            <button className="action-btn" onClick={() => { setEditingId(note.id); setEditContent(note.content); }}>edit</button>
                            <button className="action-btn delete" onClick={() => deleteNote(note.id)}>delete</button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}

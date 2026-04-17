# Technical Report: Mobile Responsiveness — easyintern.app

**Status:** Fixes applied in-repo (see commits / `frontend/src`). Use this document for Cursor or handoff.

---

## Issue 1: Horizontal overflow (horizontal scroll)

**Severity:** High  

**Symptom:** On mobile/tablet, users can scroll horizontally into empty space; “layout wobble” when scrolling vertically.

**Cause:** Fixed UI (mobile nav drawer) plus missing horizontal containment on the document root lets some browsers expand scrollable width.

**Implemented fix:**

- `frontend/src/index.css` — `html` and `body`: `overflow-x: hidden; max-width: 100%;` (prefer `100%` over `100vw` to reduce scrollbar-related width bugs).
- `frontend/src/App.css` — `.App`: `overflow-x: hidden; max-width: 100%;`

---

## Issue 2: Drawer interaction & layout width

**Severity:** Medium  

**Symptom:** Off-screen drawer still affecting layout or hit-testing in edge cases.

**Cause:** Drawer uses `position: fixed` + `transform: translateX(100%)` when closed; without `pointer-events` / `visibility` rules, some engines still treat it as interactive or contribute to overflow.

**Implemented fix:**

- `frontend/src/components/Navbar.css` (inside `@media (max-width: 1279px)`):
  - Closed: `.navbar-drawer` — `pointer-events: none; visibility: hidden;`
  - Open: `.navbar--drawer-open .navbar-drawer` — `pointer-events: auto; visibility: visible;`
  - `visibility` transitions delayed on close (`visibility 0s linear 0.28s`) so the slide-out animation still plays before the drawer is fully hidden.

---

## Issue 3: Viewport meta

**Current:** `frontend/index.html` already has:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

**Note:** Do **not** add `maximum-scale=1.0, user-scalable=no` unless required — it hurts accessibility (zoom). Keep the standard tag unless product mandates otherwise.

---

## Related fix (earlier): Drawer z-index

**Symptom:** Header row and drawer “split” when drawer opened.  

**Fix:** Backdrop `z-index: 140`, drawer `z-index: 141`, burger when open `z-index: 200` (above `.navbar-top` at `130`).

---

## Verification (manual)

1. Chrome DevTools → **Toggle device toolbar** (Ctrl+Shift+M) → e.g. iPhone 12/13 Pro.
2. Try horizontal drag: page should not scroll sideways.
3. Open/close hamburger: drawer slides; no instant flash; backdrop taps close menu.
4. Inspect `document.documentElement.scrollWidth` vs `window.innerWidth` (should match when no overflow).

---

## Files touched

| File | Change |
|------|--------|
| `frontend/src/index.css` | `html`/`body` overflow-x + max-width |
| `frontend/src/App.css` | `.App` overflow-x + max-width |
| `frontend/src/components/Navbar.css` | Drawer pointer-events + visibility + transition timing |

After changes, run `npm run build` in `frontend/` and deploy `dist/` to production.

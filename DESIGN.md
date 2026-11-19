---
name: Yalla Break
description: The Break Club — a bilingual shared-break game workspace
colors:
  primary: "#163fcc"
  primary-hover: "#1033aa"
  ink: "#152447"
  muted: "#53617e"
  paper: "#eff3ff"
  surface: "#fff"
  line: "#cbd5ef"
  soft: "#e2e9ff"
  selected: "#eaf188"
  selected-ink: "#29300b"
  success: "#17613f"
  danger: "#aa303f"
  focus: "#9a4a00"
typography:
  display:
    fontFamily: "Rubik, 'Noto Sans Arabic', sans-serif"
    fontSize: "clamp(42px, 4.7vw, 64px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Rubik, 'Noto Sans Arabic', sans-serif"
    fontSize: "clamp(32px, 4vw, 52px)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.03em"
  title:
    fontSize: "28px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  body:
    fontFamily: "Rubik, 'Noto Sans Arabic', sans-serif"
    lineHeight: 1.65
  label:
    fontSize: "14px"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  badge: "6px"
  control: "8px"
  group: "10px"
  format: "12px"
  surface: "14px"
  table-team: "18px"
spacing:
  space-1: "4px"
  space-2: "8px"
  space-3: "12px"
  space-4: "16px"
  space-6: "24px"
  space-8: "32px"
  space-12: "48px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.control}"
    padding: "11px 18px"
  format-selected:
    backgroundColor: "{colors.selected}"
    textColor: "{colors.ink}"
    rounded: "{rounded.format}"
    padding: "18px 14px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.surface}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "12px 14px"
---

# Design System: Yalla Break

## Overview

**Creative North Star: "The Break Club"**

The Break Club is a bright, practical place for colleagues to organize a shared break. Cobalt provides orientation and action, pale blue provides daylight ground, and citron makes a selected roster format easy to recognize. White surfaces, navy text, and explicit labels keep the interface usable during play.

The system supports light and dark appearances, is bilingual, and is designed for phones and office PCs. Flat tonal surfaces carry hierarchy; controls remain recognizable native buttons, inputs, and selects. Rubik and Noto Sans Arabic share the same functional hierarchy while Arabic receives its own line-height and direction treatment.

**Key Characteristics:**
- Cobalt actions and navigation; citron roster selection.
- Flat pale blue and white work surfaces.
- Self-hosted bilingual typography and explicit roster labels.
- Visible keyboard focus and responsive shared-screen play.

## Colors

A clear cobalt, pale blue, citron, and navy palette supports daytime operation.

### Primary
- **Club Cobalt** (`primary`): navigation, primary actions, links, active tabs, and secret-word emphasis. `primary-hover` deepens interaction feedback.

### Secondary
- **Break Citron** (`selected`): roster selection, format badges, round labels, and the brand mark. `selected-ink` supplies dark text on citron.

### Neutral
- **Office Navy** (`ink`): main text; **Slate Blue** (`muted`): supporting text.
- **Daylight Blue** (`paper`): page ground; **White Work Surface** (`surface`): forms and panels.
- **Tonal Blue** (`soft`): grouped controls, secondary actions, and active PassWord teams; `line` separates content.
- `success` and `danger` identify scoring and status. `focus` is the amber keyboard outline on light ground; navigation uses citron focus.

**The Selection Has a Label Rule.** Keep roster formats and active teams explicit in text; color supports the label rather than replacing it.

### Appearance
The shared moon/sun button toggles light and dark mode, including in full-screen PassWord. `app-theme` stores an explicit choice; without one the device preference applies and updates live. A blocking local `theme.js` script sets `data-theme` and `color-scheme` before rendering. Other tabs synchronize changes.

Dark tokens override light values: ink #edf1ff, muted #b4c0de, paper #10172b, surface #19233b, primary text #a5bbff, primary hover text #c5d2ff, action background #3454cd, action hover #2946b3, navigation #15224b, line #3b4b70, soft #253454, focus #f3c76a. Citron selection and semantic action backgrounds retain their identities. Light `--action` and `--nav` alias `--primary`; in dark mode text and action backgrounds are separate to preserve contrast. Inputs, tables, statuses, game symbols, and inactive games have dark treatments.

## Typography

**Display and Body Font:** self-hosted Rubik, followed by Noto Sans Arabic and sans-serif. Arabic prioritizes Noto Sans Arabic, followed by Rubik. Rubik is variable (300–900); Arabic ships regular and bold (400 and 700). Fonts use swap loading.

### Hierarchy
- **Display:** library welcome, using the frontmatter display role; phone size becomes (44px), with line-height (1.12).
- **Headline:** general page headings; game headings use (clamp(28px, 4vw, 42px)).
- **Title:** section headings; phone base h2 becomes (24px). Game-list titles use (23px), becoming (21px) on phones.
- **Body:** regular weight, base line-height from frontmatter; library introduction uses (16px), and game summaries (14px). Supporting copy often stays within (65ch).
- **Label:** bold sentence-case controls. Supporting labels range from (11px) to (14px); table values use tabular numerals.

Arabic h1–h3 remove negative tracking and use line-height (1.5); the library display uses (1.45). Preserve these overrides rather than applying Latin metrics to Arabic.

## Layout

The shared container caps at (1200px), with inline gutters (32px), then (20px) at widths up to (767px), and (16px) up to (360px). Main content uses vertical padding (48px 0 72px), reducing to (28px 0 48px) on phones. Setup and session surfaces cap at (760px); game and rules workspaces cap at (960px).

The library pairs a welcome region with a two-column game-group selector. At (1000px) spacing tightens; at (767px) the welcome and selector stack. The selector itself retains two columns, with descriptions hidden on phones. Game rows use symbol, content, and action columns, becoming two columns with a full-width action row on phones. Shared card padding is (24px); game panels use (32px), becoming (20px 16px) on phones.

PassWord table mode fills the viewport using fixed positioning, dynamic viewport height, safe-area insets, and scrolling. Phones show two opposing team halves, one rotated (180deg); short landscape screens at height up to (500px) place halves side by side. Desktop presentation applies at width (768px) with hover and fine pointer, or width (1024px) regardless of input. It puts a shared secret-word area above two upright team panels, with explicit player and host information. General table controls have a final minimum height of (44px); short-height density overrides do not reduce those tools below this final rule. Answer buttons use (72px) by default, (88px) in desktop presentation, and (54px) on short phones.

## Elevation & Depth

Depth comes from pale blue ground, white work surfaces, soft blue groups, and thin borders. Shared cards explicitly suppress box shadows. Focus is an outline, not elevation.

**The Flat Work Surfaces Rule.** Use tonal backgrounds and borders for grouping; shared cards have no shadows.

## Shapes

Controls have modest rounded corners; surfaces use the larger surface radius. Format tiles, badges, and table panels use the distinct frontmatter radii. Borders are generally (1px); PassWord team panels use (2px), and desktop secret-word framing is dashed. Avoid turning compact controls into decorative pills.

## Components

### Buttons

Bold, compact, labeled actions. Primary buttons use cobalt and white, secondary buttons soft blue and cobalt; hover darkens the primary or moves secondary fill to the divider tone. Shared buttons have minimum height (44px), with opacity (.5) when disabled. Danger and success controls use their semantic colors. Background and border transitions take (.15s). The global focus outline is (3px) with offset (4px); the cobalt navigation uses citron instead of amber.

### Inputs / Fields

Labels sit above native controls. Inputs are white, with a blue-gray border (#a8b8da), minimum height (48px), and type size (16px). Focus changes the border to cobalt and removes Bootstrap's shadow; keyboard focus retains the global outline. User-invalid controls receive danger borders. Placeholder color is (#637191). New PassWord and Pictionary forms require a host and two named members on each team. Mafia uses native role-count controls without an upper player cap.

### Navigation

A compact cobalt strip carries the brand, a library link, and a language button. The latter has a translucent hover fill, an outline border, and minimum height (44px). The library text link hides on phones. A skip link becomes visible on focus.

### Format Selection and Badges

Format controls are real buttons with `aria-pressed`, strong text labels, and persistent selected styling. Selected tiles use citron with an olive border (#68741b), darkened citron hover (#e2ea75), and a visible check. Disabled formats remain visible at reduced opacity. Format and round badges repeat the selection tone with textual meaning. The game-list reveal moves vertically (8px) over (.25s), using cubic-bezier(.16,1,.3,1). Reduced motion disables all animation and transitions.

### Cards / Containers

White, bordered, shadow-free panels with the surface radius. Forms use (32px) padding and (24px) on phones. Nested shared cards remove borders and rounding rather than stacking framed cards.

### Game session controls
Every active game exposes a native Game options disclosure in its header; PassWord includes it directly in the fixed table toolbar. Restart keeps the current host/players or Mafia role counts and clears round/score progress. Reset clears only that game's local setup and returns to entry. Both use explicit confirmation; Escape closes the disclosure and returns focus to its summary. Controls share the current light/dark tokens and remain reachable on phones and every game tab.

### Tabs

Tabs sit on a soft blue strip. The active tab is cobalt with white text; inactive tabs use cobalt text. Buttons are at least (46px) high. Use tablist, tab, and tabpanel semantics, a single tab stop, Home/End, and RTL-aware Left/Right arrow selection. Panels remain mounted and hidden when inactive to preserve game state.

### Tables and Rules

Tables align to reading direction, use pale blue stripes and thin dividers, and wrap cell text. Cells have padding (16px 12px), becoming (12px 8px) with (13px) text on phones. Current or emphasized rows use soft blue; numeric final cells use tabular numerals. Rules are ordered, max (72ch), with cobalt bold markers, generous line-height (1.9), and row dividers.

### Feedback and Shared Play

Neutral statuses use soft blue. Error and success statuses pair readable text with pale red (#fce7ea) or pale green (#e1f3e9) backgrounds. Empty states use centered muted text. PassWord active teams use a cobalt border and soft blue fill; correct/incorrect answer buttons retain text and icons as well as semantic colors. Disabled answer buttons have final opacity (.42). Secret reveal remains an explicit control.

## Do's and Don'ts

### Do:
- **Do** use native labeled controls and a visible focus outline.
- **Do** retain Arabic RTL layout, Arabic font priority, and direction-aware keyboard tabs.
- **Do** preserve the selected roster label through setup and play.
- **Do** remove animation and transitions when reduced motion is requested.

### Don't:
- **Don't** hard-code light surfaces into theme-aware components.
- **Don't** replace explicit player, host, or team labels with color alone.
- **Don't** use elevated shadows on shared cards.
- **Don't** rotate the desktop PassWord team panels; opposing orientation belongs to phone table mode.

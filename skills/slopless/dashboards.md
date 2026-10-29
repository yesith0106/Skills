# Dashboards and app UI

For tool pages (`principles/fit.md`): dashboards, admin panels, settings, internal tools, editors. People come back every day to get a task done, so the bar is different from a pitch page:
- Consistency beats surprise.
- Density beats drama.
- Every state matters as much as the resting screen.

The 8 settings still apply. This file adds three things: the system an app is built from (roles, sizes, states), the standard parts (shell, cards, charts, tables, forms, overlays), and the tells that make a dashboard look generated.

Open it in Create step 2 for any tool page, when diagnosing one, and in every review of one.

**Build from what the project has.** Make these parts with the project's own components and styling. If it already uses a component library, keep it and map these values onto it. Never add a UI library just to get these parts.

## Floor (never break)

**D1. One set of roles, used everywhere.** Colors, radii and sizes come from the named roles below, set once in the values file. No color or size picked for one screen.

**D2. One control ladder.**
- Every button, field, select and toggle uses one of the four heights below.
- Controls that sit in the same row share one height.

**D3. Every state exists.** Every view has these states, and each one is designed:
- Loading
- Empty
- Filtered-empty
- Error
- Many rows
- Long values
- Disabled
- Focus

**D4. Numbers read as numbers.**
- Tabular figures everywhere.
- Right-aligned in tables, and the column header too.
- Every change names its baseline ("+12.5% vs last month").

**D5. Keyboard works.**
- Focus is visible on every control.
- Esc closes any overlay and returns focus to its trigger.
- Icon-only buttons have accessible labels.

**D6. State never relies on color alone.** Status, selection, errors and active nav each carry an icon, text or weight change as well as a color.

## The system

### Color roles, in pairs

Every surface role has a matching text role, so any part can sit on any surface and stay readable.

| Role | Used for | Its text role is used for |
|---|---|---|
| **background** | The page | Body text |
| **card** | Cards, panels, the table container | Text on cards |
| **popover** | Menus, selects, popovers, the command palette | Text in overlays |
| **primary** | The one main action per view, checked boxes, the active segment | Text on primary |
| **secondary** | Secondary buttons | Text on secondary |
| **muted** | Quiet fills: table header, tab track, skeletons, keyboard keys | Descriptions, helper text, placeholders, axis labels |
| **accent** | Hover and focus fill on menu items, ghost buttons, nav items | Text on that fill |
| **destructive** | Delete, errors, invalid fields | Text on destructive |
| **border / input / ring** | Dividers / field borders / focus ring | n/a |
| **sidebar** (with its own primary, accent, border, ring) | The nav column, so it can differ from the page | Nav text |
| **chart-1 … chart-5** | Data series only | n/a |

- **Hover** is the same color at lower opacity, never a new hue: primary at 90%, secondary at 80%, rows on muted at 50%.
- **In dark mode, elevation is lightness.** Cards and popovers sit one step lighter than the page.
- **Dark borders use alpha.** White at about 10% for borders and 15% for field borders works on every surface.
- **Chart colors** default to one hue in five steps (a sequential ramp), or the brand hue plus neutrals.
  - Add distinct hues only when the series are categories that must be told apart, and use at most 5.
- **Status colors** (success, warning, danger) are only for status, and always come with an icon or a word.
- The brand lives in primary, the chart ramp and maybe the sidebar. Everything else stays neutral (tinted toward the brand hue, per `settings/color.md`).

### One radius, derived

Set one base radius and derive the rest from it, so the roundness of the whole app changes with one number.

| Step | Formula | 10px base | Used for |
|---|---|---|---|
| sm | base × 0.6 | 6px | Menu items, checkboxes (4px), keyboard keys |
| md | base × 0.8 | 8px | Buttons, inputs, selects, menus, tooltips |
| lg | base | 10px | Tab track, table container, dialogs, chart tooltips |
| xl | base × 1.4 | 14px | Cards, the inset content panel |
| full | n/a | 9999px | Badges, avatars |

### The control ladder

| Size | Height | Used for |
|---|---|---|
| xs | 24px | Inline actions inside dense rows |
| sm | 32px | Toolbars, table actions, pagination, nav items, header buttons |
| default | 36px | Form fields, selects, buttons in forms and page headers, the tab track |
| lg | 40px | The rare prominent action (an empty state, onboarding) |

- On touch screens, controls grow to 40px, or keep at least a 44px hit area (`review.md` mobile check).
- Icon buttons are squares of the same heights.
- Icons are 16px inside controls (12px at xs), from one set with one stroke width.
- Horizontal padding is 12–16px at default, 10–12px at sm. It tightens by about 4px when an icon leads the label.
- **Text sizes:**
  - 14px for nearly everything: controls, cells, menus, nav.
  - 12px for badges, tooltips, keys and group labels.
  - 16px for card and page titles.
  - 24–30px for stat values. Nothing larger.
- **Form inputs** use 16px text on phones (smaller text makes iOS zoom the page) and 14px from tablet up.
- **Spacing** sits on a 4px grid: 4 / 6 / 8 / 12 / 16 / 24.
  - 8px inside controls.
  - 16px between cards.
  - 24px inside cards.

### States, the same everywhere

- **Focus (keyboard only, `:focus-visible`):** the border turns to the ring color, plus a 3px ring at 50% of it.
- **Invalid:** a destructive border, a 3px ring at 20% destructive, and the error text under the field. Drive it from `aria-invalid` so screen readers get it too.
- **Disabled:** 50% opacity, no pointer events, `cursor: not-allowed` on fields.
- **Active / selected:** a muted or accent fill plus medium weight.
- **Transitions:** only color, background and box-shadow, about 150ms ease-out.

## The shell

**Sidebar**
- 256px wide.
- Collapses to a 48px icon rail; labels show as tooltips.
- Below 768px it becomes a 288px slide-over sheet.
- Toggled from the header and with ⌘B / Ctrl+B. Remember its state across visits.

**Sidebar order, top to bottom**
1. Product or workspace switcher.
2. Main nav, 5–8 items.
3. Further groups under 12px labels at about 70% opacity.
4. Settings and help pinned to the bottom.
5. The user menu last.

**Nav items**
- 32px tall, 8px padding, 8px gap.
- 16px icon and a 14px label that truncates with an ellipsis.
- Active: the accent fill plus medium weight.
- At most two levels. Sub-items indent along a hairline.

**Header**
- 48px tall with a hairline bottom border.
- Left: the sidebar toggle, a 16px vertical divider, then the page title (16px medium) or breadcrumbs.
- Right: search and small ghost buttons.

**Inset shell (optional):** the content sits as a raised panel inside the sidebar color, with an 8px margin, xl radius and a small shadow. Nav and content read as two layers without a hard divider.

**Content area**
- Padding 16px on mobile, 24px from 1024px.
- Blocks 16px apart (24px from 768px).

**Lay out against the content area, not the window.** The sidebar changes how much room there is, so stat grids, chart controls and table toolbars respond to their container's width (container queries), not to the viewport.

## Page anatomy

Top to bottom, keeping only what this page needs:

1. **Header:** the title, a one-line description if the page isn't obvious, and one primary action on the right.
2. **Key numbers:** 2–4 stat cards, the ones this user acts on.
3. **The main chart:** one chart that answers the page's main question.
4. **The work surface:** the table or list where the tasks happen.

The most important number goes top-left and actions go top-right. The table is usually the most-used part, so it gets full width and sits high on the page.

## Parts

### Card

- 24px padding, 24px between header, content and footer.
- xl radius, a hairline border, at most a small, tight shadow (wide soft shadows plus a border are the ghost-card tell).
- **Header layout:** the title (16px semibold, line height 1) sits above the description (14px muted) on the left. An action slot (menu, range control, button) sits top-right and spans both rows.
- A card holds one thing. No cards inside cards: inside a card, use spacing and hairlines.

### Stat card

**Anatomy:** label (14px muted), then the value (semibold, tabular figures), a change badge in the top-right, and a footer.
- The value is 24px, and 30px once the card is at least 250px wide.

**Change badge**
- Outline pill, 12px medium.
- An arrow icon and a signed number: "+12.5%", "−4.1%".
- **Color it by meaning, not by sign.** Churn going up is bad news, even though the number rose.

**Footer:** one 14px medium line and one muted line.
- The medium line says what the number means.
- The muted line gives the period or the source.
- The footer must add something the badge doesn't: the cause, the target, the next step.
- Good: "3 invoices over 60 days" / "Since 1 June".
- Bad: "Trending up this month".

**Grid:** 1 column, 2 when the content area is at least 576px wide, 4 from 1024px. 16px gap.

### Chart card

**Text**
- The title says what is measured.
- The description says the period: "Paid invoices, last 3 months", shortened to "Last 3 months" in a narrow card.

**Range control** in the action slot.
- A segmented toggle (3 months / 30 days / 7 days) when the card is at least 768px wide.
- It collapses to a select when narrow.
- Default to the shortest range on phones.

**Plot**
- About 250px tall, full card width.
- Horizontal gridlines only. No axis lines and no tick marks.
- Tick labels sit 8px from the plot and at least 32px apart. Dates are short ("Jun 24").

**Tooltip**
- 12px text, lg radius, at least 128px wide.
- A colored dot per series and values in tabular figures.
- Labels come from a config (key → label + color). Never show raw data keys.

**Marks**
- Lines 1.5–2px.
- Area fills fade from the series color to about 10%.
- No 3D, no shadows on marks.

**Pick the chart by question**

| Question | Chart |
|---|---|
| Change over time | Line or area |
| Comparison | Bar |
| Part of a whole, ≤ 4 parts | Stacked bar (rarely a donut) |
| Distribution | Histogram |
| One number | A stat card, not a gauge |

### Data table

**Container**
- Hairline border, lg radius, clipped corners.
- It scrolls sideways inside itself, never the page.

**Header**
- Sticky, with a muted fill.
- 40px tall, 14px medium, no wrapping.

**Cells and rows**
- 8px padding, 14px text, no wrapping.
- Long text truncates, with the full value in a tooltip or `title`.
- Rows are 40–48px tall.

**Lines and fills**
- Row lines only: a hairline under each row, none under the last.
- Hover: muted at 50%. Selected: muted.
- Don't stack zebra stripes, borders and hover. Use lines plus hover.

**Alignment**
- Text left. Numbers and their headers right, in tabular figures.
- The status column gets a fixed width so its badges line up.

**Column order**
1. A selection checkbox (16px), with select-all in the header.
2. The primary identifier: a link that opens the row's detail in a drawer.
3. Attributes.
4. Numbers.
5. A row-actions menu: a 32px ⋯ button, menu aligned to the end, with the destructive item last and red.

**Status:** an outline badge with an icon and muted text (a filled check for done, a spinner for in progress), so it reads without color.

**Inline-editable cells**
- They look like plain text until hovered: transparent border, faint fill on hover, a border on focus.
- They save on Enter or blur and confirm with a toast: saving, then saved or failed with a retry.

**Drag handles** only when the order is real data.

**Toolbar above the table**
- Left: views as tabs with counts ("Overdue 3"), collapsing to a select when narrow, then search and filters.
- Right: a column-visibility menu and the primary action ("New invoice").

**Footer below the table**
- Left: "3 of 68 rows selected".
- Right: rows per page (10 / 20 / 50 / 100), "Page 2 of 7", and first / previous / next / last as 32px icon buttons with accessible labels.
- First and last hide when narrow.

**No matches:** one full-width row, about 96px tall, centered: "No invoices match these filters", with a clear-filters action.

### Forms and settings

**Labels, help and errors**
- The label sits above the field with an 8–12px gap.
- Help text is 14px muted.
- An error is 14px destructive under the field and replaces the help text while it shows.

**Spacing**
- Fields in a group sit about 28px apart.
- Checkbox and radio options sit 12px apart.
- Put label and field side by side only when the group is at least 448px wide.

**Inputs**
- 36px tall, 12px horizontal padding, md radius.
- Input-colored border, a faint shadow, transparent fill.
- The placeholder is an example, never the label.

**Settings pages:** sections separated by hairlines. Each section has its title and description on the left and its fields on the right (stacked on mobile). Use a save button per section or one sticky save bar. Not a grid of cards.

### Overlays

**Menus and selects**
- At least 128px wide, 4px padding, md radius, medium shadow, popover color.
- They slide about 8px in from the trigger's side.
- **Items:** 14px text, 6×8px padding, sm radius, 8px gap, 16px icons.
  - Checked items show a check in a 32px left indent.
  - Shortcuts are right-aligned in muted 12px.
  - Destructive items are red, with a 10% red fill on focus.

**Tooltip**
- Inverted: a foreground-colored fill with background-colored text.
- 12px text, 6×12px padding, md radius, a small arrow.
- Only for icon-only buttons and truncated text. Never for information the task needs.

**Dialog**
- At most 512px wide (and 32px narrower than the screen), 24px padding, 16px gap, lg radius.
- A 50% black overlay. It fades and scales in from 95% in about 200ms.
- Only for confirmations and short, focused tasks.

**Sheet / drawer**
- Slides in from an edge. 75% of the width, up to 384px; wider (to about 640px) for detail views.
- Use it for row detail and editing, so the table stays in place.
- It enters slower than it exits.

**Toasts**
- Bottom-right, for results of actions: saved, failed, undo.
- Async actions show saving, then saved or failed. Never a toast alone for a page that failed to load.

**Keyboard keys**
- 20px tall, at least 20px wide, sm radius, muted fill.
- 12px medium in the UI sans, not mono.

### Loading, empty, error

**Loading**
- Skeletons shaped like the content they replace: the same heights, with widths that vary row to row.
- Muted fill, md radius, a slow pulse.
- Spinners only inside buttons and small inline areas.
- The layout must not jump when data arrives.

**Empty**
- Centered in the area it replaces, 24px padding (48px from tablet), optionally a dashed border.
- An optional icon, then the title (18px medium), the description (14px muted, at most 384px wide) and the one action that fills it.
- Say what will appear here and how to get it.

**Three different states**
- **First-run:** "No invoices yet" / "Create invoice".
- **Filtered-empty:** "No invoices match these filters" / "Clear filters".
- **Error:** "Couldn't load invoices" / "Try again".

**Error:** shown in place of the content, with the plain cause and a retry.

## Content: dashboards run on data

**Demo data looks real**
- Believable names.
- Uneven numbers (1,284, not 1,000).
- Trends with noise.
- A few long values that test truncation.
- A few empty fields.
- Enough rows to need pagination.

**Numbers agree.** The stat card total equals what the table adds up to, and each percentage matches its counts.

**Dates are recent and in order.** The chart's range and the "Updated" time say the same thing.

**Ship no placeholder panels.** No empty tabs, no dashed boxes waiting for content. Build the view or remove the tab.

## Range

| Choice | Feels |
|---|---|
| Neutral grays, the brand hue only on primary and charts | Calm, professional (the default for most tools) |
| Neutrals tinted from the brand, a colored sidebar | Branded but still quiet |
| Compact: 32px controls, 13px text, 36px rows | Expert, data-heavy (ops, trading, logs) |
| Comfortable: 36–40px controls, 14px text, 48px rows | Mainstream, occasional users |
| Inset shell | Layered, app-like |
| Flat shell (sidebar plus a hairline) | Plain, document-like |
| Radius base 4–6px | Precise, technical |
| Radius base 10–12px | Friendly, modern |
| Dark by default | Long sessions in dim rooms (monitoring, media editing). Decide from the use scene, not the category |

## AI tells (and fixes)

| AI default | Fix |
|---|---|
| Four generic stat cards (revenue, new customers, active accounts, growth rate) on every dashboard | The 2–4 numbers this user acts on. Drop the rest |
| ⛔ A percentage with no period or baseline | "+12.5% vs last month" |
| Green for up and red for down, whatever the metric means | Color by good or bad, or stay neutral |
| Footer lines that repeat the badge ("Trending up this month") | Say what the number doesn't: the cause, the target, the next step |
| A tinted gradient on every stat card | A plain card |
| A sparkline or progress ring in every card as decoration | Only where the trend is the point, with real data |
| An area chart of "visitors" because dashboards have charts | Chart the page's main question, or no chart |
| Rainbow series, donuts with 6+ slices, gauges, 3D charts | One hue ramp, bars, a stat card |
| "Welcome back, Sarah 👋" as the page header | The page title and what needs attention |
| Everything in cards: tables inside cards inside cards | Cards for grouped summaries only. The table sits on the page |
| A sidebar with 12+ top-level items, each icon a different metaphor | 5–8 items, group the rest, one icon set |
| Centered cell text, left-aligned proportional numbers, wrapping rows | Text left, numbers right in tabular figures, no wrapping |
| Every column a colored pill | Badges for status only, plain text for the rest |
| ⛔ Empty placeholder panels or dashed boxes shipped in tabs | Build the view or remove the tab |
| Pulsing "live" dots on data refreshed hourly | "Updated 5 min ago" |
| A modal for editing a row | A drawer, or inline editing |
| Settings as a grid of cards | Sections separated by hairlines |
| Round numbers and smooth up-and-to-the-right charts | Data with noise, and totals that agree |
| Controls restyled as a costume (terminal prompts, instrument dials, ledger paper) | Standard controls in the app's type and palette |

## Reviewing a tool page

On top of `review.md`:

**Screenshot every state**
- Loading.
- First-run empty.
- Filtered-empty.
- Error.
- 100+ rows.
- Long values.
- The narrowest content area (sidebar open on a 1024px screen).
- Mobile.

**Keyboard**
- Tab through the toolbar, the table and one menu, and check focus is always visible.
- Check that Esc closes overlays and returns focus.

**The audit**
- Button heights: four sizes at most.
- The **Dashboards** section is clean: numbers right-aligned, every change has a baseline, no placeholder panels.

**Data:** the stat cards agree with the table.

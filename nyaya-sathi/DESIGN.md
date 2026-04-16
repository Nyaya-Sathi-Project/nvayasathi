# Design System Strategy: The Sovereign Ledger

## 1. Overview & Creative North Star
The creative North Star for this design system is **"The Sovereign Ledger."**
We are creating a digital experience that feels like an official, high-end editorial archive. It combines the weight of constitutional law with the fluid transparency of modern technology.

By moving away from a standard grid-and-line approach, we use **intentional asymmetry**—such as staggered headline placements and wide-margin "white space" (utilizing our Cream `surface` tones)—to create breathing room. Overlapping elements and layered surfaces replace the "flat box" aesthetic, ensuring the app feels like a curated journey through legal assistance rather than a cold database.

## 2. Colors: Tonal Sovereignty
The palette is rooted in tradition but executed with contemporary depth. We use Navy for authority, Gold for prestige, and Saffron for cultural resonance, all sitting upon a warm, sophisticated Cream foundation.

- **Primary:** Navy (`#000080` / `#00003c` gradient)
- **Secondary:** Gold (`#FFD700` / `#705d00`)
- **Tertiary:** Saffron (`#FF9933`)
- **Surface / Background:** Cream (`#FFFDD0` / `#fefccf`)
- **Text (On Surface):** `#1d1d03` (never use 100% black)

### The "No-Line" Rule
To achieve a premium editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts.

### Surface Hierarchy & Nesting
- **Base Layer:** `surface` (`#fefccf` / `#FFFDD0`) for the primary background.
- **Content Blocks:** Use `surface-container-low` (`#f8f6c9`) for secondary information.
- **Interactive Cards:** Use `surface-container-lowest` (`#ffffff`) to make them "pop" against the cream background.

### The Glass & Gradient Rule
Use **Glassmorphism** for floating action bars or language selectors. For primary CTAs, use a subtle linear gradient from `primary` (`#00003c`) to `primary_container` (`#000080`) at a 135-degree angle.

## 3. Typography: Editorial Authority
*   **Display & Headlines (Public Sans):** This is our authoritative voice. Use tight letter-spacing (-0.02em) to create a bold, "Sovereign Ledger" feel.
*   **Body & Titles (Inter):** Inter is our functional engine. It provides maximum readability for complex legal text.
*   **Labels (Inter):** Use all-caps with increased letter-spacing (0.05em) for category headers or official metadata to mimic the look of a stamped document.

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "tech." We achieve depth through atmospheric layering.
*   **The Layering Principle:** Depth is achieved by stacking `surface-container` tiers.
*   **Ambient Shadows:** If a floating element requires a shadow, use an extra-diffused blur (24px to 32px) at 6% opacity. Use a Navy-tinted shadow (`#00003c` at 0.06 alpha).
*   **The "Ghost Border" Fallback:** If a container requires a border for accessibility, use `#c6c5d5` at **15% opacity**.

## 5. Components & Interactions
*   **Buttons:** `on_primary` text on a `primary` to `primary_container` gradient with rounded corners.
*   **Animations:** The upload sequence uses a "Radar / Pulsing" scan animation rather than a laser line.

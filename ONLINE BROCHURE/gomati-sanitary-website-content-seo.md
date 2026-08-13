# Gomati Sanitary — Website Content & SEO Rewrite

Built for: gomatisanitary.vercel.app
Target reader: retailers, contractors, plumbers, and other wholesale/supply businesses in Nepal searching for a sanitary hardware & bathroom fittings supplier.
Approach: English + Romanized Nepali keywords, Nepal-wide targeting, plain sentences throughout — no marketing jargon.

---

## 1. Fix these three things first (biggest impact, least effort)

1. **Every page has the same title and description right now.** Home, About, Get Catalogue, and Contact all show the generic title "Gomati Sanitary" with the same one-line description. Google needs a unique, keyword-specific title and description per page. Section 4 below gives you the exact text for each page.
2. **Your About page says "Kathmandu" only.** It reads "supplying quality bathroom fittings and sanitary hardware to retailers and contractors across Kathmandu since 2015" — but you're targeting all of Nepal. Fixed in the rewrite below.
3. **Nowhere on the site does it say you import from China and India, or which brands you carry.** For a B2B buyer, sourcing and brand names are trust signals. Added below.

---

## 2. Recommended page structure

**One page per product Group**, using the same Group structure you already track in your GMT Brochure Google Sheet — not one page per individual product (66+ is too much to maintain by hand) and not one single page (too weak for search).

Each category page stays deliberately light — just three things, generated straight from your sheet so there's no manual writing per page:

1. **Group name** as the page heading — exactly as it appears in the Group column.
2. **One photo** representing that group (pulled from your synced product-image Drive folder).
3. **One reusable line of text**, same sentence pattern every time: *"Wholesale [Group Name] — sold in bulk carton and box quantities. Request pricing and available sizes."*
4. A "Request Catalogue" button.

Title tag pattern: `[Group Name] Wholesale Supplier in Nepal | Gomati Sanitary`
Meta description pattern: `Buy [Group Name] in bulk from Gomati Sanitary, Kathmandu. Wholesale rates for retailers and contractors across Nepal.`

Because it's just name + photo + one templated sentence, this is fully data-driven — new group, new page, no writing required. Suggested URL pattern: `gomatisanitary.vercel.app/products/[group-slug]`.

A placeholder starter list (`categories-starter.json`, provided alongside this doc) uses your known categories as a working example. Swap it for the real 66-group export from your sheet's Group column whenever you're ready — the page template doesn't change, only the data feeding it.

---

## 3. Keyword approach

**English trade terms** — how most retailers, contractors and shop owners actually search, even in Nepal, since product names themselves (angle cock, bib cock, CP fitting, PTMT) are English/industry terms with no common Nepali equivalent:
- sanitary hardware wholesaler Nepal
- bathroom fittings wholesale supplier Kathmandu
- sanitary hardware supplier Nepal
- CP fittings wholesaler Nepal
- angle cock wholesale Nepal / bib cock wholesale Nepal (repeat this pattern per group)
- plumbing hardware distributor Nepal

**Romanized Nepali phrases** — worth adding as secondary text (not replacing the English):
- sanitary saman thok Nepal (sanitary goods wholesale Nepal)
- hardware pasal Kathmandu (hardware shop Kathmandu)
- bathroom fitting thok byapari Nepal (bathroom fitting wholesale trader Nepal)

Have someone sanity-check the exact Nepali phrasing before it goes live — I've kept it simple and directional, but natural word order matters more than I can fully guarantee.

---

## 4. Title tags & meta descriptions

| Page | Title tag | Meta description |
|---|---|---|
| Home | Sanitary Hardware Wholesaler in Nepal \| Gomati Sanitary | Gomati Sanitary supplies sanitary hardware and bathroom fittings in bulk to retailers, contractors and dealers across Nepal. 1000+ products, 66+ categories. Request our catalogue today. |
| About | About Gomati Sanitary \| Sanitary Hardware Wholesaler Since 2015 | Gomati Sanitary has supplied sanitary hardware and bathroom fittings to retailers and contractors across Nepal since 2015. Imported from China & India, sold at wholesale rates. |
| Get Catalogue | Request Wholesale Catalogue \| Gomati Sanitary | Get the full Gomati Sanitary wholesale catalogue — 1000+ sanitary hardware and bathroom fitting products for retailers, contractors and dealers across Nepal. |
| Contact | Contact Us \| Gomati Sanitary, Sanitary Hardware Wholesaler | Contact Gomati Sanitary for sanitary hardware and bathroom fitting orders. Visit our Kathmandu office, call, WhatsApp, or send a message — we deliver across Nepal. |

(Titles under ~60 characters, descriptions under ~155, so Google doesn't cut them off.)

---

## 5. Page-by-page content

### HOME

**H1:** Sanitary Hardware & Bathroom Fittings — Wholesale Supply Across Nepal

**Intro paragraph** (replaces current hero text):
> Gomati Sanitary is a Kathmandu-based wholesaler of sanitary hardware and bathroom fittings, importing from China and India and supplying retailers, contractors and dealers across Nepal. We stock 1000+ products across 66+ categories — angle cocks, bib cocks, valves, shower arms, cisterns, basin and urinal parts, connection pipes and more — sold in bulk carton and box quantities at wholesale rates.

**Buttons:** keep "Get Catalogue" and "Get In Touch" as-is.

**Product Categories section heading:** Browse Our Product Categories
**Sub-text:** 66+ categories of sanitary hardware and bathroom fittings, organized by group. Tap any category to see what's inside and request pricing.

**Trust-signal cards** (keep the three-card format, tightened copy):
- **Wide Product Range** — Taps, valves, showers, cisterns and hundreds more sanitary fittings, all in one place.
- **Wholesale Pricing** — Sold in bulk carton and box quantities, built for retailers, contractors and distributors.
- **Trusted Since 2015** — Over a decade supplying quality hardware to businesses across Nepal.

**NEW — Brands We Carry section** (add after the categories section):
**Heading:** Brands We Carry
**Sub-text:** We manufacture under our own brands and also stock trusted names from India and China.
- **Our Own Brands:** Orion (Bath Fittings & Accessories), RZ-Star (Bath Fittings & Accessories)
- **Brands We Distribute:** Matrix, GMT, NBT, Karl, Cizer

Show each as a logo image (files provided in `brand-logos/`), grouped under the two headings above — own brands first, distributed brands after.

**NEW — How Ordering Works section** (add near the bottom of Home, or on Get Catalogue — see below):
> We sell in any quantity — no minimum order. Orders placed in full carton quantities get delivery priority and better rates. Nearby cities receive orders within 2 days; farther cities across Nepal typically take 4–5 days. Every order is carefully packed and repacked for safe transport and easy shelf storage.

**Bottom CTA banner:**
> Want to see our full range? Request our catalogue and our team will send it directly to you.
> [Request Catalogue]

---

### ABOUT

**H1:** Your Wholesale Partner for Sanitary Hardware in Nepal

**What We Do** (rewrite):
> Gomati Sanitary has been supplying sanitary hardware and bathroom fittings to retailers and contractors across Nepal since 2015. We import our range from trusted manufacturers in China and India — angle cocks, bib cocks, ball valves, gate valves, shower arms, cisterns, basin and urinal parts, connection pipes, and much more — including our own Orion and RZ-Star brands.
>
> Every product is organized by group and subgroup and sold in standard carton and box quantities, so bulk orders are easy to plan. To protect our wholesale pricing, we share the full catalogue directly with verified businesses — [request it here].

**Stat cards** — keep as-is: "11+ Years In Business", "1000+ Variety Of Products", "Kathmandu — Based In Nepal".

---

### GET CATALOGUE

**H1:** Request Our Catalogue

**Intro** (rewrite):
> To protect our wholesale pricing, we share our complete catalogue — 1000+ sanitary hardware and bathroom fitting products across 66+ categories — directly with verified retailers, contractors and business buyers across Nepal. Fill in your details below and our team will send it to you.

**Form fields:** Name, Email, Phone (optional), Message, plus a new **Business Name** field — costs nothing to add, and lets you tell a genuine retailer/contractor lead apart from a casual browser at a glance.

**Small addition below the form intro:**
> No minimum order — carton-quantity orders get priority delivery and better rates.

---

### CONTACT

**H1:** Get In Touch

**Intro** — keep as-is:
> Questions about products, pricing or bulk orders? Send us a message or reach out directly.

**Small addition under "Visit":**
> We deliver across Nepal from our Kathmandu warehouse — nearby cities in 2 days, farther cities in 4–5 days.

Everything else (Visit/Call/Email/Follow blocks, map, form) is fine as-is.

---

## 6. To finish this properly

Already have: brand list, MOQ policy, delivery times, packaging differentiator, brand logo files.

Optional, whenever convenient: the real 66-Group list exported from your GMT Brochure sheet (Group column) with one representative photo per group, to replace the placeholder `categories-starter.json`. Everything else in this plan works as-is without it.

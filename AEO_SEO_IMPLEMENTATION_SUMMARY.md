# AEO, ASO & SEO Implementation Summary

This document summarizes the changes made to improve **Answer Engine Optimization (AEO)**, **App Store Optimization (ASO)**, and **SEO** for idatagear.com. No business content or logic was changed; only structural and technical enhancements were applied.

---

## 1. AI-Specific Sitemaps (Task 1)

### `llms.txt` (root)

- **Purpose:** Single file for AI agents (Gemini, Perplexity, GPT, etc.) to understand your brand and products.
- **Structure:** H1 for brand (iDataGear · McLearn®), quote block for mission, H2 sections for each product with links.
- **Products covered:** Learn English, Learn Chinese, Learn Cantonese, Great Cantonese Dictionary, Xie Zi, Open Interview.
- **Links:** Web app URLs and Google Play Store URLs for each app.
- **URL:** `https://idatagear.com/llms.txt`

### `llms-full.txt` (root)

- **Purpose:** Flattened Markdown of core “how-to” guides for deeper AI ingestion.
- **Content:** How to learn Mandarin (HSK), Cantonese, English (CEFR), use Great Cantonese Dictionary, practice stroke order (Xie Zi), prepare for interviews, and where to download apps.
- **URL:** `https://idatagear.com/llms-full.txt`

---

## 2. Answer-First (AF) HTML Structure (Task 2)

### Main site (`index.html`)

- **FAQ section added** (`#faq`): Question-style H3s with direct-answer paragraphs (40–60 words), using `<article>` and `<section>` for hierarchy.
- **FAQPage JSON-LD** in `<head>`: Same Q&As in schema for answer engines and rich results.
- **Existing product sections:** Left unchanged; new FAQ section provides the “answer-first” layer without altering product copy.

### Product subpages (learnchinese, learncantonese, learnenglish, gcd)

- These are Flutter app shells (single `index.html` + app bundle). No in-page H2/article content was changed.
- **Head-level enhancements:** Canonical, hreflang, action-oriented meta descriptions (see Task 4).

---

## 3. Advanced JSON-LD Schema (Task 3)

### Homepage (`index.html`)

- **Organization:** Already present; unchanged.
- **FAQPage:** New block with 5 questions/answers (Learn Chinese, Learn Cantonese, Great Cantonese Dictionary, Learn English, Where to download McLearn apps).

### Product pages

- **Learn Chinese** (`learnchinese/index.html`): `SoftwareApplication` with `operatingSystem`: "Android, Web", `applicationCategory`: "EducationalApplication", `offers` (price 0), `installUrl` (Google Play). Fixed `url` typo (was `learnlearnchinese`, now `learnchinese`).
- **Learn Cantonese** (`learncantonese/index.html`): Same `SoftwareApplication` schema + `installUrl`.
- **Learn English** (`learnenglish/index.html`): Switched from `WebApplication` to `SoftwareApplication` with Android, `url`, `installUrl`.
- **Great Cantonese Dictionary** (`gcd/index.html`):
  - **DefinedTermSet:** Name, description, URL, publisher; `hasDefinedTerm` with sample terms (Jyutping, Cantonese tones) so AI knowledge panels can cite definitions.
  - **SoftwareApplication:** Same pattern as other apps (Education, free, Android/Web, `installUrl`).

---

## 4. Multi-Language SEO (Task 4)

### hreflang

- **Homepage:** `en`, `zh-Hans`, `zh-Hant`, `x-default` → all point to `https://idatagear.com/` (ready for future localized URLs).
- **Learn Chinese:** Same four hreflang tags → `https://idatagear.com/learnchinese/`.
- **Learn Cantonese:** Same → `https://idatagear.com/learncantonese/`.
- **Learn English:** Same → `https://idatagear.com/learnenglish/`.
- **GCD:** Same → `https://idatagear.com/gcd/`.

### Action-oriented meta descriptions

- **Homepage:** “Download free McLearn® apps: Learn Chinese (HSK), Learn Cantonese, Learn English (CEFR), Great Cantonese Dictionary, Xie Zi stroke order. Use on web or Android. Custom BI and software development by iDataGear.”
- **Learn Chinese:** “Download Learn Chinese free: HSK 1–3 vocabulary, reading comprehension, and pronunciation. Use on web or Android. Master Mandarin with McLearn® by iDataGear.”
- **Learn Cantonese:** “Download Learn Cantonese free: stories, Hong Kong slang, dialogues. Use on web or Android. 識聼識講 廣東話 with McLearn® by iDataGear.”
- **Learn English:** “Download Learn English free: CEFR A1–C2 vocabulary, IPA pronunciation, reading. Use on web or Android. Master English with McLearn® by iDataGear.”
- **GCD:** “Download the offline Cantonese dictionary used by learners worldwide. Jyutping, tone data, idioms, usage notes. Free on web and Android. Great Cantonese Dictionary by iDataGear.”

---

## 5. Files Created or Modified

| File                        | Action                                                                                    |
| --------------------------- | ----------------------------------------------------------------------------------------- |
| `llms.txt`                  | Created                                                                                   |
| `llms-full.txt`             | Created                                                                                   |
| `index.html`                | Updated: hreflang, meta, FAQPage schema, FAQ section, FAQ CSS                             |
| `learnchinese/index.html`   | Updated: canonical, hreflang, meta, SoftwareApplication schema, fixed URL                 |
| `learncantonese/index.html` | Updated: viewport, meta, canonical, hreflang, SoftwareApplication schema                  |
| `learnenglish/index.html`   | Updated: canonical, hreflang, meta, SoftwareApplication schema                            |
| `gcd/index.html`            | Updated: meta, keywords, canonical, hreflang, DefinedTermSet + SoftwareApplication schema |
| `assets/css/style.css`      | Updated: `.faq-list`, `.faq-item` styles                                                  |
| `robots.txt`                | Updated: comment about llms.txt / llms-full.txt                                           |

---

## 6. What You Can Do Next

1. **Verify llms.txt in production:** Open `https://idatagear.com/llms.txt` and `https://idatagear.com/llms-full.txt` after deploy.
2. **Add localized URLs later:** When you have zh-Hans/zh-Hant pages, point `hreflang` to those URLs instead of the English one.
3. **Expand DefinedTermSet (GCD):** Add more `DefinedTerm` entries for important Cantonese terms so AI can cite your dictionary.
4. **Optional:** Add a visible link to “For AI / LLMs” in the footer pointing to `llms.txt` so crawlers and users can discover it.

All changes are backward-compatible and do not remove or alter existing business content or app behavior.

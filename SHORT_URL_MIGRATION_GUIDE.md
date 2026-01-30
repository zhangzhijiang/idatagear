# Short URL Migration Guide

## Overview

The website now has **two sets of URLs** for the language learning apps - the original long URLs and new short URLs. Both are fully functional standalone applications (not redirects).

## Migration Strategy

### Current Status

**Long URLs (Original - Being Phased Out)**

- `https://idatagear.com/learnchinese/`
- `https://idatagear.com/learncantonese/`
- `https://idatagear.com/learnenglish/`

**Short URLs (New - Primary Going Forward)**

- `https://idatagear.com/chinese/` ✅
- `https://idatagear.com/cantonese/` ✅
- `https://idatagear.com/english/` ✅

### What Changed

1. **Complete Copies**: Each short URL folder contains a **full copy** of the Flutter web app (not a redirect)
2. **Updated Paths**: All `<base href>` tags, canonical URLs, and schema.org URLs point to the short paths
3. **Independent Apps**: Both versions work completely independently
4. **SEO Updated**:
   - Canonical URLs point to short versions
   - `sitemap.xml` includes both sets
   - `llms.txt` and `llms-full.txt` reference short URLs

## Migration Timeline

### Phase 1: Soft Launch (Current)

- ✅ Both URLs are live and functional
- ✅ Keep long URLs for existing users
- ✅ Start advertising short URLs only
- ✅ Update all marketing materials to use short URLs
- ✅ Canonical tags point to short URLs (tells search engines these are primary)

### Phase 2: Active Migration (1-3 months)

- Update social media profiles
- Update Google Play Store descriptions
- Update email signatures
- Monitor analytics for traffic shift
- Update all blog posts/articles to reference short URLs

### Phase 3: Long URLs Deprecation (3-6 months)

Once short URL traffic exceeds 80% of total:

- Convert long URL folders to redirect-only pages
- Update `sitemap.xml` to remove long URLs
- Add deprecation notices to long URLs

### Phase 4: Final Cleanup (6+ months)

- Remove long URL folders entirely
- Keep only redirects if needed for legacy bookmarks

## For Marketing/Communications

**Always use the short URLs:**

```
Learn Chinese: idatagear.com/chinese
Learn Cantonese: idatagear.com/cantonese
Learn English: idatagear.com/english
```

**Benefits to communicate:**

- Easier to remember
- Faster to type
- Cleaner for print materials
- Better for social media sharing

## Technical Notes

### Files Structure

```
idatagear/
├── learnchinese/      (Original - keep for now, phase out later)
├── learncantonese/    (Original - keep for now, phase out later)
├── learnenglish/      (Original - keep for now, phase out later)
├── chinese/           (New primary - full app copy)
├── cantonese/         (New primary - full app copy)
└── english/           (New primary - full app copy)
```

### Key Differences in Short URL Versions

1. `<base href="/chinese/">` instead of `<base href="/learnchinese/">`
2. `<link rel="canonical" href="https://idatagear.com/chinese/">`
3. All `hreflang` tags point to short URLs
4. Schema.org `url` field uses short URLs

### Maintenance

**Important**: When rebuilding Flutter apps, you'll eventually need to:

1. For long URLs (during transition):

   ```bash
   flutter build web --base-href /learnchinese/
   ```

2. For short URLs (new standard):
   ```bash
   flutter build web --base-href /chinese/
   ```

Then copy the build output to the appropriate folder.

## Analytics Tracking

Monitor these metrics during migration:

1. **Traffic by URL path**:
   - `/learnchinese/` vs `/chinese/`
   - `/learncantonese/` vs `/cantonese/`
   - `/learnenglish/` vs `/english/`

2. **User engagement**: Ensure no drop in metrics on short URLs

3. **Search rankings**: Monitor that short URLs maintain/improve SEO position

4. **Bounce rate**: Watch for any increase that might indicate broken links

## Rollback Plan

If issues arise with short URLs:

1. Both versions are independent and fully functional
2. Can immediately revert marketing to long URLs
3. Update canonical tags back to long URLs if needed
4. No data loss or functionality impact

## Questions?

Contact: [Your team/email]

---

**Last Updated**: January 30, 2026  
**Status**: Phase 1 - Soft Launch Complete ✅

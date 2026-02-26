# Admin Panel Design — Muse Bar Tbilisi

## Overview
Full admin dashboard at `/admin` for managing events, menu, gallery, and viewing statistics. Uses Supabase Auth for authentication and Supabase Storage for image uploads.

## Routes
- `/admin/login` — Email/password login
- `/admin/dashboard` — Stats overview + quick actions
- `/admin/events` — Events CRUD (create, edit, delete, publish/unpublish)
- `/admin/menu` — Menu categories + items CRUD
- `/admin/gallery` — Photo upload/manage via Supabase Storage

## Supabase Tables

### events
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK, default gen_random_uuid() |
| title_ka | text | Georgian title |
| title_en | text | English title |
| title_ru | text | Russian title |
| description_ka | text | |
| description_en | text | |
| description_ru | text | |
| date | date | Event date |
| time | text | e.g. "21:00" |
| image_url | text | nullable, from Storage |
| is_published | boolean | default false |
| created_at | timestamptz | default now() |

### menu_categories
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| name_ka | text | |
| name_en | text | |
| name_ru | text | |
| sort_order | int4 | for ordering |
| is_active | boolean | default true |
| created_at | timestamptz | |

### menu_items
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| category_id | uuid | FK → menu_categories.id |
| name_ka | text | |
| name_en | text | |
| name_ru | text | |
| description_ka | text | nullable |
| description_en | text | nullable |
| description_ru | text | nullable |
| price | numeric | |
| image_url | text | nullable |
| is_available | boolean | default true |
| sort_order | int4 | |
| created_at | timestamptz | |

### gallery_photos
| Column | Type | Notes |
|--------|------|-------|
| id | uuid | PK |
| url | text | Supabase Storage URL |
| caption_ka | text | nullable |
| caption_en | text | nullable |
| caption_ru | text | nullable |
| sort_order | int4 | |
| is_published | boolean | default true |
| created_at | timestamptz | |

## Supabase Storage
- Bucket: `gallery` — public, for gallery photos
- Bucket: `menu` — public, for menu item images
- Bucket: `events` — public, for event images

## Auth
- Supabase Auth with email/password
- Single admin user created via Supabase Dashboard
- Server-side session check on all `/admin/dashboard/*` routes
- Redirect to `/admin/login` if not authenticated

## Admin UI
- Dark theme matching site aesthetic (#0D0D0D, #C9A84C gold accents)
- Sidebar navigation (Dashboard, Events, Menu, Gallery)
- Dashboard shows: event count, menu item count, gallery photo count
- All CRUD forms support 3-language input (ka/en/ru tabs)

## RLS Policies
- Public read for published items (is_published = true)
- Authenticated write for admin operations
- Storage: public read, authenticated upload/delete

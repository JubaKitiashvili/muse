-- Seed menu_item_variants from oddmenu data
-- Also update parent item price to 0 for items that have variants

-- 1. ქართული სალათი → კახური ზეთით 20₾, ნიგვზით 22₾
UPDATE public.menu_items SET price = 0 WHERE name_ka = 'ქართული სალათი';
INSERT INTO public.menu_item_variants (item_id, name_ka, name_en, name_ru, price, sort_order)
SELECT id, 'კახური ზეთით', 'Sunflower oil', 'подсолнечное масло', 20, 0 FROM public.menu_items WHERE name_ka = 'ქართული სალათი'
UNION ALL
SELECT id, 'ნიგვზით', 'Wallnuts', 'грецкие орехи', 22, 1 FROM public.menu_items WHERE name_ka = 'ქართული სალათი';

-- 2. კირკე ყურძნის არაყი → ჭიქა 17₾, ბოთლი 250₾
UPDATE public.menu_items SET price = 0 WHERE name_ka = 'კირკე ყურძნის არაყი';
INSERT INTO public.menu_item_variants (item_id, name_ka, name_en, name_ru, price, sort_order)
SELECT id, 'ჭიქა', 'Glass', 'Рюмка', 17, 0 FROM public.menu_items WHERE name_ka = 'კირკე ყურძნის არაყი'
UNION ALL
SELECT id, 'ბოთლი', 'Bottle', 'Бутилка', 250, 1 FROM public.menu_items WHERE name_ka = 'კირკე ყურძნის არაყი';

-- 3. ჯინ ტონიკი → 8 ვარიანტი (სხვადასხვა ჯინით)
UPDATE public.menu_items SET price = 0 WHERE name_ka = 'ჯინ ტონიკი';
INSERT INTO public.menu_item_variants (item_id, name_ka, name_en, name_ru, price, sort_order)
SELECT id, 'გორდონსით', 'GORDON''S', 'Гордонс', 22, 0 FROM public.menu_items WHERE name_ka = 'ჯინ ტონიკი'
UNION ALL
SELECT id, 'ბიფიტერი', 'BEEFEATER', 'Бифитер', 24, 1 FROM public.menu_items WHERE name_ka = 'ჯინ ტონიკი'
UNION ALL
SELECT id, 'დიარჯენტი', 'D''ARGENT', 'Д''Арждент', 26, 2 FROM public.menu_items WHERE name_ka = 'ჯინ ტონიკი'
UNION ALL
SELECT id, 'ანტიდოტი', 'ANTIDOTE', 'Антидот', 26, 3 FROM public.menu_items WHERE name_ka = 'ჯინ ტონიკი'
UNION ALL
SELECT id, 'ბომბეი საფირი', 'BOMBAY SAPPHIRE', 'Бомбейский сапфир', 30, 4 FROM public.menu_items WHERE name_ka = 'ჯინ ტონიკი'
UNION ALL
SELECT id, 'ბოტანისტი', 'BOTANIST', 'Ботанист', 32, 5 FROM public.menu_items WHERE name_ka = 'ჯინ ტონიკი'
UNION ALL
SELECT id, 'ჰენდრიქსი', 'HENDRICK''S', 'Хендрикс', 35, 6 FROM public.menu_items WHERE name_ka = 'ჯინ ტონიკი'
UNION ALL
SELECT id, 'ელექტრო', 'ELEKTRO', 'Електро', 42, 7 FROM public.menu_items WHERE name_ka = 'ჯინ ტონიკი';

-- 4. სახლის ლიმონათი კენკრის → ჩვეულებრივი 18₾, 1ლ 45₾
UPDATE public.menu_items SET price = 0 WHERE name_ka = 'სახლის ლიმონათი კენკრის';
INSERT INTO public.menu_item_variants (item_id, name_ka, name_en, name_ru, price, sort_order)
SELECT id, 'სახლის ლიმონათი კენკრის', 'HOMEMADE BERRY LEMONADE', 'домашний лимонад с ягодами', 18, 0 FROM public.menu_items WHERE name_ka = 'სახლის ლიმონათი კენკრის'
UNION ALL
SELECT id, 'სახლის ლიმონათი კენკრის 1ლ', 'Lemonade with berries 1L', 'домашний лимонад с ягодами 1Л', 45, 1 FROM public.menu_items WHERE name_ka = 'სახლის ლიმონათი კენკრის';

-- 5. თელიანი ველი → ჭიქა 15₾, ბოთლი 150₾
UPDATE public.menu_items SET price = 0 WHERE name_ka LIKE 'თელიანი ველი%';
INSERT INTO public.menu_item_variants (item_id, name_ka, name_en, name_ru, price, sort_order)
SELECT id, 'ჭიქა', 'Glass', 'рюмка', 15, 0 FROM public.menu_items WHERE name_ka LIKE 'თელიანი ველი%'
UNION ALL
SELECT id, 'ბოთლი', 'Bottle', 'Бутылка', 150, 1 FROM public.menu_items WHERE name_ka LIKE 'თელიანი ველი%';

-- 6. სახლის ლიმონათი ლიმონი პიტნა → ჩვეულებრივი 18₾, 1ლ 45₾
UPDATE public.menu_items SET price = 0 WHERE name_ka = 'სახლის ლიმონათი ლიმონი პიტნა';
INSERT INTO public.menu_item_variants (item_id, name_ka, name_en, name_ru, price, sort_order)
SELECT id, 'სახლის ლიმონათი ლიმონი პიტნა', 'LEMONADE WITH LEMON & MINT', 'домашний лимонад с лимоном и мятой', 18, 0 FROM public.menu_items WHERE name_ka = 'სახლის ლიმონათი ლიმონი პიტნა'
UNION ALL
SELECT id, 'სახლის ლიმონათი ლიმონი პიტნა 1ლ', 'Lemonade with Lemon & Mint 1L', 'домашний лимонад с лимоном и мятой 1Л', 45, 1 FROM public.menu_items WHERE name_ka = 'სახლის ლიმონათი ლიმონი პიტნა';

-- 7. შატო მუხრანი → ჭიქა 30₾, ბოთლი 450₾
UPDATE public.menu_items SET price = 0 WHERE name_ka LIKE 'შატო მუხრანი%';
INSERT INTO public.menu_item_variants (item_id, name_ka, name_en, name_ru, price, sort_order)
SELECT id, 'ჭიქა', 'Glass', 'рюмка', 30, 0 FROM public.menu_items WHERE name_ka LIKE 'შატო მუხრანი%'
UNION ALL
SELECT id, 'ბოთლი', 'Bottle', 'Бутылка', 450, 1 FROM public.menu_items WHERE name_ka LIKE 'შატო მუხრანი%';

-- 8. სახლის ლიმონათი → ჩვეულებრივი 18₾, 1ლ 45₾
-- Note: using exact match to avoid conflicting with other lemonades
UPDATE public.menu_items SET price = 0 WHERE name_ka = 'სახლის ლიმონათი';
INSERT INTO public.menu_item_variants (item_id, name_ka, name_en, name_ru, price, sort_order)
SELECT id, 'სახლის ლიმონათი', 'HOMEMADE LEMONADE', 'домашний лимонад', 18, 0 FROM public.menu_items WHERE name_ka = 'სახლის ლიმონათი'
UNION ALL
SELECT id, 'სახლის ლიმონათი 1ლ', 'Other Lemonade 1L', 'домашний лимонад 1Л', 45, 1 FROM public.menu_items WHERE name_ka = 'სახლის ლიმონათი';

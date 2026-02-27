-- =============================================
-- Menu Items: English & Russian Translations
-- =============================================

-- ─── აპეტაიზერი (Appetizer) ───
UPDATE public.menu_items SET
  name_en = 'Eggplant Rolls with Walnuts',
  name_ru = 'Баклажаны с орехами'
WHERE name_ka = 'ნიგვზიანი ბადრიჯანი';

UPDATE public.menu_items SET
  name_en = 'Georgian & European Cheese Board',
  name_ru = 'Грузинская и европейская сырная доска',
  description_en = 'Sulguni, Imeruli, Gouda, Blue cheese',
  description_ru = 'Сулугуни, Имерули, Гауда, С плесенью'
WHERE name_ka = 'ქართული და ევროპული ყველის დაფა';

UPDATE public.menu_items SET
  name_en = 'Ajapsandali',
  name_ru = 'Аджапсандали',
  description_en = 'Bell pepper, eggplant, tomato, mixed herbs',
  description_ru = 'Болгарский перец, баклажан, помидор, микс зелени'
WHERE name_ka = 'აჯაფსანდალი';

UPDATE public.menu_items SET
  name_en = 'Pickle Assortment',
  name_ru = 'Ассорти из солений',
  description_en = 'Cucumber, pepper, jonjoli, garlic, green tomato',
  description_ru = 'Огурцы, перец, джонджоли, чеснок, зелёные помидоры'
WHERE name_ka = 'მჟავის ნაკრები';

UPDATE public.menu_items SET
  name_en = 'Pkhali Assortment',
  name_ru = 'Пхали ассорти',
  description_en = 'Eggplant, spinach with garlic and Georgian spices, mchadi',
  description_ru = 'Баклажан, шпинат с чесноком и грузинскими специями, мчади'
WHERE name_ka = 'ფხალი ფხული';

-- ─── სალათი (Salad) ───
UPDATE public.menu_items SET
  name_en = 'Georgian Salad',
  name_ru = 'Грузинский салат',
  description_en = 'Cucumber, tomato, walnuts, sunflower oil, herbs, cilantro',
  description_ru = 'Огурцы, помидоры, орехи, подсолнечное масло, зелень, кинза'
WHERE name_ka = 'ქართული სალათი';

-- ─── საუზმე (Breakfast) ───
UPDATE public.menu_items SET
  name_en = 'Signature Salad "MUSE"',
  name_ru = 'Фирменный салат «MUSE»',
  description_en = 'Sulguni, arugula, seasonal fruit, Dijon mustard, honey, olive oil',
  description_ru = 'Сулугуни, руккола, сезонные фрукты, дижонская горчица, мёд, оливковое масло'
WHERE name_ka = 'საფირმო სალათი "MUSE"';

UPDATE public.menu_items SET
  name_en = 'Matsoni Dessert',
  name_ru = 'Десерт из мацони',
  description_en = 'Yogurt-based dessert (made with matsoni)',
  description_ru = 'Десерт на основе мацони'
WHERE name_ka = 'მაწვნის დესერტი';

UPDATE public.menu_items SET
  name_en = 'Chicken Sandwich',
  name_ru = 'Сэндвич с курицей'
WHERE name_ka = 'ქათმის სენდვიჩი';

UPDATE public.menu_items SET
  name_en = 'Chikhirtma',
  name_ru = 'Чихиртма'
WHERE name_ka = 'ჩიხირთმა';

UPDATE public.menu_items SET
  name_en = 'Omelette',
  name_ru = 'Омлет'
WHERE name_ka = 'ომლეტი';

UPDATE public.menu_items SET
  name_en = 'Napoleon Dessert',
  name_ru = 'Десерт Наполеон'
WHERE name_ka = 'ნაპოლეონის დესერტი';

-- ─── ტკბილეული (Desserts) ───
UPDATE public.menu_items SET
  name_en = 'Watermelon',
  name_ru = 'Арбуз'
WHERE name_ka = 'საზამთრო';

UPDATE public.menu_items SET
  name_en = 'Nesvi Board',
  name_ru = 'Доска Несви'
WHERE name_ka = 'ნესვის დაფა';

UPDATE public.menu_items SET
  name_en = 'Napoleon Dessert',
  name_ru = 'Десерт Наполеон',
  description_en = 'Puff pastry, cream, whipped cream, sugar, butter, egg, milk, vanilla extract, powdered sugar',
  description_ru = 'Слоёное тесто, крем, взбитые сливки, сахар, масло, яйцо, молоко, ванильный экстракт, сахарная пудра'
WHERE name_ka = 'დესერტი-ნაპალეონი';

UPDATE public.menu_items SET
  name_en = 'Vanilla Ice Cream with Berry Sauce',
  name_ru = 'Ванильное мороженое с ягодным соусом',
  description_en = 'Vanilla ice cream with berry jam',
  description_ru = 'Ванильное мороженое с ягодным конфитюром'
WHERE name_ka LIKE 'ვანილის ნაყინი კენკრის სოუსით%';

UPDATE public.menu_items SET
  name_en = 'Fruit Board',
  name_ru = 'Фруктовая доска'
WHERE name_ka = 'ხილის დაფა';

-- ─── ცომეული (Pastry) ───
UPDATE public.menu_items SET
  name_en = 'Adjarian Khachapuri',
  name_ru = 'Аджарский хачапури',
  description_en = 'Traditional Georgian cheese boat with egg and butter',
  description_ru = 'Традиционная грузинская лодочка с сыром, яйцом и маслом'
WHERE name_ka = 'აჭარული ხაჭაპური';

UPDATE public.menu_items SET
  name_en = 'Lobiani',
  name_ru = 'Лобиани',
  description_en = 'Bean-filled bread',
  description_ru = 'Хлеб с фасолью'
WHERE name_ka = 'ლობიანი';

UPDATE public.menu_items SET
  name_en = 'Megrelian Khachapuri',
  name_ru = 'Мегрельский хачапури'
WHERE name_ka = 'მეგრული ხაჭაპური';

UPDATE public.menu_items SET
  name_en = 'Imeretian Khachapuri',
  name_ru = 'Имеретинский хачапури'
WHERE name_ka = 'იმერული ხაჭაპური';

UPDATE public.menu_items SET
  name_en = 'Georgian Bread',
  name_ru = 'Грузинский хлеб'
WHERE name_ka = 'ქართული პური';

UPDATE public.menu_items SET
  name_en = 'Mchadi',
  name_ru = 'Мчади'
WHERE name_ka = 'მჭადი';

-- ─── ცხელი კერძები (Hot Dishes) ───
UPDATE public.menu_items SET
  name_en = 'Family-Style Potatoes',
  name_ru = 'Картофель по-домашнему',
  description_en = 'Fried potatoes with tarragon tkemali sauce',
  description_ru = 'Жареный картофель с соусом ткемали из тархуна'
WHERE name_ka = 'კარტოფილი ოჯახურად';

UPDATE public.menu_items SET
  name_en = 'Chicken Kebab',
  name_ru = 'Шашлык из курицы',
  description_en = 'Grilled chicken kebab',
  description_ru = 'Шашлык из курицы на гриле'
WHERE name_ka = 'ქათმის მწვადი';

UPDATE public.menu_items SET
  name_en = 'Pork Kebab',
  name_ru = 'Шашлык из свинины',
  description_en = 'Pork kebab with onion',
  description_ru = 'Шашлык из свинины с луком'
WHERE name_ka = 'ღორის ხორცის მწვადი';

UPDATE public.menu_items SET
  name_en = 'Abkhazura Tashmijabi',
  name_ru = 'Абхазура Ташмиджаби',
  description_en = 'Abkhazura, cheese puree, tkemali',
  description_ru = 'Абхазура, пюре с сыром, ткемали'
WHERE name_ka = 'აფხაზურა თაშმიჯაბი';

UPDATE public.menu_items SET
  name_en = 'Chicken in Tarragon Sauce',
  name_ru = 'Цыплёнок в соусе из тархуна',
  description_en = 'Fried chicken with tarragon and tkemali sauce',
  description_ru = 'Жареный цыплёнок с соусом из тархуна и ткемали'
WHERE name_ka = 'წიწილა ტარხუნის სოუსით';

UPDATE public.menu_items SET
  name_en = 'Clay Pot Lobio',
  name_ru = 'Лобио в горшочке'
WHERE name_ka = 'ქოთნის ლობიო';

UPDATE public.menu_items SET
  name_en = 'Chicken Liver',
  name_ru = 'Куриная печень',
  description_en = 'Grilled chicken liver, onion, Georgian spices',
  description_ru = 'Куриная печень на гриле, лук, грузинские специи'
WHERE name_ka = 'ქათმის ღვიძლი';

UPDATE public.menu_items SET
  name_en = 'Mushroom Chashushuli',
  name_ru = 'Грибное чашушули',
  description_en = 'Button mushrooms, onion, cilantro, spices',
  description_ru = 'Шампиньоны, лук, кинза, специи'
WHERE name_ka = 'სოკოს ჩაშუშული';

UPDATE public.menu_items SET
  name_en = 'Mushrooms with Sulguni on Ketsi',
  name_ru = 'Грибы с сулугуни на кеци',
  description_en = 'Melted sulguni cheese in mushroom caps',
  description_ru = 'Расплавленный сулугуни в шляпках грибов'
WHERE name_ka = 'სოკო სულგუნით კეცზე';

UPDATE public.menu_items SET
  name_en = 'Fried Trout with Lemon Sauce',
  name_ru = 'Жареная форель с лимонным соусом',
  description_en = 'Trout, lemon sauce',
  description_ru = 'Форель, лимонный соус'
WHERE name_ka = 'შემწვარი კალმახი ლიმნის სოუსით';

UPDATE public.menu_items SET
  name_en = 'Shkmeruli Chicken',
  name_ru = 'Цыплёнок шкмерули',
  description_en = 'Fried chicken with garlic and cream sauce',
  description_ru = 'Жареный цыплёнок в чесночно-сливочном соусе'
WHERE name_ka = 'წიწილა შქმერულად';

UPDATE public.menu_items SET
  name_en = 'Veal Chashushuli',
  name_ru = 'Чашушули из телятины',
  description_en = 'Veal, tomato, bell pepper, herbs',
  description_ru = 'Телятина, помидор, болгарский перец, зелень'
WHERE name_ka = 'ხბოს ხორცის ჩაშუშული';

UPDATE public.menu_items SET
  name_en = 'Khinklukebi with Tarragon Sauce',
  name_ru = 'Хинклуки с соусом из тархуна'
WHERE name_ka = 'ხინკლუკები ტარხუნის სოუსით';

-- ─── წვნიანი (Soup) ───
UPDATE public.menu_items SET
  name_en = 'Kharcho Soup',
  name_ru = 'Суп Харчо'
WHERE name_ka = 'სუფ-ხარჩო';

UPDATE public.menu_items SET
  name_en = 'Cold Matsoni Soup',
  name_ru = 'Холодный суп из мацони',
  description_en = 'Matsoni, Guruli adjika, cucumber',
  description_ru = 'Мацони, гурийская аджика, огурец'
WHERE name_ka = 'ცივი მაწვნის წვნიანი';

UPDATE public.menu_items SET
  name_en = 'Vegetable Soup',
  name_ru = 'Овощной суп',
  description_en = 'Mushrooms, carrot, bell pepper, herbs, cilantro',
  description_ru = 'Грибы, морковь, болгарский перец, зелень, кинза'
WHERE name_ka LIKE 'ბოსტნეულის წვნიანი%';

-- ─── არაყი (Vodka) ───
UPDATE public.menu_items SET name_en = 'Stolichnaya', name_ru = 'Столичная' WHERE name_ka = 'სტალიჩნაია';
UPDATE public.menu_items SET name_en = 'Finlandia', name_ru = 'Финляндия' WHERE name_ka = 'ფინლანდია';
UPDATE public.menu_items SET name_en = 'Absolut', name_ru = 'Абсолют' WHERE name_ka = 'აბსოლუტი';
UPDATE public.menu_items SET name_en = 'Grey Goose', name_ru = 'Грей Гус' WHERE name_ka = 'გრეი გუსი';

-- ─── ბრენდი/კონიაკი ───
UPDATE public.menu_items SET
  name_en = 'Sarajishvili ***', name_ru = 'Сараджишвили ***',
  description_en = 'Brandy', description_ru = 'Бренди'
WHERE name_ka = 'სარაჯიშვილი ***';

UPDATE public.menu_items SET
  name_en = 'Askaneli X.O', name_ru = 'Асканели X.O',
  description_en = 'Brandy', description_ru = 'Бренди'
WHERE name_ka = 'ასკანელი x.o';

UPDATE public.menu_items SET
  name_en = 'Hennessy V.S', name_ru = 'Хеннесси V.S',
  description_en = 'Cognac', description_ru = 'Коньяк'
WHERE name_ka = 'ჰენესი v.s';

-- ─── ვერმუტი (Vermouth) ───
UPDATE public.menu_items SET name_en = 'Campari', name_ru = 'Кампари' WHERE name_ka = 'კამპარი';
UPDATE public.menu_items SET name_en = 'Aperol', name_ru = 'Апероль' WHERE name_ka = 'აპეროლი';
UPDATE public.menu_items SET name_en = 'Routina', name_ru = 'Рутина' WHERE name_ka = 'რუტინა';
UPDATE public.menu_items SET name_en = 'P31 Green', name_ru = 'P31 Зелёный' WHERE name_ka = 'P31  მწვანე';
UPDATE public.menu_items SET name_en = 'Tosso Rosso', name_ru = 'Тоссо Россо' WHERE name_ka = 'ტოსსო როსო';
UPDATE public.menu_items SET name_en = 'Martini Rosso', name_ru = 'Мартини Россо' WHERE name_ka = 'მარტინი როსო';
UPDATE public.menu_items SET name_en = 'Martini Bianco', name_ru = 'Мартини Бианко' WHERE name_ka = 'მარტინი ბიანკო';

-- ─── ვისკი (Whiskey) ───
UPDATE public.menu_items SET
  name_en = 'Clan MacGregor', name_ru = 'Клан МакГрегор',
  description_en = 'Scotch whisky', description_ru = 'Шотландский виски'
WHERE name_ka = 'კლან მაკგრეგორი';

UPDATE public.menu_items SET
  name_en = 'Jack Daniel''s', name_ru = 'Джек Дэниелс',
  description_en = 'Tennessee whiskey', description_ru = 'Виски из Теннесси'
WHERE name_ka = 'ჯეკ დენიელსი';

UPDATE public.menu_items SET
  name_en = 'Jameson', name_ru = 'Джеймсон',
  description_en = 'Irish whiskey', description_ru = 'Ирландский виски'
WHERE name_ka = 'ჯეიმსონი';

UPDATE public.menu_items SET
  name_en = 'Maker''s Mark', name_ru = 'Мейкерс Марк',
  description_en = 'Bourbon whiskey', description_ru = 'Бурбон'
WHERE name_ka = 'მეიქერს მარკი';

UPDATE public.menu_items SET
  name_en = 'Glenmorangie 10', name_ru = 'Гленморанджи 10',
  description_en = 'Scotch whisky', description_ru = 'Шотландский виски'
WHERE name_ka = 'გლენმორანჟი 10';

UPDATE public.menu_items SET
  name_en = 'Monkey Shoulder', name_ru = 'Манки Шоулдер',
  description_en = 'Scotch whisky', description_ru = 'Шотландский виски'
WHERE name_ka = 'მანქი შოლდერი';

UPDATE public.menu_items SET
  name_en = 'Chivas Regal 18', name_ru = 'Чивас Ригал 18',
  description_en = 'Scotch whisky', description_ru = 'Шотландский виски'
WHERE name_ka = 'ჩივას რეგალი 18';

UPDATE public.menu_items SET
  name_en = 'Johnnie Walker Blue Label', name_ru = 'Джонни Уокер Блю Лейбл',
  description_en = 'Scotch whisky', description_ru = 'Шотландский виски'
WHERE name_ka = 'ჯონი ვოქერი ბლუ ლეიბლი';

UPDATE public.menu_items SET
  name_en = 'Four Roses :)', name_ru = 'Фо Роузес :)',
  description_en = 'Bourbon', description_ru = 'Бурбон'
WHERE name_ka = 'ფორ როუზეს :)';

-- ─── კოქტეილი (Cocktails) ───
UPDATE public.menu_items SET name_en = 'Gin & Tonic', name_ru = 'Джин Тоник' WHERE name_ka = 'ჯინ ტონიკი';
UPDATE public.menu_items SET name_en = 'Daiquiri', name_ru = 'Дайкири' WHERE name_ka = 'დაიკირი';
UPDATE public.menu_items SET name_en = 'Tom Collins', name_ru = 'Том Коллинз' WHERE name_ka = 'ტომ კოლინსი';
UPDATE public.menu_items SET name_en = 'Special Cocktail MUSE', name_ru = 'Спец. Коктейль MUSE' WHERE name_ka = 'Special Cocktail MUSE';
UPDATE public.menu_items SET name_en = 'Khikhito', name_ru = 'Хихито' WHERE name_ka = 'ხიხიტო';
UPDATE public.menu_items SET name_en = 'White Lady', name_ru = 'Белая Леди' WHERE name_ka = 'თეთრი ლედი';
UPDATE public.menu_items SET name_en = 'Sidecar', name_ru = 'Сайдкар' WHERE name_ka = 'საიდქარი';
UPDATE public.menu_items SET name_en = 'Caipiroska', name_ru = 'Кайпироска' WHERE name_ka = 'კაიპიროსკა';
UPDATE public.menu_items SET name_en = 'Caipirinha', name_ru = 'Кайпиринья' WHERE name_ka = 'კაიპირინია';
UPDATE public.menu_items SET name_en = 'Espresso Martini', name_ru = 'Эспрессо Мартини' WHERE name_ka = 'ესპრესო მარტინი';
UPDATE public.menu_items SET name_en = 'Sex on the Beach', name_ru = 'Секс на пляже' WHERE name_ka LIKE 'სექსი%პლიაჟზე%';
UPDATE public.menu_items SET name_en = 'Non-Alcoholic Mojito', name_ru = 'Безалкогольный мохито' WHERE name_ka = 'უალკოჰოლო მოჰიტო';
UPDATE public.menu_items SET name_en = 'Mojito', name_ru = 'Мохито' WHERE name_ka = 'მოჰიტო';
UPDATE public.menu_items SET name_en = 'Amaretto Sour', name_ru = 'Амаретто Сауэр' WHERE name_ka = 'ამარეტო საუვერი';
UPDATE public.menu_items SET name_en = 'Whiskey Sour', name_ru = 'Виски Сауэр' WHERE name_ka = 'ვისკი საუვერი';
UPDATE public.menu_items SET name_en = 'Gin Fizz', name_ru = 'Джин Физз' WHERE name_ka = 'ჯინ ფიზი';
UPDATE public.menu_items SET name_en = 'Campari Spritz', name_ru = 'Кампари Шприц' WHERE name_ka = 'კამპარი შპრიცი';
UPDATE public.menu_items SET name_en = 'Aperol Spritz', name_ru = 'Апероль Шприц' WHERE name_ka = 'აპეროლ შპრიცი';
UPDATE public.menu_items SET name_en = 'Bloody Maria', name_ru = 'Кровавая Мария' WHERE name_ka = 'სისხლიანი მარია';
UPDATE public.menu_items SET name_en = 'Bloody Mary', name_ru = 'Кровавая Мэри' WHERE name_ka = 'სისხლიანი მერი';
UPDATE public.menu_items SET name_en = 'Margarita', name_ru = 'Маргарита' WHERE name_ka = 'მარგარიტა';
UPDATE public.menu_items SET name_en = 'Cosmopolitan', name_ru = 'Космополитен' WHERE name_ka = 'კოსმოპოლიტენი';
UPDATE public.menu_items SET name_en = 'Agwa Energy', name_ru = 'Агва Энерджи' WHERE name_ka = 'აგვა ენერჯი';
UPDATE public.menu_items SET name_en = 'Vodka Red Bull', name_ru = 'Водка Ред Булл' WHERE name_ka LIKE '%ვოდკა%რედბული%';
UPDATE public.menu_items SET name_en = 'Strega Energy', name_ru = 'Стрега Энерджи' WHERE name_ka = 'სტრეგა ენერჯი';
UPDATE public.menu_items SET name_en = 'Mimosa', name_ru = 'Мимоза' WHERE name_ka = 'მიმოზა';
UPDATE public.menu_items SET name_en = 'Kir Royale', name_ru = 'Кир Рояль' WHERE name_ka = 'კირ როიალი';
UPDATE public.menu_items SET name_en = 'Cuba Libre', name_ru = 'Куба Либре' WHERE name_ka = 'კუბა ლიბრე';
UPDATE public.menu_items SET name_en = 'The Godmother', name_ru = 'Крёстная мать' WHERE name_ka = 'ნათლიდედა';
UPDATE public.menu_items SET name_en = 'Pina Colada', name_ru = 'Пина Колада' WHERE name_ka = 'პინა კოლადა';
UPDATE public.menu_items SET name_en = 'Tequila Sunrise', name_ru = 'Текила Санрайз' WHERE name_ka = 'ტეკილა სანრაისი';
UPDATE public.menu_items SET name_en = 'Blue Lagoon', name_ru = 'Голубая лагуна' WHERE name_ka = 'ლურჯი ლაგუნა';
UPDATE public.menu_items SET name_en = 'The Godfather', name_ru = 'Крёстный отец' WHERE name_ka = 'ნათლიმამა';
UPDATE public.menu_items SET name_en = 'Black Russian', name_ru = 'Чёрный русский' WHERE name_ka = 'შავი რუსი';
UPDATE public.menu_items SET name_en = 'Old Fashioned', name_ru = 'Олд Фэшенд' WHERE name_ka = 'ოლდ ფეშენი';
UPDATE public.menu_items SET name_en = 'Manhattan', name_ru = 'Манхэттен' WHERE name_ka = 'მანჰეტტენი';
UPDATE public.menu_items SET name_en = 'White Russian', name_ru = 'Белый русский' WHERE name_ka = 'თეთრი რუსი';
UPDATE public.menu_items SET name_en = 'Long Island Iced Tea', name_ru = 'Лонг Айленд Айс Ти' WHERE name_ka = 'ლონგ აილენდ აისთი';
UPDATE public.menu_items SET name_en = 'Red Sunday', name_ru = 'Ред Санди' WHERE name_ka = 'რედ სანდეი';
UPDATE public.menu_items SET name_en = 'Long Island Energy', name_ru = 'Лонг Айленд Энерджи' WHERE name_ka = 'ლონგ აილენდ ენერჯი';
UPDATE public.menu_items SET name_en = 'Mai Tai', name_ru = 'Май Тай' WHERE name_ka = 'მაი ტაი';
UPDATE public.menu_items SET name_en = 'Negroni', name_ru = 'Негрони' WHERE name_ka = 'ნეგრონი';
UPDATE public.menu_items SET name_en = 'Boulevardier', name_ru = 'Бульвардье' WHERE name_ka = 'ბულვარდიე';

-- ─── ლიქიორი (Liqueur) ───
UPDATE public.menu_items SET name_en = 'Borghetti', name_ru = 'Боргетти' WHERE name_ka = 'ბორჯეტი';
UPDATE public.menu_items SET name_en = 'Limoncello', name_ru = 'Лимончелло' WHERE name_ka = 'ლიმონჩელო';
UPDATE public.menu_items SET name_en = 'Blue Curacao', name_ru = 'Блю Кюрасао' WHERE name_ka = 'ლურჯი კურასაო';
UPDATE public.menu_items SET name_en = 'Peach Monin', name_ru = 'Персик Монен' WHERE name_ka = 'ატამი მონინი';
UPDATE public.menu_items SET name_en = 'Kahlua', name_ru = 'Калуа' WHERE name_ka = 'კალუა';
UPDATE public.menu_items SET name_en = 'Triple Sec', name_ru = 'Трипл Сек' WHERE name_ka = 'თრიპლსეკი';
UPDATE public.menu_items SET name_en = 'Sambuca', name_ru = 'Самбука' WHERE name_ka = 'სამბუკა';
UPDATE public.menu_items SET name_en = 'Malibu', name_ru = 'Малибу' WHERE name_ka = 'მალიბუ';
UPDATE public.menu_items SET name_en = 'Amaro Balori', name_ru = 'Амаро Балори' WHERE name_ka = 'ამარო ბალორი';
UPDATE public.menu_items SET name_en = 'Fior di Cedro', name_ru = 'Фиор ди Чедро' WHERE name_ka = 'ფიორ დი გედრო';
UPDATE public.menu_items SET name_en = 'Strega', name_ru = 'Стрега' WHERE name_ka = 'სტრეგა';
UPDATE public.menu_items SET name_en = 'Amaro Derbe', name_ru = 'Амаро Дербе' WHERE name_ka = 'ამარო დერბე';
UPDATE public.menu_items SET name_en = 'Absinthe', name_ru = 'Абсент' WHERE name_ka = 'აბსენტი';
UPDATE public.menu_items SET name_en = 'Jagermeister', name_ru = 'Егермейстер' WHERE name_ka = 'იაგერმაისტერი';
UPDATE public.menu_items SET name_en = 'Amaretto', name_ru = 'Амаретто' WHERE name_ka = 'ამარეტო';
UPDATE public.menu_items SET name_en = 'Baileys', name_ru = 'Бейлис' WHERE name_ka = 'ბეილისი';
UPDATE public.menu_items SET name_en = 'Agwa de Bolivia', name_ru = 'Агва де Боливия' WHERE name_ka = 'აგვა დე ბოლივია';

-- ─── ლუდი (Beer) ───
UPDATE public.menu_items SET name_en = 'Corona Extra', name_ru = 'Корона Экстра' WHERE name_ka = 'კორონა ექსტრა';
UPDATE public.menu_items SET name_en = 'Kayak', name_ru = 'Каяк' WHERE name_ka = 'კაიაკი';
UPDATE public.menu_items SET name_en = 'Heineken', name_ru = 'Хайнекен' WHERE name_ka = 'ჰეინეკენი';
UPDATE public.menu_items SET name_en = 'Black Lion Draft', name_ru = 'Чёрный лев разливной' WHERE name_ka = 'შავი ლომი ჩამოსასხმელი';

-- ─── რომი (Rum) ───
UPDATE public.menu_items SET name_en = 'Bacardi Black', name_ru = 'Бакарди Блэк' WHERE name_ka = 'ბაკარდი შავი';
UPDATE public.menu_items SET name_en = 'Old Captain Black', name_ru = 'Олд Кэптен Блэк' WHERE name_ka = 'ოლდ კაპტენი შავი';
UPDATE public.menu_items SET name_en = 'Old Captain White', name_ru = 'Олд Кэптен Уайт' WHERE name_ka = 'ოლდ კაპტენი თეთრი';
UPDATE public.menu_items SET name_en = 'Bacardi White', name_ru = 'Бакарди Уайт' WHERE name_ka = 'ბაკარდი თეთრი';
UPDATE public.menu_items SET name_en = 'Captain Morgan', name_ru = 'Кэптен Морган' WHERE name_ka = 'კაპიტან მორგანი';

-- ─── სახლის ლიმონათი ───
UPDATE public.menu_items SET name_en = 'Homemade Berry Lemonade', name_ru = 'Домашний лимонад с ягодами' WHERE name_ka = 'სახლის ლიმონათი კენკრის';
UPDATE public.menu_items SET name_en = 'Homemade Lemon & Mint Lemonade', name_ru = 'Домашний лимонад с лимоном и мятой' WHERE name_ka = 'სახლის ლიმონათი ლიმონი პიტნა';
UPDATE public.menu_items SET name_en = 'Homemade Lemonade', name_ru = 'Домашний лимонад' WHERE name_ka = 'სახლის ლიმონათი';

-- ─── ტეკილა (Tequila) ───
UPDATE public.menu_items SET name_en = 'Olmeca Silver', name_ru = 'Олмека Сильвер' WHERE name_ka = 'ოლმეგა ვერცხლისფერი';
UPDATE public.menu_items SET name_en = 'El Charro', name_ru = 'Эль Чарро' WHERE name_ka = 'ელ ჩარო';
UPDATE public.menu_items SET name_en = 'Agavita Blanco', name_ru = 'Агавита Бланко' WHERE name_ka = 'აგავიტა ბლანკო';
UPDATE public.menu_items SET name_en = 'Sombrero Negro', name_ru = 'Сомбреро Негро' WHERE name_ka = 'სომბრერო ნეგრო';
UPDATE public.menu_items SET name_en = 'Patron', name_ru = 'Патрон' WHERE name_ka = 'პატრონი';
UPDATE public.menu_items SET name_en = 'Milagro Silver', name_ru = 'Милагро Сильвер' WHERE name_ka = 'მილაგრო სილვერი';

-- ─── უალკოჰოლო სასმელი (Non-Alcoholic) ───
UPDATE public.menu_items SET name_en = 'Water', name_ru = 'Вода' WHERE name_ka = 'წყალი';
UPDATE public.menu_items SET name_en = 'Juice', name_ru = 'Сок' WHERE name_ka = 'წვენი';
UPDATE public.menu_items SET name_en = 'Sprite', name_ru = 'Спрайт' WHERE name_ka = 'სპრაიტი';
UPDATE public.menu_items SET name_en = 'Coca-Cola Zero', name_ru = 'Кока-Кола Зеро' WHERE name_ka = 'კოკა კოლა ზერო';
UPDATE public.menu_items SET name_en = 'Fanta', name_ru = 'Фанта' WHERE name_ka = 'ფანტა';
UPDATE public.menu_items SET name_en = 'Coca-Cola Classic', name_ru = 'Кока-Кола Классик' WHERE name_ka = 'კოკა კოლა კლასიკი';
UPDATE public.menu_items SET name_en = 'Ginger Tonic', name_ru = 'Джинджер Тоник' WHERE name_ka = 'ჯინჯერ ტონიკი';
UPDATE public.menu_items SET name_en = 'Tonic', name_ru = 'Тоник' WHERE name_ka = 'ტონიკი';
UPDATE public.menu_items SET name_en = 'Borjomi', name_ru = 'Боржоми' WHERE name_ka = 'ბორჯომი';
UPDATE public.menu_items SET name_en = 'Milk', name_ru = 'Молоко' WHERE name_ka = 'რძე';
UPDATE public.menu_items SET name_en = 'Red Bull', name_ru = 'Ред Булл' WHERE name_ka = 'რედბული';
UPDATE public.menu_items SET name_en = 'Iced Coffee', name_ru = 'Холодный кофе' WHERE name_ka = 'ცივი ყავა';
UPDATE public.menu_items SET name_en = 'Iced Coffee with Ice Cream', name_ru = 'Холодный кофе с мороженым' WHERE name_ka = 'ცივი ყავა ნაყინით';
UPDATE public.menu_items SET name_en = 'Fresh Squeezed Juice', name_ru = 'Свежевыжатый сок' WHERE name_ka = 'ახლად დაწურული წვენი';
UPDATE public.menu_items SET name_en = 'Milkshake', name_ru = 'Молочный коктейль' WHERE name_ka = 'მილქშეიქი';

-- ─── ღვინო (Wine) ───
UPDATE public.menu_items SET
  name_en = 'House White Dry Wine', name_ru = 'Домашнее белое сухое вино',
  description_en = 'Glass', description_ru = 'Бокал'
WHERE name_ka = 'სახლის ღვინო თეთრი მშრალი';

UPDATE public.menu_items SET
  name_en = 'House Red Semi-Sweet Wine', name_ru = 'Домашнее красное полусладкое вино'
WHERE name_ka = 'სახლის წითელი ნახევრად ტკბილი ღვინო';

UPDATE public.menu_items SET
  name_en = 'House Red Dry Wine', name_ru = 'Домашнее красное сухое вино',
  description_en = 'Glass', description_ru = 'Бокал'
WHERE name_ka = 'სახლის ღვინო წითელი მშრალი';

UPDATE public.menu_items SET
  name_en = 'Saperavi Chelti', name_ru = 'Саперави Челти',
  description_en = 'Red dry', description_ru = 'Красное сухое'
WHERE name_ka = 'საფერავი ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Tsinandali Chelti', name_ru = 'Цинандали Челти',
  description_en = 'White dry', description_ru = 'Белое сухое'
WHERE name_ka = 'წინანდალი ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Shilda Rkatsiteli', name_ru = 'Шилда Ркацители',
  description_en = 'White dry', description_ru = 'Белое сухое'
WHERE name_ka = 'შილდა რქაწითელი';

UPDATE public.menu_items SET
  name_en = 'Shilda Saperavi', name_ru = 'Шилда Саперави',
  description_en = 'Red dry', description_ru = 'Красное сухое'
WHERE name_ka = 'შილდა საფერავი';

UPDATE public.menu_items SET
  name_en = 'Chateau Mukhrani Goruli Mtsvane', name_ru = 'Шато Мухрани Горули Мцване',
  description_en = 'White dry', description_ru = 'Белое сухое'
WHERE name_ka = 'შატო მუხრანი გორული მწვანე';

UPDATE public.menu_items SET
  name_en = 'Tvishi Teliani Valley', name_ru = 'Твиши Телиани Вели',
  description_en = 'White semi-sweet', description_ru = 'Белое полусладкое'
WHERE name_ka LIKE 'ტვიში თელიანი ველი%';

UPDATE public.menu_items SET
  name_en = 'Sparkling Wine Teliani Valley', name_ru = 'Игристое вино Телиани Вели'
WHERE name_ka = 'ცქრიალა ღვინო თელიანი ველი';

UPDATE public.menu_items SET
  name_en = 'Khashmi Saperavi Teliani Valley', name_ru = 'Хашми Саперави Телиани Вели',
  description_en = 'Red dry', description_ru = 'Красное сухое'
WHERE name_ka = 'ხაშმის საფერავი გლეხური თელიანი ველი';

UPDATE public.menu_items SET
  name_en = 'Tipsy Baby White Semi-Sweet', name_ru = 'Типси Бейби белое полусладкое'
WHERE name_ka = 'თიფსი ბეიბი თეთრი ნახევრად ტკბილი';

UPDATE public.menu_items SET
  name_en = 'Tipsy Baby Rose Semi-Dry', name_ru = 'Типси Бейби розе полусухое'
WHERE name_ka = 'თიპსი ბეიბი როზე ნახევრად მშრალი';

UPDATE public.menu_items SET
  name_en = 'Khvanchkara Chateau Mukhrani', name_ru = 'Хванчкара Шато Мухрани',
  description_en = 'Red semi-sweet', description_ru = 'Красное полусладкое'
WHERE name_ka = 'ხვანჭკარა შატო მუხრანი';

UPDATE public.menu_items SET
  name_en = 'Saperavi Superior Chateau Mukhrani', name_ru = 'Саперави Супериор Шато Мухрани',
  description_en = 'Red dry', description_ru = 'Красное сухое'
WHERE name_ka = 'საფერავი სუპერიორი შატო მუხრანი';

UPDATE public.menu_items SET
  name_en = 'Sparkling Wine Askaneli', name_ru = 'Игристое вино Асканели',
  description_en = 'Dry', description_ru = 'Сухое'
WHERE name_ka = 'ცქრიალა ღვინო ასკანელი';

UPDATE public.menu_items SET
  name_en = 'Mukuzani Chelti', name_ru = 'Мукузани Челти',
  description_en = 'Red dry', description_ru = 'Красное сухое'
WHERE name_ka = 'მუკუზანი ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Tsitska-Krakhuna Chelti', name_ru = 'Цицка-Крахуна Челти',
  description_en = 'White semi-dry', description_ru = 'Белое полусухое'
WHERE name_ka = 'ციცქა-კრახუნა ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Kisi Chelti', name_ru = 'Киси Челти',
  description_en = 'White dry', description_ru = 'Белое сухое'
WHERE name_ka = 'ქისი ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Rose Chelti', name_ru = 'Розе Челти',
  description_en = 'Dry', description_ru = 'Сухое'
WHERE name_ka = 'ვარდისფერი ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Kisi Qvevri Chelti', name_ru = 'Киси Квеври Челти',
  description_en = 'Qvevri white dry', description_ru = 'Квеври белое сухое'
WHERE name_ka = 'ქისი ქვევრი ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Saperavi Qvevri Chelti', name_ru = 'Саперави Квеври Челти',
  description_en = 'Qvevri red dry', description_ru = 'Квеври красное сухое'
WHERE name_ka = 'საფერავი ქვევრი ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Kindzmarauli Chelti', name_ru = 'Киндзмараули Челти',
  description_en = 'Red semi-sweet', description_ru = 'Красное полусладкое'
WHERE name_ka = 'ქინძმარაული ჩელთი';

UPDATE public.menu_items SET
  name_en = 'Chelti Khikhivi', name_ru = 'Челти Хихиви'
WHERE name_ka LIKE 'ჩელთი ხიხივი%';

-- ─── ცხელი სასმელი (Hot Beverages) ───
UPDATE public.menu_items SET name_en = 'Mulled Wine', name_ru = 'Глинтвейн' WHERE name_ka = 'გლინტვეინი';
UPDATE public.menu_items SET name_en = 'Turkish Coffee', name_ru = 'Кофе по-турецки' WHERE name_ka = 'თურქული ყავა';
UPDATE public.menu_items SET name_en = 'Cocoa', name_ru = 'Какао' WHERE name_ka = 'კაკაო';
UPDATE public.menu_items SET name_en = 'Espresso', name_ru = 'Эспрессо' WHERE name_ka = 'ესპრესო';
UPDATE public.menu_items SET name_en = 'Americano', name_ru = 'Американо' WHERE name_ka = 'ამერიკანო';
UPDATE public.menu_items SET name_en = 'Cappuccino', name_ru = 'Капучино' WHERE name_ka = 'კაპუჩინო';
UPDATE public.menu_items SET name_en = 'Tea (Black, Green)', name_ru = 'Чай (чёрный, зелёный)' WHERE name_ka = 'ჩაი (შავი,მწვანე)';
UPDATE public.menu_items SET name_en = 'Tea Pot', name_ru = 'Чай в чайнике' WHERE name_ka = 'ჩაი ჩაიდნით';
UPDATE public.menu_items SET name_en = 'Hot Chocolate', name_ru = 'Горячий шоколад' WHERE name_ka = 'ცხელი შოკოლადი';
UPDATE public.menu_items SET name_en = 'Latte', name_ru = 'Латте' WHERE name_ka = 'ლატე';
UPDATE public.menu_items SET name_en = 'Mocha Latte', name_ru = 'Мокка Латте' WHERE name_ka = 'მოკა ლატე';

-- ─── ჭაჭა (Chacha) ───
UPDATE public.menu_items SET
  name_en = 'Kirke Grape Vodka', name_ru = 'Кирке виноградная водка'
WHERE name_ka = 'კირკე ყურძნის არაყი';

UPDATE public.menu_items SET
  name_en = 'Teliani Valley', name_ru = 'Телиани Вели',
  description_en = 'Oak-barrel aged', description_ru = 'Выдержанная в дубовых бочках'
WHERE name_ka LIKE 'თელიანი ველი%' AND category_id = '11b84ef3-b4f2-4344-8742-3e78944a3458';

UPDATE public.menu_items SET
  name_en = 'Chateau Mukhrani', name_ru = 'Шато Мухрани'
WHERE name_ka LIKE 'შატო მუხრანი%' AND category_id = '11b84ef3-b4f2-4344-8742-3e78944a3458';

UPDATE public.menu_items SET name_en = 'House Chacha Classic', name_ru = 'Домашняя чача классическая' WHERE name_ka = 'სახლის ჭაჭა კლასიკური';
UPDATE public.menu_items SET name_en = 'House Chacha Peach', name_ru = 'Домашняя чача персиковая' WHERE name_ka = 'სახლის ჭაჭა ატმის';
UPDATE public.menu_items SET name_en = 'House Chacha Feijoa', name_ru = 'Домашняя чача фейхоа' WHERE name_ka LIKE 'სახლის ჭაჭა ფეიხო%';
UPDATE public.menu_items SET name_en = 'House Chacha Honey', name_ru = 'Домашняя чача медовая' WHERE name_ka = 'სახლის ჭაჭა თაფლის';

-- ─── ჯინი (Gin) — already in English, copy to name_en, set name_ru ───
UPDATE public.menu_items SET name_en = 'Gordon''s', name_ru = 'Гордонс' WHERE name_ka = 'Gordon''s';
UPDATE public.menu_items SET name_en = 'J.J Whitley', name_ru = 'Дж.Дж. Уитли' WHERE name_ka = 'J.j Whitley';
UPDATE public.menu_items SET name_en = 'Antidote Classic', name_ru = 'Антидот Классик' WHERE name_ka = 'Antidote Classic';
UPDATE public.menu_items SET name_en = 'Antidote Rose', name_ru = 'Антидот Розе' WHERE name_ka = 'Antidote Rose';
UPDATE public.menu_items SET name_en = 'Antidote Orange', name_ru = 'Антидот Оранж' WHERE name_ka = 'Antidote Orange';
UPDATE public.menu_items SET name_en = 'D''argent Strawberry', name_ru = 'Д''Аржан Клубника' WHERE name_ka = 'D''argent Strawberry';
UPDATE public.menu_items SET name_en = 'D''argent Classic', name_ru = 'Д''Аржан Классик' WHERE name_ka LIKE 'Dargent Classic%';
UPDATE public.menu_items SET name_en = 'The Botanist', name_ru = 'Ботанист' WHERE name_ka = 'The Botanist';
UPDATE public.menu_items SET name_en = 'Bombay Sapphire', name_ru = 'Бомбей Сапфир' WHERE name_ka = 'Bombay Sapphire';
UPDATE public.menu_items SET name_en = 'Hendrick''s', name_ru = 'Хендрикс' WHERE name_ka LIKE 'Hendrick%';
UPDATE public.menu_items SET name_en = 'Elektro', name_ru = 'Электро' WHERE name_ka = 'Elektro';

-- ─── Imported wines (already English names) ───
UPDATE public.menu_items SET name_en = 'GRANDE ALBERONE', name_ru = 'ГРАНДЕ АЛЬБЕРОНЕ' WHERE name_ka LIKE 'GRANDE ALBERONE%';
UPDATE public.menu_items SET name_en = 'SPRINKLE WINE - PROSECCO', name_ru = 'СПРИНКЛ ВАЙН - ПРОСЕККО' WHERE name_ka LIKE 'SPRINKLE WINE%';

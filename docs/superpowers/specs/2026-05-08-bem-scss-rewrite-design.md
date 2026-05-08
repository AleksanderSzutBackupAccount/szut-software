# Design: Przepisanie strony na BEM + SCSS

**Data:** 2026-05-08  
**Projekt:** szut.software-website (Nuxt 4 + Vue 3)

---

## Cel

Zastąpienie Tailwind CSS (utility-first) czystym SCSS z konwencją nazewniczą BEM. Kod szablonów Vue ma być czytelny bez wiedzy o Tailwindzie; style mają żyć w SCSS, nie w atrybutach `class`.

---

## Co się zmienia

| Usuwa się | Wchodzi |
|-----------|---------|
| `@tailwindcss/vite` plugin | SCSS via `sass` / `sass-embedded` |
| `tailwind.css` (import) | `base.scss` z resetem i globalnymi stylami |
| wszystkie klasy Tailwind w szablonach Vue | BEM-owe klasy semantyczne |
| `theme.css` `@theme inline` blok | tokeny SCSS (`$color-*`, `$space-*`, itp.) |

CSS custom properties (`:root`) z `theme.css` mogą zostać dla kompatybilności z motion-v, ale tokeny Tailwind wylatują.

---

## Architektura plików SCSS

```
app/assets/styles/
├── tokens/
│   ├── _colors.scss       # $color-bg, $color-surface, $color-accent, $color-accent-hover,
│   │                      # $color-text, $color-muted, $color-border
│   ├── _typography.scss   # $font-family-base, font-size scale
│   ├── _spacing.scss      # $space-1 … $space-20 (4px grid)
│   └── _breakpoints.scss  # $bp-sm: 640px, $bp-md: 768px, $bp-lg: 1024px, $bp-xl: 1280px
├── mixins/
│   ├── _responsive.scss   # @mixin sm { }, @mixin md { }, @mixin lg { }, @mixin xl { }
│   └── _layout.scss       # @mixin flex-center, @mixin flex-between, @mixin container
├── _index.scss            # @forward wszystkich tokenów i mixinów (jeden import w komponentach)
├── base.scss              # reset (*), body, html, typografia globalna
└── index.css              # @import './fonts.css'; @import './base.scss';
```

`nuxt.config.ts` — dodać `vite.css.preprocessorOptions.scss.additionalData` z `@use '~/assets/styles/_index' as *;` żeby tokeny były dostępne we wszystkich komponentach bez ręcznego importu.

---

## BEM — bloki per komponent

### `Navbar` → blok `.navbar`
```
.navbar
  .navbar__inner          (max-width container, flex between)
  .navbar__logo
  .navbar__nav
  .navbar__link
  .navbar__link--cta      (modifier: czerwony button)
```

### `Hero` → blok `.hero`
```
.hero
  .hero__bg               (absolute, blur orbs)
  .hero__bg-orb           (każdy ruchomy element tła)
  .hero__content
  .hero__badge
  .hero__title
  .hero__title-accent     (span z gradientem)
  .hero__desc
  .hero__actions
  .hero__btn
  .hero__btn--primary     (modifier: red CTA)
  .hero__btn--outline     (modifier: border only)
  .hero__scroll           (scroll indicator na dole)
```

### `Services` → blok `.services`, element karty `.service-card`
```
.services
  .services__inner
  .services__header
  .services__title
  .services__desc
  .services__grid

.service-card
  .service-card__glow
  .service-card__icon
  .service-card__title
  .service-card__body
  .service-card__dots
```

### `Portfolio` → blok `.portfolio`, element projektu `.project`
```
.portfolio
  .portfolio__inner
  .portfolio__header
  .portfolio__title
  .portfolio__desc
  .portfolio__all-link

.project
  .project__mockup
  .project__mockup--laptop
  .project__mockup--phone
  .project__info
  .project__tag
  .project__title
  .project__desc
  .project__features
  .project__feature
  .project__link
```

### `Footer` → blok `.footer`
```
.footer
  .footer__contact
  .footer__heading
  .footer__sub
  .footer__links
  .footer__link
  .footer__meta
```

### `SocialBar` → blok `.social-bar`
```
.social-bar
  .social-bar__link
  .social-bar__icon
```

---

## Co NIE zmienia się

- `motion-v` (Framer Motion dla Vue) — wszystkie animacje zostają
- `lucide-vue-next` — ikony zostają
- `ImageWithFallback.vue` — wrapper zostaje
- Routing, `nuxt.config.ts` (poza usunięciem Tailwind + dodaniem scss options)
- Zawartość tekstowa (kopie, dane)

---

## Tokeny — wartości kluczowe

```scss
// _colors.scss
$color-bg:           #0a0a0a;
$color-surface:      #1a1a1a;
$color-accent:       #fc4445;
$color-accent-hover: #ff5c5d;
$color-text:         #ffffff;
$color-muted:        #9ca3af;   // gray-400
$color-border:       rgba(255, 255, 255, 0.05);

// _spacing.scss  (4px grid)
$space-1:  4px;
$space-2:  8px;
$space-3:  12px;
$space-4:  16px;
$space-5:  20px;
$space-6:  24px;
$space-8:  32px;
$space-10: 40px;
$space-12: 48px;
$space-16: 64px;
$space-20: 80px;
$space-24: 96px;
$space-32: 128px;
```

---

## Zależności

Dodać do `package.json`:
- `sass-embedded` (lub `sass`) — preprocessor SCSS

Usunąć z `package.json`:
- `@tailwindcss/vite` — Tailwind plugin

---

## Kryteria sukcesu

1. Żadna klasa Tailwind nie występuje w szablonach Vue (`grep -r "class=\".*-(sm|md|lg|xl)" app/` → 0 wyników)
2. Strona wygląda identycznie jak przed przepisaniem
3. `npm run build` przechodzi bez błędów
4. SCSS kompiluje się bez warningów

# Advokat Marko Rosić – sajt

Statički sajt advokatske kancelarije Marka Rosića iz Subotice (HTML, CSS i JavaScript, bez build koraka).

## Struktura

| Fajl | Opis |
| --- | --- |
| `index.html` | Sadržaj sajta (sve sekcije i kontakt podaci) |
| `styles.css` | Izgled i prilagođavanje za mobilne uređaje |
| `script.js` | Meni, animacije pri skrolu i kontakt forma |
| `assets/monogram.png` | RM monogram izdvojen iz logoa (providna pozadina) |
| `logo.jpg` | Originalni logo |

## Lokalno pokretanje

Otvorite `index.html` u pregledaču, ili pokrenite lokalni server:

```
python -m http.server 5517
```

pa otvorite http://localhost:5517.

## Objavljivanje

Sajt se objavljuje preko **GitHub Pages** sa grane `main` (koren repozitorijuma).
Svaki `git push` na `main` automatski osvežava sajt za minut-dva.

## Izmene

- **Kontakt podaci** (telefon, e-mail, adresa, radno vreme): `index.html`, sekcija `#kontakt`.
- **E-mail na koji stižu upiti iz forme**: `script.js`, promenljiva `EMAIL_KANCELARIJE`.
- Posle izmene `styles.css` povećajte broj u `styles.css?v=…` u `index.html`, da bi posetioci odmah dobili novu verziju.

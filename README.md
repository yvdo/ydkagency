# ydkagency.com

Site vitrine de YDK Agency, marque commerciale de YDK Conseil (SARL).

Site statique en HTML/CSS, sans étape de build.

## Contenu

- `index.html` — page d'accueil (offres garages, tarifs, méthode, FAQ, formulaire d'audit)
- `mentions-legales.html`, `confidentialite.html` — pages légales
- `merci.html` — page affichée après l'envoi du formulaire
- `404.html` — page introuvable
- `assets/` — photo du fondateur
- `robots.txt`, `sitemap.xml`

## Hébergement

GitHub Pages, publié depuis la branche `main` (racine). Domaine personnalisé défini par le fichier `CNAME`.
Domaine ydkagency.com géré chez OVH : 4 enregistrements A vers GitHub Pages
(185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153) et `www` en CNAME vers `yvdo.github.io.`.
Les enregistrements mail (MX, SPF, DKIM, smtp) restent chez OVH.

Le formulaire « audit » est envoyé à Web3Forms, qui le transfère par e-mail à contact@ydkagency.com,
puis redirige vers `merci.html`.

Chaque push sur `main` met le site à jour automatiquement.

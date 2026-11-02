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

Netlify, dossier de publication : racine du dépôt, aucune commande de build.
Le formulaire « audit » utilise Netlify Forms (`data-netlify="true"`).
Domaine ydkagency.com géré chez OVH (enregistrements A et CNAME www vers Netlify).

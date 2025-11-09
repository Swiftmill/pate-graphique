# Les Pâtes Graphiques

Site web moderne inspiré du serveur Discord communautaire "Les Pâtes Graphiques". L'interface mélange esthétique gaming, ambiance chevaleresque et humour autour des pâtes.

## Aperçu

- **Chevaliers Graphiques ⚔️** : univers bleu électrique, aura héroïque.
- **Civiles Pâtes Graphiques 🍝** : ambiance dorée, chaleureuse et humoristique.
- Effets glow, particules animées, mode "Pâtes Sacrées" pour transformer l'interface en vision dorée céleste.

## Fonctionnalités clés

- Page d'accueil immersive avec texture de pâtes animée, cartes rôles interactives et titre néon.
- Pages profils individuelles `/user/[username]` avec bannière dynamique selon le rôle, badges, activités et citations.
- Page membres avec filtrage, recherche et classement des chevaliers les plus actifs.
- Hall des légendes pour les membres marquants.
- Panel d'administration sécurisé (session Express + bcrypt) avec CRUD complet, aperçu en direct des fiches et gestion des badges/ rôles.
- Intégration préparée pour la présence Discord via `utils/discordStatus.ts`.

## Stack technique

- **Front** : [Next.js](https://nextjs.org/) + React, [Tailwind CSS](https://tailwindcss.com/) et [Framer Motion](https://www.framer.com/motion/).
- **Backend Admin** : Express + sessions + bcrypt.
- **Données** : fichiers JSON locaux (`data/*.json`).

## Installation

```bash
pnpm install
# ou npm install / yarn install
```

### Lancer le front Next.js

```bash
pnpm dev
```

### Lancer le serveur admin Express

```bash
pnpm admin
```

Le serveur admin écoute par défaut sur `http://localhost:4000`. La variable d'environnement `NEXT_PUBLIC_ADMIN_API` permet de changer l'URL consommée par le front.

## Authentification admin

- Identifiant par défaut : `admin`
- Mot de passe par défaut : `pasta123`
- Vous pouvez fournir un hash personnalisé via la variable `ADMIN_PASSWORD_HASH`.

## Structure des dossiers

```
.
├── app
│   ├── components      # Composants UI réutilisables
│   ├── lib             # Utilitaires pour accéder aux JSON
│   ├── styles          # Styles globaux Tailwind
│   └── types.ts        # Types partagés
├── data                # Données JSON locales
├── pages               # Routes Next.js (accueil, membres, profils, panel, etc.)
├── public              # Assets SVG (avatars, bannières, texture)
├── server              # API Express pour le panel admin
└── utils               # Utilitaires côté client (API, Discord)
```

## Scripts disponibles

- `pnpm dev` : lance Next.js en mode développement.
- `pnpm build` : build de production du site.
- `pnpm start` : serveur Next.js en production.
- `pnpm admin` : démarre l'API Express en TypeScript.

## Données d'exemple

Les fichiers JSON (`data/users.json`, `data/roles.json`, `data/badges.json`) contiennent quelques profils de démo que vous pouvez éditer ou étendre.

## Licence

Projet de démonstration pour Les Pâtes Graphiques.

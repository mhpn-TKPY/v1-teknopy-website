# v1-teknopy-website — archivé

**Ce dépôt est en pause depuis le 2026-09-04.** Le code réel a été migré vers
[`teknopy-monorepo`](https://github.com/mhpn-TKPY/teknopy-monorepo)
(`apps/site-teknopy`, workspace Nx) — c'est désormais la seule source de
vérité pour teknopy.com. Le projet Vercel qui sert le domaine
(`v1-teknopy-website-builder-cfyg`) a été repointé vers `teknopy-monorepo` ;
les push sur ce dépôt-ci ne déclenchent plus aucun déploiement.

Ne rien développer ici. Toute évolution du site se fait dans
`teknopy-monorepo/apps/site-teknopy`.

## Pourquoi la migration

- Convention DDD légère + Nx (bounded contexts en libs, apps en composition
  root fine) pour préparer teknopy.com comme **origine de template** —
  d'autres sous-domaines/projets clients pourront réutiliser la même
  structure sans dupliquer le code.
- Cohérence de version avec les autres dépôts teknopy (TypeScript, React,
  `@supabase/ssr`) suivie par `bin/repo-audit.sh` dans
  [`quantum-ai-platform`](https://github.com/mhpn-TKPY/quantum-ai-platform).

## Historique

Ce dépôt reste consultable (archivé, lecture seule sur GitHub) pour son
historique de commits — notamment le travail de mise à niveau des
dépendances et le premier jet de la page `/a-propos`, tous deux repris à
l'identique dans `teknopy-monorepo`.

---

<details>
<summary>Ancien README (généré par v0, conservé pour référence)</summary>

# v0-teknopy-website-builder

This is a [Next.js](https://nextjs.org) project bootstrapped with [v0](https://v0.app).

## Built with v0

This repository is linked to a [v0](https://v0.app) project. You can continue developing by visiting the link below -- start new chats to make changes, and v0 will push commits directly to this repo. Every merge to `main` will automatically deploy.

[Continue working on v0 →](https://v0.app/chat/projects/prj_Xj1ctYFKzHgJHxnewZIaZDbPKASy)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [v0 Documentation](https://v0.app/docs) - learn about v0 and how to use it.

</details>

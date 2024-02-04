## Getting Started

First, run the development server:
npm run dev

Open [http://localhost:3000](http://localhost:3000)

Assurez vous d'adapter le fichier .env.local

# .env.local

NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/
DB_CONNECTION=postgresql://nom_utilisateur:mot_de_passe@localhost:5432/nom_de_la_base_de_donnees

## Commandes de Migration

Pour configurer la base de données, exécutez les commandes de migration suivantes :
npx knex migrate:latest
npx knex seed:run

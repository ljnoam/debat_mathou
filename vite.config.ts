import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Charge les variables d'environnement (locales ou Vercel)
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    define: {
      // Cette ligne est magique : elle remplace "process.env.API_KEY" dans ton code
      // par la valeur réelle de ta clé VITE_API_KEY au moment de la construction du site.
      'process.env.API_KEY': JSON.stringify(process.env.VITE_API_KEY || env.VITE_API_KEY || process.env.API_KEY || env.API_KEY),
    },
  };
});
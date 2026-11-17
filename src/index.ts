import { createApp } from './adapters/in/express/server';

const app = createApp();
const PORT = Number(process.env.PORT ?? 3001);

/** Inicia o servidor HTTP na porta configurada. */
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

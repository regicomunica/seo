# SEO Pulse Auditor (MVP)

Estrutura inicial para um site de auditoria de SEO com foco em:

- entrada simples de URL;
- dashboard interativo e limpo;
- recomendações organizadas por categoria (Técnico, Conteúdo e Autoridade);
- bloco de visibilidade em buscas de IA.

## Rodando localmente

Como é um MVP estático, basta abrir o `index.html` no navegador.

Se quiser rodar com servidor local:

```bash
python3 -m http.server 4173
```

Depois acesse `http://localhost:4173`.

## Publicando no GitHub Pages

Este repositório já inclui workflow para deploy automático em GitHub Pages:

1. Faça push para a branch `main`.
2. No GitHub, vá em **Settings → Pages**.
3. Em **Build and deployment**, selecione **GitHub Actions**.
4. Aguarde o workflow `Deploy static site to GitHub Pages` terminar.
5. Seu site ficará em: `https://<usuario>.github.io/<repositorio>/`.

Arquivo de workflow: `.github/workflows/deploy-pages.yml`.

## Próximos passos sugeridos

1. Integrar backend para crawl real (sitemap, robots, headings, CWV e status codes).
2. Conectar provedores de busca IA para medir citações reais por prompt.
3. Persistir auditorias e histórico de progresso por projeto.
4. Adicionar autenticação e plano freemium/pro.

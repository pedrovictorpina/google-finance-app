# 🚀 Guia de Deploy no Vercel

## Pré-requisitos

- ✅ Conta no [Vercel](https://vercel.com)
- ✅ Conta no [Supabase](https://supabase.com) 
- ✅ Projeto configurado no Supabase com as tabelas criadas

---

## Método 1: Deploy via GitHub (Recomendado)

### Passo 1: Prepare o Repositório

```bash
cd finance-app

# Inicialize o git (se ainda não fez)
git init

# Adicione todos os arquivos
git add .

# Faça o commit
git commit -m "Initial commit - Finance Control App"

# Crie um repositório no GitHub e conecte
git remote add origin https://github.com/SEU-USUARIO/finance-control.git
git push -u origin main
```

### Passo 2: Conecte ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New Project"**
3. Selecione **"Import Git Repository"**
4. Escolha seu repositório `finance-control`
5. Configure as variáveis de ambiente (próximo passo)

### Passo 3: Configure Variáveis de Ambiente

No painel da Vercel, adicione:

| Variable | Value | Where to Find |
|----------|-------|---------------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxx.supabase.co` | Supabase Dashboard → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGc...` | Supabase Dashboard → Settings → API → anon/public |

### Passo 4: Deploy!

1. Clique em **"Deploy"**
2. Aguarde 2-3 minutos
3. ✅ Seu app está no ar!

---

## Método 2: Deploy via CLI

### Passo 1: Instale a Vercel CLI

```bash
npm install -g vercel
```

### Passo 2: Login

```bash
vercel login
```

### Passo 3: Deploy

```bash
# No diretório do projeto
vercel

# Siga as instruções:
# - Set up and deploy? Yes
# - Which scope? Sua conta
# - Link to existing project? No
# - What's your project's name? finance-control
# - In which directory is your code located? ./
# - Want to override settings? No
```

### Passo 4: Configure Variáveis

```bash
# Adicione as variáveis de ambiente
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy novamente para aplicar
vercel --prod
```

---

## Método 3: Deploy com um Clique

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/SEU-USUARIO/finance-control&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY)

1. Clique no botão acima
2. Preencha as variáveis de ambiente
3. Deploy automático!

---

## ⚙️ Configuração do Supabase

### 1. Crie o Projeto

1. Acesse [supabase.com](https://supabase.com)
2. Clique em **"New Project"**
3. Preencha os dados:
   - **Name**: Finance Control
   - **Database Password**: (anote em local seguro!)
   - **Region**: Escolha a mais próxima (ex: South America - São Paulo)
4. Aguarde ~2 minutos para provisionar

### 2. Execute o Schema SQL

1. No dashboard do Supabase, vá em **SQL Editor**
2. Clique em **"New Query"**
3. Cole o conteúdo do arquivo `supabase_schema.sql`
4. Clique em **"Run"**
5. ✅ Tabelas criadas com sucesso!

### 3. Obtenha as Credenciais

1. Vá em **Settings** → **API**
2. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 4. Configure RLS (Row Level Security)

As políticas RLS já estão incluídas no schema SQL. Elas garantem que:
- ✅ Cada usuário vê apenas seus próprios dados
- ✅ Não é possível acessar dados de outros usuários
- ✅ Segurança automática sem código extra

---

## 🔄 Deploy Automático

### Configure CI/CD

A Vercel já configura deploy automático:

- 🔹 **Push para `main`** → Deploy em produção
- 🔹 **Push para outra branch** → Deploy de preview
- 🔹 **Pull Request** → Preview automático

### Comandos Úteis

```bash
# Ver deployments
vercel ls

# Ver logs do último deploy
vercel logs

# Abrir dashboard do projeto
vercel open

# Deploy para produção
vercel --prod

# Rollback para versão anterior
vercel rollback
```

---

## ✅ Checklist Pré-Deploy

Antes de fazer deploy, verifique:

- [ ] Supabase project criado
- [ ] Schema SQL executado
- [ ] Variáveis de ambiente configuradas
- [ ] `.env.local` **NÃO** commitado (já no .gitignore)
- [ ] Código testado localmente (`npm run dev`)
- [ ] Build funcionando (`npm run build`)
- [ ] Sem erros no console

---

## 🐛 Troubleshooting

### Erro: "Invalid Supabase URL"
- ✅ Verifique se a URL está correta
- ✅ Não esqueça o `https://`
- ✅ Remova barra no final

### Erro: "Authentication Failed"
- ✅ Verifique a chave anon
- ✅ Copie novamente do dashboard
- ✅ Não use a `service_role` key (é secreta!)

### Erro: "Table does not exist"
- ✅ Execute o schema SQL no Supabase
- ✅ Verifique se as tabelas foram criadas
- ✅ Confira se o RLS está habilitado

### Build Falha na Vercel
- ✅ Teste `npm run build` localmente primeiro
- ✅ Verifique warnings/erros de TypeScript
- ✅ Confirme que todas as dependências estão em `package.json`

### Aplicação Lenta
- ✅ Habilite caching no Vercel
- ✅ Use `revalidate` nas páginas
- ✅ Otimize queries do Supabase (índices)

---

## 📊 Monitoramento

### Vercel Analytics

1. Vá no dashboard do projeto na Vercel
2. Clique em **"Analytics"**
3. Veja:
   - Pageviews
   - Tempo de carregamento
   - Erros
   - Web Vitals

### Supabase Monitoring

1. No dashboard do Supabase
2. Vá em **"Database"** → **"Logs"**
3. Monitore:
   - Queries lentas
   - Erros
   - Conexões ativas

---

## 🎯 Próximos Passos Após Deploy

1. ✅ **Teste o app em produção**
2. ✅ **Configure domínio customizado** (opcional)
3. ✅ **Habilite Analytics**
4. ✅ **Configure alertas de erro**
5. ✅ **Faça backup do banco de dados**

---

## 🔗 Links Úteis

- [Documentação Vercel](https://vercel.com/docs)
- [Documentação Supabase](https://supabase.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase + Next.js Guide](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)

---

## 💡 Dicas Pro

### Domínio Customizado

1. Na Vercel: **Settings** → **Domains**
2. Adicione seu domínio (ex: `minhasfinancas.com`)
3. Configure DNS conforme instruções
4. ✅ SSL automático!

### Environment Variables

Organize por ambiente:

```bash
# Production
vercel env add NEXT_PUBLIC_SUPABASE_URL production

# Preview
vercel env add NEXT_PUBLIC_SUPABASE_URL preview

# Development
vercel env add NEXT_PUBLIC_SUPABASE_URL development
```

### Performance

- Use **Edge Functions** quando possível
- Habilite **Image Optimization**
- Configure **Caching** apropriado
- Monitore **Core Web Vitals**

---

<div align="center">

**🎉 Pronto! Seu app está no ar!**

Compartilhe com amigos e família: `https://seu-app.vercel.app`

</div>

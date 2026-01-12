<div align="center">

# 💰 Finance Control

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white" alt="Supabase" />
  <img src="https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Vercel" />
</p>

**Um sistema completo de controle financeiro pessoal com dashboard interativo, rastreamento de dívidas e temas personalizados**

[Demo ao Vivo](https://finance-control.vercel.app) • [Reportar Bug](https://github.com/usuario/finance-control/issues) • [Solicitar Feature](https://github.com/usuario/finance-control/issues)

</div>

---

## ✨ Features

### 📊 Dashboard Dinâmico
- **Visão Geral Completa**: Receitas, despesas e saldo do mês atual
- **Gráficos Interativos**: Visualização de tendências e distribuição por categoria
- **Dados em Tempo Real**: Valores atualizados automaticamente do banco de dados

### 💸 Gestão de Transações
- **Receitas e Despesas**: Controle completo com categorização
- **Transações Recorrentes**: Marque salários e contas fixas
- **Parcelamento**: Acompanhe compras parceladas
- **Filtros Mensais**: Navegue facilmente entre diferentes períodos

### 🏷️ Categorias Personalizadas
- **CRUD Completo**: Crie, edite e delete categorias
- **Cores Customizadas**: 10 cores vibrantes para escolher
- **Ícones Variados**: Representação visual das categorias
- **Tipos Flexíveis**: Receita, Despesa ou Ambos

### 💰 Rastreamento de Dívidas
- **Gestão de Devedores**: Controle quem te deve dinheiro
- **Parcelas Individuais**: Marque cada parcela como paga/pendente
- **Barra de Progresso**: Visualização clara do status (ex: 3/6 pagas)
- **Histórico Completo**: Datas de vencimento e pagamento

### 🎨 Temas Customizados
- **Modo Claro/Escuro**: Alternância suave entre temas
- **Tema EVA-01**: Design inspirado em Evangelion com gradientes roxo/verde
- **Persistência**: Preferência salva no localStorage

### 🔒 Segurança e Privacidade
- **Autenticação Supabase**: Login seguro com email/senha
- **Row Level Security**: Cada usuário vê apenas seus próprios dados
- **Sessões Persistentes**: "Lembrar de mim" opcional

---

## 🚀 Deploy Rápido

### Vercel (Recomendado)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/usuario/finance-control)

1. Clique no botão acima
2. Conecte sua conta GitHub
3. Configure as variáveis de ambiente:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy! 🎉

---

## 🛠️ Instalação Local

### Pré-requisitos

- Node.js 18+ instalado
- Conta no [Supabase](https://supabase.com)
- Git

### Passo a Passo

1. **Clone o repositório**
```bash
git clone https://github.com/usuario/finance-control.git
cd finance-control
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=sua-url-do-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anonima
```

4. **Configure o banco de dados**

Execute o script SQL no Supabase SQL Editor:
```sql
-- Copie o conteúdo de supabase_schema.sql
```

5. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

6. **Acesse o app**
```
http://localhost:3000
```

---

## 📋 Estrutura do Projeto

```
finance-app/
├── src/
│   ├── app/
│   │   ├── categories/          # Gestão de categorias
│   │   ├── debts/               # Rastreamento de dívidas
│   │   ├── expenses/            # Página de despesas
│   │   ├── income/              # Página de receitas
│   │   ├── profile/             # Perfil e configurações
│   │   ├── transactions/        # CRUD de transações
│   │   └── page.tsx             # Dashboard principal
│   ├── components/
│   │   ├── CategoryPieChart.tsx # Gráfico de pizza
│   │   ├── DebtCard.tsx         # Card de dívida
│   │   ├── ExpensesChart.tsx    # Gráfico de área
│   │   ├── Header.tsx           # Cabeçalho
│   │   ├── ThemeSwitcher.tsx    # Seletor de tema
│   │   ├── Toaster.tsx          # Notificações toast
│   │   └── TransactionList.tsx  # Lista de transações
│   └── utils/
│       ├── supabase/            # Cliente Supabase
│       └── populate-data.ts     # Script de população
├── public/
├── supabase_schema.sql          # Schema do banco
└── package.json
```

---

## 🎨 Screenshots

### Dashboard
<img src="docs/dashboard.png" alt="Dashboard" width="800"/>

*Dashboard com dados reais, gráficos interativos e cards clicáveis*

### Tema EVA-01
<img src="docs/eva-theme.png" alt="Tema EVA-01" width="800"/>

*Tema customizado inspirado em Evangelion com gradientes vibrantes*

### Rastreamento de Dívidas
<img src="docs/debts.png" alt="Dívidas" width="800"/>

*Gestão completa de dívidas com controle de parcelas*

---

## 🔧 Tecnologias

### Frontend
- **[Next.js 15](https://nextjs.org/)** - Framework React com SSR
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[Recharts](https://recharts.org/)** - Gráficos responsivos
- **[Lucide React](https://lucide.dev/)** - Ícones modernos
- **[React Hot Toast](https://react-hot-toast.com/)** - Notificações

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service
- **[PostgreSQL](https://www.postgresql.org/)** - Banco de dados
- **[Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)** - Segurança

### Deploy & DevOps
- **[Vercel](https://vercel.com/)** - Plataforma de deploy
- **[Git](https://git-scm.com/)** - Controle de versão

---

## 📊 Funcionalidades Principais

### ✅ Implementado
- [x] Autenticação com Supabase
- [x] Dashboard com dados dinâmicos
- [x] CRUD completo de transações
- [x] CRUD completo de categorias
- [x] Rastreamento de dívidas
- [x] Sistema de temas (Claro/Escuro/EVA-01)
- [x] Gráficos interativos
- [x] Filtros mensais
- [x] Notificações toast
- [x] População de dados de exemplo
- [x] Responsividade mobile

### 🚧 Em Desenvolvimento
- [ ] Busca global de transações
- [ ] Filtros avançados (categoria, valor)
- [ ] Budget tracking (alertas de limite)
- [ ] Export para Excel/PDF
- [ ] Transações recorrentes automáticas
- [ ] Metas financeiras
- [ ] Upload de recibos
- [ ] Multi-moeda

### 💡 Planejado
- [ ] App PWA (Progressive Web App)
- [ ] Notificações push
- [ ] Compartilhamento de despesas
- [ ] Relatórios mensais/anuais
- [ ] Insights com IA
- [ ] Integração bancária (Open Finance)

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Siga estes passos:

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Pedro**

- GitHub: [@usuario](https://github.com/usuario)
- LinkedIn: [Pedro](https://linkedin.com/in/usuario)

---

## 🙏 Agradecimentos

- [Supabase](https://supabase.com/) pela infraestrutura incrível
- [Vercel](https://vercel.com/) pela plataforma de deploy
- [Recharts](https://recharts.org/) pelos gráficos lindos
- Comunidade Open Source 💚

---

<div align="center">

**⭐ Se este projeto te ajudou, deixe uma estrela!**

Made with ❤️ and ☕

</div>

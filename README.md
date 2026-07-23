# Portal do Cliente MAGE

## 🌐 Visão Geral
O **Portal do Cliente MAGE** é uma plataforma corporativa e portal de serviços projetado para unificar a comunicação, gerenciamento de projetos e entrega de ativos digitais de forma segura, rápida e intuitiva. O portal serve como canal oficial entre a MAGE e seus clientes para compartilhamento de briefings, acompanhamento de contratos e controle de entregáveis.

---

## 🛠️ Stack Tecnológico
A plataforma foi desenvolvida utilizando tecnologias modernas e eficientes, garantindo alto desempenho, segurança e ótima experiência de desenvolvimento:

* **Framework Principal:** [Next.js 15](https://nextjs.org/) (com App Router)
* **Banco de Dados & Autenticação:** [Supabase](https://supabase.com/) (Autenticação SSR, Controle de Sessão e PostgreSQL com Row Level Security)
* **Armazenamento de Arquivos:** [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/) (Solução de armazenamento compatível com a API S3 e alta performance de custo zero para tráfego de saída)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Gerenciamento de Formulários:** [React Hook Form](https://react-hook-form.com/)
* **Validação de Schemas:** [Zod](https://zod.dev/) (com `@hookform/resolvers`)
* **SDK de Nuvem:** `@aws-sdk/client-s3` e `@aws-sdk/s3-request-presigner`

---

## 🚀 Como Rodar o Projeto Localmente

### Pré-requisitos
* Node.js (versão 18 ou superior recomendado)
* Gerenciador de pacotes `npm` ou `yarn`

### Passo a Passo
1. **Clone o repositório e acesse a pasta:**
   ```bash
   git clone <url-do-repositorio>
   cd mage-comunicacao-site-oficial
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente:**
   Crie um arquivo `.env.local` na raiz do projeto com base no `.env.example`:
   ```bash
   cp .env.example .env.local
   ```
   Preencha os valores conforme a listagem descrita na seção abaixo.

4. **Execute em modo de desenvolvimento:**
   ```bash
   npm run dev
   ```
   A plataforma estará acessível em: `http://localhost:3000`.

5. **Comandos Úteis:**
   * `npm run build`: Compila e gera o build de produção otimizado do Next.js.
   * `npm run lint`: Executa a verificação estática de tipos e estilos TypeScript/ESLint (`tsc --noEmit`).
   * `npm run start`: Inicia o servidor Next.js de produção a partir do build compilado.

---

## 🔑 Variáveis de Ambiente Necessárias
As chaves abaixo devem ser configuradas no arquivo `.env.local` para o correto funcionamento das integrações locais. **Nunca commite chaves privadas ou credenciais reais no repositório.**

```env
# 🧠 Inteligência Artificial (Gemini)
GEMINI_API_KEY="sua_chave_gemini_api"

# 🌐 Configuração do App
APP_URL="http://localhost:3000"

# ☁️ Armazenamento Cloudflare R2 (S3-Compatible)
R2_REGION="auto"
R2_ENDPOINT="https://<account-id>.r2.cloudflarestorage.com"
R2_ACCESS_KEY="sua_chave_de_acesso_r2"
R2_SECRET_KEY="sua_chave_secreta_r2"
R2_BUCKET="nome_do_seu_bucket_r2"
NEXT_PUBLIC_R2_PUBLIC_URL="https://<seu-subdominio-r2>.r2.dev"

# ⚡ Supabase (Integração de DB, SSR e Login)
NEXT_PUBLIC_SUPABASE_URL="https://<seu-projeto>.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="sua_chave_publica_anonima_supabase"
SUPABASE_SERVICE_ROLE_KEY="sua_chave_privada_service_role_supabase"
```

---

## 🛡️ Arquitetura de Segurança e Privacidade

Para garantir a integridade dos dados e o isolamento rígido entre clientes, a arquitetura de segurança baseia-se em dois pilares principais:

### 1. Supabase Row Level Security (RLS)
Todas as tabelas críticas do banco de dados (como informações de clientes, pacotes contratados, logs de auditoria e briefing) possuem políticas de RLS ativas. 
* Um cliente autenticado possui permissões estritamente limitadas para ler ou modificar apenas os registros vinculados ao seu próprio `user_id`.
* Operações administrativas e criação de novos clientes são protegidas e executadas via `SUPABASE_SERVICE_ROLE_KEY` exclusivamente no backend, com verificação de papéis de administrador (`admin-auth`).

### 2. Upload e Download Seguro via Presigned URLs (Cloudflare R2)
Para evitar a exposição de credenciais permanentes e chaves de acesso do Cloudflare R2 no cliente frontend, o tráfego de arquivos é realizado por meio de URLs temporárias assinadas criptograficamente:
* **Upload Seguro:** O frontend solicita uma URL de upload assinada à API `POST /api/upload-url`. A API valida a sessão do usuário com o Supabase e gera uma URL assinada (`PutObjectCommand`) com tempo de expiração curto (15 minutos), higienizando o nome do arquivo e forçando que a estrutura no bucket siga o padrão `${user.id}/${timestamp}-${filename}`.
* **Download Seguro:** O acesso a arquivos privados é intermediado pela API `POST /api/download-url`, que valida a sessão do Supabase antes de emitir uma URL temporária assinada (`GetObjectCommand`) com expiração de 1 hora.

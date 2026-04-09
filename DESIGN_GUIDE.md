# 🎨 Guia Visual de Componentes

## Paleta de Cores LifeOS

```
┌─────────────────────────────────────────────────────────────┐
│ DARK THEME                                                   │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  Background (--bg)          #0a0a0f  ██████  Mais escuro    │
│  Surface (--surface)        #111118  ██████  Dark           │
│  Surface 2 (--surface2)     #16161f  ██████  Lighter dark   │
│                                                              │
│  ---------- ACENTOS ----------                               │
│  Accent (--accent)          #7c5cfc  ██████  Roxo           │
│  Accent 2 (--accent2)       #a78bfa  ██████  Rosa           │
│                                                              │
│  ---------- STATUS ----------                                │
│  Verde (--green)            #22d3a0  ██████  Sucesso        │
│  Âmbar (--amber)            #f59e0b  ██████  Aviso          │
│  Coral (--coral)            #f87171  ██████  Erro/Perigo    │
│  Azul (--blue)              #60a5fa  ██████  Informação     │
│  Rosa (--pink)              #f472b6  ██████  Secundário      │
│                                                              │
│  ---------- TEXTO ----------                                 │
│  Texto Principal (--text)   #e8e6f0  ██████  Claro          │
│  Mutado (--muted)           #6b6880  ██████  Cinza          │
│                                                              │
│  ---------- BORDAS ----------                                │
│  Border (--border)          rgba(255,255,255,0.07)          │
│  Border 2 (--border2)       rgba(255,255,255,0.12)          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## 📐 Componentes Principais

### 1️⃣ Card Padrão

```
┌─────────────────────────────────────────────┐
│ █ TOP BAR (3px de cor)                      │
├─────────────────────────────────────────────┤
│                                              │
│  💰 Financeiro                               │
│  Descrição do módulo                         │
│                                              │
│  ┌─────────────────────────────┐            │
│  │ R$ 1,234.56                 │            │
│  └─────────────────────────────┘            │
│                                              │
└─────────────────────────────────────────────┘

Classes: bg-surface border border-opacity-10 rounded-xl p-6
```

### 2️⃣ Botão Primário

```
┌──────────────────────────┐
│  bg-gradient-to-r        │
│  from-accent to-accent2  │
│                          │
│  + Adicionar Transação   │
│                          │
└──────────────────────────┘

Classes: px-6 py-3 rounded-lg font-semibold hover:opacity-90
```

### 3️⃣ Botão Secundário

```
┌──────────────────────────┐
│  bg-surface2             │
│  hover:bg-opacity-10     │
│                          │
│      Cancelar            │
│                          │
└──────────────────────────┘

Classes: px-6 py-2.5 rounded-lg transition
```

### 4️⃣ Input/Textarea

```
┌─ Email ─────────────────────────────────────┐
│                                              │
│ seu@email.com                                │
│                                              │
└──────────────────────────────────────────────┘

Classes: w-full bg-surface2 border rounded-lg px-4 py-2.5
         focus:outline-none focus:border-accent
```

### 5️⃣ Badge/Tag

```
┌────────────────┐
│ Muito Alta     │ ← bg-coral bg-opacity-10 text-coral
└────────────────┘
```

---

## 🖼️ Layout da Página Login

```
┌────────────────────────────────────────────────────┐
│         Gradient Background (dark)                 │
│                                                    │
│              ┌──────────────────┐                 │
│              │      🌀           │                 │
│              │    LifeOS         │                 │
│              │    SaaS           │                 │
│              └──────────────────┘                 │
│                                                    │
│         ┌───────────────────────────┐             │
│         │   Bem-vindo de volta      │             │
│         ├───────────────────────────┤             │
│         │ Email:      [     input   ]│             │
│         │ Senha:      [     input   ]│             │
│         │                           │             │
│         │  [     Entrar     ]       │             │
│         └───────────────────────────┘             │
│                                                    │
│    Não tem conta? Criar nova conta                │
│                                                    │
└────────────────────────────────────────────────────┘
```

---

## 🖼️ Layout do Dashboard

```
┌────────────────────────────────────────────────────────────────┐
│ 🌀 LifeOS          Email: user@example.com      [Sair]        │
├────────────────────────────────────────────────────────────────┤
│ 💰 Financeiro | 📊 Dívidas | 💳 Cartões | 🎯 Metas | ... │
├────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Max Width Container (1280px)                                   │
│                                                                 │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐                      │
│  │ Renda    │  │ Despesas │  │ Saldo    │                      │
│  │ R$ 5k    │  │ R$ 2k    │  │ R$ 3k    │                      │
│  └──────────┘  └──────────┘  └──────────┘                      │
│                                                                 │
│  ┌─────────────────────────────────────────┐                  │
│  │ + Adicionar Transação                   │                  │
│  └─────────────────────────────────────────┘                  │
│                                                                 │
│  ┌─────────────────────────────────────────┐                  │
│  │ Últimas Transações                      │                  │
│  ├─────────────────────────────────────────┤                  │
│  │ 🛒 Compras | MC | PIX | R$ 123.45       │                  │
│  │ 🍕 Restaurante | MC | PIX | R$ 87.90    │                  │
│  │ 💼 Salário | PIX | + R$ 5,000.00        │                  │
│  └─────────────────────────────────────────┘                  │
│                                                                 │
└────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Components Tree

```
App
├─ Login (autenticação)
│  ├─ Email input
│  ├─ Password input
│  └─ Submit button
│
└─ Dashboard
   ├─ Header
   │  ├─ Logo + Brand
   │  ├─ User info
   │  └─ Logout button
   │
   ├─ Navigation
   │  ├─ Finance nav
   │  ├─ Goals nav
   │  ├─ Habits nav
   │  └─ Profile nav
   │
   └─ Active Module
      ├─ FinanceModule
      │  ├─ Summary cards
      │  ├─ Form
      │  └─ Transactions list
      │
      ├─ GoalsModule
      │  ├─ Form
      │  └─ Goals grid
      │
      ├─ HabitsModule
      │  ├─ Form
      │  └─ Habits grid
      │
      ├─ DebtsModule
      │  ├─ Summary
      │  ├─ Form
      │  └─ Debts list
      │
      ├─ CreditCardsModule
      │  ├─ Summary
      │  ├─ Form
      │  └─ Cards grid
      │
      └─ ProfileModule
         ├─ Profile info
         ├─ Edit form
         └─ Account info
```

---

## 📱 Breakpoints

```
Mobile (≤ 767px)
├─ Single column
├─ Full width cards
├─ Stacked inputs
└─ Touch-friendly buttons

Tablet (768px - 1023px)
├─ 2 columns
├─ Wider cards
└─ Compact layout

Desktop (1024px+)
├─ 3+ columns
├─ Max width 1280px
├─ Centered content
└─ Full featured

Ultra-wide (1920px+)
├─ 4 columns
├─ Extra padding
└─ Maximum utilization
```

---

## 🎨 Estado dos Elementos

### Hover State
```
Card normal:        border: border-opacity-10
Card hover:         border: border-opacity-20 (subtle)

Button normal:      opacity-100
Button hover:       opacity-90 (slight fade)

Input normal:       outline: none, border-opacity-10
Input focus:        border-accent, border-opacity-30 (accent color)

Link normal:        color-muted
Link hover:         color-text, cursor-pointer
```

### Loading State
```
┌────────────────────────────┐
│                            │
│    ⏳ Carregando...       │
│                            │
└────────────────────────────┘
```

### Error State
```
┌──────────────────────────────────┐
│ ❌ Email inválido                 │ ← bg-coral bg-opacity-10
│                                  │    text-coral
└──────────────────────────────────┘
```

### Success State
```
┌──────────────────────────────────┐
│ ✅ Objetivo adicionado com sucesso│ ← bg-green bg-opacity-10
│                                  │    text-green
└──────────────────────────────────┘
```

---

## 📏 Spacing System

```
Padding/Margin:
2    = 0.5rem (8px)
3    = 0.75rem (12px)
4    = 1rem (16px)
6    = 1.5rem (24px)
8    = 2rem (32px)
12   = 3rem (48px)

Exemplo:
p-6      = padding: 1.5rem
py-4     = padding-top + padding-bottom: 1rem
mb-8     = margin-bottom: 2rem
gap-4    = gap: 1rem (flex/grid)
```

---

## 🔤 Tipografia

```
Títulos (Syne)
h1: text-4xl font-bold (36px)
h2: text-2xl font-bold (24px)
h3: text-lg font-bold (18px)

Corpo (DM Sans)
p:  text-base font-normal (16px)
sm: text-sm (14px)
xs: text-xs (12px)

Pesos:
300: Light (rare)
400: Regular (body)
500: Medium (labels)
700: Bold (headers)
800: Extra Bold (brand)
```

---

## 🎯 Responsividade

### Exemplo: Card Grid

```
Mobile (1 col):
┌───────────┐
│ Card 1    │
├───────────┤
│ Card 2    │
├───────────┤
│ Card 3    │
└───────────┘

Tablet (2 col):
┌───────────┬───────────┐
│ Card 1    │ Card 2    │
├───────────┼───────────┤
│ Card 3    │           │
└───────────┴───────────┘

Desktop (3 col):
┌───────────┬───────────┬───────────┐
│ Card 1    │ Card 2    │ Card 3    │
└───────────┴───────────┴───────────┘
```

---

## 🎬 Animações

```css
transition: all 0.2s ease  /* Smooth transitions */
hover:opacity-90           /* Botões ficam levemente transparentes */
hover:bg-opacity-20        /* Cards mudam de opacidade */
hover:text-text            /* Texto muda cor */
```

---

## 📦 Componentes Reutilizáveis

### Summary Card
```jsx
<div className="bg-surface border border-white border-opacity-10 rounded-xl p-6">
  <p className="text-muted text-sm mb-2">Renda</p>
  <p className="text-3xl font-bold text-green">R$ {income.toFixed(2)}</p>
</div>
```

### Form Group
```jsx
<div>
  <label className="block text-sm text-muted mb-2">Email</label>
  <input
    type="email"
    className="w-full bg-surface2 border border-white border-opacity-10 rounded-lg px-4 py-2.5 text-text"
  />
</div>
```

### Button Primary
```jsx
<button className="px-6 py-3 bg-gradient-to-r from-accent to-accent2 hover:opacity-90 text-white rounded-lg font-semibold transition">
  Ação
</button>
```

### List Item
```jsx
<div className="flex justify-between items-center p-4 hover:bg-surface2 transition">
  <div><p className="font-semibold">{title}</p></div>
  <p className="text-green">R$ {amount.toFixed(2)}</p>
</div>
```

---

## 🎪 Exemplos Visuais de Módulos

### Módulo Financeiro
```
[Renda ▌ Despesas ▌ Saldo]  ← Cards de resumo

[+ Adicionar Transação]      ← CTA Button

[Últimas Transações]         ← Lista de items
  Item 1
  Item 2
  Item 3
```

### Módulo de Metas
```
[+ Adicionar Meta]           ← CTA Button

[Grid 3 cols]                ← Goals grid
  ┌─ Goal 1 ─┐
  ├──────────┤
  │ Descrição│
  │ Preview  │
  └──────────┘
```

### Módulo de Hábitos
```
[+ Adicionar Hábito]         ← CTA Button

[Grid 3 cols]                ← Habits grid com progress bar
  ┌─ Habit 1 ─┐
  │ Icon      │
  │ ▓▓▓░░░░░░│ ← Progress
  └──────────┘
```

---

## ✅ Checklist Visual

- [x] Dark theme implementado
- [x] Cores acessíveis (contrast)
- [x] Responsive layout
- [x] Hover states definidos
- [x] Loading states
- [x] Error states
- [x] Success states
- [x] Spacing consistente
- [x] Tipografia hierárquica
- [x] Animações suaves

---

**Design pronto para produção!** 🎨

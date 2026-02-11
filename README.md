# FullControl - Sistema de Gerenciamento de Shopping de Boxes

## 📋 Objetivo da Empresa

O **FullControl** é um sistema de gestão completo para shopping de boxes e salas comerciais que visa:

- **Centralizar a administração** de todas as unidades (boxes e salas) do empreendimento
- **Facilitar o controle financeiro** de aluguéis e taxas adicionais
- **Oferecer visibilidade** sobre ocupação, ocupantes e status de pagamentos
- **Automatizar processos** como emissão de recibos e alertas de vencimento
- **Melhorar o relacionamento** com inquilinos através de notificações

---

## 🎯 Funcionalidades - MVP (Mínimo Produto Viável)

### 1. **Visualização de Boxes e Salas**
- Listar todos os boxes e salas do shopping
- Indicar status: **Ocupado** ou **Vazio**
- Filtrar por seu tipo **Sala e Box** e número da unidade

### 2. **Visualização de Proprietários/Locatários**
- Consultar informações dos inquilinos
- Identificar responsáveis por cada unidade
- Manter dados de contato atualizado

### 3. **Controle de Pagamentos**
- Verificar status: **Pago** ou **Pendente**
- Visualizar histórico de pagamentos
- Identificar atrasos

### 4. **Emissão de Recibos**
Gerar recibos detalhados contendo:
- Número e andar da unidade (box/sala)
- Valor do aluguel
- Valor da taxa de energia
- Nome do responsável/inquilino
- Mês de referência da cobrança
- Data de emissão

### 5. **Alertas de Vencimento**
- Notificar sobre vencimentos próximos
- Avisos automáticos para inquilinos em atraso

---

## ⭐ Funcionalidades Extras

### 1. **Relação de Funcionários**
- Cadastro de staff do shopping
- Atribuição de responsabilidades
- Lista de Funcionários do Mercado

### 2. **Dependências do Mercado**
- Gerenciar espaços compartilhados
- Gestão de áreas comuns

### 3. **Notificações de Inquilinos**
- Sistema de avisos e lembretes via E-mail e Whatsapp
- Comunicação com locatários

### 4. **Planejamento Financeiro**
- Visualizar dados do mês atual e futuros
- Tabelas de previsão de receita
- Indicar boxes vazios para aluguel futuro

### 5. **Transferência de Unidades**
- Permitir transferência de box entre inquilinos
- Registrar mudanças de locação

---

## 📊 Entidades do Sistema

### **BOX / SALA**
- **Número**: Identificador único da unidade
- **Tamanho**: Dimensões ou categoria da unidade
- **Fiador**: Responsável legal da unidade

### **FIADOR**
- **Nome**: Nome completo do responsável
- **CPF**: Cadastro de Pessoa Física
- **Telefone**: Contato para comunicação

---

## 🗂️ Fluxo Principal

```
1. Cadastrar Boxes/Salas e Fiadores
   ↓
2. Aluguel de Unidades
   ↓
3. Controle de Pagamentos (Mensal)
   ↓
4. Emissão de Recibos
   ↓
5. Alertas de Vencimento
   ↓
6. Relatórios Financeiros
```

---

## 🚀 Próximos Passos

- [ ] Definir arquitetura do projeto
- [ ] Criar banco de dados
- [ ] Desenvolver interface de usuário
- [ ] Implementar API backend
- [ ] Testes e validações
- [ ] Deploy

---

## 📞 Contato

Para informações sobre o projeto, entre em contato através dos canais disponíveis.
🗃 devleonardoxlbr@gmail.com

---

**Versão**: 1.0  
**Data**: 11 de fevereiro de 2026

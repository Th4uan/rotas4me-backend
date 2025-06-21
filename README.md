# 🛡️ Rotas4Me

<p align="center">
  <img src="assets/images/image 75.png" alt="Rotas4Me Logo" width="200">
</p>

# 🗺️ Rotas4Me

<p align="center">
  <strong>Sistema inteligente de roteamento com análise de segurança focado na proteção feminina</strong>
</p>

## 🎯 Objetivo

O **Rotas4Me** é uma aplicação desenvolvida para promover a segurança de mulheres através de um sistema inteligente de cálculo de rotas. A plataforma analisa áreas de risco e sugere caminhos mais seguros, contribuindo para reduzir a vulnerabilidade feminina em espaços urbanos.

## ✨ Funcionalidades Implementadas

### 🛣️ **Sistema de Rotas Inteligentes**
- ✅ Integração completa com Google Maps Directions API
- ✅ Suporte a múltiplos modos de transporte (caminhada, carro, bicicleta, transporte público)
- ✅ Cálculo automático de rotas alternativas quando detectados marcadores perigosos
- ✅ Geocodificação e geocodificação reversa
- ✅ Matriz de distância entre múltiplos pontos
- ✅ Waypoints personalizados

### 🛡️ **Análise de Segurança Avançada**
- ✅ Sistema de pontuação de segurança (0-100)
- ✅ **17 tipos de marcadores** categorizados:
  - **Marcadores Perigosos**: `HIGH_CRIME_RATE`, `UNSAFE_AREA`, `POOR_LIGHTING`, `SUSPECTED_DRUG_TRAFFICKING`, `HARASSMENT_REPORTS`, `CATCALLING_ZONE`, `STALKING_REPORTS`, `UNSAFE_BUS_STOP`, `NIGHT_DANGER_ZONE`, `WEEKEND_RISK_AREA`
  - **Marcadores Seguros**: `SAFE_SPOT`, `EMERGENCY_BUTTON`, `SECURITY_CAMERA`, `TRUSTED_ESTABLISHMENT`, `POLICE_STATION`, `HOSPITAL`, `WOMEN_SUPPORT_CENTER`
- ✅ Detecção automática de marcadores próximos à rota (raio configurável: 300m para perigo, 1000m para segurança)
- ✅ Algoritmo inteligente que evita áreas de risco mesmo com apenas 1 marcador perigoso
- ✅ Cálculo de rotas alternativas baseado em análise de segurança

### 📍 **Gerenciamento Avançado de Marcadores**
- ✅ CRUD completo de marcadores
- ✅ Busca por tipo de marcador
- ✅ Busca por proximidade geográfica
- ✅ Filtros avançados por múltiplos tipos
- ✅ Coordenadas geográficas precisas

### 🌍 **Serviços de Geolocalização**
- ✅ Busca de marcadores próximos por coordenadas
- ✅ Cálculo de distâncias usando fórmula de Haversine
- ✅ Conversão de endereços em coordenadas
- ✅ Conversão de coordenadas em endereços

### 👥 **Sistema Completo de Usuários**
- ✅ CRUD completo de usuários
- ✅ Busca por email e ID
- ✅ Busca de usuários próximos por geolocalização
- ✅ Perfis com informações de segurança
- ✅ Configurações de privacidade (compartilhamento de localização)
- ✅ Sistema de contatos de emergência
- ✅ Configurações de notificações de segurança

### 🚨 **Sistema de Emergência via SMS**
- ✅ Integração completa com Twilio
- ✅ Envio de SMS simples
- ✅ **Alertas de emergência automáticos** para contatos cadastrados
- ✅ Notificações incluem localização e tipo de emergência
- ✅ Verificação de configurações de segurança do usuário
- ✅ Estatísticas de envio (sucessos/falhas)
- ✅ Status do serviço SMS

## 🏗️ Arquitetura e Tecnologias

### **Backend Robusto**
- ✅ **NestJS** com TypeScript
- ✅ **Clean Architecture** e princípios SOLID
- ✅ **Injeção de Dependência** nativa
- ✅ **Modularização** completa

### **Banco de Dados**
- ✅ **PostgreSQL** como banco principal
- ✅ **TypeORM** para mapeamento objeto-relacional
- ✅ Migrations e seeds automatizados

### **Integrações Externas**
- ✅ **Google Maps Services** (Directions, Geocoding, Distance Matrix)
- ✅ **Twilio** para SMS e notificações de emergência

### **Segurança e Monitoramento**
- ✅ **Helmet** para headers de segurança
- ✅ **Rate Limiting** com ThrottlerModule
- ✅ **Validação** automática de dados com class-validator
- ✅ **Filtros de exceção** personalizados
- ✅ **CORS** configurado
- ✅ **Logs** estruturados

### **Documentação e API**
- ✅ **Swagger/OpenAPI** completo
- ✅ Documentação automática de endpoints
- ✅ Exemplos de requisições e respostas
- ✅ Validação de schemas

### **Infraestrutura**
- ✅ **Docker** e **Docker Compose**
- ✅ Configuração de ambiente via variáveis
- ✅ Scripts de desenvolvimento e produção

## 🚀 Como Executar

### Pré-requisitos
- Node.js 22+
- Docker e Docker Compose
- Conta Google Cloud (Google Maps API)
- Conta Twilio (SMS)

### Instalação

```bash
# Clonar o repositório
git clone <https://github.com/Th4uan/rotas4me-backend>
cd rotas4me

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Entrar na pasta docker subir o conteiner
cd docker && docker compose up 
```

# 🗺️ Rotas4Me

<p align="center">
  <strong>Sistema inteligente de roteamento com análise de segurança</strong>
</p>

## 🎯 Objetivo

O **Rotas4Me** é uma aplicação desenvolvida especificamente para **proteção e segurança de mulheres**, oferecendo rotas seguras e inteligentes através da integração de dados de segurança urbana com o Google Maps API. O sistema foi criado para combater a violência contra a mulher, analisando marcadores de risco e segurança ao longo das rotas, priorizando caminhos mais seguros e bem iluminados para garantir que mulheres possam se deslocar com maior tranquilidade e proteção.

## ✨ Funcionalidades

### 🛣️ **Cálculo de Rotas Inteligentes**
- Integração completa com Google Maps Directions API
- Suporte a múltiplos modos de transporte (caminhada, carro, bicicleta, transporte público)
- Cálculo de rotas com waypoints personalizados
- Geração automática de rotas alternativas quando detectados riscos

### 🛡️ **Análise de Segurança Focada na Proteção Feminina**
- Sistema de pontuação de segurança específico para mulheres
- Detecção de áreas com histórico de violência contra mulheres
- Identificação de locais seguros (delegacias da mulher, hospitais, centros de apoio)
- Priorização de rotas bem iluminadas e com maior movimento de pessoas
- Algoritmo inteligente para evitar áreas de risco conhecidas
- Alertas em tempo real sobre zonas de perigo

### 📍 **Gerenciamento de Marcadores de Segurança Feminina**
- CRUD completo de marcadores específicos para segurança da mulher
- Categorização especializada (delegacias da mulher, centros de apoio, áreas de risco)
- Mapeamento colaborativo de locais seguros e perigosos
- Busca de marcadores por proximidade geográfica
- Filtros por tipo e raio de distância
- Sistema de denúncias anônimas de locais perigosos

### 🌍 **Serviços de Geolocalização**
- Geocodificação de endereços
- Geocodificação reversa (coordenadas para endereços)
- Cálculo de matriz de distâncias
- Busca de locais próximos

### 👥 **Sistema de Usuários**
- Autenticação e autorização
- Perfis de usuário personalizados
- Histórico de rotas calculadas
- Rede de apoio e contatos de emergência

### 🚨 **Recursos de Emergência**
- Botão de pânico integrado
- Compartilhamento de localização em tempo real com contatos de confiança
- Integração com números de emergência (190, 180)
- Notificações automáticas para contatos em situações de risco

## 🌟 Impacto Social

O **Rotas4Me** representa um compromisso com a **segurança e empoderamento feminino**, contribuindo para:

- **Redução da violência contra mulheres** através de rotas mais seguras
- **Maior autonomia e liberdade de movimento** para mulheres em áreas urbanas
- **Criação de uma rede colaborativa** de segurança feminina
- **Conscientização sobre locais de risco** e recursos de apoio disponíveis
- **Promoção de políticas públicas** baseadas em dados reais de segurança

## 🏗️ Arquitetura

Aplicação construída com **NestJS** seguindo os princípios de:
- **Clean Architecture**
- **SOLID Principles**
- **Dependency Injection**
- **Modularização**

### 📦 Módulos Principais
- **Maps Module**: Integração com Google Maps e cálculo de rotas
- **Marker Module**: Gerenciamento de marcadores de segurança
- **User Module**: Autenticação e gestão de usuários
- **Common Module**: Utilitários e serviços compartilhados

## 🚀 Tecnologias

- **Backend**: NestJS + TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: TypeORM
- **APIs Externas**: Google Maps Services
- **Documentação**: Swagger/OpenAPI
- **Containerização**: Docker

## Description

Sistema de roteamento inteligente desenvolvido com [NestJS](https://github.com/nestjs/nest) framework.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

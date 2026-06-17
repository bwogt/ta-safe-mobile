# TA-SAFE-MOBILE

[![Expo](https://img.shields.io/badge/Expo-54-000020?style=flat&logo=expo&logoColor=white)](https://expo.dev) 
[![React Native](https://img.shields.io/badge/React_Native-0.81-61DAFB?style=flat&logo=react&logoColor=white)](https://reactnative.dev) 
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat&logo=react&logoColor=white)](https://react.dev) 
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat&logo=typescript&logoColor=white)](https://typescriptlang.org) 
[![Expo Router](https://img.shields.io/badge/Expo_Router-6.0-000020?style=flat&logo=expo&logoColor=white)](https://docs.expo.dev/router/introduction/) 
[![NativeWind](https://img.shields.io/badge/NativeWind-4.2-06B6D4?style=flat&logo=tailwindcss&logoColor=white)](https://www.nativewind.dev/) 
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-5.101-FF4154?style=flat&logo=reactquery&logoColor=white)](https://tanstack.com/query) 
[![Zustand](https://img.shields.io/badge/Zustand-5.0-000000?style=flat&logo=react&logoColor=white)](https://github.com/pmndrs/zustand) 
[![i18next](https://img.shields.io/badge/i18next-26.1-26A69A?style=flat&logo=i18next&logoColor=white)](https://www.i18next.com/) 
[![Zod](https://img.shields.io/badge/Zod-4.3-3E67B1?style=flat&logo=zod&logoColor=white)](https://zod.dev/)
[![ESLint](https://img.shields.io/badge/ESLint-9.25-4B32C3?style=flat&logo=eslint&logoColor=white)](https://eslint.org)
[![Jest](https://img.shields.io/badge/Jest-29.7-C21325?style=flat&logo=jest&logoColor=white)](https://jestjs.io/)

## 🧠 Contexto e Motivação

No Brasil, **mais de 1 milhão de celulares são roubados ou furtados por ano**. Esse mercado paralelo movimenta cifras significativas e alimenta um ciclo em que aparelhos de procedência duvidosa são repassados a consumidores sem qualquer comprovação de origem.

Diante desse cenário, o comprador comum dispõe de poucos recursos para verificar a legalidade e a procedência de um aparelho usado. O Tá Safe surge como um protótipo acadêmico que permite o registro do dispositivo a partir da Nota Fiscal Eletrônica (NF-e) e o registro voluntário das transferências de propriedade entre usuários. Esses dados constroem um histórico público, verificável e rastreável, auxiliando o usuário na avaliação da procedência do aparelho.

Este repositório contém a **nova versão do aplicativo mobile**, em desenvolvimento com foco em arquitetura limpa, performance e manutenibilidade, substituindo a [versão legada](https://github.com/bwogt/ta-safe-mobile-legacy).

## 📌 Links úteis

- 📄 [Monografia (TCC)](https://tcc.tsi.pro.br/uploads/academic_activity/pdf/268/GP_COINT_2024_1_BRUNO_JOSE_DOS_SANTOS_WOGT_MONOGRAFIA.pdf)
- 🎯 [Gestão de atividades (Kanban)](https://github.com/users/bwogt/projects/25)
- 🔌 [TA-SAFE-API (Backend)](https://github.com/bwogt/ta-safe-api)
- 📱 [Versão legada do app](https://github.com/bwogt/ta-safe-mobile-legacy)

## 🚀 Funcionalidades (em construção)

+ **Autenticação**: Cadastro, login, atualização de perfil e redefinição de senha;
+ **Registro de celulares**: Cadastro de dispositivos por meio do preenchimento das informações do aparelho e do código de visualização da Nota Fiscal Eletrônica (NF-e);
+ **Validação de registros**: Extração automática dos dados da NF-e por meio de web scraping e envio das informações para validação no backend;
+ **Histórico de propriedade**: Consulta ao histórico de propriedade e de transferências do dispositivo;
+ **Transferência de propriedade**: Solicitação e aceite de transferências de propriedade entre usuários;
+ **Compartilhamento de registros**: Geração de links públicos para consulta da procedência e do histórico de propriedade do dispositivo.

## 🛠️ Stack Tecnológica

| Camada                    | Tecnologia                         |
|---------------------------|-----------------------------------|
| **Framework**             | Expo 54 + React Native 0.81       |
| **Linguagem**             | TypeScript 5.9                    |
| **Navegação**             | Expo Router 6.0 (file-based)      |
| **Gerenciamento de Estado** | Zustand 5.0 (local) + TanStack Query 5.101 (assíncrono) |
| **Formulários e Validação** | react-hook-form 7.75 + Zod 4.3   |
| **Requisições HTTP**      | Axios 1.15                        |
| **Internacionalização**   | i18next 26.1 + react-i18next 17.0 |
| **Estilização**           | NativeWind 4.2 (Tailwind CSS)     |
| **Armazenamento Local**   | AsyncStorage 2.2 + SecureStore 15.0 |
| **UI Components**         | Componentes customizados com Tailwind |
| **Feedback ao Usuário**   | react-native-toast-message 2.3    |
| **Testes**                | Jest 29.7 + jest-expo 54.0        |
| **Linting/Formatting**    | ESLint 9.25 + Prettier            |

## 📱 Ambiente de Desenvolvimento

### Pré‑requisitos
- Node.js 20 
- Aplicativo **Expo Go** (SDK 54)

### Passos para executar

1. Clone o repositório
~~~bash
git clone git@github.com:bwogt/ta-safe-mobile.git
~~~

2. Acesse a pasta do projeto
~~~bash
cd ta-safe-mobile
~~~

3. Copie o arquivo de ambiente
~~~bash
cp .env.example .env.local
~~~

4. Ajuste a variável de ambiente com a URL da API
~~~bash
EXPO_PUBLIC_API_URL=http://IP_DA_SUA_MAQUINA:80/api
~~~

> Substitua 'IP_DA_SUA_MAQUINA' pelo endereço IP local da máquina onde a API está sendo executada (por exemplo, 192.168.0.10).

5. Instale as dependências
~~~bash
npm install
~~~

6. Inicie o servidor de desenvolvimento (com cache limpo)
~~~bash
npx expo start -c
~~~

7. Abra o aplicativo Expo Go (SDK 54) e leia o QR Code exibido no terminal ou pressione:
- a para iniciar no emulador Android;
- i para iniciar no simulador iOS (macOS).

## 🧪 Testes
O projeto utiliza `Jest` com `jest-expo` para testes unitários:

~~~bash
# Executar testes em modo watch
npm run test

# Executar testes em modo CI com cobertura
npm run test:ci
~~~

## 📱 Capturas de Tela
> Em breve — conforme as telas forem implementadas, imagens serão adicionadas.

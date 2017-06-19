## Quake Report API

O Quake Report API executa o parse do log do servidor do Quake Arena 3 e diponibiliza em api a consulta dos resultados dos jogos.

### 1 - Configurando o projeto

### 1.1 - Clone do repositório

Execute o clone do projeto do github:
```bash
git clone https://github.com/clebercf/quake-report-api.git
```

### 1.2 - Instalando os pacotes

Entre na pasta do projeto e executa o comando de instalação, conforme ilustrado abaixo.
```bash
cd ../quake-report-api
npm install
```

### 1.3 - Variáveis de ambiente

Configure a variável de ambiente conforme para desenvolvimento
```bash
export NODE_ENV=development
```

### 2 - Rodando a aplicação

Basta executar para iniciar a aplicação na porta 3000
```bash
npm start
```

Utilize o navegador de Internet e acesse http://localhost:3000/api/version para verificar se a api esta funcionando. Um json retornará com a versão corrente da api.
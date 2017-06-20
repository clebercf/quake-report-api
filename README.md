## Quake Report API

O Quake Report API executa o parse do log do servidor do Quake Arena 3 e disponibiliza em api a consulta dos resultados dos jogos.

### 1 - Configurando o projeto

### 1.1 - Clone do repositório

Execute o clone do projeto do github:
```bash
git clone https://github.com/clebercf/quake-report-api.git
```

### 1.2 - Instalando os pacotes

Entre na pasta do projeto e execute o comando de instalação, conforme ilustrado abaixo.
```bash
cd quake-report-api
npm install
```

### 1.3 - Variáveis de ambiente

Configure a variável de ambiente, conforme comando.
```bash
export NODE_ENV=development
```

### 2 - Rodando a aplicação

Basta executar o comando abaixo para iniciar a aplicação na porta 3000
```bash
npm start
```

Utilize o navegador de Internet e acesse http://localhost:3000/api/version para verificar se a api esta funcionando. Um json retornará com a versão corrente da api.

### 3 - Testando a aplicação

### 3.1 - Execução do teste

Execute o comando abaixo para verificar os testes
```bash
npm test
```

### 3.2 - Cobertura dos testes
Caso não tenha instalado, o instanbul, execute o seguinte comando:
```bash
npm install -g istanbul
```

Para verificar a cobertura dos testes, execute o comando:
```bash
istanbul cover ./node_modules/.bin/_mocha test/**/*
```

### 4 - Consumindo a aplicação

Duas pesquisas estão disponíveis para este projeto
1) Lista todos os relatório dos jogos
http://localhost:3000/api/v1/games

2) Lista um relatório de um jogo, passando no path o id respectivo.
http://localhost:3000/api/v1/games/{id}

### 5 - Dicas para a manutenção e melhorias deste projeto

Sempre apromore os testes e verifique a eficácia dos mesmos.
Ao modificar algo, sempre execute os testes.
Monitore sempre a performance da resposta da api.
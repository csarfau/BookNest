# Rodando o Projeto

## Dependências

### Download e instalação

Antes de começarmos a trabalhar no projeto, temos que instalar as dependências primeiro.</br>
Vamos começar instalando os pré-clone, que consistem em dependências muito importantes para o bom funcionamento do projeto.

#### Pré Clone

[NPM](https://nodejs.org/en) </br>
[git](https://git-scm.com/) </br>
[Composer](https://getcomposer.org/download/) </br>
[PHP](https://www.php.net/) </br>
[MySQL](https://www.mysql.com/) </br>

---

## Clonando

Acesse o GitHub na página do projeto. Assim que a página carregar, procure por um botão escrito <b>Code</b>. Clicando sobre ele, você verá as siglas HTTPS, onde encontrará o link que deverá ser copiado.

No terminal digite o seguinte comando: </br>
```shell
git clone *link https*
```

Aguarde até o projeto ser clonado em sua máquina e, em seguida, entre na pasta do arquivo.</br>
```shell
cd BookNest
```

## Instalação

### Diretorio /backend

---

No terminal:</br>
```shell
composer install
```
Aguarde ate finalizar e digite novamente</br>
```shell
 npm install
```
Agora vamos navegar pro diretório do front</br>
```shell
cd ..\frontend\
```
Aqui instalamos os pacotes do front: </br>
```shell
npm install
```

---

## Configurações

### Arquivos .ENV

---

Agora existem dois arquivos ` .env.exemple ` no projeto, um para o front e outro para o backend. </br>
Respectivamente em: ` /BookNest/frontend ` e ` /BookNest/backend` </br>
Acesse essas pastas e em cada uma rode: </br>
```shell
cp .env.example .env
```

#### .ENV do Back 

Preencha as credenciais principalmente da conexão com o banco de dados

` DB_CONNECTION=mysql ` </br>
` DB_HOST=127.0.0.1 ` </br>
` DB_PORT=3306 ` </br>
` DB_DATABASE=laravel ` </br>
` DB_USERNAME=root ` </br>
` DB_PASSWORD= ` </br>

E a url do front:

` APP_URL= ` </br>

#### .ENV do front

Preencha a url do backend:

`VITE_API_BASE_URL=http://localhost:8000` </br>

---

## Criando o banco de dados

Agora com a conxão configurada, na pasta raiz do projeto, você pode rodar:
```shell
php artisan migrate:fresh
```
Para criar as tabelas necessárias.

# Rodando o projeto!

Para rodar o projeto agora, precisamos executar o backend e o frontend juntos, abra um terminal no diretório `/BookNest/frontend` e rode o comando:

```shell
npm run dev
```

Agora com outro terminal, acesse o diretório `/BookNest/backend` e execute o comando: 

```shell
php artisan serve
```

E tanto o front quando o back devem estar funcionando. </br>
Agora basta acessar seu navegador em ` http://localhost:3000 `

import express from 'express';
const host = '0.0.0.0';
const porta = 3000;
var listaClientes = [];

const server = express(); 

server.use(express.urlencoded({ extended: true }));

server.get("/", (requisicao, resposta) => {
    //disponibiliza o menu
    resposta.send(`
<DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
        <title>Atividade 3</title>
    </head>
     <body>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="#">Menu</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav">
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/">Inicio</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link" href="/CadastrarClientes">Cadastrar Fornecedores</a>
                    </li>
                    <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="/logout">Sair</a>
                    </li>
                </ul>
                </div>
            </div>
            </nav>

    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
</html>
`);
});
server.get("/CadastrarClientes", (requisicao, resposta) => {
    resposta.send(`
      <!DOCTYPE html>
      <html lang="pt-br">
        <head>
          <meta charset="UTF-8">
          <title>Cadastrar Fornecedor</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>

        <body class="p-4">
          <div class="container d-flex justify-content-center">
            <div class="card p-4 shadow-sm" style="max-width: 700px; width: 100%;">
              <h2 class="text-center mb-4">Cadastrar Fornecedor</h2>

        <form method="POST" action="/CadastrarCliente" class="row g-3"> 

          <!-- CNPJ -->
          <div class="col-md-6">
            <label for="cnpj" class="form-label">CNPJ</label>
            <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00">
          </div>

          <!-- Razão Social -->
          <div class="col-md-6">
            <label for="razaoSocial" class="form-label">Razão Social</label>
            <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" placeholder="Moraes & Irmãos Ltda">
          </div>

          <!-- Nome Fantasia -->
          <div class="col-md-6">
            <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
            <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" placeholder="Nome fantasia">
          </div>

          <!-- Email -->
          <div class="col-md-6">
            <label for="email" class="form-label">E-mail</label>
            <input type="email" class="form-control" id="email" name="email" placeholder="exemplo@email.com">
          </div>

          <!-- Telefone -->
          <div class="col-md-6">
            <label for="telefone" class="form-label">Telefone</label>
            <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(00) 00000-0000">
          </div>

          <!-- Endereço -->
          <div class="col-md-6">
            <label for="endereco" class="form-label">Endereço</label>
            <input type="text" class="form-control" id="endereco" name="endereco" placeholder="Rua, número, bairro">
          </div>

          <!-- Cidade -->
          <div class="col-md-6">
            <label for="cidade" class="form-label">Cidade</label>
            <input type="text" class="form-control" id="cidade" name="cidade">
          </div>

          <!-- Estado -->
          <div class="col-md-3">
            <label for="estado" class="form-label">UF</label>
            <select class="form-select" id="estado" name="estado">
              <option selected disabled value="">Escolha...</option>
              <option>SP</option>
              <option>RJ</option>
              <option>MG</option>
              <option>RS</option>
              <option>PR</option>
              <option>SC</option>
              <option>BA</option>
            </select>
          </div>

          <!-- CEP -->
          <div class="col-md-3">
            <label for="cep" class="form-label">CEP</label>
            <input type="text" class="form-control" id="cep" name="cep" placeholder="00000-000">
          </div>

          <!-- Termos -->
          <div class="col-12">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="on" id="termos" name="termos">
              <label class="form-check-label" for="termos">
                Concordo com os termos e condições.
              </label>
            </div>
          </div>

          <!-- Botão -->
          <div class="col-12">
            <button class="btn btn-primary" type="submit">Cadastrar</button>
            <a class="btn btn-secondary" href="/">Voltar</a>
          </div>

        </form>
      </div>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
</html>

`);     
});
server.post("/CadastrarCliente", (requisicao, resposta) => {
    const cnpj  = requisicao.body.cnpj;
    const razaoSocial = requisicao.body.razaoSocial;
    const nomeFantasia = requisicao.body.nomeFantasia;
    const email  = requisicao.body.email;
    const telefone = requisicao.body.telefone;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const estado = requisicao.body.estado;
    const cep = requisicao.body.cep;
    const termos = requisicao.body.termos;

    
 if (cnpj && razaoSocial && nomeFantasia && email && telefone && endereco && cidade && estado && cep && requisicao.body.termos) {
    listaClientes.push({cnpj, razaoSocial, nomeFantasia, email, telefone, endereco, cidade, estado, cep, termos});
    resposta.redirect("/listarClientes");
}
else { 
  let conteudo = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <title>Cadastrar Fornecedor</title>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
    </head>

    <body class="p-4">
      <div class="container d-flex justify-content-center">
        <div class="card p-4 shadow-sm" style="max-width: 700px; width: 100%;">
          <h2 class="text-center mb-4">Cadastrar Fornecedor</h2>

          <form method="POST" action="/CadastrarCliente" class="row g-3">

            <!-- CNPJ -->
            <div class="col-md-6">
              <label for="cnpj" class="form-label">CNPJ</label>
              <input type="text" class="form-control" id="cnpj" name="cnpj" placeholder="00.000.000/0000-00" value="${cnpj}">
      `;
      if (!cnpj) {
        conteudo += `<div class="text-danger">CNPJ é obrigatório!</div>`;
      }
      conteudo += `
            </div>

            <!-- Razão Social -->
            <div class="col-md-6">
              <label for="razaoSocial" class="form-label">Razão Social</label>
              <input type="text" class="form-control" id="razaoSocial" name="razaoSocial" placeholder="Moraes & Irmãos Ltda" value="${razaoSocial}">
      `;
      if (!razaoSocial) {
        conteudo += `<div class="text-danger">Razão Social é obrigatória!</div>`;
      }
      conteudo += `
            </div>

            <!-- Nome Fantasia -->
            <div class="col-md-6">
              <label for="nomeFantasia" class="form-label">Nome Fantasia</label>
              <input type="text" class="form-control" id="nomeFantasia" name="nomeFantasia" placeholder="Nome fantasia" value="${nomeFantasia}">
      `;
      if (!nomeFantasia) {
        conteudo += `<div class="text-danger">Nome Fantasia é obrigatório!</div>`;
      }
      conteudo += `
            </div>

            <!-- Email -->
            <div class="col-md-6">
              <label for="email" class="form-label">E-mail</label>
              <input type="email" class="form-control" id="email" name="email" placeholder="exemplo@email.com" value="${email}">
      `;
      if (!email) {
        conteudo += `<div class="text-danger">E-mail é obrigatório!</div>`;
      }
      conteudo += `
            </div>

            <!-- Telefone -->
            <div class="col-md-6">
              <label for="telefone" class="form-label">Telefone</label>
              <input type="tel" class="form-control" id="telefone" name="telefone" placeholder="(00) 00000-0000" value="${telefone}">
      `;
      if (!telefone) {
        conteudo += `<div class="text-danger">Telefone é obrigatório!</div>`;
      }
      conteudo += `
            </div>

            <!-- Endereço -->
            <div class="col-md-6">
              <label for="endereco" class="form-label">Endereço</label>
              <input type="text" class="form-control" id="endereco" name="endereco" placeholder="Rua, número, bairro" value="${endereco}">
      `;
      if (!endereco) {
        conteudo += `<div class="text-danger">Endereço é obrigatório!</div>`;
      }
      conteudo += `
            </div>

            <!-- Cidade -->
            <div class="col-md-6">
              <label for="cidade" class="form-label">Cidade</label>
              <input type="text" class="form-control" id="cidade" name="cidade" value="${cidade}">
      `;
      if (!cidade) {
        conteudo += `<div class="text-danger">Cidade é obrigatória!</div>`;
      }
      conteudo += `
            </div>

            <!-- Estado -->
            <div class="col-md-3">
              <label for="estado" class="form-label">UF</label>
              <select class="form-select" id="estado" name="estado" value="${estado}">
                <option selected disabled value="">Escolha...</option>
                <option>SP</option>
                <option>RJ</option>
                <option>MG</option>
                <option>RS</option>
                <option>PR</option>
                <option>SC</option>
                <option>BA</option>
              </select>
      `;
      if (!estado) {
        conteudo += `<div class="text-danger">Estado é obrigatório!</div>`;
      }
      conteudo += `
            </div>

            <!-- CEP -->
            <div class="col-md-3">
              <label for="cep" class="form-label">CEP</label>
              <input type="text" class="form-control" id="cep" name="cep" placeholder="00000-000" value="${cep}">
      `;
      if (!cep) {
        conteudo += `<div class="text-danger">CEP é obrigatório!</div>`;
      }
      conteudo += `
            </div>

            <!-- Termos -->
            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" value="on" id="termos" name="termos">
                <label class="form-check-label" for="termos">
                  Concordo com os termos e condições.
                </label>
              </div>
      `;
      if (!termos) {
        conteudo += `<div class="text-danger">Você deve concordar com os termos e condições!</div>`;
      }
      conteudo += `
            </div>

            <!-- Botão -->
            <div class="col-12">
              <button class="btn btn-success" type="submit">Cadastrar</button>
              <a class="btn btn-secondary" href="/">Voltar</a>
            </div>

          </form>
        </div>
      </div>

      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    </body>
  </html>
  `;

  resposta.send(conteudo);  
}

});

server.get("/listarClientes", (requisicao, resposta) => { 
    let tabelaClientes = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="icon" type="image/x-icon" href="/static/favicon.ico">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        <title>Lista de Fornecedores</title>
    </head>
    <body class="p-4">
        <div class="container">
            <h1 class="mb-4">Lista de Fornecedores</h1>
            <table class="table table-striped table-bordered align-middle">
                <thead class="table-dark">
                    <tr>
                        <th>CNPJ</th>
                        <th>Razão Social</th>
                        <th>Nome Fantasia</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Cidade</th>
                        <th>UF</th>
                        <th>CEP</th>
                    </tr>
                </thead>
                <tbody>
                `;
    
    for (let i = 0; i < listaClientes.length; i++) {
        tabelaClientes += `
            <tr>
                <td>${listaClientes[i].cnpj}</td>
                <td>${listaClientes[i].razaoSocial}</td>
                <td>${listaClientes[i].nomeFantasia}</td>
                <td>${listaClientes[i].email}</td>
                <td>${listaClientes[i].telefone}</td>
                <td>${listaClientes[i].endereco}</td>
                <td>${listaClientes[i].cidade}</td>
                <td>${listaClientes[i].estado}</td>
                <td>${listaClientes[i].cep}</td>
            </tr>
        `;
    }

    tabelaClientes += `
                </tbody>
            </table>
            <a class="btn btn-secondary" href="/CadastrarClientes">Voltar</a>
        </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
    `;

    resposta.send(tabelaClientes);
});
server.get("/login", (requisicao, resposta) => {
    resposta.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Login</title>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
          <style>
            body {
              min-height: 100vh;
              /* fundo total */
              background: linear-gradient(135deg, #1a1a1a, #4b5320);
              color: white;
            }

            header {
              background-color: rgba(0, 0, 0, 0.7);
              backdrop-filter: blur(5px);
            }

            .card {
              background-color: rgba(0, 0, 0, 0.85);
              border: none;
            }
          </style>
        </head>

      <body>
      <!-- Cabeçalho -->
        <header class="text-white text-center py-3">
          <h1>Área de Login</h1>
        </header>

  <!-- Corpo -->
  <section class="d-flex justify-content-center align-items-center py-5">
    <div class="container">
      <div class="row d-flex justify-content-center align-items-center">
        <div class="col-12 col-md-8 col-lg-6 col-xl-5">
          <div class="card p-5 text-center rounded-4 shadow-lg">

            <div class="mb-md-5 mt-md-4 pb-5">
              <h2 class="fw-bold mb-2 text-uppercase">Login</h2>
              <p class="text-white-50 mb-5">Digite seu e-mail e senha para entrar</p>

              <form action="/login" method="POST">
                <div class="form-outline form-white mb-4">
                  <input type="email" id="typeEmailX" class="form-control form-control-lg" placeholder="seu@email.com" required />
                  <label class="form-label" for="typeEmailX">Email</label>
                </div>

                <div class="form-outline form-white mb-4">
                  <input type="password" id="typePasswordX" class="form-control form-control-lg" placeholder="********" required />
                  <label class="form-label" for="typePasswordX">Senha</label>
                </div>

                <p class="small mb-5 pb-lg-2">
                  <a class="text-white-50" href="#!">Esqueceu a senha?</a>
                </p>

                <button class="btn btn-outline-light btn-lg px-5" type="submit">Entrar</button>
              </form>

            
            </div>

            <div>
              <p class="mb-0">
                Não tem uma conta? <a href="#!" class="text-white-50 fw-bold">Cadastre-se</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Scripts Bootstrap -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>

    `);
});
server.post("/login", (requisicao, resposta) => {
  const usuario = requisicao.body.usuario;
  const senha = requisicao.body.senha;
  resposta.redirect("/");
});

server.get("/logout", (requisicao, resposta) => {
    resposta.send("Você saiu do sistema.");
});

server.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`)
});
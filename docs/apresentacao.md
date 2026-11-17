# Roteiro de apresentação — Arquitetura Hexagonal

**Duração sugerida:** 12 a 15 minutos. Use cerca de 2 minutos por slide e reserve de 2 a 3 minutos para demonstrar a API e responder perguntas.

## Slide 1 — Definição e propósito (2 min)

**No slide**
- Também chamada de Ports and Adapters.
- Organiza o sistema em torno das regras e dos casos de uso.
- Portas definem contratos; adaptadores conectam tecnologias externas.

**Fala sugerida**
“A Arquitetura Hexagonal separa a lógica principal dos detalhes externos, como HTTP, banco de dados e frameworks. O nome ‘hexagonal’ é uma representação visual, não uma exigência de seis componentes. As portas são contratos de comunicação. Os adaptadores traduzem protocolos e tecnologias para esses contratos. Assim, o núcleo pode continuar estável quando a infraestrutura muda.”

## Slide 2 — Estrutura e fluxo do sistema (2 min)

**No slide**
- `Cliente → Express → CreateUserUseCase → CreateUserUseCaseImpl → UserRepository → array`
- `User` representa os dados do usuário.

**Fala sugerida**
“O cliente envia `POST /users` com um nome. O Express recebe o JSON e chama a porta de entrada. O caso de uso limpa o nome, cria o usuário e solicita a persistência pela porta de saída. O repositório em memória implementa essa porta e coloca o usuário no array. O diagrama Mermaid está em `docs/hexagonal-diagram.mmd` e pode ser importado no Draw.io pelo menu Inserir, Avançado, Mermaid.”

## Slide 3 — Implementação: core e aplicação (2 min)

**No slide**
- `core/`: tipo que representa o usuário.
- `application/ports/in/`: contrato do caso de uso.
- `application/ports/out/`: contrato de persistência.
- `application/use-cases/`: coordenação da criação.

**Fala sugerida**
“`User` representa os dados do usuário. O caso de uso verifica se o nome não está vazio. As portas pertencem à aplicação e descrevem o que ela oferece e o que precisa do exterior. `CreateUserUseCaseImpl` conhece a abstração `UserRepository`, não o array nem o Express.”

## Slide 4 — Implementação: adaptadores e execução (2 min)

**No slide**
- `adapters/in/express/`: adaptador HTTP.
- `adapters/out/memory/`: adaptador de persistência.
- `server.ts`: composição das dependências.
- Rota única: `POST /users`.

**Fala sugerida**
“O adaptador Express verifica se `name` é texto, chama o caso de uso e converte o resultado em HTTP. A resposta de sucesso é `201`; dados inválidos retornam `400`. O `InMemoryUserRepository` implementa a porta de saída com um array. `server.ts` instancia o repositório, injeta-o no caso de uso e conecta a rota. Para executar a demonstração, usamos `npm install` e `npm run dev`, depois enviamos um JSON com `name`.”

## Slide 5 — Vantagens e desvantagens (2 min)

**No slide**

**Vantagens**
- Menor acoplamento entre domínio e infraestrutura.
- Adaptadores podem ser substituídos.
- Facilita testes isolados com implementações falsas das portas.

**Desvantagens**
- Mais interfaces, arquivos e decisões de organização.
- Pode ser complexa demais para aplicações pequenas.
- O array em memória perde dados ao encerrar o processo.

**Fala sugerida**
“Neste projeto, o repositório poderia ser substituído por um adaptador de banco de dados mantendo o contrato `UserRepository`. Também é possível testar o caso de uso com um repositório falso. Por outro lado, há mais estrutura do que em uma API de um único arquivo. A arquitetura faz sentido quando a separação ajuda a evolução, os testes ou a troca de infraestrutura; não é uma obrigação para todo projeto.”

## Slide 6 — Demonstração e conclusão (2 a 4 min)

**No slide**
- Executar a API.
- Criar um usuário válido.
- Demonstrar rejeição de nome vazio.
- Reforçar o papel das portas e adaptadores.

**Fala sugerida**
“Vou criar um usuário enviando `name: Ana Silva` e mostrar a resposta com identificador e nome. Depois envio um nome vazio para demonstrar a validação do caso de uso. O ponto central é que o Express cuida de HTTP, o repositório cuida do armazenamento e o caso de uso coordena a criação.”

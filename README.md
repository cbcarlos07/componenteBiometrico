# Compomente Biométrico para leitura em Google Chrome desenvolvido em C# pela FingerTech

Para ver a documentação do projeto [clique aqui](http://fingertech.com.br/download/Nitgen/FingertecWeb/Manuais_Instalacao/Guia_FingertechWeb_Projetos.pdf)

Para baixar o projeto original direto do site da FingerTech, [clique aqui](https://bit.ly/2CZ8CRH)

O que foi alterado do projet original:

Foi acrescentada a função identify 
    
    http://localhost:9000/api/public/v1/captura/Identify

Que é a função que compara muitas digitais com a digital que está sendo lida no momento

O executável compilado com a nova alteração está no localizado na pasta Desktop/Leitor

Funciona assim:

  1. No projeto HTML_JS, a aplicação consulta uma api que traz todas as digitais

  2. Convertemos essas digitais em que estão em array em string

  3. Enviamos para a api do leitor biométrico

  4. O leitor, ler a digital

  5. Compara com o array enviado

  6. Se encontrar retorna o índice do vetor onde está localizada a pessoa em um objeto 

        {status: true, msg: 'Digital encontrada', indice: "+idxEncontrou+"}

     Se não encontrou retorna o índice com outra mensagem

        {status: true, msg: 'Digital não encontrada'}

  7. No javascript pode ser tratado esse retorno      


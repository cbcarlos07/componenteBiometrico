# Compomente Biométrico para leitura em Google Chrome desenvolvido em C# pela FingerTech

Para ver a documentação do projeto [clique aqui](http://fingertech.com.br/download/Nitgen/FingertecWeb/Manuais_Instalacao/Guia_FingertechWeb_Projetos.pdf)

Para baixar o projeto original direto do site da FingerTech, [clique aqui](https://bit.ly/2CZ8CRH)

O que foi alterado do projet original:

Foi acrescentada a função identify 
    
    http://localhost:9000/api/public/v1/captura/Identify

Que é a função que compara muitas digitais com a digital que está sendo lida no momento

O executável compilado com a nova alteração está no localizado na pasta [Desktop/Leitor](https://github.com/cbcarlos07/componenteBiometrico/tree/master/Desktop/Leitor/Release)

Funciona assim:

  1. No projeto HTML_JS, a aplicação consulta uma api que traz todas as digitais

    O resultado tem que vir neste formato:

        `[
            {
               codfun: 1
               digital: "AQAAABQAA...."
               drt: 1112222
               empresa: "Nome da empresa"
               foto: 1
               nome: "Fulano de Tal"
               setor: "FINANCEIRO"
            },
            {
               codfun: 2
               digital: "AQAAABQAA...."
               drt: 22243333333
               empresa: "Nome da empresa"
               foto: 2
               nome: "Beltrano de Tal"
               setor: DTI"
            },
            {
                codfun: 3
                digital: "AQAAABQAA...."
                drt: 039293i3i
                empresa: "Nome da empresa"
                foto: 3
                nome: "Ciclano de Tal"
                setor: Recursos Humanos"
            }     
        ]`

  2. Convertemos essas digitais em que estão em array em string
    
        
        `const digitais = JSON.stringify( digitaisEmArray )`

  3. Enviamos os dados da api para o leitor biométrico

        http://localhost:9000/api/public/v1/captura/Identify

  4. O leitor, ler a digital

  5. Compara com o array enviado

  6. Se encontrar retorna o índice do vetor onde está localizada a pessoa em um objeto 

        {status: true, msg: 'Digital encontrada', indice: "+idxEncontrou+"}

        Ex.:

        {status: true, msg: 'Digital encontrada', indice: 2}

        O valor do índice retornado no objeto é a posição do item encontrado no array.

        Ex: Caso o indice encontrado no exemplo é:

        De acordo com o item 1, o valor do índice 2 do array será


            `{
                codfun: 3
                digital: "AQAAABQAA...."
                drt: 039293i3i
                empresa: "Nome da empresa"
                foto: 3
                nome: "Ciclano de Tal"
                setor: Recursos Humanos"
            }`

        Ou seja:

            


     Se não encontrou retorna o índice com outra mensagem

        `{status: true, msg: 'Digital não encontrada'}`

  7. No javascript pode ser tratado esse retorno
    
        O índice retornado é o que veio da api do leitor biométrico

        `console.log( valoresArray[ indice ]  )`     



   Exemplo do código em [javascript](https://github.com/cbcarlos07/componenteBiometrico/blob/master/WEB/HTML_JS/js/fingertechweb.js)

        function identify() {
            /*###################################################################
            #                                                                   #
            #                                                                   #
            #       API que traz as digitais, pode ser em Nodejs, PHP, Srping   #
            #                                                                   #
            #                                                                   #
            #####################################################################
            */
            const api = 'http://localhost:3200/api/biometrico'	
            
            //console.log('parametro', b64)
            $.get( api, (dados, status) =>{
                const b64 = JSON.stringify( dados ) 
                $.ajax({
                    url: `http://localhost:9000/api/public/v1/captura/Identify`,
                    type: 'POST',
                    dataType: 'json',
                    data: b64,
                    success: function (data) {
                        if (data.status) {
                            console.log(dados[data.indice])
                            alert("Digital encontrada com sucesso!");
                        }
                        else {
                            alert("Digitais não conferem.");
                        }
                    }
                });
            })         

        }
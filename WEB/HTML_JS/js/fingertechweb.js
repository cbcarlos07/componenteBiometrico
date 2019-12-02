/*********************************************
* Nome: Capture
* Descrição: Chama o método "Capture" da aplicação desktop, 
* responsável por chamar a tela de captura de digital para apenas um único dedo.
* Este método é recomendável quando você deseja capturar a impressão digital de um único dedo e 
* não existe a necessidade de identificar qual dedo da mão esta digital pertence. 
* Retorno: Template (String) ou Null
*********************************************/
function Capture() {

	$.ajax({

		url: 'http://localhost:9000/api/public/v1/captura/Capturar/1',
		type: 'GET',
		success: function (data) {
			
			if (data != "" && data != null) {
				$("#inputTemplate").val(data);
				alert("Digital capturada com sucesso!");
			}
			else {
				alert("Digital não pode ser capturada!");
			}
		}
	})
}

/*********************************************
* Nome: Enroll
* Descrição: Chama o método "Enroll" da aplicação desktop, 
* responsável por chamar a tela de captura de impressão digital para mais de um dedo.
* Este método é recomendável quando você deseja capturar a impressão digital de mais de um dedo e
* quando é necessário identificar a qual dedo esta digital pertence. 
* Quando houver a captura de mais de uma impressão digital, elas serão armazenadas de maneira 
* codificada no mesmo "Template" (String), mas durante a comparação qualquer dedo poderá ser 
* comparado.
* Retorno: Template (String) ou "" (Vazio)
*********************************************/
function Enroll() {

	$.ajax({

		url: 'http://localhost:9000/api/public/v1/captura/Enroll/1',
		type: 'GET',
		success: function (data) {
		
			if (data != "" && data != null) {
				$("#inputTemplate").val(data);
				salvarDigital( data )
			}
			else {
				alert("Digital não pode ser capturada!");
			}
		}
	})
}

const salvarDigital = digital => {
	id = 13503
	const obj = {
		codfun: id,
		foto: id,
		digital
	}

	$.ajax({
		url: 'http://localhost:3200/api/biometrico',
		type: 'post',
		dataType: 'json',
		data: obj
	}).then( resultado => {
		if(resultado.status == true){
			alert("Digitais capturadas com sucesso!");
		}
	})
	
}

function identify() {
	const api = 'http://localhost:3200/api/biometrico'	
	
	//console.log('parametro', b64)
	$.get( api, (dados, status) =>{
		//console.log('data', data)
		//const b64 = btoa( JSON.stringify( dados ) )
		const b64 = JSON.stringify( dados ) 
		$.ajax({
			url: `http://localhost:9000/api/public/v1/captura/Identify`,
			type: 'POST',
			dataType: 'json',
			data: b64,
			success: function (data) {
				console.log('data', data)
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

/*********************************************
* Nome: Match
* Descrição: Chama o método "VerifyMatch" da aplicação desktop, 
* responsável por chamar a tela de captura de digital para apenas um único dedo e realizar a 
* comparação com um outro template (impressão digital) já cadastrada.
* Este método é recomendável quando você deseja você comparação de 1:1 (Um para Um). 
* Retorno: Template (String) ou Null
*********************************************/
function Match(digital) {
	console.log('digital', digital)
	if (digital != "") {
	
		$.ajax({
			url: 'http://localhost:9000/api/public/v1/captura/Comparar?Digital=' + digital,
			type: 'GET',
			success: function (data) {
			
				if (data != "") {
					alert("Digital encontrada com sucesso!");
				}
				else {
					alert("Digitais não conferem.");
				}
			}
		});
	}
	else {
		alert("Por favor, registre a impressão digital.");
	}
}

$(function() {
	$("#btn-capture").on("click", function(){
		Capture();
	});
	
	$("#btn-enroll").on("click", function(){
		Enroll();
	});
	
	$("#btn-match").on("click", function(){
		//var digital = $("#inputTemplate").val();
		var digital = 'AQAAABQAAAC0AQAAAQASAAMAXAAAAAAArAEAAM*hgyOa/YRLbUQuAk3IFt1wXhwr46JLzsoLLGp23TVfS6C*PwWpX5vLsuZ8*nwzj2g8urnvVPZMgREw8on2g9MhSXTqginjGTa5IJTSt02cyeSeRYjqDs5rbjDs2w8EHx9zZa/T8s7XXlGTfiEz9X/ZW1rpRHsW3iVu3VRLrrJcZ6FrYE7UB7AhaQlIwsRIaxkjOCT2wmsFfSc5RKmO*T5O*LNaMT2WEJQlrj8Ph3enhMg2pZCEHtCAFDjx2PSeSpnT6AGzeB2UUQGfbNktcRxLC4WvLhRfthlcYmQjDVuAiY/8qgy6rO9rovHQaXj4WhqfAgVRJZ6ZDauvlE*B47q3FC*xgA4pOR8VAENERnYG5Yj9ZFt*s*oVNTVV/fVLLG2iw5S8Terk16tkp*FANRGHtO1hQlYeefETT4OED/KDPwmSBeeliIJOE9Px3Iui1MBO9JH710YGym3lMz8/0i3D*ZVL3nzg1vDcKTeI3hN0AQD3sCeN4rJ63wnrDKzCu58BbYnXVazSub5hO23foLBZbaycyKFO2z7XL9lqczzYa0uPwINrbdOv9yJ1TC9OtA'
		Match(digital);
	});
	$("#btn-identify").on("click", function () {
	
		identify( )
	})
});
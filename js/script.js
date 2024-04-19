const dataInput = document.getElementById("data")
const produto = document.getElementById("produto")
const validade = document.getElementById("validade")
const resultado = document.getElementById("resultado")
const etiquetas = document.getElementById("etiquetasPdf")

let dados = document.getElementById("dados")
var data;
var prazoValidade;



function gerarEtiqueta(){  

    verificarData()
    verificarValdiade()

    resultado.innerHTML = ""

    if(produto.value.length != 0){

        resultado.innerHTML += `
            <div id="quadro">

                <span id="produtoGrama"> ${produto.value} </span>
                <span id="dataFabricacao"> ${data} </span>
                <span id="prazoValidade"> ${prazoValidade} </span>
                
                <picture>
                    <img src="imagens/etiqueta-sl.png" class="border border-secondary imgEtiqueta">
                </picture>
            </div>
        `
    } else{
        alerta()
    }
}


function gerarPdf(){

    verificarData()
    verificarValdiade()

    etiquetas.innerHTML = ""

    if(produto.value.length != 0){

        for (var x = 1; x <= 20; x++){
            etiquetas.innerHTML += `
                <div id="quadro">
                    <span id="produtoGrama"> ${produto.value} </span>
                    <span id="dataFabricacao"> ${data} </span>
                    <span id="prazoValidade"> ${prazoValidade} </span>
                    
                    <picture>
                        <img src="imagens/etiqueta.png">
                    </picture>
                </div>
            `
        }

        dados.style.display = "none"

        carregando()

        setTimeout(() => {
            window.print()
        }, 2000)

    } else{
        alerta()
    }

    // zerando todos valores
    setTimeout(() => {
        dados.style.display = "block"
        etiquetas.innerHTML = ""
        produto.value = ""
        dataInput.value = ""
        location.reload(true)
    }, 10000)

}


function verificarData(){
    if (dataInput.value == "" || dataInput.value == null){
        data = ' '
    }else{
        const da = new Date(dataInput.value)
        data = da.toLocaleDateString('pt-BR', {timeZone: 'UTC'})
    }
}


function verificarValdiade(){
    if (validade.value == "" || validade.value == null){
        prazoValidade = '15 dias'
    }else{
        prazoValidade = `${validade.value} dias`
    }
}


function alerta(){
    Toastify({
        text: "Selecione um Produto!",
        duration: 4000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#ef4444",
        },
    }).showToast()
}


function carregando(){
    Toastify({
        text: "Carregando, aguarde!",
        duration: 2000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "#00c541",
        },
    }).showToast()

    return false
}

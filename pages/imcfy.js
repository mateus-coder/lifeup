const res = document.getElementsByClassName('resultado')[0];
const formulario = document.getElementsByTagName('form')[0];
const imagem = document.getElementById('img');
const esconder = 'esconder';
const mostrar = 'mostrar';

function funcaoClassificar(){
    var peso = document.getElementById('peso');
    var altura = document.getElementById('altura');
    var pesoDaPessoa = Number(peso.value);
    var alturaDaPessoa = Number(altura.value)/100;
    var shake = "shake";
    var imc = pesoDaPessoa / (alturaDaPessoa * alturaDaPessoa);
    var imcArredondado = parseFloat(imc.toFixed(0))

    if(imc < 0){
        res.innerHTML = "Erro Não existe imc negativo !!! seu imc é de " + imc;
    }
    else{
        if(imc < 17){
            var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite1.png"}"/>`;  //peso extremamente baixo coma mais !!!
            var alerta = `<div class="alerta" style="background: #dc301b"><i class="fas fa-lightbulb"> </i><p>Hey, parece que seu peso está muito abaixo do ideal! Que tal verificar uma <a href="">dieta balanceada</a> para ganhar massa corporal?</p></div>`
        }
        else{
            if(imc <= 18.49){
                var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite2.png"}"/>`; // peso abaixo da media coma um pouco mais !!!
                var alerta = `<div class="alerta" style="background: #dc6c1b"><i class="fas fa-lightbulb"> </i><p>Hey, parece que seu peso está abaixo do ideal! Que tal verificar uma <a href="">dieta balanceada</a> para ganhar massa corporal?</p></div>`
            }
            else{
                if(imc <= 24.99){
                    var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite3.png"}"/>`; // peso normal mantenha !!! a saúde
                    var alerta = `<div class="alerta" style="background: #8adc1b"><i class="fas fa-lightbulb"></i><p>Hey, parece que seu peso está dentro do ideal! Que tal verificar uma <a href="">dieta balanceada</a> para mantê-lo?</p></div>`
                }
                else{
                    if(imc <= 29.99){
                        var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite4.png"}"/>`; // peso ligeiramente acima da média!!!
                        var alerta = `<div class="alerta" style="background: #cadc1b"><i class="fas fa-lightbulb"> </i><p>Hey, parece que seu peso ligeiramente acima do ideal! Que tal verificar uma <a href="">dieta balanceada</a> para perder massa corporal?</p></div>`
                    }
                    else{
                        if(imc <= 34.99){
                            var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite5.png"}"/>`; //Pessoa com nível de obesidade 1
                            var alerta = `<div class="alerta" style="background: #dc981b"><i class="fas fa-lightbulb"> </i><p>Hey, parece que seu peso está acima do ideal! Que tal verificar uma <a href="">dieta balanceada</a> para perder massa corporal?</p></div>`
                        }
                        else{
                            if(imc <= 39.99){
                                var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite6.png"}"/>`; //Pessoa com nível de obesidade 2
                                var alerta = `<div class="alerta" style="background: #dc6c1b"><i class="fas fa-lightbulb"> </i><p>Hey, parece que seu peso está bem acima do ideal! Que tal verificar uma <a href="">dieta balanceada</a> para perder massa corporal?</p></div>`
                            }
                            else{
                                var conteudo = `<span class="imc-resultado">${imcArredondado}</span> <img src="${"/images/IMC/sprite7.png"}"/>`; //Pessoa com nível de obesidade 3
                                var alerta = `<div class="alerta" style="background: #dc301b"><i class="fas fa-lightbulb"> </i><p>Hey, parece que seu peso está muito acima do ideal! Que tal verificar uma <a href="">dieta balanceada</a> para perder massa corporal?</p></div>`
                            }
                        }
                    }
                }
            }
        }
    }
    document.getElementById('resultado').innerHTML = conteudo;
    document.getElementById('spamdealerta').innerHTML = alerta;
}

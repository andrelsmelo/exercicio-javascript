// Dados Cliente

class Person {
    constructor(name, cpf, birthdate){
        this.name = name;
        this.cpf = cpf;
        this.birthdate = birthdate;
    }
}

// Endereço Cliente

class Adress {
    constructor(cep, adress, district, number) {
        this.cep = cep;
        this.adress = adress;
        this.district = district;
        this.number = number;
    }
}

// Registro Dados do cliente via Front

function RegistroNome(){
    var name = document.querySelector('#name').value,
        cpf = document.querySelector('#cpf').value,
        birthdate = document.querySelector('#date').value

     if(name !== '' && cpf !== '' && birthdate !== ''){
       person = new Person(name, cpf, birthdate)
        console.log('Nova pessoa criada')
        document.querySelector('#firstNext').disabled = false;
    } else {
        console.log('Dados nao preenchidos')
    };

    ;
}


// Registro Endereço do cliente via Front

function RegistroEndereco(){
    var cep = document.querySelector('#cep').value,
        adress = document.querySelector('#adress').value,
        district = document.querySelector('#district').value
        number = document.querySelector('#number').value

     if(cep !== '' && adress !== '' && district !== '' && number !== ''){
        endereco = new Adress(cep,adress,district,number)
        console.log('Endereco cadastrado')
        document.querySelector('#finish').disabled = false;
    } else {
        console.log('Dados nao preenchidos')
    };
}


// calcular data até aniversário

function formatDate (date) {
    return date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
}

function DaysUntil(){

var date = person.birthdate;
var dateFormat = formatDate(date);

var bornday = new Date(dateFormat);
var today = new Date();

function CalculaIdade(bornday){ 
    var actual_date = new Date();
    var actual_year = today.getFullYear();
    var bornday_day = bornday.getDate();
    var bornday_month = bornday.getMonth();
    var bornday_year = bornday.getFullYear();
    var age = actual_year - bornday_year;
    var actual_month = today.getMonth() + 1; 
    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
    if(actual_month < bornday_month){
    age--; 
    } else {
    //Se estiver no mes do nascimento, verificar o dia
    if(actual_month == bornday_month){ 
    if(new Date().getDate() < bornday_day ){ 
    //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
    age--; 
    }
    }
    } 
    return age; 
   }


    var age = CalculaIdade(bornday) + 1;

    var nextYearBday = bornday.getFullYear()+age;

    var bday = new Date(`${bornday.getMonth()+1}/${bornday.getDate()}/${nextYearBday}`);


    var diff = bday.getTime() - today.getTime();

    var days = Math.round(diff/(1000* 3600 * 24));

    return days_until = days
}
// Juntar Cadastro

function Cadastro(){

    cadastro = { ...person, ...endereco, days_until }

    let outputName = cadastro.name,
        outputCpf = cadastro.cpf,
        outputBirthdate = cadastro.birthdate,
        outputCep = cadastro.cep,
        outputAdress = cadastro.adress,
        outputNumber = cadastro.number,
        outputDistrict = cadastro.district,
        outputDaysUntil = days_until;
    
    //Armazenar Dados
    
        sessionStorage.setItem("name",`${cadastro.name}`),
        sessionStorage.setItem("cpf",`${cadastro.cpf}`),
        sessionStorage.setItem("birthdate",`${cadastro.birthdate}`),
        sessionStorage.setItem("cep",`${cadastro.cep}`),
        sessionStorage.setItem("adress",`${cadastro.adress}`),
        sessionStorage.setItem("number",`${cadastro.number}`),
        sessionStorage.setItem("distric",`${cadastro.district}`),
        sessionStorage.setItem("diffDays",`${days_until}`);

    //Envio De Dados HTML
        
        document.querySelector('#output-name').innerHTML = outputName
        document.querySelector('#output-cpf').innerHTML = outputCpf
        document.querySelector('#output-birthdate').innerHTML = outputBirthdate
        document.querySelector('#output-cep').innerHTML = outputCep
        document.querySelector('#output-adress').innerHTML = outputAdress
        document.querySelector('#output-number').innerHTML = outputNumber
        document.querySelector('#output-district').innerHTML = outputDistrict
        document.querySelector('#output-days-until').innerHTML = days_until

    
}

// Habilitar botao proximo quando campo nao vazio

function success1() {￼

    if(document.querySelector('#name').value==="" || document.querySelector('#cpf').value==="" || document.querySelector('#date').value==="") { 
           document.querySelector('#firstNext').disabled = true; 
       } else { 
           document.querySelector('#firstNext').disabled = false;
       }
   }

function success2() {
    if(document.querySelector('#cep').value==="" || document.querySelector('#adress').value==="" || document.querySelector('#district').value==="" || document.querySelector('#number').value==="") { 
           document.querySelector('#finish').disabled = true; 
       } else { 
           document.querySelector('#finish').disabled = false;
       }
   }

//verifica CEP, API Via CEP

function limpa_formulário_cep() {
    //Limpa valores do formulário de cep.
    document.querySelector('#adress').value=("");
    document.querySelector('#district').value=("");
}

function meu_callback(conteudo) {
if (!("erro" in conteudo)) {
    //Atualiza os campos com os valores.
    document.querySelector('#adress').value=(conteudo.logradouro);
    document.querySelector('#district').value=(conteudo.bairro);
    
} //end if.
else {
    //CEP não Encontrado.
    limpa_formulário_cep();
    alert("CEP não encontrado.");
}
}

function pesquisacep(valor) {

//Nova variável "cep" somente com dígitos.
var cep = valor.replace(/\D/g, '');

//Verifica se campo cep possui valor informado.
if (cep != "") {

    //Expressão regular para validar o CEP.
    var validacep = /^[0-9]{8}$/;

    //Valida o formato do CEP.
    if(validacep.test(cep)) {

        //Preenche os campos com "..." enquanto consulta webservice.
        document.querySelector('#adress').value="...";
        document.querySelector('#district').value="...";

        //Cria um elemento javascript.
        var script = document.createElement('script');

        //Sincroniza com o callback.
        script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

        //Insere script no documento e carrega o conteúdo.
        document.body.appendChild(script);

    } //end if.
    else {
        //cep é inválido.
        limpa_formulário_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulário_cep();
}
};


//validação CPF

function TestaCPF(strCPF) {
    
    var strCPF = person.cpf.replace(/\D/g,''); 
    var Soma;
    var Resto;
    Soma = 0;
  if (strCPF == "00000000000") return false;

  for (i=1; i<=9; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;

  Soma = 0;
    for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if ((Resto == 10) || (Resto == 11))  Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
    return true
}
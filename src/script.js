//fullPerson = {};
//fullAdress = {};

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

function RegisterName(){
    const name = document.querySelector('#name').value;
    const cpf = document.querySelector('#cpf').value;
    const birthdate = document.querySelector('#date').value;

    if(name !== '' && cpf !== '' && birthdate !== ''){
        fullPerson = new Person(name, cpf, birthdate)
        console.log('Dados Iniciais Registrados')
        document.querySelector('#firstNext').disabled = false;
        return true;
    }
    console.log('Dados nao preenchidos');
}


// Registro Endereço do cliente via Front

function RegisterAdress(){
    const cep = document.querySelector('#cep').value;
    const adress = document.querySelector('#adress').value;
    const district = document.querySelector('#district').value;
    const number = document.querySelector('#number').value;

     if(cep !== '' && adress !== '' && district !== '' && number !== ''){
        fullAdress = new Adress(cep,adress,district,number)
        console.log('Endereco cadastrado');
        document.querySelector('#finish').disabled = false;
        return true;
    }
    console.log('Dados nao preenchidos')
}


// Calculo de data até aniversário

function formatDate (date) {
    return date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
}

function DaysUntil(){
    var date = fullPerson.birthdate;
    var dateFormat = formatDate(date);
    var bornday = new Date(dateFormat);
    var today = new Date();
    var age = CalculateAge(bornday) + 1;
    var nextYearBday = bornday.getFullYear()+age;
    var bday = new Date(`${bornday.getMonth()+1}/${bornday.getDate()}/${nextYearBday}`);
    var diff = bday.getTime() - today.getTime();
    var days = Math.round(diff/(1000* 3600 * 24));
    return days;
}

function CalculateAge(bornday){ 
    var today = new Date();
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
// Fechar Cadastro

function FullRegister(){

    const fullRegister = { ...fullPerson, ...fullAdress }

    console.log(`Cadastro de ${fullPerson.name} criado`)

    let outputName = fullRegister.name;
    let outputCpf = fullRegister.cpf;
    let outputBirthdate = fullRegister.birthdate;
    let outputCep = fullRegister.cep;
    let outputAdress = fullRegister.adress;
    let outputNumber = fullRegister.number;
    let outputDistrict = fullRegister.district;
    let outputDaysUntil = DaysUntil();

    //Armazenar Dados

    sessionStorage.setItem("name",`${fullRegister.name}`),
    sessionStorage.setItem("cpf",`${fullRegister.cpf}`),
    sessionStorage.setItem("birthdate",`${fullRegister.birthdate}`),
    sessionStorage.setItem("cep",`${fullRegister.cep}`),
    sessionStorage.setItem("adress",`${fullRegister.adress}`),
    sessionStorage.setItem("number",`${fullRegister.number}`),
    sessionStorage.setItem("distric",`${fullRegister.district}`),
    sessionStorage.setItem("diffDays",`${outputDaysUntil}`);

    //Envio De Dados HTML
    document.getElementById('output-name').value = outputName
    document.getElementById('output-cpf').value = outputCpf
    document.getElementById('output-birthdate').value = outputBirthdate
    document.getElementById('output-cep').value = outputCep
    document.getElementById('output-adress').value = outputAdress
    document.getElementById('output-number').value = outputNumber
    document.getElementById('output-district').value = outputDistrict
    document.getElementById('output-days-until').value = outputDaysUntil

    return fullRegister;

}

// Habilitar botao proximo quando campo nao estiver vazio

function Success1() {

    if(document.querySelector('#name').value==="" ||
        document.querySelector('#cpf').value==="" ||
        document.querySelector('#date').value==="" ){ 
            document.querySelector('#firstNext').disabled = true;
            return 
        }
    if(TestCPF() === true){  
        document.querySelector('#firstNext').disabled = false;
        console.log('Botão Habilitado');
        document.getElementById("cpf").className = "has-success";
        document.getElementById("alert").innerHTML = ""
        return 
    } else {
        document.getElementById("alert").innerHTML = "CPF Inválido"
        document.getElementById("cpf").className = "has-error";
    }
}

function Success2() {
    if(document.querySelector('#cep').value==="" ||
        document.querySelector('#adress').value==="" ||
        document.querySelector('#district').value==="" ||
        document.querySelector('#number').value===""){
            document.querySelector('#finish').disabled = true;
    } else { 
        document.querySelector('#finish').disabled = false;
        console.log('Botão Habilitado');
    }
}

//Verifica CEP, API Via CEP

function limpa_formulario_cep() {
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
    limpa_formulario_cep();
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
        console.log('CEP Válido')

    } //end if.
    else {
        //cep é inválido.
        limpa_formulario_cep();
        alert("Formato de CEP inválido.");
    }
} //end if.
else {
    //cep sem valor, limpa formulário.
    limpa_formulario_cep();
}
};


//validação CPF

function TestCPF(strCPF) {
    
    var strCPF = document.querySelector('#cpf').value.replace(/\D/g,''); 
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
    if (Resto != parseInt(strCPF.substring(10, 11) ) )return false;

    console.log('CPF Válido')
    return true
}

// Botoes

var Form1 = document.getElementById("Form1");
var Form2 = document.getElementById("Form2");
var Form3 = document.getElementById("Form3")

var Next1 = document.getElementById("firstNext");
var Next2 = document.getElementById("finish");
var back = document.getElementById("back");
var back2 = document.getElementById("back2");
var progress = document.getElementById("progress");

Next1.onclick = function() {
    RegisterName();
    Form1.style.left = "-450px";
    Form2.style.left = "40px";
    progress.style.width = "240px";
    return false
  }

Next2.onclick = function() {
  Form2.style.left = "-450px";
  Form3.style.left = "40px";
  progress.style.width = "360px";
  RegisterAdress();
  FullRegister(fullPerson, fullAdress);
  return false
}

back.onclick = function() {
  Form1.style.left = "40px";
  Form2.style.left = "450px";
  progress.style.width = "120px";
  return false
}

back1.onclick = function() {
  Form2.style.left = "40px";
  Form3.style.left = "450px";
  progress.style.width = "240px";
  return false
}
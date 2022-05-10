// Dados Cliente

class Person {
    constructor(name, cpf, birthdate) {
        this.name = name;
        this.cpf = cpf;
        this.birthdate = birthdate;
    }
    validateFieldsPerson() {
        if(this.name !== '' && this.cpf !== '' && this.birthdate !== '') {
            return true
        }
        return false
    }
}

// Endereço Cliente

class Address {
    constructor(cep, address, district, number) {
        this.cep = cep;
        this.address = address;
        this.district = district;
        this.number = number;
    }
    validateFieldsAddress() {
        if(this.cep !== '' && this.address !== '' && this.district !== '' && this.number !== '') {
            return true
        }
        return false
    }
}

// Registro Dados do cliente via Front

function RegisterPerson() {
    const name = document.querySelector('#name').value;
    const cpf = document.querySelector('#cpf').value;
    const birthdate = document.querySelector('#date').value;

    if(Person.validateFieldsPerson()) {
        fullPerson = new Person(name, cpf, birthdate)
        console.log('Dados Iniciais Registrados')
        document.querySelector('#firstNext').disabled = false;
        return true;
    }
    console.log('Dados nao preenchidos');
}

// Registro Endereço do cliente via Front

function RegisterAddress() {
    const cep = document.querySelector('#cep').value;
    const address = document.querySelector('#address').value;
    const district = document.querySelector('#district').value;
    const number = document.querySelector('#number').value;

    if(Address.validateFieldsAddress()) {
        fullAddress = new Address(cep, address, district, number)
        console.log('Endereco cadastrado');
        document.querySelector('#finish').disabled = false;
        return true;
    }
    console.log('Dados nao preenchidos')
}

// Calculo de data até aniversário

function formatDate(date) {
    return date.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
}

function DaysUntil() {
    var date = fullPerson.birthdate;
    var dateFormat = formatDate(date);
    var bornday = new Date(dateFormat);
    var today = new Date();
    var age = CalculateAge(bornday) + 1;
    var nextYearBday = bornday.getFullYear() + age;
    var bday = new Date(`${bornday.getMonth() + 1}/${bornday.getDate()}/${nextYearBday}`);
    var diff = bday.getTime() - today.getTime();
    var days = Math.round(diff / (1000 * 3600 * 24));
    return days;
}

function CalculateAge(bornday) {
    var today = new Date();
    var actual_year = today.getFullYear();
    var bornday_day = bornday.getDate();
    var bornday_month = bornday.getMonth();
    var bornday_year = bornday.getFullYear();
    var age = actual_year - bornday_year;
    var actual_month = today.getMonth() + 1;
    //Se mes atual for menor que o nascimento, nao fez aniversario ainda;  
    if(actual_month < bornday_month) {
        age--;
    }
    else {
        //Se estiver no mes do nascimento, verificar o dia
        if(actual_month == bornday_month) {
            if(new Date().getDate() < bornday_day) {
                //Se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
                age--;
            }
        }
    }
    return age;
}

// Fechar Cadastro

function FullRegister() {
    const fullRegister = { ...fullPerson, ...fullAddress }
    console.log(`Cadastro de ${fullPerson.name} criado`)
    let outputName = fullRegister.name;
    let outputCpf = fullRegister.cpf;
    let outputBirthdate = fullRegister.birthdate;
    let outputCep = fullRegister.cep;
    let outputAddress = fullRegister.address;
    let outputNumber = fullRegister.number;
    let outputDistrict = fullRegister.district;
    let outputDaysUntil = DaysUntil();

    //Armazenar Dados

    sessionStorage.setItem("name", `${fullRegister.name}`),
    sessionStorage.setItem("cpf", `${fullRegister.cpf}`),
    sessionStorage.setItem("birthdate", `${fullRegister.birthdate}`),
    sessionStorage.setItem("cep", `${fullRegister.cep}`),
    sessionStorage.setItem("address", `${fullRegister.address}`),
    sessionStorage.setItem("number", `${fullRegister.number}`),
    sessionStorage.setItem("distric", `${fullRegister.district}`),
    sessionStorage.setItem("diffDays", `${outputDaysUntil}`);

    //Envio De Dados HTML

    document.getElementById('output-name').value = outputName
    document.getElementById('output-cpf').value = outputCpf
    document.getElementById('output-birthdate').value = outputBirthdate
    document.getElementById('output-cep').value = outputCep
    document.getElementById('output-address').value = outputAddress
    document.getElementById('output-number').value = outputNumber
    document.getElementById('output-district').value = outputDistrict
    document.getElementById('output-days-until').value = outputDaysUntil

    return fullRegister;
}

// Habilita botao proximo quando campo nao estiver vazio

function Success1() {
    if(document.querySelector('#name').value === "" ||
        document.querySelector('#cpf').value === "" ||
        document.querySelector('#date').value === "") {
        document.querySelector('#firstNext').disabled = true;
        return
    }
    if(TestCPF() === true) {
        document.querySelector('#firstNext').disabled = false;
        console.log('Botão Habilitado');
        document.getElementById("cpf").className = "has-success";
        document.getElementById("alert").innerHTML = ""
        return
    }
    else {
        document.getElementById("alert").innerHTML = "CPF Inválido"
        document.getElementById("cpf").className = "has-error";
    }
}

function Success2() {
    if(document.querySelector('#cep').value === "" ||
        document.querySelector('#address').value === "" ||
        document.querySelector('#district').value === "" ||
        document.querySelector('#number').value === "") {
        document.querySelector('#finish').disabled = true;
    }
    else {
        document.querySelector('#finish').disabled = false;
        console.log('Botão Habilitado');
    }
}

//Verifica CEP, API Via CEP

function limpa_formulario_cep() {
    //Limpa valores do formulário de cep.
    document.querySelector('#address').value = ("");
    document.querySelector('#district').value = ("");
}

function meu_callback(conteudo) {
    if(!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        document.querySelector('#address').value = (conteudo.logradouro);
        document.querySelector('#district').value = (conteudo.bairro);
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
    if(cep != "") {
        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;
        //Valida o formato do CEP.
        if(validacep.test(cep)) {
            //Preenche os campos com "..." enquanto consulta webservice.
            document.querySelector('#address').value = "...";
            document.querySelector('#district').value = "...";
            //Cria um elemento javascript.
            var script = document.createElement('script');
            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=meu_callback';
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


//Validação CPF

function TestCPF(strCPF) {
    var strCPF = document.querySelector('#cpf').value.replace(/\D/g, '');
    var Soma = 0;
    var Resto;

    if(strCPF == "00000000000") return false;

    for(i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if((Resto == 10) || (Resto == 11)) Resto = 0;
    if(Resto != parseInt(strCPF.substring(9, 10))) return false;

    for(i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if((Resto == 10) || (Resto == 11)) Resto = 0;
    if(Resto != parseInt(strCPF.substring(10, 11))) return false;

    console.log('CPF Válido')

    return true
}

// Botoes

var formPerson = document.getElementById("FormPerson");
var formAddress = document.getElementById("FormAddress");
var formFullRegister = document.getElementById("FormFullRegister")

var nextToAddress = document.getElementById("NextToAddress");
var nextToFullRegister = document.getElementById("NextToFullRegister");
var backToPerson = document.getElementById("BackToPerson");
var backToAddress = document.getElementById("BackToAddress");
var progressBar = document.getElementById("progressBar");

nextToAddress.onclick = function () {
    RegisterPerson();
    formPerson.style.left = "-450px";
    formAddress.style.left = "40px";
    progressBar.style.width = "240px";
    return false
}

nextToFullRegister.onclick = function () {
    formAddress.style.left = "-450px";
    formFullRegister.style.left = "40px";
    progressBar.style.width = "360px";
    RegisterAddress();
    FullRegister(fullPerson, fullAddress);
    return false
}

backToPerson.onclick = function () {
    formPerson.style.left = "40px";
    formAddress.style.left = "450px";
    progressBar.style.width = "120px";
    return false
}

backToAddress.onclick = function () {
    formAddress.style.left = "40px";
    formFullRegister.style.left = "450px";
    progressBar.style.width = "240px";
    return false
}
'use strict'

// Criação de constantes e variáveis iniciais
// -----------------------------------------------------------------------------------------------------------------------------

const $buttons = document.querySelectorAll('[id*=digit]');
const $display = document.querySelector('.calculator__main');
const $operators = document.querySelectorAll('[id*=operator]');
const $miniDisplay = document.querySelector('.calculator__mini');
const $inputRange = document.querySelector('.init__theme');
const $body = document.querySelector('body');
const $btns = document.querySelectorAll('.btns');
const $inputSound = document.querySelector('.range__sound');





$inputRange.addEventListener('input', function () {
    if (this.value === '1') {
        $body.className = '';
    }
    if (this.value === '2') {
        $body.className = 'two';
    }
    if (this.value === '3') {
        $body.className = 'three';
    }
})


let newNumber = true;
let oldNumber;
let operator;

let initialSignal;


// Adicionando eventos de click aos botões da calculadora
// -----------------------------------------------------------------------------------------------------------------------------

$buttons.forEach(number => {
    number.addEventListener('click', insertDisplay)
});



// ADICIONANDO CONDIÇÃO DE LIGAR OU DESLIGAR O SOM DAS TECLAS
// -----------------------------------------------------------------------------------------------------------------------------
// 

$inputSound.addEventListener('input', soundOn);
const audioClick = new Audio('./sounds/click.mp3');


$btns.forEach(element => {
    element.addEventListener('click', soundKeys)
});


function soundOn() {

    if ($inputSound.value == '1') {
        $btns.forEach(element => {
            element.addEventListener('click', soundKeys)
        });
    }

    if ($inputSound.value == '0') {
        removeEventListener();
    }
}

function soundKeys() {
    audioClick.play()
}

function removeEventListener() {
    $btns.forEach(btn => {
        btn.removeEventListener('click', soundKeys); 
    });
}

// -------------------------------------------------------------------------------------------------------------------------------------    



// Funções responsáveis por atualizar o display 
// -----------------------------------------------------------------------------------------------------------------------------

function insertDisplay(e) {

    updateDisplay(e.target.textContent);

}



function updateDisplay(string) {

    let numberInitial = $display.textContent;

    if (numberInitial === '0') {
        $display.textContent = '';
    }

    if (newNumber) {
        // debugger
        $display.textContent = string.toLocaleString('br');
        newNumber = false;
    } else {
        $display.textContent += string.toLocaleString('br');
    }


}




const $operators2 = document.querySelectorAll('[id*=operator]');
$operators2.forEach(signal => {
    signal.addEventListener('click', insertOperator)
});

function insertOperator(e) {
    // debugger
    if ($display.textContent === 0 || $display.textContent === '') {
        return
    } else {

        updateDisplay(e.target.textContent);

    }
}



// Adicionando eventos às teclas responsáveis pelas operações matemáticas
// -----------------------------------------------------------------------------------------------------------------------------

$operators.forEach(signal => {
    signal.addEventListener('click', selectOperator)
});


// Constante recebendo uma Arrow Function na qual verifica se há algum operador clicado 
// -----------------------------------------------------------------------------------------------------------------------------

const pendingCalculation = () => operator !== undefined;


let oldNumberMiniDisplay;


// Função responsável por salvar na memória o operador clicado e o número antigo que estava no display digitado
// -----------------------------------------------------------------------------------------------------------------------------

function selectOperator(e) {

    if (!newNumber) {
        newNumber = true;
        operator = e.target.textContent;
        oldNumber = parseFloat($display.textContent.replace(',', '.'));


        insertMiniDisplay();
    }
}

function insertMiniDisplay() {
    // debugger
    const actualNumber = $display.textContent;

    if ($miniDisplay.innerText === '-') {
        $miniDisplay.innerText += actualNumber.toLocaleString('en');
    } else {
        $miniDisplay.innerText = actualNumber.toLocaleString('en');

    }

}

function updateMiniDisplay(string) {
    $miniDisplay.innerText = string;
}


// Função que faz o cálculo verificando qual o operador selecionado e determina o numero atual digitado que esta no display 
// -----------------------------------------------------------------------------------------------------------------------------

function makeCalculation() {

    if (pendingCalculation()) {
        const currentNumber = parseFloat($display.textContent.replace(',', '.'));
        newNumber = true;
        const actualNumberMiniDisplay = $miniDisplay.innerText.replace('x', '').replace('+', '').replace('-', '').replace('/', '').replace(/\./g, "");



        switch (operator) {
            case '+':
                if (checkDecimal) {
                    updateDisplay(+oldNumber + currentNumber);
                    updateMiniDisplay(`${+oldNumber} + ${currentNumber} =`);

                } else {
                    updateDisplay(+actualNumberMiniDisplay + currentNumber);
                    updateMiniDisplay(`${actualNumberMiniDisplay} + ${currentNumber} =`);
                }
                break;

            case '-':
                if (checkDecimal) {
                    updateDisplay(+oldNumber - currentNumber);
                    updateMiniDisplay(`${+oldNumber} - ${currentNumber} =`);

                } else {
                    updateDisplay(+actualNumberMiniDisplay - currentNumber);
                    updateMiniDisplay(`${actualNumberMiniDisplay} - ${currentNumber} =`);
                }
                break;

            case '/':
                if (checkDecimal) {
                    updateDisplay(+oldNumber / currentNumber);
                    updateMiniDisplay(`${+oldNumber} / ${currentNumber} =`);

                } else {
                    updateDisplay(+actualNumberMiniDisplay / currentNumber);
                    updateMiniDisplay(`${actualNumberMiniDisplay} / ${currentNumber} =`);
                }
                break;

            case 'x':
                if (checkDecimal) {
                    updateDisplay(+oldNumber * currentNumber);
                    updateMiniDisplay(`${+oldNumber} * ${currentNumber} =`);

                } else {

                    updateDisplay(+actualNumberMiniDisplay * currentNumber);
                    updateMiniDisplay(`${actualNumberMiniDisplay} * ${currentNumber} =`);
                }
                break;
        }
    }
}



// FUNÇÕES DAS OUTRAS TECLAS


// Constante referenciando a tecla (igual =)
// -----------------------------------------------------------------------------------------------------------------------------

const $keyTotalize = document.getElementById('key=');


// Adicionando evento de click à cosntante 
// -----------------------------------------------------------------------------------------------------------------------------

$keyTotalize.addEventListener('click', totalize);


// Função responsável por calcular ao clicar na tecla (igual =)
// -----------------------------------------------------------------------------------------------------------------------------

function totalize() {
    makeCalculation();
    operator = undefined;
}




// Constante referenciando a tecla reset
// -----------------------------------------------------------------------------------------------------------------------------

const $keyReset = document.getElementById('keyreset');


// Adicionando evento de click à cosntante 
// -----------------------------------------------------------------------------------------------------------------------------

$keyReset.addEventListener('click', clearDisplay);


// Função responsável por limpar a tela
// -----------------------------------------------------------------------------------------------------------------------------

function clearDisplay() {
    $display.textContent = 0;
    $miniDisplay.textContent = '';
    operator = '';
    oldNumber = '';
    checkDecimal = false;
}



// Constante referenciando a tecla DEL
// -----------------------------------------------------------------------------------------------------------------------------

const $keyDel = document.getElementById('keydel');


// Adicionando evento de click à cosntante 
// -----------------------------------------------------------------------------------------------------------------------------

$keyDel.addEventListener('click', clearDigit);


// Função responsável por limpar 1 digito
// -----------------------------------------------------------------------------------------------------------------------------

function clearDigit() {
    $display.textContent = $display.textContent.slice(0, -1);
    if ($display.textContent === '') {
        $miniDisplay.textContent = '';
        $display.textContent = 0;
    }
}





// Constante com Arrow Function verificando se há decimal e algum valor
// -----------------------------------------------------------------------------------------------------------------------------

const decimal = () => $display.textContent.indexOf('.') !== -1;
const value = () => $display.textContent.length > 0;


// Constante referenciando a tecla ponto (.)
// -----------------------------------------------------------------------------------------------------------------------------

const $keyDecimal = document.getElementById('key.');


// Adicionando evento de click à cosntante 
// -----------------------------------------------------------------------------------------------------------------------------

$keyDecimal.addEventListener('click', insertDecimal);


let checkDecimal = false;

// Função responsável adicionar a virgula ao numero transformando-o em Decimal
// -----------------------------------------------------------------------------------------------------------------------------

function insertDecimal() {
    if (!decimal()) {
        if (value()) {
            if ($display.textContent === '0' || $display.textContent === '') {
                updateDisplay($display.textContent + '.')
            } else {
                updateDisplay('.')
            }
        } else {
            updateDisplay('0.')
        }
    }

    checkDecimal = true
}




// MAPEAMENTO DO TECLADO PARA QUE AS TECLAS EXERÇAM A MESMA FUNÇÃO DO CLICK DO MOUSE NOS BOTÕES

const mapKeyboard = {

    '0': 'digit0',
    '1': 'digit1',
    '2': 'digit2',
    '3': 'digit3',
    '4': 'digit4',
    '5': 'digit5',
    '6': 'digit6',
    '7': 'digit7',
    '8': 'digit8',
    '9': 'digit9',
    ',': 'key.',
    'Enter': 'key=',
    'Delete': 'keyreset',
    'Backspace': 'keydel',
    '+': 'operator+',
    '-': 'operator-',
    '*': 'operatorx',
    '/': 'operator/'

}

document.addEventListener('keydown', captureKeys);

function captureKeys({
    key
}) {
    const _key = key;
    const keyMapped = Object.keys(mapKeyboard).indexOf(_key) !== -1;
    if (keyMapped) document.getElementById(mapKeyboard[_key]).click();
}







$buttons.forEach(tcl => {
    tcl.addEventListener('click', keyClicked)
});

$operators.forEach(tcl => {
    tcl.addEventListener('click', keyOperatorClicked)
});



function keyClicked(e) {

    for (let x = 0; x < $buttons.length; x++) {
        setTimeout(function () {
            $buttons[x].classList.remove('clicked');
        }, 100)
    }
    e.target.classList.add('clicked')
}



function keyOperatorClicked(e) {
    for (let x = 0; x < $operators.length; x++) {
        setTimeout(function () {
            $operators[x].classList.remove('clicked');
        }, 100)
    }
    e.target.classList.add('clicked')
}



// Função responsável por adicionar a classe no botão 
// -----------------------------------------------------------------------------------------------------------------------------

$keyTotalize.addEventListener('click', keyTotalizeClicked);

function keyTotalizeClicked(e) {

    setTimeout(function () {
        $keyTotalize.classList.remove('clicked');
    }, 100)
    e.target.classList.add('clicked')

}



// Função responsável por adicionar a classe no botão 
// -----------------------------------------------------------------------------------------------------------------------------

$keyReset.addEventListener('click', keyResetClicked);

function keyResetClicked(e) {

    setTimeout(function () {
        $keyReset.classList.remove('clicked');
    }, 100)
    e.target.classList.add('clicked')

}




// Função responsável por adicionar a classe no botão 
// -----------------------------------------------------------------------------------------------------------------------------

$keyDel.addEventListener('click', keyDelClicked);

function keyDelClicked(e) {

    setTimeout(function () {
        $keyDel.classList.remove('clicked');
    }, 100)
    e.target.classList.add('clicked')

}
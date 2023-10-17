class Calculator {
  constructor() {
    this.upperValue = document.querySelector("#upper-number");
    this.resultValue = document.querySelector("#result-number");
    this.reset = 0;
  }

  clearValues() {
    this.upperValue.textContent = "0";
    this.resultValue.textContent = "0";
  }
  checkLastDigit(input, upperValue, reg) {
    if (
      !reg.test(input) &&
      !reg.test(upperValue.substr(upperValue.length - 1))
    ) {
      return true;
    } else {
      return false;
    }
  }

  //meto de soma
  sum(n1, n2) {
    return parseFloat(n1) + parseFloat(n2);
  }
  //subtração
  subtraction(n1, n2) {
    return parseFloat(n1) - parseFloat(n2);
  }

  //divisão

  //atualiza valores
  refreshValues(total) {
    this.upperValue.textContent = total;
    this.resultValue.textContent = total;
  }
  //resolve a operação
  resolution() {
    //explore uma string em um array
    let upperValueArray = this.upperValue.textContent.split(" ");

    //Resultado da operação
    let result = 0;

    for (let i = 0; i < upperValueArray.length; i++) {
      let actualItem = upperValueArray[i];

      if (actualItem == "+") {
        result =
          parseFloat(upperValueArray[i - 1]) +
          parseFloat(upperValueArray[i + 1]);
      }
    }

    if (result) {
      calc.reset = 1;
    }

    //Atualiza os totais
    calc.refreshValues(result);
  }

  btnPrss() {
    let input = this.textContent;
    let upperValue = calc.upperValue.textContent;

    var reg = new RegExp("^\\d+$");

    //verifica se tem coisa já na tela da calculadora, se tiver so essa instrução,
    //ele nao poderar adicionar um novo número para soma.
    if (calc.reset && reg.test(input)) {
      upperValue = 0;
    }

    //reseta o reset para solucinar o problema do upperValue = 0
    calc.reset = 0;

    //Limpa display
    if (input === "AC") {
      calc.clearValues();
    } else if (input == "=") {
      calc.resolution();
    } else {
      //checa se precisa adicionar ou nao
      if (calc.checkLastDigit(input, upperValue, reg)) {
        return false;
      }
      //adiciona espaços aos operadores
      if (!reg.test(input)) {
        input = ` ${input} `;
      }

      if (upperValue == "0") {
        calc.upperValue.textContent = input;
      } else {
        calc.upperValue.textContent += input;
      }
    }
  }
}

//start obj
let calc = new Calculator();

//start btns

let buttons = document.querySelectorAll(".btn");

//map all buttons

for (let i = 0; buttons.length > i; i++) {
  buttons[i].addEventListener("click", calc.btnPrss);
}

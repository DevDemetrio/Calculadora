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

  multiplication(n1, n2) {
    return parseFloat(n1) * parseFloat(n2);
  }
  division(n1, n2) {
    return parseFloat(n1) / parseFloat(n2);
  }

  //divisão

  //atualiza valores
  refreshValues(total) {
    this.upperValue.textContent = total;
    this.resultValue.textContent = total;
  }
  //resolve a operação
  resolution() {
    console.log("oi!");
    //explore uma string em um array
    let upperValueArray = this.upperValue.textContent.split(" ");

    //Resultado da operação
    let result = 0;

    for (let i = 0; i <= upperValueArray.length; i++) {
      let operation = 0;
      let actualItem = upperValueArray[i];

      //faz multiplicação
      if (actualItem == "X") {
        result = calc.multiplication(
          upperValueArray[i - 1],
          upperValueArray[i + 1]
        );
        operation = 1;
        //faz divisão
      } else if (actualItem == "/") {
        result = calc.division(upperValueArray[i - 1], upperValueArray[i + 1]);
        operation = 1;
        //checa se ainda tem multiplicação e divisão a ser feita
      } else if (
        !upperValueArray.includes("X") &&
        !upperValueArray.includes("/")
      ) {
        //Soma e subtração
        if (actualItem == "+") {
          result = calc.sum(upperValueArray[i - 1], upperValueArray[i + 1]);
          operation = 1;
        } else if (actualItem == "-") {
          result = calc.subtraction(
            upperValueArray[i - 1],
            upperValueArray[i + 1]
          );
          operation = 1;
        }
      }
      //Atualiza valores do array para próxima interação
      if (operation) {
        //indioce antertior no resultado da operacao
        upperValueArray[i - 1] = result;
        //remove os itens já utlizado para a operacao
        upperValueArray.splice(i, 2);
        //atualizar o valor do índice
        i = 0;
      }
    }

    if (result) {
      calc.reset = 1;
    }

    //atualiza o total
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
        if (reg.test(input)) {
          calc.upperValue.textContent = input;
        }
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

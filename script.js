const previousText = document.querySelector("[data-previous]");
const currentText = document.querySelector("[data-current]");
const numbers = document.querySelectorAll("[data-number]");
const clearLast = document.querySelector("[data-delete]");
const clearAll = document.querySelector("[data-erase]");
const operations = document.querySelectorAll("[data-operator]");
const equal = document.querySelector("[data-equals]");


class calculator{
    constructor(previousText, currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }

clear(){
    this.previous = "";
    this.current = ""; 
    this.operation = undefined
}

deleteLast(){
    this.current = this.current.toString().slice(0, -1);
}

appendNumber(number){
    if(this.current.includes(".")) return
    this.current = this.current + number;
    
}

operationSelect(operation){
    this.operation = operation
    this.previous = this.current + " " + this.operation
    this.current = "";
    this.display()
}

compute(){
    let answer
    let p = parseFloat(this.previous)
    let c = parseFloat(this.current)
    if(isNaN(c) && isNaN(p))return 
        switch(this.operation){
            case "x":
                answer = c * p
                break
            case "÷":
                answer = p / c
                break
            case "+":
                answer = p + c
                break
            case "-":
                answer = p - c
                break
            default:
                return
        }
        this.previous = ""
        this.operation = undefined
        this.current = answer.toString()
    }


display(){
    this.currentText.innerText = this.current;
    this.previousText.innerText = this.previous;
}

}


const calc = new calculator(previousText, currentText);

numbers.forEach(button => {
    button.addEventListener("click", () =>{
        calc.appendNumber(button.innerText)
        calc.display()
    })
})

operations.forEach(button => {
    button.addEventListener("click", () =>{
        calc.operationSelect(button.innerText)
        calc.display()
    })
})

clearAll.addEventListener("click", () =>{
        calc.clear()
        calc.display()
    })

clearLast.addEventListener("click", () =>{
        calc.deleteLast()
        calc.display()
    })

equal.addEventListener("click", () =>{
        calc.compute()
        calc.display()
    })

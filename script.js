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
    if (number === "." && this.current.includes(".")) {
        return;
    }
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
    
    if(this.previous.includes("%")){
        this.previous = this.previous.toString().slice(0, -1);
        let percent = parseFloat(this.previous)
        percent = percent / 100
        let percentResult = percent * c
        this.previous = ""
        return this.current = percentResult.toString()
    }

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
        this.current = answer.toLocaleString('en-US')
    }

formatNumber(number) {
    const parts = number.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
}


display(){
    this.currentText.innerText = this.formatNumber(this.current);
    this.previousText.innerText = this.formatNumber(this.previous);
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

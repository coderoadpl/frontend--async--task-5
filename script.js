const Beer = class {
    constructor(){
        this.fill = 100
    }

    drink(volume = 10){
        if(this.fill === 0) {
            console.warn('Try to drink from empty glass!')
            return
        }
        const fillBeforeDrink = this.fill
        const newFill = this.fill - volume
        this.fill = newFill <=0 ? 0 : newFill
        console.log(`You drank ${fillBeforeDrink - this.fill} %`)
    }

    drinkWhole(){
        return this.drink(100)
    }
}

const BeerStorage = class {
    
    constructor(startQuantity){
        this.quantity = startQuantity
    }

    grabBeer(){
        this.quantity = this.quantity - 1
    }
}
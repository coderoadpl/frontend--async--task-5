const Beer = class {
    constructor() {
        this.fill = 100
    }

    drink(volume = 10) {
        if (this.fill === 0) {
            console.warn('Try to drink from empty glass!')
            return
        }
        const fillBeforeDrink = this.fill
        const newFill = this.fill - volume
        this.fill = newFill <= 0 ? 0 : newFill
        console.log(`You drank ${fillBeforeDrink - this.fill} %`)
    }

    drinkWhole() {
        return this.drink(100)
    }
}

const BeerStorage = class {

    constructor(startQuantity = 2) {
        this.beers = (new Array(startQuantity)).fill(1).map(() => new Beer())
    }

    grabBeer() {
        if (this.beers.length === 0) {
            throw new Error('No beers in storage')
        }
        return this.beers.pop()
    }
}

const storage1 = new BeerStorage()

const Waitress = class {
    constructor(storage) {
        this.storage = storage
    }

    fetchBeer() {
        return new Promise((resolve, reject) => {
            const timeOfFetch = Math.round((Math.random() * 4)) + 1
            console.log(`Fetching beer will take ${timeOfFetch} s`)

            setTimeout(
                () => {
                    try {
                        const beer = this.storage.grabBeer()
                        resolve(beer)
                    } catch (error) {
                        reject(error)
                    }
                },
                timeOfFetch * 1000
            )
        })
    }
}

const waitress1 = new Waitress(storage1)

// me ordering beer
const fetchBeer1Promise = waitress1.fetchBeer()
// my first colleague ordering beer
const fetchBeer2Promise = waitress1.fetchBeer()
// my second colleague ordering beer
const fetchBeer3Promise = waitress1.fetchBeer()

const drinkCallback = (colleague) => (beer) => {
    console.log(`${colleague} got my beer`, beer)
    beer.drinkWhole()
}
const noBeerCallback = (error) => console.log('Cry!', error.message)

fetchBeer1Promise.then(drinkCallback('I'))
fetchBeer1Promise.catch(noBeerCallback)

fetchBeer2Promise.then(drinkCallback('My first colleague'))
fetchBeer2Promise.catch(noBeerCallback)

fetchBeer3Promise.then(drinkCallback('My second colleague'))
fetchBeer3Promise.catch(noBeerCallback)

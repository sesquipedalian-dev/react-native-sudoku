export default class Cell { 
    constructor(id, value, revealed = false, userGuess = null, userGuessNots = [], selected = false) { 
        this.id = id;
        this.value = value;
        this.revealed = revealed;
        this.userGuess = userGuess; 
        this.userGuessNots = userGuessNots;
        this.selected = selected;
    }

    select() {
        return Object.assign(Object.create(this), this, {selected: true});
    }

    unSelect() { 
        return Object.assign(Object.create(this), this, {selected: false});
    }

    guess(num) { 
        return Object.assign(Object.create(this), this, {userGuess: num});
    }

    unGuess(num) { 
        return Object.assign(Object.create(this), this, {userGuess: null});
    }

    guessNot(num) { 
        const newGuessNots = this.userGuessNots.slice(0);
        newGuessNots.push(num);
        return Object.assign(Object.create(this), this, {userGuessNots: newGuessNots});
    }

    unGuessNot(num) { 
        return Object.assign(Object.create(this), this, {userGuessNots: this.userGuessNots.filter((n) => n !== num)});
    }
}
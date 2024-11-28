class Address{

    constructor(userId, country, city, pc, street, house){
        this.id;
        this._userId = userId;
        this._country = country;
        this._city = city;
        this._pc = pc;
        this._street = street;
        this._house = house; 
    }

    get userId(){
        return this._userId;
    }

    get country(){
        return this._country;
    }

    get city(){
        return this._city;
    }

    get pc(){
        return this._pc;
    }

    get street(){
        return this._street;
    }

    get house(){
        return this._house;
    }

}

module.exports = Address;
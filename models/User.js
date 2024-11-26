class User {

     

    constructor(name, gmail, password, addressId) {
        this._id;
        this._name = name;
        this._gmail = gmail;
        this._password = password;
    }

    get id(){
        return this._id;
    }

    get name(){
        return this._name;
    }

    set name(newName){
        if(newName == '' || ' ' || null){
            throw new Error('El nombre no puede quedar vacío.');

        }else if(newName == this._name){
            throw new Error('El nuevo nombre no puede ser igual al anterior.');

        }else if(newName.length > 15){
            throw new Error('El nombre no puede superar los 15 caracteres.');

        }

        this._name = newName;
    }

    get gmail(){
        return this._gmail;
    }

    set gmail(newGmail){
        if(newGmail == '' || ' ' || null){
            throw new Error('El gmail no puede quedar vacío.');

        }else if(newGmail == this._gmail){
            throw new Error('El nuevo gmail no puede ser igual al anterior.');

        }else if(newGmail.length > 50){
            throw new Error('El gmail no puede tener mas de 50 caracteres.');

        }else if(newGmail.includes('@gmail.com')){
            newGmail += '@gmail.com';

        }else if(newGmail.length < 11){
            throw new Error('Formato del gmail incorrecto.');
        }

        this._gmail = newGmail;
    }

    get password() {
        return this._password;
    }

    set password(newPassword){
        if(newPassword == '' || ' ' || null){
            throw new Error('La contraseña no puede quedar vacía.');

        }else if(newPassword == this._password){
            throw new Error('La nueva contraseña no puede coincidir con la actual.');
            
        }else if(newPassword.length < 8){
            throw new Error('La contraseña no puede ser menor a 8.');

        }else if(newPassword.length > 50){
            throw new Error('La contraseña no puede superar los 50 caracteres.');

        }

        this._password = this.password;
    }

    get addressId(){
        return this._addressId;
    }

    set addressId(newAddressId){
        this.addressId = newAddressId;
    }

}

module.exports = User;
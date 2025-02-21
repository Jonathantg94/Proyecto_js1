import Dato from './Dato.js'
const Dato = require('./Dato');

class Egreso extends Dato {
    static contadorEgresos = 0;

    constructor(descripcion, valor) {
        super(descripcion, valor);
        this._id = ++Ingreso.contadorEngresos;
    }

    get id() {
        return this._id;
    }
}

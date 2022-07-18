const {v4: uuidv4} = require('uuid')

class PlanGym{

    //instancias
    id='';
    diaclase = 2.500;
    quincedias = diaclase * 15;
    mes = diaclase * 30;




    constructor(diaclase, quincedias, mes){
        this.id = uuidv4();
        this.diaclase = diaclase;
        this.quincedias = quincedias;
        this.mes = mes;

    }

}

module.exports = PlanGym;
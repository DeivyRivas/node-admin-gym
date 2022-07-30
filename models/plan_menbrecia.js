const Plangym = require('./plangym')


class Plan{

    _listado_plan = {};

    get listadoPlan(){
        
        const listado = [];
        
        Object.keys(this._listado_plan).forEach(key =>{

            const plan = this._listado_plan[key]
            // console.log(usuario)
            listado.push(plan);
        });
        return listado
    }


    constructor(){
        this._listado_plan = {};
    }

}



module.exports= Plan;
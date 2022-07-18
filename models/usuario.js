
const {v4: uuidv4} = require('uuid')

class Usuario{

    //instancias
    id = '';
    nombre ='';
    apellidos = '';
    correo ='';
    cedula = '';
    fechaNacimineto = Date;
    celular = '';
    sexo = Date;
    fechaPago = null;

    constructor(
                nombre, 
                apellidos, 
                correo, 
                cedula, 
                fechaNacimineto,
                celular,
                sexo,
                fechaPago
    ){
        this.id = uuidv4();
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.cedula = cedula;
        this.fechaNacimineto = fechaNacimineto;
        this.celular = celular;
        this.sexo = sexo;
        this.fechaPago = null ;

    }

}

module.exports = Usuario;
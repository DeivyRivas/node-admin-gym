//se necesita de la clase Usario
const Usuario = require('./usuario');
// const PlanMenbrecia = require('./plangym');


class Usuarios{

    _Listado = {}


    get listadoUsuarios(){
        
        const listado = [];
        
        Object.keys(this._Listado).forEach(key =>{

            const usuario = this._Listado[key]
            // console.log(usuario)
            listado.push(usuario);
        });
        return listado
    }


    constructor(){
        this._Listado = {};
    }
///////////////////////////////////////////////////////////
//se crea usuario


    crearUsuario(
                nombre='', 
                apellidos='',
                correo='',
                identificacion='',
                fechaNaci='',
                celular='',
                sexo = '',
                menbrecia = '',
                plan = '',
    ){

        const usuario =  new Usuario(
                                    nombre,
                                    apellidos,
                                    correo,
                                    identificacion,
                                    fechaNaci,
                                    celular,
                                    sexo,
                                    menbrecia,
                                    plan,
                            );
        this._Listado[usuario.id] = usuario;
    }



     //se crea metod para leer info en base de datos
     cargarUsersDB(users = [] ){
        
        //se recorre los usuarios que se reciben con el forech
        users.forEach(user => {

            this._Listado[user.id] = user;
        });
       

    }


    //se crea metodo para listar del arreglo listadoUsuarios
listadoCompletoUsaer(){

    console.log();
    //se recorre el arreglo y se recibe como argumento la tarea y el indice de la tarea
    this.listadoUsuarios.forEach( (datos, i) =>{
        //se saca el indice del arreglo con i
        //el segundo arg del forEach es el indice
        const idx = `${i + 1}`.green;// optiene el indice de la tares
        
        //se desestructura y se saca el nombre del usuario
        const { nombre, apellidos, celular, fechaPago, menbrecia} = datos;
        //valida el estado de la tarea
        const estado = (fechaPago)
                        ? `Membrecia esta cancelada VAlor: ${menbrecia}`.green
                        : `Membrecia esta sin cancelar por valor de ${menbrecia}`.red;

        console.log(`${idx} ${nombre} ${apellidos} con tel ${celular} su :: ${estado}`);

    });
}

 valorPagoMenbrecia(menbrecia ){

    let ValorDia = 3000;
    let ValorSemanal = 15000;
    let ValorQuincenal = 25000;
    let ValorMes = 40000;

           if( menbrecia == 1){

                    menbrecia = ValorDia;  
                         

            }
            else 
                if (menbrecia == 7 ) {

                        menbrecia = ValorSemanal;
                    

                }else 
                    if (menbrecia == 15) {
                    
                        menbrecia = ValorQuincenal;
                        

                    } else 
                        if (menbrecia == 30) {

                        menbrecia = ValorMes;
                          

                    }

    
    return menbrecia

}

// muestra menbrecias oendiente y completadas
menbreciasPendientesCompletadas(menbrecia = true, valor){

    console.log();
    let contador =0;
    this.listadoUsuarios.forEach( (usuario) =>{
                                            //trear variable menbrecia y hacer operacion
        const { nombre, apellidos, fechaPago} = usuario;      
        const estado = (fechaPago)
                        ? `Membrecia esta cancelada por valor de: ${valor}`.green
                        : `Membrecia esta sin cancelar por valor de: ${valor} `.red;

        if(menbrecia){
            //mostrar tareas completadas
            if(fechaPago){
                contador+=1;
                console.log(`${contador.toString().green}. ${nombre} ${apellidos} :: Su ${estado} en la fecha ${fechaPago.green}`);
            }
        }else{
            //mostrar tareas pendientes
            if(!fechaPago){
                contador+=1;
                console.log(`${contador.toString().green}. ${nombre} ${apellidos} :: Su ${estado}`);
            }
        }
        

    });

}

// COMPLETAR MENBRECIAS
completasMenbrecias(ids = []){

    ids.forEach(id =>{

        const menbrecia = this._Listado[id];

        if(!menbrecia.fechaPago){

            menbrecia.fechaPago = new Date().toString()
        }
    });

    this.listadoUsuarios.forEach(usuario =>{

        if(!ids.includes(usuario.id)){
            this._Listado[usuario.id].fechaPago = null;
        }
    });
}


fechaVencido(){

    let contador =0;
    this.listadoUsuarios.forEach(((fechaPagoMenbre) =>{

        const { nombre, apellidos, fechaPago, menbrecia, plan} = fechaPagoMenbre;
        const estado = (fechaPago)
                        ? `fecha de vencimiento es: en ${plan} dias `.blue
                        : `Membresia sin fecha de vencimiento:`.red;

                        if(fechaPago){
                            //mostrar tareas completadas
                            if(menbrecia){
                                contador+=1;
                                console.log(`${contador.toString().green}. ${nombre} ${apellidos} :: Su ${estado}`);
                            }
                        }else{
                            //mostrar tareas pendientes
                            if(!fechaPago){
                                contador+=1;
                                console.log(`${contador.toString().green}. ${nombre} ${apellidos} :: Su ${estado}`);
                            }
                        }
    }))
    

}


}

module.exports = Usuarios;
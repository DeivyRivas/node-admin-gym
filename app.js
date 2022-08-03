require('colors');

const { leerInformacion, guardarDB } = require('./helpers/guardarUsuario');
const { inicioMenu, leerMenu, pausa, menbreciasCheckList } = require('./helpers/inicio');
const Usuarios = require('./models/crearusuarios');






const main = async ()=>{

    let opt = '';
    let valor = 0;
    const usuarios = new Usuarios();
    const infoDB = leerInformacion();
    
    if(infoDB){
        usuarios.cargarUsersDB(infoDB);
    }
   

    do {

        opt = await inicioMenu();

        switch (opt) {
            case '1':

            const nombre = await leerMenu('Ingrese Nombre: ');
            const apellidos = await leerMenu('Ingrese Apellido: ');
            const correo = await leerMenu('Ingrese Correo: ');
            const identificacion = await leerMenu('numero de identificacion: ');
            const fechaNaci = await leerMenu('fecha de nacimiento (D-MM-AAA): ');
            const celular = await leerMenu('ingrese celular: ');
            const sexo = await leerMenu('ingrese sexo ( H o M): ');
            const plan = await leerMenu('Que tiempo necesitas pagar (1, 7, 15, 30 ): ');

            let plans = plan;
            valor = usuarios.valorPagoMenbrecia(plans);


            usuarios.crearUsuario(nombre,apellidos,correo,identificacion,fechaNaci,celular,sexo,valor,plan)
            
            console.log('*******Usuario creado con exito******')
            
            break;
            case '2':
                // carga usuarios en bases de datos
                usuarios.listadoCompletoUsaer();
            break;
            case '3':
               //usuarios con menbrecia ya cancelada
                usuarios.menbreciasPendientesCompletadas(true, valor);
            break;
            case '4':
                //usuario con menbrecia pendiente de cancelar
                usuarios.menbreciasPendientesCompletadas(false, valor);
            break;
            case '5':
                const ids = await menbreciasCheckList(usuarios.listadoUsuarios);
                usuarios.completasMenbrecias(ids);
                console.log('*** MENBRECIA COMPLETADA***')


            break;
            case '6':

                usuarios.fechaVencido();

                
            break;
        
        }
        
        //se le pasa el arreglo o el objeto a guardar
        guardarDB(usuarios.listadoUsuarios);
        await pausa();
    } while (opt !='0');

   

   


}



main();
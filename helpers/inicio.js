const inquirer = require('inquirer');

require('colors');


//PREUNTAS DEL INICIO
const preguntas = [
    {
        type:'list',
        name: 'opciones',
        message: '¿ QUE DESEAS REALIZAR ?',
        //opciones choices
        choices:[
            {
                value: '1',
                name: `${'1.'.green} Registrar Usuario`
            },
            {
                value: '2',
                name: `${'2.'.green} listado de Usuarios`
            },
            {
                value: '3',
                name: `${'3.'.green} Usuarios con menbresia cancelada`
            },
            {
                value: '4',
                name: `${'4.'.green} Usuarios con menbresia pendiente`
            },
            {
                value: '5',
                name: `${'5.'.green} pagar menbrecia`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];


//MENU DE ARRIBA 

const inicioMenu = async ()=>{

        console.clear();
        console.log(' _______________________________'.green);
        console.log('|                               |'.green);
        console.log(`|     ${'APP-EXTREME-GYM '.bgWhite}          |`.green);
        console.log('|_______________________________|\n'.green);


        //se muestran las preguntas
        console.log('');
        const {opciones} = await inquirer.prompt(preguntas);
        return opciones;
}

//LEER MENU

const leerMenu = async (message) => {

    const preguntas =[
        {
            type:'input',
            name: 'nom',
            message,
            validate(value){
                if(value.length === 0){
                    return ' Ingrese el dato requerido: '
                }
                return true;
            }
        },
    ];

    
    const {nom} = await inquirer.prompt(preguntas);
    return nom;
}




// pausa la consola para presionar Enter
const pausa = async () => {

    const question = [
        {
            //para dar Enter 
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'Enter'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

// MUESTRA EL LISTADO DE LOS USUARIOS CON MENBRECIA
const menbreciasCheckList = async (menbrecias = [])=>{

    //marca las menbrecias ya pagadas
    const choices = menbrecias.map((menbrecia, i)=>{

        const idx = `${i + 1}`.green;
        return{
            value: menbrecia.id,
            name: `${idx}. ${menbrecia.nombre}`,
            checked: (menbrecia.fechaPago)
                        ? true
                        : false,
        }
    });

    //pregunta
    const pregunta = [
        {
            //selecionar
            type:'checkbox',
            name: 'ids',
            message: 'Que Menbrecias desas cancelar ',
            choices
        }
    ]
    //pregunta en consola las choises
    //se optiene el ids en la variable name
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}


module.exports={
    inicioMenu,
    leerMenu,
    pausa,
    menbreciasCheckList
}
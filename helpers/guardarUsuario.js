const fs = require('fs')

const DatosUsuario = './db/data.json';

//funsion para guardar archivo
const guardarDB = ( data ) =>{

    //const DatosUsuario = './db/data.json';

    fs.writeFileSync(DatosUsuario, JSON.stringify(data));
    

}

//lee informacion en la base de DB guardada
const leerInformacion = ()=>{
    if(!fs.existsSync(DatosUsuario)){
        return null;
    }

    const info = fs.readFileSync(DatosUsuario, {encoding: 'utf-8'});
    const data = JSON.parse(info)
    return data;
}








module.exports={
    guardarDB,
    leerInformacion
}
// Variables globales

const formularioUI = document.querySelector('#formulario');
//const listaActividadesUI = document.getElementById('listaActividades');
const listaActividadesUI = document.getElementById('tablaprueba');

let arrayActividades = [];


// Funciones

const CrearItem = (nombre, actividad, costo) => {
  let item = {
    horario: horario(),
    nombre: nombre,
    actividad: actividad,
    costo: costo
  }
  
  //console.log(item);
  arrayActividades.push(item); /* Agrega el item creado al final del array*/

  return item;

}

/* Agrega el array a localStorage*/
const GuardarDB = () => {

  localStorage.setItem('trabajo', JSON.stringify(arrayActividades));

  PintarDB();

}

/*Mostrar la nueva db en la tabla  1st try */
const PintarDB = () => {

  listaActividadesUI.innerHTML = '';

  arrayActividades = JSON.parse(localStorage.getItem('trabajo'));
  
  if(arrayActividades === null){
    arrayActividades = [];
  }else{

    arrayActividades.forEach(element => {

      if(element.estado){
        listaActividadesUI.innerHTML += `<td>1</td><td>${element.nombre}</td><td>${element.actividad}</td><td>${element.costo}</td><td><span class="float-right"><i class="material-icons">delete</i></span></td>`;
      }else{
        //listaActividadesUI.innerHTML += `<td></td><td>${element.nombre}</td><td>${element.actividad}</td><td>${element.costo}</td>`;
        listaActividadesUI.insertRow(-1).innerHTML += `<td class="text-center">${element.horario}</td><td class="text-center">${element.nombre}</td><td class="text-center">${element.actividad}</td><td class="text-center">${element.costo}</td><td class="text-center"><span id="edit-icon" class="float-center"><i class="material-icons">edit</i></span><span class="float-center"><i class="material-icons">delete</i></span></td> `;
      }
    });

  }
}




/* Elimina un item de la db  */
const EliminarDB = (actividad) => {
  let indexArray;
  arrayActividades.forEach((elemento, index) => {
    
    if(elemento.actividad === actividad){
      indexArray = index;
    }
    
  });

  arrayActividades.splice(indexArray,1);
  GuardarDB();

}

/*Permite editarr un elemento*/
const EditarDB = (actividad) => {

  let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);

  arrayActividades[indexArray].estado = true;

  GuardarDB();

}




// EventListener para agregar un item
formularioUI.addEventListener('submit', (e) => {

  e.preventDefault();
  let nombreUI = document.querySelector('#nombre').value;
  let actividadUI = document.querySelector('#actividad').value;
  let costoUI = document.querySelector('#costo').value;
  let horarioUI = horario();
    
 console.log(horarioUI+' '+nombreUI+' + ' + actividadUI + ' + ' + costoUI );

  CrearItem(nombreUI, actividadUI, costoUI); //agrega un item a la funcion
  GuardarDB();

  formularioUI.reset();

});

/*Muestra la base de datos cada vez que se actualiza la pagina*/
document.addEventListener('DOMContentLoaded', PintarDB);

function eliminarFila(){
  var table = document.getElementById("tablaprueba");
  var rowCount = table.rows.length;
  //console.log(rowCount);
  
  if(rowCount <= 1)
    alert('No se puede eliminar el encabezado');
  else
    table.deleteRow(rowCount -1);
}


listaActividadesUI.addEventListener('click', (e) => {

  e.preventDefault();

  if(e.target.innerHTML === 'done' || e.target.innerHTML === 'delete'){
    let texto = e.path[2].childNodes[1].innerHTML;
    if(e.target.innerHTML === 'delete'){
      // Accción de eliminar
      EliminarDB(texto);
    }
    if(e.target.innerHTML === 'done'){
      // Accción de editar
      EditarDB(texto);
    }
  }

});


/* Horario 
var f = new Date();
document.write(f.getDate() + "/" + (f.getMonth() +1) + "/" + f.getFullYear()); */

function horario(){
var hoy = new Date();
var mes = (hoy.getMonth()+1);
var cero = mes < 9 ? 0+""+mes : mes;
var fecha = hoy.getDate()+'/'+cero+'/'+hoy.getFullYear();

//var hora = hoy.getHours()+':'+hoy.getMinutes();
var hora = formatAMPM(new Date);
//var hora = hoy.getHours()+':'+hoy.getMinutes()+':'+hoy.getSeconds(); 

var horarioActual = fecha+' - '+hora;
    return horarioActual;
}

//var age = 17;
//var mayor = age 18 ? console.log("si") : console.log("no");


function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
}



//sconsole.log(sumarArray(arrayActividades)); // Muestra por consola 78v



var numeros = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

function sumarArray(array) {
    var contador = 0;
  // Retorna la suma de los números presentes en el array "números"
    array.forEach(function (numero) {
        contador+=numero;
    });
    return contador;
}

console.log(sumarArray(numeros)); // Muestra por consola 78 
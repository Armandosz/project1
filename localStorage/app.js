// Variables globales

const formularioUI = document.querySelector('#formulario');
//const listaActividadesUI = document.getElementById('listaActividades');
const listaActividadesUI = document.getElementById('tablaprueba');

let arrayActividades = [];


// Funciones

const CrearItem = (nombre, actividad, costo) => {
  let item = {
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
        listaActividadesUI.insertRow(-1).innerHTML += `<td>${arrayActividades.length}</td><td>${element.nombre}</td><td>${element.actividad}</td><td>${element.costo}</td><td><span id="edit-icon" class="float-center"><i class="material-icons">edit</i></span><span class="float-center"><i class="material-icons">delete</i></span></td> `;
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
    
 //console.log(nombreUI+' + ' + actividadUI + ' + ' + costoUI );

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

var pais = document.querySelector("p.countries");

/*
var options = {
  url: "countries.json",
  getValue: "name",
  list: {
    match: {
      enabled: true
    }
  },
  theme: "square"
};
*/

let countries = [
    {"name": "Afghanistan", "code": "AF"},
    {"name": "Albania", "code": "AL"},
    {"name": "Algeria", "code": "DZ"},
]
var options = {
    data: countries,

    getValue: "name",

    list: {
        match: {
            enabled: true
        }
    }
};
$("#basics").easyAutocomplete(options);
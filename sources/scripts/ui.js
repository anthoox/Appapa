import { validateTextInput } from './validations.js';

const btnAddList = document.getElementById('btn__addProduct');
const formAddList = document.querySelector('.cnt__form');
const btnCloseForm = document.querySelector('.btn__close');

// Abrir formulario
btnAddList.addEventListener('click', () => {
    if (formAddList.classList.contains('hidden')) {
        formAddList.classList.remove('hidden');
    }
})

// Cerrar formulario
btnCloseForm.addEventListener('click', () => {
    if (!formAddList.classList.contains('hidden')) {
        formAddList.classList.add('hidden');
    }
})

// Añadir item desde formulario
const btnAddProduct = document.getElementById('btn__createProduct');
// Selección del formulario
const form = document.querySelector('.form__item');
// Array para almacenar los datos del formulario
const formDataArray = [];

// Añadiento evento click para btnAddProduct
btnAddProduct.addEventListener('click', () => {
    // Objeto para almacenar los datos
    const formData = {};

    // Seleccionamos los inputs y los selec del formulario
    const inputs = form.querySelectorAll('input, select');

    inputs.forEach(input => {
        const key = input.id
        // Validación de los inputs
        const value = validateTextInput(input)
        if(value){
            formData[key] = value.trim();
        }
    })

    console.log('datos de formulario:', formData)
    // Almacenamos en el array el objeto
    formDataArray.push(formData);
    console.log('array de productos', formDataArray);

    formDataArray.forEach(product => {

        const tableBody = document.querySelector('tbody');
        const itemTable = document.createElement('tr')

        const selectValue =  product.selectOffers ;

        itemTable.innerHTML = `
        <td>
            <input class="left table__input" type="text" value="${product.nameProducto}">
        </td>
        <td>
            <input class="table__input" type="number" value="${product.units}">
        </td>
        <td>
            <select name="" id="tableOffers">
                <option class="table__option option " value="0">--</option>
                <option class="table__option option tresPorDos" value="1">3x2</option>
                <option class="table__option option dosPorUno" value="2">2x1</option>
                <option class="table__option option segSetenta" value="3">2u70</option>
                <option class="table__option option segCincuenta" value="4">2u50</option>
                <option class="table__option option terCincuenta" value="5">3u50</option>
            </select>
        </td>
        <td class="right">
            <input class="table__input right" type="number" value="${product.price}">

        </td>`


        tableBody.appendChild(itemTable);

        // Selección de elemento select 
        const selectElement = itemTable.querySelector('select');
        // Asignación del valor seleccionado por el usuario 
        selectElement.value = selectValue; 

    })

    // // Vaciar el valor del input
    document.getElementById('price').value = '';
    document.getElementById('units').value = 1;
    document.getElementById('selectOffers').value = 0;
    document.getElementById('nameProducto').value = '';

    // Vaciar array para volver a generarlo vacio
    formDataArray.length = 0;


    // Ocultar formulario de listas
    if (!formAddList.classList.contains('hidden')) {
        formAddList.classList.add('hidden');
    }
})

// Añadir items con la tecla Enter
document.addEventListener('keydown', function (event) {


    if (event.key === 'Enter') {
        event.preventDefault();
        // const price = document.getElementById('price').value;
        // if (price !== '') {
        //     const tableBody = document.querySelector('.lists__ul');
        //     const itemTable = document.createElement('li')
        //     itemTable.classList.add('list__li');
        //     itemTable.innerHTML = `<div class="name" >${price}</div><div class="icon"><i class="las la-times"></i></div>`
        //     tableBody.appendChild(itemTable);

        //     // Vaciar el valor del input
        //     document.getElementById('price').value = '';

        //     // Ocultar formulario de listas
        //     if (!formAddList.classList.contains('hidden')) {
        //         formAddList.classList.add('hidden');
        //     }
        // }
    }
});

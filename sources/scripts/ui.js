import { validateTextInput, validateInput } from "./validations.js";
import { clearInputs, dateTime, getTotalCost, priceMultiplier, updateTable, agregarElemento, mostrarLista } from "./script.js";

// FORMULARIO
const btnAddList = document.getElementById("btn__addProduct");
const formAddList = document.querySelector(".cnt__form");
const btnCloseForm = document.querySelector(".btn__close");

// CARGAR LISTAS DEL USUARIO
mostrarLista();

// Abrir formulario
btnAddList.addEventListener("click", () => {
    if (formAddList.classList.contains("hidden")) {
        formAddList.classList.remove("hidden");
    }
});

// Cerrar formulario
btnCloseForm.addEventListener("click", () => {
    if (!formAddList.classList.contains("hidden")) {
        formAddList.classList.add("hidden");
    }
    clearInputs();
});

// Añadir item desde formulario
const btnAddProduct = document.getElementById("btn__createProduct");
// Selección del formulario
const form = document.querySelector(".form__item");
// Array para almacenar los datos del formulario
const formDataArray = [];

// Añadiento evento click para añadir producto con btnAddProduct
btnAddProduct.addEventListener("click", () => {
    // Objeto para almacenar los datos
    const formData = {};
    // Seleccionamos los inputs y los selec del formulario
    const inputs = form.querySelectorAll("input, select");

    // Configuración para validar que el campo Precio tenga valor
    let isValid = true;
    const value0 = validateInput(inputs[0]);
    if (!value0) {
        isValid = false; // Si algún campo no es válido, detenemos el proceso
    } else {
        formData[inputs[0].id] = value0.trim(); // Guardamos el valor validado
    }
    if (!isValid) return; // Si hay errores, no se procesa más
    const value1 = validateInput(inputs[1]);
    if (!value1) {
        isValid = false; // Si algún campo no es válido, detenemos el proceso
    } else {
        formData[inputs[1].id] = value1.trim(); // Guardamos el valor validado
    }
    if (!isValid) return; // Si hay errores, no se procesa más

    
    // Configuración para obtener el valor de cada input
    inputs.forEach((input) => {
        const key = input.id;
        // Validación de los inputs
        const value = validateTextInput(input);
        if (value) {
            formData[key] = value.trim();
        }
    });

    // Almacenamos en el array el objeto
    formDataArray.push(formData);

    // Por cada producto se añade un nuevo elemento a la tabla
    formDataArray.forEach((product) => {
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = '';
        // const itemTable = document.createElement("tr");
        // itemTable.classList.add("table__row");
        const selectValue = product.selectOffers;

        agregarElemento(product.price, product.units, selectValue);
        mostrarLista();

        // itemTable.innerHTML = `
        //  <!-- Precio -->
        // <td>
        //     <input class="input__number left table__input " type="number" value="${product.price}">
        // </td>
        // <!-- Unidades -->
        // <td>
        //     <input class="input__units table__input" type="number" value="${product.units}">
        // </td>
        // <!-- Oferta -->
        // <td>
        //     <select name="" id="tableOffers">
        //         <option class="table__option option " selected value="0">--</option>
        //         <option class="table__option option tresPorDos" value="1">3x2</option>
        //         <option class="table__option option dosPorUno" value="2">2x1</option>
        //         <option class="table__option option segSetenta" value="3">2u70</option>
        //         <option class="table__option option segCincuenta" value="4">2u50</option>
        //         <option class="table__option option terCincuenta" value="5">3u50</option>
        //     </select>
        // </td>
        // <!-- Coste a pagar -->
        // <td>
        //     <span class="table__cost">10</span>
        // </td>`;

        // tableBody.appendChild(itemTable);

        // Selección de elemento select
        // const selectElement = itemTable.querySelector("select");
        // Asignación del valor seleccionado por el usuario
        // selectElement.value = selectValue;

        // switch (Number(selectValue)) {
        //     case 1:
        //         selectElement.classList.add('tresPorDos')
        //         break;
        //     case 2:
        //         selectElement.classList.add('dosPorUno')
        //         console.log('dato: 2');
        //         break;
        //     case 3:
        //         selectElement.classList.add('segSetenta')
        //         console.log('dato: 3');
        //         break;
        //     case 4: 
        //         selectElement.classList.add('segCincuenta')
        //         console.log('dato: 4');
        //         break;
        //     case 5:
        //         selectElement.classList.add('terCincuenta')
        //         console.log('dato: 5');
        //         break;
        // }
        

    });
    
    
    

    clearInputs();

    // Vaciar array para volver a generarlo vacio
    formDataArray.length = 0;

    

    // Ocultar formulario de listas
    if (!formAddList.classList.contains("hidden")) {
        formAddList.classList.add("hidden");
    }
    const arrayCosts = priceMultiplier(); // array con el costo de cada item.
    
    
    
    // // Coste de cada producto
    // const cntCost = document.querySelectorAll('.table__cost');
    // cntCost.forEach((cost, index) => {
    //     cost.textContent = arrayCosts[index]; // Asignar el valor al elemento correspondiente
    // });

    // // PRECIO TOTAL
    // const itemsTotalPrice = document.querySelector(".header__items");
    // itemsTotalPrice.innerHTML = getTotalCost();
    // // setTimeout(()=>{
    //     updateTable();
    // // }, 2000)
});

// Añadir items con la tecla Enter  -- añadir la configuración del anterior
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !formAddList.classList.contains("hidden")) {
        event.preventDefault();
        // Objeto para almacenar los datos
        const formData = {};
        // Seleccionamos los inputs y los selec del formulario
        const inputs = form.querySelectorAll("input, select");

        // Configuración para validar que el campo Precio tenga valor
        let isValid = true;
        const value0 = validateInput(inputs[0]);
        if (!value0) {
            isValid = false; // Si algún campo no es válido, detenemos el proceso
        } else {
            formData[inputs[0].id] = value0.trim(); // Guardamos el valor validado
        }
        if (!isValid) return; // Si hay errores, no se procesa más
        const value1 = validateInput(inputs[1]);
        if (!value1) {
            isValid = false; // Si algún campo no es válido, detenemos el proceso
        } else {
            formData[inputs[1].id] = value1.trim(); // Guardamos el valor validado
        }
        if (!isValid) return; // Si hay errores, no se procesa más


        // Configuración para obtener el valor de cada input
        inputs.forEach((input) => {
            const key = input.id;
            // Validación de los inputs
            const value = validateTextInput(input);
            if (value) {
                formData[key] = value.trim();
            }
        });

        // Almacenamos en el array el objeto
        formDataArray.push(formData);

        // Por cada producto se añade un nuevo elemento a la tabla
        formDataArray.forEach((product) => {
            const tableBody = document.querySelector("tbody");
            const itemTable = document.createElement("tr");
            itemTable.classList.add("table__row");
            const selectValue = product.selectOffers;
            itemTable.innerHTML = `
         <!-- Precio -->
        <td>
            <input class="input__number left table__input " type="number" value="${product.price}">
        </td>
        <!-- Unidades -->
        <td>
            <input class="input__units table__input" type="number" value="${product.units}">
        </td>
        <!-- Oferta -->
        <td>
            <select name="" id="tableOffers">
                <option class="table__option option " selected value="0">--</option>
                <option class="table__option option tresPorDos" value="1">3x2</option>
                <option class="table__option option dosPorUno" value="2">2x1</option>
                <option class="table__option option segSetenta" value="3">2u70</option>
                <option class="table__option option segCincuenta" value="4">2u50</option>
                <option class="table__option option terCincuenta" value="5">3u50</option>
            </select>
        </td>
        <!-- Coste a pagar -->
        <td>
            <span class="table__cost">10</span>
        </td>`;

            tableBody.appendChild(itemTable);

            // Selección de elemento select
            const selectElement = itemTable.querySelector("select");
            // Asignación del valor seleccionado por el usuario
            selectElement.value = selectValue;
        });



        clearInputs();

        // Vaciar array para volver a generarlo vacio
        formDataArray.length = 0;



        // Ocultar formulario de listas
        if (!formAddList.classList.contains("hidden")) {
            formAddList.classList.add("hidden");
        }
        const arrayCosts = priceMultiplier(); // Suponiendo que esta función devuelve un array de costos





        const cntCost = document.querySelectorAll('.table__cost');
        cntCost.forEach((cost, index) => {
            cost.innerHTML = arrayCosts[index]; // Asignar el valor al elemento correspondiente
        });
        // PRECIO TOTAL
        const itemsTotalPrice = document.querySelector(".header__items");
        itemsTotalPrice.innerHTML = getTotalCost();
    }
});






// LIMPIAR INPUT UNIDADES DE FORMULARIO
// Vuelve el valor al 0 al seleccionar el input
const inputUnit = document.getElementById('units');

inputUnit.addEventListener('click', ()=>{
    inputUnit.value = '';
    if (inputUnit) {
        console.log('e')
    }
})
// Deja el valor del input a 1 cuando se abandona el input y no se añade valor
inputUnit.addEventListener('mouseleave', () =>{
    if(inputUnit.value === ''){
    inputUnit.value = 1;
    }
    else {
        console.log('sdds')
    }
})


// RELOJ FECHA-HORA
const subTitleTime = document.querySelector(".subtitle");
setInterval(() => {
    subTitleTime.innerHTML = dateTime();
}, 1000);



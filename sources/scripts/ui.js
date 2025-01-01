import { validateTextInput, validateInput } from "./validations.js";
import { clearInputs, dateTime, getTotalCost, sumUnits } from "./script.js";

// FORMULARIO
const btnAddList = document.getElementById("btn__addProduct");
const formAddList = document.querySelector(".cnt__form");
const btnCloseForm = document.querySelector(".btn__close");

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
        formData[inputs[0].id] = value1.trim(); // Guardamos el valor validado
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

        const selectValue = product.selectOffers;
        // const keyItem = index;
        // console.log(keyItem);
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

    // PRECIO TOTAL
    const itemsTotalPrice = document.querySelector(".header__items");
    itemsTotalPrice.innerHTML = getTotalCost();
    sumUnits();

    // Ocultar formulario de listas
    if (!formAddList.classList.contains("hidden")) {
        formAddList.classList.add("hidden");
    }
});

// Añadir items con la tecla Enter
document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && !formAddList.classList.contains("hidden")) {
        event.preventDefault();
        // Objeto para almacenar los datos
        const formData = {};
        // Seleccionamos los inputs y los selec del formulario
        const inputs = form.querySelectorAll("input, select");

        // Configuración para validar que el campo Precio tenga valor
        let isValid = true;
        const value = validateInput(inputs[0]);
        if (!value) {
            isValid = false; // Si algún campo no es válido, detenemos el proceso
        } else {
            formData[inputs[0].id] = value.trim(); // Guardamos el valor validado
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

        // PRECIO TOTAL
        const itemsTotalPrice = document.querySelector(".header__items");
        itemsTotalPrice.innerHTML = getTotalCost();

        clearInputs();

        // Vaciar array para volver a generarlo vacio
        formDataArray.length = 0;

        // Ocultar formulario de listas
        if (!formAddList.classList.contains("hidden")) {
            formAddList.classList.add("hidden");
        }
    }
});

// RELOJ FECHA-HORA
const subTitleTime = document.querySelector(".subtitle");
setInterval(() => {
    subTitleTime.innerHTML = dateTime();
}, 1000);

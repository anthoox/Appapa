import { validateTextInput, validateInput } from "./validations.js";
import { clearInputs, dateTime, getTotalCost, priceMultiplier, eliminarElemento, agregarElemento, mostrarLista, updateTable } from "./script.js";

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
        const selectValue = product.selectOffers;

        agregarElemento(product.price, product.units, selectValue);
        mostrarLista();

    });
    
    
    clearInputs();

    // Vaciar array para volver a generarlo vacio
    formDataArray.length = 0;

    

    // Ocultar formulario de listas
    if (!formAddList.classList.contains("hidden")) {
        formAddList.classList.add("hidden");
    }

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
            tableBody.innerHTML = '';
            const selectValue = product.selectOffers;

            agregarElemento(product.price, product.units, selectValue);
            mostrarLista();

        });


        clearInputs();

        // Vaciar array para volver a generarlo vacio
        formDataArray.length = 0;



        // Ocultar formulario de listas
        if (!formAddList.classList.contains("hidden")) {
            formAddList.classList.add("hidden");
        }

    }
});





// LIMPIAR INPUT UNIDADES DE FORMULARIO
// Vuelve el valor al 0 al seleccionar el input
const inputUnit = document.getElementById('units');

inputUnit.addEventListener('click', ()=>{
    inputUnit.value = '';
})
// Deja el valor del input a 1 cuando se abandona el input y no se añade valor
inputUnit.addEventListener('mouseleave', () =>{
    if(inputUnit.value === ''){
    inputUnit.value = 1;
    }
})


// RELOJ FECHA-HORA
const subTitleTime = document.querySelector(".subtitle");
setInterval(() => {
    subTitleTime.innerHTML = dateTime();
}, 1000);



document.querySelector("tbody").addEventListener("click", (event) => {
    if (event.target.matches(".table__icon .del")) {
        const row = event.target.closest("tr"); // Encuentra la fila
        const index = Array.from(row.parentNode.children).indexOf(row); // Calcula el índice
        eliminarElemento(index); // Llama a la función de eliminación
    }
});

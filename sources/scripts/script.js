// LIMPIAR INPUTS
export function clearInputs() {
    // Vaciar el valor del input
    document.getElementById("price").value = "";
    document.getElementById("units").value = 1;
    document.getElementById("selectOffers").value = 0;
}

// OBTENER FECHA Y HORA
export function dateTime() {
    const now = new Date();

    // Obtener las partes de la fecha
    // string.padStart(longitudTotal, caracterRelleno);
    const day = String(now.getDate()).padStart(2, "0"); // Hora (con 2 dígitos)
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    // Obtener las partes de la hora
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    // Combinar en el formato deseado
    const fullDateTime = `${day}/${month}/${year} - ${hours}:${minutes}`;

    return fullDateTime;
}

// SUMAR COSTES
export function getTotalCost(elem) {
    // if(!elem){
        const prices = document.querySelectorAll(".table__cost");
        let total = 0;

        prices.forEach((price) => {
            const value = parseFloat(price.textContent);
            if (!isNaN(value)) {
                total += value; // Suma los valores numéricos
            }
        });

        // Formatear el total con 2 decimales
        total = total.toFixed(2); // Convierte el número a una cadena con dos decimales
        const formattedTotal = `<h2>Total: ${total}</h2>`;
        return formattedTotal;
}

// MULTIPLICAR CANTIDADES POR PRECIO
export function priceMultiplier() {
    // Selección de todas las filas de la tabla
    const rows = document.querySelectorAll(".table__row");
    // Arrays para almacenar el cada valor de cada input de cada fila
    const priceInput = [];
    const unitsInput = [];
    const offerSelect = [];
    const result = [];

    rows.forEach((row) => {
        priceInput.push(
            Number(row.querySelector(".input__number")?.value || 0)
        );
        unitsInput.push(Number(row.querySelector(".input__units")?.value || 0));
        offerSelect.push(Number(row.querySelector("#tableOffers")?.value || 0));
    });
   

    for (let i = 0; i < priceInput.length; i++){
        const groupsOfTwo = Math.floor(unitsInput[i] / 2);
        const remainingOfTwo = Number(unitsInput[i] % 2);
        const groupsOfThree = Math.floor(unitsInput[i] / 3);
        const remainingOfThree = unitsInput[i] % 3;
        switch(offerSelect[i]){
            case 0: 
                result.push(priceInput[i] * unitsInput[i]);
                break;
            case 1:
                const discountedCost =
                    groupsOfThree * 2 * priceInput[i] + remainingOfThree * priceInput[i];

                result.push(discountedCost);
                break;
            case 2:
                const discountedOfTwo = 
                groupsOfTwo  * priceInput[i] + remainingOfTwo * priceInput[i];

                result.push(discountedOfTwo);
                break;
            case 3:
                const secondUnitDiscountSeventy =
                    (groupsOfTwo * (priceInput[i] + priceInput[i] * 0.7)) + 
                    (remainingOfTwo * priceInput[i]);
                result.push(secondUnitDiscountSeventy);
                break;
            case 4:
                const secondUnitDiscountFifty =
                    (groupsOfTwo * (priceInput[i] + priceInput[i] * 0.5)) +
                    (remainingOfTwo * priceInput[i]);
                result.push(secondUnitDiscountFifty);
                break;
            case 5:
                const thirdUnitDiscountFifty =
                    (groupsOfThree * ((2 * priceInput[i]) + (priceInput[i] * 0.5))) + (remainingOfThree * priceInput[i]);
                result.push(thirdUnitDiscountFifty);
                break;
            default:
                console.error ('Oferta No Encontrada');
        }
    }


    return result;
}

// TABLA
export function updateTable() {
    const rowsTable = document.querySelectorAll('tr.table__row'); // Filas de la tabla
    const sessionId = startSesion(); // Identificador de sesión
    let listaCompra = JSON.parse(localStorage.getItem(sessionId)) || []; // Recuperar lista del localStorage

    rowsTable.forEach((row, rowIndex) => {
        const inputsTable = row.querySelectorAll('input, select');
        inputsTable.forEach(input => {
            if (input.tagName === 'INPUT') {
                input.addEventListener('keyup', () => {
                    const inputClass = input.classList.contains('input__number') ? 'item' : 'cantidad';
                    // Actualizar el valor en la listaCompra
                    listaCompra[rowIndex][inputClass] = Number(input.value);

                    // Guardar la lista actualizada en localStorage
                    localStorage.setItem(sessionId, JSON.stringify(listaCompra));

                    // Actualizar la tabla
                    const arrayCosts = priceMultiplier(); // array con el costo de cada item.
                    const cntCost = document.querySelectorAll('.table__cost');
                    cntCost.forEach((cost, index) => {
                        cost.textContent = arrayCosts[index]; // Asignar el valor al elemento correspondiente
                    });

                    // PRECIO TOTAL
                    const itemsTotalPrice = document.querySelector(".header__items");
                    itemsTotalPrice.innerHTML = getTotalCost();
                });
            } else if (input.tagName === 'SELECT') {
                input.addEventListener('change', () => {
                    // Actualizar la oferta en la listaCompra
                    listaCompra[rowIndex].oferta = Number(input.value);

                    // Guardar la lista actualizada en localStorage
                    localStorage.setItem(sessionId, JSON.stringify(listaCompra));

                    // Actualizar la clase del select
                    switch (Number(input.value)) {
                        case 1:
                            input.className = '';
                            input.classList.add('tresPorDos');
                            break;
                        case 2:
                            input.className = '';
                            input.classList.add('dosPorUno');
                            break;
                        case 3:
                            input.className = '';
                            input.classList.add('segSetenta');
                            break;
                        case 4:
                            input.className = '';
                            input.classList.add('segCincuenta');
                            break;
                        case 5:
                            input.className = '';
                            input.classList.add('terCincuenta');
                            break;
                        default:
                            input.className = '';
                            break;
                    }

                    // Actualizar la tabla
                    const arrayCosts = priceMultiplier(); // array con el costo de cada item.
                    const cntCost = document.querySelectorAll('.table__cost');
                    cntCost.forEach((cost, index) => {
                        cost.textContent = arrayCosts[index]; // Asignar el valor al elemento correspondiente
                    });

                    // PRECIO TOTAL
                    const itemsTotalPrice = document.querySelector(".header__items");
                    itemsTotalPrice.innerHTML = getTotalCost();
                });
            }
        });
    });
}

// IDENTIFICADOR UNICO DE USUARIO 
export function generatorUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0; // Genera un número aleatorio
        const v = c === 'x' ? r : (r & 0x3 | 0x8); // Calcula el carácter según el patrón
        return v.toString(16); // Convierte el número en un carácter hexadecimal
    });
}

// INICIAR SESIÓN 
export function startSesion() {
    // Verificamos si ya existe un identificador único en el navegador
    let sessionId = localStorage.getItem('sessionId');

    // Si no existe, generamos uno y lo guardamos
    if (!sessionId) {
        sessionId = generatorUUID(); // Usamos la función de generación de UUID
        localStorage.setItem('sessionId', sessionId);
    }

    return sessionId; // Retornamos el identificador de la sesión
}

export function agregarElemento(item, cantidad, oferta) {
    const sessionId = startSesion(); // Obtenemos el identificador de sesión

    // Recuperamos la lista de compras actual o inicializamos una nueva
    let listaCompra = JSON.parse(localStorage.getItem(sessionId)) || [];

    // Agregamos el nuevo elemento a la lista
    listaCompra.push({ item, cantidad, oferta });

    // Guardamos la lista actualizada en LocalStorage
    localStorage.setItem(sessionId, JSON.stringify(listaCompra));

    
}

export function mostrarLista() {
    const sessionId = startSesion(); // Obtenemos el identificador de sesión

    // Recuperamos la lista asociada al navegador
    const listaCompra = JSON.parse(localStorage.getItem(sessionId)) || [];

    const tableBody = document.querySelector("tbody");
    tableBody.innerHTML = ''; // Limpiamos el contenido existente

    listaCompra.forEach((elem, index) => {
        const itemTable = document.createElement("tr");
        itemTable.classList.add("table__row");
        itemTable.innerHTML = `
         <!-- Precio -->
        <td>
            <input class="input__number left table__input" type="number" value="${elem.item}">
        </td>
        <!-- Unidades -->
        <td>
            <input class="input__units table__input" type="number" value="${elem.cantidad}">
        </td>
        <!-- Oferta -->
        <td>
            <select  id="tableOffers">
                <option class="table__option option" selected value="0">--</option>
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
        </td>
        <!-- Botón eliminar -->
        <td>
            <div class="table__icon">
                <i class="del las la-times"></i>
            </div>
        </td>`;

        tableBody.appendChild(itemTable);

        // Selección del valor de oferta
        const selectElement = itemTable.querySelector("select");
        selectElement.value = elem.oferta;
        selectElement.className = ''; // Limpia las clases previas
        switch (Number(elem.oferta)) {
            case 1:
                selectElement.classList.add('tresPorDos');
                break;
            case 2:
                selectElement.classList.add('dosPorUno');
                break;
            case 3:
                selectElement.classList.add('segSetenta');
                break;
            case 4:
                selectElement.classList.add('segCincuenta');
                break;
            case 5:
                selectElement.classList.add('terCincuenta');
                break;
            default:
                break;
        }
    });

    // Actualizamos el coste y el precio total
    const arrayCosts = priceMultiplier(); // Array con el costo de cada item
    const cntCost = document.querySelectorAll('.table__cost');
    cntCost.forEach((cost, index) => {
        cost.textContent = arrayCosts[index].toFixed(2); // Asignar el valor al elemento correspondiente

    });

    const itemsTotalPrice = document.querySelector(".header__items");
    itemsTotalPrice.innerHTML = getTotalCost();
    updateTable();
}


export function eliminarElemento(index) {
    const sessionId = startSesion(); // Obtenemos el identificador de sesión

    // Recuperamos la lista actual
    let listaCompra = JSON.parse(localStorage.getItem(sessionId)) || [];

    // Eliminamos el elemento según su índice
    if (index >= 0 && index < listaCompra.length) {
        listaCompra.splice(index, 1);
        console.log(`Elemento en la posición ${index} eliminado.`);
    } else {
        console.error('Índice no válido.');
    }

    // Guardamos la lista actualizada
    localStorage.setItem(sessionId, JSON.stringify(listaCompra));
    mostrarLista()
}




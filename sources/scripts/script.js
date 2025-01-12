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
        
    // }else{
        // console.log('probando')
    // }
    
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
        // AÑADIR UNA VALIDACIÓN PARA CUANDO EL VALOR DEL SELECTOR SEA DISTINTO A 0
        switch(offerSelect[i]){
            case 0: 
                console.log('Sin Descuento')
                result.push(priceInput[i] * unitsInput[i]);
                break;
            case 1:
                console.log('Tres por Dos')
                // Calcular el costo total con la oferta aplicada
                const discountedCost =
                    //grupos de 3 por 2 más lo que no este en la oferta por el precio
                    groupsOfThree * 2 * priceInput[i] + remainingOfThree * priceInput[i];

                result.push(discountedCost);
                break;
            case 2:
                console.log('Dos por Uno')
                const discountedOfTwo = 
                groupsOfTwo  * priceInput[i] + remainingOfTwo * priceInput[i];

                result.push(discountedOfTwo);
                break;
            case 3:
                console.log('Segunda Unidad al 70%');
                const secondUnitDiscountSeventy =
                    (groupsOfTwo * (priceInput[i] + priceInput[i] * 0.7)) + 
                    (remainingOfTwo * priceInput[i]);
                result.push(secondUnitDiscountSeventy);
                break;
            case 4:
                console.log('Segunda Unidad al 50%');
                const secondUnitDiscountFifty =
                    (groupsOfTwo * (priceInput[i] + priceInput[i] * 0.5)) +
                    (remainingOfTwo * priceInput[i]);
                result.push(secondUnitDiscountFifty);
                break;
            case 5:
                console.log('Tercera Unidad al 50%');
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
export function updateTable(){
    const rowsTable = document.querySelectorAll('td');
    rowsTable.forEach(colum => {
        const inputsTable = colum.querySelectorAll('input, select');
        inputsTable.forEach(input => {
            if(input.tagName  === 'INPUT'){
                input.addEventListener('keyup', () => {
                    console.log(input.value)
                    const arrayCosts = priceMultiplier(); // array con el costo de cada item.
                    // Coste de cada producto
                    const cntCost = document.querySelectorAll('.table__cost');
                    cntCost.forEach((cost, index) => {
                        cost.textContent = arrayCosts[index]; // Asignar el valor al elemento correspondiente
                    });

                    // PRECIO TOTAL
                    const itemsTotalPrice = document.querySelector(".header__items");
                    itemsTotalPrice.innerHTML = getTotalCost();

                })
            }else if( input.tagName === 'SELECT'){
                input.addEventListener('change', () => {
                    console.log(input.value)
                    const arrayCosts = priceMultiplier(); // array con el costo de cada item.
                    // Coste de cada producto
                    const cntCost = document.querySelectorAll('.table__cost');
                    cntCost.forEach((cost, index) => {
                        cost.textContent = arrayCosts[index]; // Asignar el valor al elemento correspondiente
                    });

                    // PRECIO TOTAL
                    const itemsTotalPrice = document.querySelector(".header__items");

                    // Asignación del valor seleccionado por el usuario

                    switch (Number(input.value)) {
                        case 1:
                            input.classList.add('tresPorDos')
                            break;
                        case 2:
                            input.classList.add('dosPorUno')
                            console.log('dato: 2');
                            break;
                        case 3:
                            input.classList.add('segSetenta')
                            console.log('dato: 3');
                            break;
                        case 4:
                            input.classList.add('segCincuenta')
                            console.log('dato: 4');
                            break;
                        case 5:
                            input.classList.add('terCincuenta')
                            console.log('dato: 5');
                            break;
                    }

                    
                    itemsTotalPrice.innerHTML = getTotalCost();
                    
                })
            }else {
                // Este mensaje es de prueba
                console.log('otroo')
            }
            
        })
        // Ya tengo los valores, ahora queda actualizarlos.
 
    })
}

// IDENTIFICADOR UNICO DE USUARIO --no exportado aun--
export function generatorUUID(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0; // Genera un número aleatorio
        const v = c === 'x' ? r : (r & 0x3 | 0x8); // Calcula el carácter según el patrón
        return v.toString(16); // Convierte el número en un carácter hexadecimal
    });
}

// INICIAR SESIÓN --no exportado aun--
export function startSesion() {
    // Verificamos si ya existe un identificador único en el navegador
    let sessionId = localStorage.getItem('sessionId');

    // Si no existe, generamos uno y lo guardamos
    if (!sessionId) {
        sessionId = generatorUUID(); // Usamos la función de generación de UUID
        localStorage.setItem('sessionId', sessionId);
    }

    console.log(`ID de sesión actual: ${sessionId}`);
    return sessionId; // Retornamos el identificador de la sesión
}

export function agregarElemento(item, cantidad) {
    const sessionId = inicializarSesion(); // Obtenemos el identificador de sesión

    // Recuperamos la lista de compras actual o inicializamos una nueva
    let listaCompra = JSON.parse(localStorage.getItem(sessionId)) || [];

    // Agregamos el nuevo elemento a la lista
    listaCompra.push({ item, cantidad });

    // Guardamos la lista actualizada en LocalStorage
    localStorage.setItem(sessionId, JSON.stringify(listaCompra));

    console.log(`Elemento agregado: ${item}, Cantidad: ${cantidad}`);
}

export function mostrarLista() {
    const sessionId = inicializarSesion(); // Obtenemos el identificador de sesión

    // Recuperamos la lista asociada al navegador
    const listaCompra = JSON.parse(localStorage.getItem(sessionId)) || [];

    console.log('Lista de compras:', listaCompra);
    return listaCompra;
}

export function eliminarElemento(index) {
    const sessionId = inicializarSesion(); // Obtenemos el identificador de sesión

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
}




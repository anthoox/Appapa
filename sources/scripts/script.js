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
export function getTotalCost() {
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
        const grupsOfTwo = Math.floor(unitsInput[i] / 2);
        const remainingOfTwo = Number(unitsInput[i] % 2);
        const groupsOfThree = Math.floor(unitsInput[i] / 3);
        const remainingUnits = unitsInput[i] % 3;
        // AÑADIR UNA VALIDACIÓN PARA CUANDO EL VALOR DEL SELECTOR SEA DISTINTO A 0
        switch(offerSelect[i]){
            case 0: 
                result.push(priceInput[i] * unitsInput[i]);
                console.log('Tres por Dos')
                break;
            case 1:
                // Calcular el costo total con la oferta aplicada
                const discountedCost =
                    //grupos de 3 por 2 más lo que no este en la oferta por el precio
                    groupsOfThree * 2 * priceInput[i] + remainingUnits * priceInput[i];

                result.push(discountedCost);
                break;
            case 2:
                console.log('Dos por Uno')
                const discountedOfTwo = 
                grupsOfTwo  * priceInput[i] + remainingOfTwo * priceInput[i];

                result.push(discountedOfTwo);
                break;
            case 3:
                console.log('Segunda Unidad 70%');
                const secondUnitDiscount =
                    (grupsOfTwo * (priceInput[i] + priceInput[i] * 0.7)) + 
                    (remainingOfTwo * priceInput[i]);;
                result.push(secondUnitDiscount);
                break;

        }
    }

    return result;
}


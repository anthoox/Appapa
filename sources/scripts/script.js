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
    rows.forEach((row) => {
        priceInput.push(
            Number(row.querySelector(".input__number")?.value || 0)
        );
        unitsInput.push(Number(row.querySelector(".input__units")?.value || 0));
        offerSelect.push(Number(row.querySelector("#tableOffers")?.value || 0));
        costSpan.push(row.querySelector(".table__cost").value); 

    });


  const result = []
    for (let i = 0; i < priceInput.length; i++){
        // AÑADIR UNA VALIDACIÓN PARA CUANDO EL VALOR DEL SELECTOR SEA DISTINTO A 0
        // if(costSpan[i]!== 0) -> añadir un switch para cada valor desde el 0 al 5 y añadir promoción y un default si no se especifica promo alguna
        result.push(Number(priceInput[i] * unitsInput[i]));
    }

    return result;
}

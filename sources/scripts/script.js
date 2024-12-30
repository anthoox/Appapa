// LIMPIAR INPUTS
export function clearInputs(){
    // // Vaciar el valor del input
    document.getElementById('price').value = '';
    document.getElementById('units').value = 1;
    document.getElementById('selectOffers').value = 0;
    document.getElementById('nameProducto').value = '';
}

// OBTENER FECHA Y HORA
export function dateTime(){
    const now = new Date();

    // Obtener las partes de la fecha
    // string.padStart(longitudTotal, caracterRelleno);
    const day = String(now.getDate()).padStart(2, '0');// Hora (con 2 dígitos)
    const month = String(now.getMonth()).padStart(2, '0');
    const year = now.getFullYear();

    // Obtener las partes de la hora
    const hours = String(now.getHours()).padStart(2,'0');
    const minutes = String(now.getMinutes()).padStart(2,'0');

    // Combinar en el formato deseado
    const fullDateTime = `${day}/${month}/${year} - ${hours}:${minutes}`;
    
    return fullDateTime;
}

// SUMAR PRECIOS
export function sumPrice() {
    const prices = document.querySelectorAll('.input__number');
    let total = 0;

    prices.forEach(price => {
        const value = parseFloat(price.value);
        if (!isNaN(value)) {
            total += value; // Suma los valores numéricos
        }
    });
    
    // Formatear el total con 2 decimales
    total = total.toFixed(2); // Convierte el número a una cadena con dos decimales
    const formattedTotal = `<h2>Total: ${total}</h2>`;
    return formattedTotal;
}


// SUMAR CANTIDADES
export function sumUnits(e){
    // const units = document.querySelectorAll('.input__units');
    const prices = document.querySelectorAll('.input__number');

    let total = 0;
// QUIZA SE DEBERIA EMPEZAR POR SELECCIONAR LOS TR UNA VEZ GENERADOS 
// Y A PARTIR DE ELLOS SUS VALORES

    console.log(total)
}


// ESPACIO PARA PRUEBAS
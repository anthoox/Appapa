export function validateTextInput(input){
    // eliminamos los espacions vacios del valor del input.
    let value = input.value;

    if(value === ""){
        value = "Obj"
        return value;

    }else{
        return value;
    }
}




// Función de validación
export function validateInput(input) {
    const { id, value, type } = input;

    if (type === 'number') {
        if (isNaN(value) || value.trim() === '') {
            alert(`Debe introducir un número en Precio`);
            return false;
        }
    }

    return value; // Retorna el valor si es válido
}
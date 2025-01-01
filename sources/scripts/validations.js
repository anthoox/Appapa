// Validación del valor de los inputs
export function validateTextInput(input){
    // eliminamos los espacions vacios del valor del input.
    let value = input.value;
    if(value === ""){
        value = "NULL"
        return value;

    }else{
        return value;
    }
}




// Función de validación del input number
export function validateInput(input) {
    const {id, value, type } = input;

    if (type === 'number') {
        if (isNaN(value) || value.trim() === '') {
            if(id==='price'){
                alert('Debe introducir el Precio');
                return false;
            }
            if( id === 'units'){
                alert('Debe introducir las Unidades');
                return false;
            }            
        }
    }

    return value; // Retorna el valor si es válido
}
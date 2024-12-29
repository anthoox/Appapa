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


export function validateTextInput(input){
    // eliminamos los espacions vacios del valor del input.
    const value = input.value.trim();

    if(value === ""){
        input.style.border = '2px solid red';
        return false;
    }
}
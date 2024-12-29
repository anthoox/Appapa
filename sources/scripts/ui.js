const btnAddList = document.getElementById('btn__addProduct');
const formAddList = document.querySelector('.cnt__form');
const btnCloseForm = document.querySelector('.btn__close');

// Abrir formulario
btnAddList.addEventListener('click', () => {
    if (formAddList.classList.contains('hidden')) {
        formAddList.classList.remove('hidden');
    }
})

// Cerrar formulario
btnCloseForm.addEventListener('click', () => {
    if (!formAddList.classList.contains('hidden')) {
        formAddList.classList.add('hidden');
    }
})

// Añadir item desde formulario
const btnAddProduct = document.getElementById('btn__createProduct');

btnAddProduct.addEventListener('click', () => {
    // Almacenar el valor del input
    const price = document.getElementById('price').value;
    /*  --- Aqui haría falta el validador o añadirlo en la función--- */

    /* --- Todo esto se podria crear como función ---*/
    const tableBody = document.querySelector('tbody');
    const itemTable = document.createElement('tr')
    itemTable.innerHTML = `
    <td>
        <input class="left table__input" type="text" value="papass">
    </td>
    <td>
        <input class="table__input" type="number" value="22">
    </td>
    <td>
        <select name="" id="">
            <option class="option" value="0" selected>--</option>
            <option class="option tresPorDos" value="1">3x2</option>
            <option class="option dosPorUno" value="1">2x1</option>
            <option class="option segSetenta" value="1">2u70</option>
            <option class="option segCincuenta" value="1">2u50</option>
            <option class="option terCincuenta" value="1">3u50</option>
        </select>
    </td>
    <td class="right">
        <input class="table__input right" type="number" value="${price}">

    </td>`
    tableBody.appendChild(itemTable);

    // Vaciar el valor del input
    document.getElementById('price').value = '';

    // Ocultar formulario de listas
    if (!formAddList.classList.contains('hidden')) {
        formAddList.classList.add('hidden');
    }
})

// Añadir items con la tecla Enter
document.addEventListener('keydown', function (event) {


    if (event.key === 'Enter') {
        event.preventDefault();
        const price = document.getElementById('price').value;
        if (price !== '') {
            const tableBody = document.querySelector('.lists__ul');
            const itemTable = document.createElement('li')
            itemTable.classList.add('list__li');
            itemTable.innerHTML = `<div class="name" >${price}</div><div class="icon"><i class="las la-times"></i></div>`
            tableBody.appendChild(itemTable);

            // Vaciar el valor del input
            document.getElementById('price').value = '';

            // Ocultar formulario de listas
            if (!formAddList.classList.contains('hidden')) {
                formAddList.classList.add('hidden');
            }
        }
    }
});

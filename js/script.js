alert("¡Bienvenido a mi WEB E-Commerce!");
let carrito = [];
let precios = [];
let subtotal;

// Se agregan en formato JSON los productos con sus respectivos precios.
let productos = [
    {
        name: "Taza de Café",
        price: 125,
    },
    {
        name: "Cápsula de Café",
        price: 50,
    },
    {
        name: "Cafetera",
        price: 325,
    },
];

// Muestra lista de Productos
function mostrarListaProductos(o, lista) {
    let productList;
    if (o == 'b') {
        productList = "¿Que producto desea borrar?\n\n";
        for (let i = 0; i < carrito.length; i++) {
            productList += i + '. ' + carrito[i] + " - $" + precios[i] + "\n";
        }
    } else {
        productList = "¿Que producto desea comprar?\n\n";
        for (let producto of lista) {
            productList += lista.indexOf(producto) + '. ' + producto.name + " - $" + producto.price + "\n";
        }
    }
    productList += '\n-1. Para salir al menu anterior.';
    if (o == 'b') {
        borrarCarrito(productList);
    } else {
        agregarCarrito(productList);
    }
}

// Usa la lista para agregar los productos al carrito.
function comprarProductos(lista) {
    let opt = 0;
    while (opt != -1) {
        opt = prompt(lista);
        opt = parseInt(opt);
        if (opt <= productos.length && opt >= 0) {
            carrito.push(productos[opt].name);
            precios.push(productos[opt].price);
        } else if (opt == -1) {
            alert('El carrito fue cargado correctamente.');
        } else {
            alert('El numero de producto seleccionado no existe.');
        }
    }
}

// Usa una lista para borrar los productos al carrito.
function borrarProductos(lista) {
    let opt = 0;
    while (opt != -1) {
        opt = prompt(lista);
        opt = parseInt(opt);
        if (opt <= productos.length && opt >= 0) {
            carrito.splice(opt, 1)[0];
            precios.splice(opt, 1)[0];
            mostrarListaProductos('b', carrito)
        } else if (opt == -1) {
            alert('El carrito fue actualizado correctamente.');
        } else {
            alert('El numero de producto seleccionado no existe.');
        }
    }
}

//Muestra el carrito actual
function mostrarCarrito() {
    let carritoList = "Su carrito actual: \n\n";
    for (let i = 0; i < carrito.length; i++) {
        carritoList += '- ' + carrito[i] + " - $" + precios[i] + "\n";
    }
    let subtotal = 0;
    for (let i = 0; i < precios.length; i++) {
        subtotal += precios[i];
    }
    carritoList += '\nSubtotal:   $' + subtotal + '\n IVA:        $' + subtotal * 0.22 + '\nTotal:      $' + subtotal * 1.22;
    alert(carritoList);
    menu();
}

// Agrega Proguctos a Carrito
function agregarCarrito(lista) {
    comprarProductos(lista);
    menu();
}

// Borra productos de el Carrito, si tiene
function borrarCarrito(lista) {
    if (carrito.length > 0) {
        borrarProductos(lista);
        menu();
    } else {
        alert('El carrito aun no posee articulos.');
        menu();
    }
}

function botonPagar() {
    if (carrito.length <= 0) {
        alert('No hay nada que pagar!');
        menu();
    }
    // Calcula el subtotal y el total
    let subtotal = 0;
    for (let i = 0; i < precios.length; i++) {
        subtotal += precios[i];
    }
    let total = subtotal * 1.22;

    // Muestra el carro
    let carritoList = "Su carrito actual: \n\n";
    for (let i = 0; i < carrito.length; i++) {
        carritoList += '- ' + carrito[i] + " - $" + precios[i] + "\n";
    }
    carritoList += '\nSubtotal:   $' + subtotal + '\n IVA:        $' + subtotal * 0.22 + '\nTotal:      $' + total;

    // Muestra el menú de pago
    carritoList += `\n\n¿Cómo desea pagar?\n\n1. Efectivo\n2. Tarjeta\n`;
    let opcionPago = prompt(carritoList);
    opcionPago = parseInt(opcionPago);

    menuPagos(opcionPago, total);
}

function menuPagos(opcionPago, total){
    while (opcionPago == 1 || opcionPago == 2) {
        // Procesa el pago
        switch (opcionPago) {
            case 1:
                // Pagar con efectivo
                monto = prompt("¿Con que monto pagarás?");
                if (monto > total) {
                    alert("Pago realizado con éxito.\n" + "Se te dovolverán " + (monto-total) + " pesos.")
                    opcionPago = 0;
                } else {
                    alert("Intenta ingresar un monto mayor a lo que debes pagar.")
                }
                break;
            case 2:
                // Pagar con tarjeta
                alert("Pago realizado con éxito.");
                opcionPago = 0;
                break;
            default:
                // Opción inválida
                alert("Opción inválida.");
                break;
        }
    }
    carrito = [];
    precios = [];
    menu();
}

function menu() {
    menutxt = '1. Comprar Productos\n2. Ver Carrito\n3. Quitar Productos de Carrito\n4. Pagar\n';
    var select = prompt(menutxt);
    select = parseInt(select);
    switch (select) {
        case 1:
            mostrarListaProductos('a', productos);
            break;
        case 2:
            mostrarCarrito()
            break;
        case 3:
            mostrarListaProductos('b', carrito);
            break;
        case 4:
            botonPagar()
            break;
        default:
            break;
    }
}

menu();
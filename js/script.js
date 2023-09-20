alert("¡Bienvenido a mi WEB E-Commerce!");
let carrito = [];
let subtotal;

//agregar sort y filter y cositas--.

// Se agregan en formato JSON los productos con sus respectivos precios.
let inventario = [
    {
        name: "BeanTastic SmartBrewer",
        category: 'maquina',
        price: 1250,
    },
    {
        name: "AromaBlend MaxiBrew",
        category: 'maquina',
        price: 5000,
    },
    {
        name: "CaféMatico ProXpress",
        category: 'maquina',
        price: 3250,
    },
    {
        name: "AromaBliss UltraGrind",
        category: 'maquina',
        price: 2500,
    },
    {
        name: "Espresso Intenso",
        category: 'capsula',
        price: 125,
    },
    {
        name: "Cappuccino Caramelo",
        category: 'capsula',
        price: 150,
    },
    {
        name: "Café Menta Delicia",
        category: 'capsula',
        price: 175,
    },
    {
        name: "Descafeinado Delicado",
        category: 'capsula',
        price: 200,
    },
];

function agregarProductos(lista) {
    let productList;
    productList = "¿Que producto desea comprar?\n\n";
    productList += listadoProductos(lista);
    productList += '\n-1. Para salir al menu anterior.';
    comprarProductos(lista);
    menu();
}

// Muestra lista de Productos que estan el carrito si este posee uno y pregunta cual desea borrar.w
function quitarProductos(carrito) {
    let productList;
    productList = "¿Que producto desea borrar?\n\n";
    for (let i = 0; i < carrito.length; i++) {
        productList += i + '. ' + carrito[i] + " - $" + precios[i] + "\n";
    }
    productList += '\n-1. Para salir al menu anterior.';
    if (carrito.length > 0) {
        borrarProductos(lista);
        menu();
    } else {
        alert('El carrito aun no posee articulos.');
        menu();
    }
}

// Usa la lista para agregar los productos al carrito.
function comprarProductos(lista) {
    let opt = 0;
    while (opt != -1) {
        opt = prompt(lista);
        opt = parseInt(opt);
        if (opt <= inventario.length && opt >= 0) {
            carrito.push(inventario[opt].name);
            precios.push(inventario[opt].price);
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
        if (opt <= inventario.length && opt >= 0) {
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

function menuCarrito(carrito) {
    let menuTxtCarrito = '\n1. Mostrar el Carrito.\n2. Borrar Producto del Carrito.\n3. Comprar.\n-1. Para salir a el Menu Principal.';
    let select = prompt(menuTxtCarrito);
    switch (select) {
        case 1:
            mostrarCarrito();
            break;
        case 2:
            mostrarCarrito()
            break;
        case 3:
            quitarProductos(carrito)
            break;
        default:
            break;
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

function menuPagos(opcionPago, total) {
    while (opcionPago == 1 || opcionPago == 2) {
        // Procesa el pago
        switch (opcionPago) {
            case 1:
                // Pagar con efectivo
                monto = prompt("¿Con que monto pagarás?");
                if (monto > total) {
                    alert("Pago realizado con éxito.\n" + "Se te devolverán " + (monto - total) + " pesos.")
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

function listadoProductos(productos) {
    let newProdList = 'Para Comprar Ingrese el Número de el Artículo para Agregarlo al Carrito.\n\n';
    for (let producto of productos) {
        newProdList += (productos.indexOf(producto)+1) + '.  ' + producto.name + " - $" + producto.price + "\n";
    }
    return newProdList;
}

function filterProd(productos, filtro){
    prodFilter = productos;
    switch (filtro){
        //Ordeno Alfabetico Ascendente
        case 'alfAsc':
            return prodFilter.sort((a,b)=> {
                if (a.name < b.name) {
                    return -1;
                }
                if (a.name > b.name) {
                    return 1;
                }
                return 0;
            });
        //Ordeno Alfabetico Descendente
        case 'alfDsc':
            return prodFilter.sort((a,b)=> {
                if (a.name > b.name) {
                    return -1;
                }
                if (a.name < b.name) {
                    return 1;
                }
                return 0;
            });
        case 'priceAsc':
            return prodFilter.sort((a,b)=> a.price - b.price);
        case 'priceDsc':
            return prodFilter.sort((a,b)=> b.price - a.price);
        case 'category':
            return prodFilter.sort((a,b)=> a.category - b.category);
        case 'filter':
            let minPrecio = prompt('Ingrese el precio Minimo que desea mostrar.');
            let maxPrecio = prompt('Ingrese el precio Maximo que desea mostrar.');
            return prodFilter.filter(function(prod){
                return (prod.price >= minPrecio) && (prod.price <= maxPrecio);
            });
        default:
            return productos;
    }
}

function menuListadoFiltro(productos){
    let listadoProd = filterProd(productos, 'NaN');
    let listado = listadoProductos(listadoProd);
    let filterMsg = listado + '\na. Para filtrar Alfabeticamente de forma Ascendente\nb. Para filtrar Alfabeticamente de forma Descendente\nc. Para filtrar por Precio de forma Ascendente\nd. Para filtrar por Precio de forma Descendente\ne. Para filtrar por Categoria\nf. Para filtrar por Rango de Precio\nx. Para Borrar los Filtros Aplicados';
    let select = prompt(filterMsg);
    while (select != -1){
        switch (select) {
            case 'a':
                listadoProd = filterProd(listadoProd, 'alfAsc');
                listado = listadoProductos(listadoProd);
                filterMsg = listado + '\na. Para filtrar Alfabeticamente de forma Ascendente\nb. Para filtrar Alfabeticamente de forma Descendente\nc. Para filtrar por Precio de forma Ascendente\nd. Para filtrar por Precio de forma Descendente\ne. Para filtrar por Categoria\nf. Para filtrar por Rango de Precio\nx. Para Borrar los Filtros Aplicados';
                break;
            case 'b':
                listadoProd = filterProd(listadoProd, 'alfDsc');
                listado = listadoProductos(listadoProd);
                filterMsg = listado + '\na. Para filtrar Alfabeticamente de forma Ascendente\nb. Para filtrar Alfabeticamente de forma Descendente\nc. Para filtrar por Precio de forma Ascendente\nd. Para filtrar por Precio de forma Descendente\ne. Para filtrar por Categoria\nf. Para filtrar por Rango de Precio\nx. Para Borrar los Filtros Aplicados';
                break;
            case 'c':
                listadoProd = filterProd(listadoProd, 'priceAsc');
                listado = listadoProductos(listadoProd);
                filterMsg = listado + '\na. Para filtrar Alfabeticamente de forma Ascendente\nb. Para filtrar Alfabeticamente de forma Descendente\nc. Para filtrar por Precio de forma Ascendente\nd. Para filtrar por Precio de forma Descendente\ne. Para filtrar por Categoria\nf. Para filtrar por Rango de Precio\nx. Para Borrar los Filtros Aplicados';
                break;
            case 'd':
                listadoProd = filterProd(listadoProd, 'priceDsc');
                listado = listadoProductos(listadoProd);
                filterMsg = listado + '\na. Para filtrar Alfabeticamente de forma Ascendente\nb. Para filtrar Alfabeticamente de forma Descendente\nc. Para filtrar por Precio de forma Ascendente\nd. Para filtrar por Precio de forma Descendente\ne. Para filtrar por Categoria\nf. Para filtrar por Rango de Precio\nx. Para Borrar los Filtros Aplicados';
                break;
            case 'e':
                listadoProd = filterProd(listadoProd, 'category');
                listado = listadoProductos(listadoProd);
                filterMsg = listado + '\na. Para filtrar Alfabeticamente de forma Ascendente\nb. Para filtrar Alfabeticamente de forma Descendente\nc. Para filtrar por Precio de forma Ascendente\nd. Para filtrar por Precio de forma Descendente\ne. Para filtrar por Categoria\nf. Para filtrar por Rango de Precio\nx. Para Borrar los Filtros Aplicados';
                break;
            case 'f':
                listadoProd = filterProd(listadoProd, 'filter');
                listado = listadoProductos(listadoProd);
                filterMsg = listado + '\na. Para filtrar Alfabeticamente de forma Ascendente\nb. Para filtrar Alfabeticamente de forma Descendente\nc. Para filtrar por Precio de forma Ascendente\nd. Para filtrar por Precio de forma Descendente\ne. Para filtrar por Categoria\nf. Para filtrar por Rango de Precio\nx. Para Borrar los Filtros Aplicados';
                break;
            case 'x':
                listadoProd = filterProd(productos, 'NaN');
                listado = listadoProductos(listadoProd);
                filterMsg = listado + '\na. Para filtrar Alfabeticamente de forma Ascendente\nb. Para filtrar Alfabeticamente de forma Descendente\nc. Para filtrar por Precio de forma Ascendente\nd. Para filtrar por Precio de forma Descendente\ne. Para filtrar por Categoria\nf. Para filtrar por Rango de Precio\nx. Para Borrar los Filtros Aplicados';
                break;
            default:
                if (!isNaN(select) && parseInt(select) < listadoProd.length+1){
                    comprarProductos(listadoProd)
                }
                else
                {
                    alert('Ingrese una opcion Valida.')
                }
                break;
        }
        select = prompt(filterMsg);
    }
}

function menuPrincipal() {
    let menutxt = '\n1. Mostrar el Listado de Productos.\n2. Ver Carrito.\n3. Gestión de Cuenta.\n-1. Para salir de el Programa.';
    let select = prompt(menutxt);
    select = parseInt(select);
    switch (select) {
        case 1:
            menuListadoFiltro(inventario);
            break;
        case 2:
            mostrarCarrito()
            break;
        case 3:
            borrarProductos(carrito)
            break;
        case 4:
            botonPagar()
            break;
        default:
            break;
    }
}

menuPrincipal();
let containerProductos = document.querySelector('.products_container');
let carrito = [];
let total = document.querySelector('.total');
let totalItems = document.querySelector('.numeroItems')
let modal = document.querySelector('.modal')
let btnModal = document.querySelector('.btn_modal')
let shoppingList = document.querySelector('tbody')
let modalMessage = document.querySelector('.modal_message')
let carritoContenedor = document.querySelector('.carrito_contenedor')
let productos = [
  {
    name: 'Jumper Amarillo',
    price: 80,
    imagen: 'assets/dom-hill-nimElTcTNyY-unsplash.jpg',
  },
  {
    name: 'Vestido rojo campana',
    price: 170,
    imagen: 'assets/ussama-azam-5IcEBmSOQq0-unsplash.jpg',
  },
  {
    name: 'Vestido Manga Larga',
    price: 120,
    imagen: 'assets/eugene-chystiakov-0A5hJ0W3Gys-unsplash.jpg',
  },
  {
    name: 'Enterizo',
    price: 70,
    imagen: 'assets/judeus-samson-0UECcInuCR4-unsplash.jpg',
  },
  {
    name: 'Vestido vinotinto',
    price: 150,
    imagen: 'assets/kate-skumen-PJRabkuH3_Q-unsplash.jpg',
  },
  {
    name: 'Vestido Flores colores pasteles',
    price: 150,
    imagen: 'assets/luobulinka-QCOZz4iqU-M-unsplash.jpg',
  },
  {
    name: 'Vestido dos piezas',
    price: 200,
    imagen: 'assets/marcus-santos-T2YjV0b5Ucw-unsplash.jpg',
  },
  {
    name: 'Vestido azul claro',
    price: 90,
    imagen: 'assets/mark-adriane-V7IJzp_ElQc-unsplash.jpg',
  },
  {
    name: 'Vestido flores corto',
    price: 90,
    imagen: 'assets/oleg-ivanov-sg_gRhbYXhc-unsplash.jpg',
  },
]


// ****************************  FUNCIONES  *********************************************
  //funcion genera numero total de cada item;

  function crearObjeto(carrito) {
    
    let objetoCantidad = carrito.reduce((obj,b) => {
      if (obj[b.nombre]) {
        obj[b.nombre]++;
      } else {
        obj[b.nombre] = 1;
      }

      return obj;
    }, {})
    return objetoCantidad;
  }

  //hallar el elemento que contiene el producto en el modal y modificar las cantidades

  function findQuantityContainer(nombreProducto) {

    let itemDescription = document.querySelectorAll('.item_desc-name');

    let box = Array.from(itemDescription).find(item => item.textContent === nombreProducto)
    
    let quantityText = box.parentElement.nextElementSibling.nextElementSibling;

    return quantityText;

  }

  //funcion para crear lista de carrito en el modal

  function crearListaShopping(nombreProducto, precioProducto) {

    const item = document.createElement("tr");

    item.innerHTML = `
      <td class="item_desc_info">
        <img class="img_table" src="./assets/judeus-samson-0UECcInuCR4-unsplash.jpg" alt="">
        <span class="item_desc-name">${nombreProducto}</span>
      </td>
      <td class="item_desc-price">${precioProducto}</td>
      <td class="item_desc-quantity">1</td>
      <td> <span class="item_desc-total">200</span> EUR</td>`

    item.classList.add("item_description");

    shoppingList.appendChild(item);
  }

  //funcion para encontrar el total a pagar por el total de productos y actualizar info en header
  //cada vez que sea llamada

  function actualizarHeader(carrito) {
    let totalHeader = carrito.reduce((a, b) =>  a + parseInt(b.precio), 0)

    total.textContent = totalHeader;
    totalItems.textContent = carrito.length;
  }
  
  // funcion para crear el nodo de card

  function crearCard(productoInfo) {
    const card = document.createElement("article")

    card.innerHTML = `<img class="item_img" src="${productoInfo.imagen}" alt="">
          <p class="item_text">${productoInfo.name}</p>
          <span class="item_price">${productoInfo.price}</span>
          <span>EUR</span>
          <div class="container_button">
            <div class="container_btn-add">
              <button class="button__prepend">
                <img class="button_img btn_minus" src="https://img.icons8.com/ios/50/000000/minus-math.png" />
              </button>
              <span class="button__body">1</span>
              <button class="button__append">
                <img class="button_img btn_plus" src="https://img.icons8.com/ios/50/000000/plus-math.png" />
              </button>
            </div>
            <button class="button button_carrito">
              <span class="btn_carrito">Agregar al carrito</span>
            </button>
          </div>`
    
    card.classList.add( "item" )
    
    return card;
  }

  // funcion para actualizar botones y modal al cargar pagina

  function actualizarBotones(objetoContador ) {
    let textoItems = document.querySelectorAll('.item_text');
    
    let arreglo = Array.from(textoItems).filter(el => {
      return Object.keys(objetoContador).find(e => {
        return el.textContent === e;
      })
    })

    if (arreglo.length > 0) {
      modalMessage.classList.add('not-visible');
      
    } else {
      modalMessage.classList.remove('not-visible');
    }
    
    arreglo.forEach(el => {
      let containerBtns = el.parentElement.querySelector('.container_btn-add');
      let btnCarrito = el.parentElement.querySelector('.button.button_carrito');
      let bodyButton = el.parentElement.querySelector('.button__body');
      
      containerBtns.classList.add('visible')
      btnCarrito.classList.add('not-visible')

      let nombreProducto = el.textContent
      crearListaShopping(nombreProducto, el.nextElementSibling.textContent);
      let elementoCantidadModal = findQuantityContainer(nombreProducto);

      elementoCantidadModal.textContent = objetoContador[nombreProducto];

      bodyButton.textContent = objetoContador[nombreProducto];
    })
    
  }

// ****************************  FRAGMENTO  *********************************************

let fragmento = new DocumentFragment();

productos.forEach(el => fragmento.appendChild(crearCard(el)))

containerProductos.appendChild(fragmento);




// **************************  EVENTOS  ************************************

carritoContenedor.addEventListener('click', () => {
  modal.classList.add('visible');
})

btnModal.addEventListener('click', () => {
  modal.classList.remove('visible');
})


document.addEventListener('DOMContentLoaded', () => {
  
  if (localStorage.getItem('carrito') === null) localStorage.setItem('carrito', carrito)
  
  if (localStorage.getItem('carrito').length > 0) {
    carrito = JSON.parse(localStorage.getItem('carrito'))
  }

  let items = document.querySelectorAll('.item');
  let objetoContador = crearObjeto(carrito);
  
  
  actualizarBotones(objetoContador);

  actualizarHeader(carrito);

  items.forEach(el => {

    el.addEventListener('click', e => {

      let containerBtns = el.querySelector('.container_btn-add');
      let btnCarrito = el.querySelector('.button.button_carrito');
      let bodyButton = el.querySelector('.button__body');


      let nombreProducto = el.querySelector('.item_text').textContent;
      let precioProducto = el.querySelector('.item_price').textContent;

      let productoSelec = {
          nombre: nombreProducto,
          precio: precioProducto,
      }

      if (e.target.matches('.btn_carrito')) {
        
        
        containerBtns.classList.add('visible')
        btnCarrito.classList.add('not-visible')
        carrito.push(productoSelec);

        crearListaShopping(nombreProducto, precioProducto);
        modalMessage.classList.add('not-visible');

        actualizarHeader(carrito)

        localStorage.setItem('carrito', JSON.stringify(carrito))
      }

      if (e.target.matches('.btn_plus')) {

        carrito.push(productoSelec);

        let objetoContador =  crearObjeto(carrito);
        bodyButton.textContent = objetoContador[nombreProducto];
        
        let elementoCantidadModal = findQuantityContainer(nombreProducto);

        elementoCantidadModal.textContent = objetoContador[nombreProducto];
        
        actualizarHeader(carrito)

        localStorage.setItem('carrito', JSON.stringify(carrito));
      }

      if (e.target.matches('.btn_minus')) {

        let indexProducto = carrito.findIndex(el => el.nombre === nombreProducto);
        carrito.splice(indexProducto, 1);
        let objetoContador =  crearObjeto(carrito);
        bodyButton.textContent = objetoContador[nombreProducto]

        let totalDelItem = carrito.filter(el => el.nombre === nombreProducto).length;

        let elementoCantidadModal = findQuantityContainer(nombreProducto);

        elementoCantidadModal.textContent = objetoContador[nombreProducto];

        if (totalDelItem < 1) {
          containerBtns.classList.remove('visible');
          btnCarrito.classList.remove('not-visible');
          bodyButton.textContent = 1;
          elementoCantidadModal.parentElement.remove();
        }

        if (carrito.length === 0) {
          modalMessage.classList.remove('not-visible');
        }
        actualizarHeader(carrito)

        localStorage.setItem('carrito', JSON.stringify(carrito))
      }
    })
  })
  

})


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
    id: 1,
  },
  {
    name: 'Vestido rojo campana',
    price: 170,
    imagen: 'assets/ussama-azam-5IcEBmSOQq0-unsplash.jpg',
    id: 2,
  },
  {
    name: 'Vestido Manga Larga',
    price: 120,
    imagen: 'assets/eugene-chystiakov-0A5hJ0W3Gys-unsplash.jpg',
    id: 3,
  },
  {
    name: 'Enterizo',
    price: 70,
    imagen: 'assets/judeus-samson-0UECcInuCR4-unsplash.jpg',
    id: 4,
  },
  {
    name: 'Vestido vinotinto',
    price: 150,
    imagen: 'assets/kate-skumen-PJRabkuH3_Q-unsplash.jpg',
    id: 5,
  },
  {
    name: 'Vestido Flores colores pasteles',
    price: 150,
    imagen: 'assets/luobulinka-QCOZz4iqU-M-unsplash.jpg',
    id: 6,
  },
  {
    name: 'Vestido dos piezas',
    price: 200,
    imagen: 'assets/marcus-santos-T2YjV0b5Ucw-unsplash.jpg',
    id: 7,
  },
  {
    name: 'Vestido azul claro',
    price: 90,
    imagen: 'assets/mark-adriane-V7IJzp_ElQc-unsplash.jpg',
    id: 8,
  },
  {
    name: 'Vestido flores corto',
    price: 90,
    imagen: 'assets/oleg-ivanov-sg_gRhbYXhc-unsplash.jpg',
    id: 9,
  },
]

function crearCard(productoInfo) {
  const card = document.createElement("article")

  card.innerHTML = `<img class="item_img" src="${productoInfo.imagen}" alt="">
        <p class="item_text ${productoInfo.name}">${productoInfo.name}</p>
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



let fragmento = new DocumentFragment();

productos.forEach(el => fragmento.appendChild(crearCard(el)))

containerProductos.appendChild(fragmento);

let items = document.querySelectorAll('.item');

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

function findQuantityContainer(nombreProducto) {

  let itemDescription = document.querySelectorAll('.item_desc-name');


  let test = Array.from(itemDescription).find(item => {
    return item.textContent === nombreProducto;
  })
  
  let quantityText = test.parentElement.nextElementSibling.nextElementSibling;

  return quantityText;

}



//recorrer cada uno de los elementos para asociar respectivos componentes

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
    }

    if (e.target.matches('.btn_plus')) {

      carrito.push(productoSelec);

      let objetoContador =  crearObjeto(carrito);
      bodyButton.textContent = objetoContador[nombreProducto];
      
      let test = findQuantityContainer(nombreProducto);

      test.textContent = objetoContador[nombreProducto];
      
      
    }

    if (e.target.matches('.btn_minus')) {

      let indexProducto = carrito.findIndex(el => el.nombre === nombreProducto);
      carrito.splice(indexProducto, 1);
      let objetoContador =  crearObjeto(carrito);
      bodyButton.textContent = objetoContador[nombreProducto]

      let totalDelItem = carrito.filter(el => el.nombre === nombreProducto).length;

      let test = findQuantityContainer(nombreProducto);

      test.textContent = objetoContador[nombreProducto];

      if (totalDelItem < 1) {
        containerBtns.classList.remove('visible');
        btnCarrito.classList.remove('not-visible');
        bodyButton.textContent = 1;
        test.parentElement.remove();
      }

      if (carrito.length === 0) {
        modalMessage.classList.remove('not-visible');
      }
    }
    
    let totalHeader = carrito.reduce((a, b) => {
      return a + parseInt(b.precio);
    }, 0)

    total.textContent = totalHeader;
    totalItems.textContent = carrito.length
  })
})

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

carritoContenedor.addEventListener('click', () => {
  modal.classList.add('visible');
})

btnModal.addEventListener('click', () => {
  modal.classList.remove('visible');
})


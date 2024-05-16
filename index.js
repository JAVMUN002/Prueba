const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    if (containerCartProducts.classList.contains('hidden-cart')) {
        containerCartProducts.classList.remove('hidden-cart');
    } else {
        containerCartProducts.classList.add('hidden-cart');
    }
});

const cartInfo = document.querySelector('.cart-product');
const rowProduct = document.querySelector('.row-product');

const productList = document.querySelector('.container-items');
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const countProdcts = document.querySelector('#contador-productos');

productList.addEventListener('click', e => {
    if (e.target.classList.contains('btn-add-cart')) {
        const product = e.target.parentElement;
        const infoProduct = {
            quantity: 1,
            title: product.querySelector('h2').textContent,
            price: parseFloat(product.querySelector('p').textContent.slice(1)),
        };

        const exists = allProducts.some(item => item.title === infoProduct.title);

        if (exists) {
            allProducts = allProducts.map(product => {
                if (product.title === infoProduct.title) {
                    product.quantity++;
                    return product;
                } else {
                    return product;
                }
            });
        } else {
            allProducts = [...allProducts, infoProduct];
        }

        showHTML();
    }
});

rowProduct.addEventListener('click', (e) =>{
    if(e.target.classList.contains('icon-close')){
        const product = e.target.parentElement;
        const title = product.querySelector('.titulo-producto-carrito').textContent;

        allProducts = allProducts.filter(product => product.title !== title);

        showHTML();
    }
});

const showHTML = () => {
    if(allProducts.length){
        rowProduct.innerHTML = ''; 

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
            <div class="info-cart-product">
                <span class="cantidad-producto-carrito">${product.quantity}</span>
                <p class="titulo-producto-carrito">${product.title}</p>
                <span class="precio-producto-carrito">$${product.price.toFixed(2)}</span> <!-- Mostrar precio formateado -->
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>`;

            rowProduct.append(containerProduct);

            total += product.quantity * product.price; 
            totalOfProducts += product.quantity;
        });

        valorTotal.innerHTML = `$${total.toFixed(2)}`;
        countProdcts.innerHTML = totalOfProducts;
    } else {
        containerCartProducts.innerHTML = `<p class="cart-empty">El carrito está vacío</p>`;
    }
};

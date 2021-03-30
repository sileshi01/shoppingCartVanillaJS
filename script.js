
const productList = document.querySelector('.shop-items');


console.log('script1')
if(document.readyState == 'loading'){
document.addEventListener('DOMContentLoad',ready)
}
else{
ready()
}


function ready(){

    var removeCartItemButtons= document.getElementsByClassName('btn-danger')
    console.log(removeCartItemButtons.length);
    console.log(removeCartItemButtons)
    for( i=0 ; i < removeCartItemButtons.length ; i++){
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity-input')
    for ( var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i]
        input.addEventListener('change', quantityChanged)
    }

    productList.addEventListener('click', addToCartButton);
    console.log(productList)
 
       document.getElementsByClassName('btn-purchase')[0].addEventListener('click', purchaseClicked)
    
}



function addToCartButton(e){
    if(e.target.classList.contains('shop-item-button')){
        let product = e.target.parentElement.parentElement;
        getProductInfo(product);
    }
}

function getProductInfo(product){
    let productInfo = {
        id: product.querySelector('.shop-item-id').textContent,
        image: product.querySelector('.shop-item-image').src,
        title: product.querySelector('.shop-item-title').textContent,
        price: product.querySelector('.shop-item-price').textContent
    }
    addToCartList(productInfo);
   // addToCartClicked()
   
}
function addToCartList(product){
    const cartRow = document.createElement('div');
    cartRow.classList.add('cart-row');
    var cartItems = document.getElementsByClassName('cart-items')[0]
    console.log(cartItems)
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    console.log(cartItemNames.length)
    if(cartItemNames.length==0)
    {
        alert('welcome, Now officay you add item to the cart!')  
    }
    else{
        for (var i = 0; i < cartItemNames.length; i++) {
            if (cartItemNames[i].textContent == product.title) {
                alert('This item is already added to the cart')
                return
            }
        }
    }
   
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${product.image}" width="100" height="100">
            <span class="cart-item-title">${product.title}</span>
        </div>
        <span class="cart-price cart-column">${product.price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    updateCartTotal()
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}
    

function updateCartTotal(){
    
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
   // console.log(cartItemContainer)
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total=0
     for(var i = 0; i< cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        

        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        
        var price = parseFloat(priceElement.innerText.replace('$', ''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
        console.log(total)
     }
     total = Math.round(total*100)/100
     document.getElementsByClassName('cart-total-price')[0].innerText='$'+total
}
function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}


function addToCartClicked(event) {
   
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src

    addItemToCart(title, price, imageSrc)
    updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert('This item is already added to the cart')
            return
        }
    }
    var cartRowContents = `
        <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>`
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click', removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change', quantityChanged)
}

function purchaseClicked() {
    alert('Thank you for your purchase')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild)
    }
    updateCartTotal()
}

    

var products= []
fetch("https://webacademy.se/fakestore/")
.then(response => response.json())
.then(json => {
   products = json
   renderAllProducts(products)
      })  
.catch(error => alert(error))

    
    
     function renderAllProducts(products){
        products.forEach(element => {renderOneProduct(element)});
        }

    const findDiv = document.querySelector(".shop-items")
    function renderOneProduct(pro){
        const newElement = document.createElement('div')
        newElement.className = 'shop-item'
        newElement.innerHTML = `<span class="shop-item-id">${pro.id}</span>
                                <span class="shop-item-title">${pro.title} </span>
                                <img class="shop-item-image" src="${pro.image}"/>
                                <div class="shop-item-details">
                                
                                <span class="shop-item-price">${pro.price}</span>
                                 <button class="btn btn-primary shop-item-button" type="button">
                                    ADD TO CART</button>
                                  </div>
                             </div>`
         findDiv.append(newElement)                       
    
    
    } 
    
    
    
    
    
    /*  function loadProducts(pro) {
        let htmlSelect = '';
       
        for (let i = 0; i < 10; i++) {
            htmlSelect += `<div class="shop-item">
                           <span class="shop-item-title">${pro[i].title} </span>
                           <img class="shop-item-image" src="${pro[i].image}"/>
                           <div class="shop-item-details">
                           <span class="shop-item-price">${pro[i].price}</span>
                           <button class="btn btn-primary shop-item-button" type="button">
                           ADD TO CART</button>
                           </div>
                           </div>`;
         }
    
         document.getElementById('shop-items').innerHTML = htmlSelect;
      
        }  */
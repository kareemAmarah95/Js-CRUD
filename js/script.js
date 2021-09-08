var nameInp = document.getElementById("productName");
var categoryInp = document.getElementById("productCategory");
var priceInp = document.getElementById("productPrice");
var descInp = document.getElementById("productDescription");
var productContainer = [];
var tbody = document.getElementById("tbody");
var searcInput = document.getElementById('searchInput');
var deleteBtn = document.getElementById('deleteButton');

if(localStorage.getItem("allProducts") == null){
  // user awl mra yft7 el project
  var productContainer = [];

} else {
  var productContainer = JSON.parse(localStorage.getItem("allProducts"));
}

displayProduct();
function addProduct(){
  var product = {
    productName: nameInp.value, 
    productCategory: categoryInp.value, 
    productPrice: priceInp.value, 
    productDescription: descInp.value, 
  };


  productContainer.push(product);
  var x =JSON.stringify(productContainer);
  localStorage.setItem("allProducts", JSON.stringify(productContainer));
  console.log(product);
  console.log(productContainer);
  console.log(x);
  displayProduct();
  clearProduct();
}

function clearProduct(){
  nameInp.value = "";
  categoryInp.value = "";
  priceInp.value = "";
  descInp.value = "";
  
}


function displayProduct(){
 var trs = "";
  for(var i = 0 ; i < productContainer.length;i++){
    trs += `
  <tr>
    <td>${i}</td>
    <td id="letterBgColor">${productContainer[i].productName}</td>
    <td>${productContainer[i].productCategory}</td>
    <td>${productContainer[i].productPrice}</td>
    <td>${productContainer[i].productDescription}</td>
    <td>
      <button class="btn btn-secondary" onclick="updateProduct(${i})">
        <i class="fas fa-edit"></i>
       
      </button>
    </td>
    <td>
      <button class="btn btn-danger" onclick="deleteProduct(${i})">

        <i class="fas fa-trash"></i>
      </button>
    </td>
   
  </tr>

    `;

    tbody.innerHTML = trs;
    const element = document.getElementById("letterBgColor")
    element.innerHTML = element.innerHTML.replace('${i}', '<span style="background-color:yellow">${i}</span>')
  }
}

function searchProduct() {
  var trs = '';

  for (var i = 0; i < productContainer.length; i++) {
    var span = "";
      if (productContainer[i].productName.toLowerCase().includes(searcInput.value.toLowerCase()) == true) {

        for (var k = 0 ; k < productContainer[i].productName.length ; k++){
            if(searcInput.value.toLowerCase().includes(productContainer[i].productName[k])){
                span += `<span class="bg-warning">${productContainer[i].productName[k]}</span>`;
            } else {
                span += productContainer[i].productName[k];
            }
           
        } 

          trs += `<tr> 
          <td>  ${i}  </td> 
          <td id="markProduct">  ${span}  </td> 
          <td>  ${productContainer[i].productCategory}  </td> 
          <td>  ${productContainer[i].productPrice}  </td> 
          <td>  ${productContainer[i].productDescription}  </td> 
          <td> 
          <button class="btn btn-secondary"  onclick="updateProduct(${i})"> 
          <i class="fas fa-edit"></i> 

          </button> 
          </td> 
           <td> 
          <button class="btn btn-danger" onclick="deleteProduct(${i})">  

          <i class="fas fa-trash"></i> 
          </button> 
          </td> 

          </tr>`;
         
        //  highlighter();
      }

     
  }
  tbody.innerHTML = trs;

  var x = searchInput.value ;
 


}

// function highlighter(){
//   var marked = document.getElementById("searchInput").value.trim("");
//   if(marked !== ""){
//     let text = document.getElementById("markProduct").innerHTML ;
//     let re = new RegExp(marked , "g");
//     let newText = text.replace(re, `<mark>${marked}</mark>`); 
//     document.getElementById("text").innerHTML = newText;
//   }
// }


function deleteProduct(i){
  console.log(productContainer);
  
  productContainer.splice(i , 1);
  localStorage.setItem("allProducts", JSON.stringify(productContainer));
  console.log("deleted");
  displayProduct();   
}

function updateProduct(i){
  // console.log(productContainer[i].productName);
  nameInp.value = productContainer[i].productName;
  categoryInp.value = productContainer[i].productCategory;
  priceInp.value = productContainer[i].productPrice;
  descInp.value = productContainer[i].productDescription;
  var update = document.getElementById("updateBtn");
  update.innerHTML = "update product" ;
  document.getElementById("edit").innerHTML = "";
  document.getElementById("edit").innerHTML = `<button class="btn btn-outline-info mt-3" id="updateBtn" onclick="changeProduct(${i})" >update product</button
  >`;
}



function changeProduct(i){
  productContainer[i].productName = nameInp.value ;
  productContainer[i].productCategory = categoryInp.value ;
  productContainer[i].productPrice = priceInp.value ;
  productContainer[i].productDescription = descInp.value ;
  localStorage.setItem("allProducts", JSON.stringify(productContainer));
  displayProduct();
}

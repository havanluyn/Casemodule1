class Product{
    constructor(name,price,size,image,amounts){
        this.name=name;
        this.price=price;
        this.image=image;
        this.size=size;
        this.amounts=amounts;
    }
}
var products=[];
const pdt="produt";
function init() {
    if (localStorage.getItem(pdt)===null){
        products=[
            new Product("NIKE new HD",100,37,"anhshoes/nike.png",12),
            new Product("AIR HUARACHE",220,37,"anhshoes/AIR HUARACHE.png",15),
            new Product("BOTTEGA VENETA",530,37,"anhshoes/BOTTEGAVENETA.png",17),
            new Product("CONVERSE",100,37,"anhshoes/converse.png",19),
            new Product("LAVIN",210,37,"anhshoes/lavin.png",3),
            new Product("New Balance",20,37,"anhshoes/NewBalance.png",6),
            new Product("NIKE AIR HUARACHE",270,37,"anhshoes/NIKEAIRHUARACHE.png",11),
            new Product("SALVATORE",100,37,"anhshoes/SALVATOREFERRAGAMO.png",1),
            new Product("Rider Layers",150,37,"anhshoes/Wild Rider Layers.png",10),
            new Product("Superga",175,37,"anhshoes/Superga.png",11),
            new Product("VALENTINO GARAVANI",1,37,"anhshoes/VALENTINO GARAVANI.png",21),
            new Product("AdidasOriginals",131,37,"anhshoes/AdidasOriginals.png",41)
        ]
        localStorage.setItem(pdt,JSON.stringify(products));
    }
    else{
        products=JSON.parse(localStorage.getItem(pdt));
    } 
}
function renderProduct(product){
    let htmls=product.map(function(prd,index){
        return   ` <div class="formcard">  

    <div class="formcard-img">
        <img src="${prd.image}" alt="">
    </div>
    <div class="formcard-name">
        ${prd.name}
    </div>
    <div class="formcard-price">
        ${prd.price}$
    </div>
    <div class="formcard-body">
        <div class="formcard-color">
            <h3 class="formcard-color-head">Số lượng:</h3>
            <div class="formcard-colors" >${prd.amounts}
            </div>
        </div>
        <div class="formcard-size">
            <h3 class="formcard-color-head">Size</h3>
            <select>
                <option >${prd.size}</option>
                <option>${prd.size +1}</option>
                <option>${prd.size+2}</option>
                <option>${prd.size+3}</option>
                <option>${prd.size+4}</option>
                <option>${prd.size+5}</option>
            </select>
        </div>
    </div>
    <div class="formcard-buy">
        <button> BUY NOW </button>
    </div>
    <div class="formcard-icon">
    <i onclick="addshop(${index})" class="fa-solid fa-cart-shopping"></i>
</div>
    </div>`
    })
    document.querySelector(".product-body").innerHTML=htmls.join("")
}
init();
renderProduct(products);
function renderall() {
    renderProduct(products);
};
function renderbestsell() {
    let productsell=[]
    for(let i=0;i<products.length;i++){
        if(products[i].amounts<10){
            productsell.push(products[i])
        }
    }
    renderProduct(productsell);
};
function timkiem() {
    let keywork = document.getElementById("timkiem").value;
    let result = products.filter(function (pt) {
        return pt.name.toLocaleLowerCase().includes(keywork.toLocaleLowerCase());
    })
    renderProduct(result);
};
var addproduct=[];
function addshop(index){
    let count = 0;
    let name=products[index].name
    for (i = 0; i < addproduct.length; i++) {
        if (addproduct[i].name.toLocaleLowerCase() == name.toLocaleLowerCase()){
            count++;
        }
    }
    if (count == 0) {
        addproduct.push(products[index])
    }
    rendershop(addproduct);
    total(0);
}
function total(index){
let total=0;
let sl=Number(document.getElementById(`sl${index}`).value)
for (i = 0; i < addproduct.length; i++) {
    total=total+Number(addproduct[i].price)
}
total= total+Number(addproduct[index].price*sl-addproduct[index].price)
document.getElementById('total').innerHTML=total+" $";
total=0;
}
function rendershop(product){
    let html=product.map(function(prd,index){
        return   `
            <div class="youcard-products">
                <img style="width:60px" src="${prd.image}" alt="">
                <div>
                    <span>${prd.name}</span>
                    <span>SL: <input oninput="total(${index})" id="sl${index}" type="number" value="1"></span>
                    <span>${prd.price}$</span>
                    <i onclick='del(${index})' class="fa-solid fa-trash"></i>
                </div>
            </div>
           `
    })
    document.querySelector(".yourcard-render").innerHTML=html.join("")
};
function del(index){
    addproduct.splice(index,1);
    rendershop(addproduct);
    total(0);
}


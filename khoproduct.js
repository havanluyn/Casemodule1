class Product {
    constructor(name, price, size, image, amounts) {
        this.name = name;
        this.price = price;
        this.image = image;
        this.size = size;
        this.amounts = amounts;
    }
}
const pdt = "produt";
products = JSON.parse(localStorage.getItem(pdt));

function render(product) {
    let htmls = [];
    for (let i = 0; i < product.length; i++) {
        htmls.push(`<tr >
            <td id='td1_${i}'>${i + 1}</td>
            <td id='td2_${i}'>${product[i].name}</td>
            <td id='td3_${i}'>${product[i].price}$</td>
            <td id='td4_${i}'>${product[i].size}</td>
            <td id='td5_${i}'> <img style="width:50px"src="${product[i].image}" alt=""></td>
            <td id='td6_${i}'>${product[i].amounts}</td>
            <td>
                <div  class="edit">
                <i onclick='edit(${i})' class="fa-solid fa-pen-to-square"></i></div>
                <div  class="remove">
            <i onclick='remove(${i})' class="fa-solid fa-trash"></i></div>
            </td>
        </tr> `)
    }

    return document.querySelector('tbody').innerHTML = htmls.join('');
}
render(products);
function add() {
    let name = document.querySelector('#name').value;
    let price = document.querySelector('#price').value;
    let size = document.querySelector('#size').value;
    let picture = document.querySelector('#picture').value;
    let amount = document.querySelector('#amount').value;
    let product = new Product(name, price, size, picture, amount);
    if (name.trim() == "" || name.trim() == null) {
        alert('Bạn chưa nhập tên sản phẩm');
        return;
    }
    if (price.trim() == "" || price.trim() == null || price.trim() < 1 || price.trim() > 100000) {
        alert('Bạn chưa nhập giá hoặc giá chưa phù hợp');
        return;
    }
    if (picture.trim() == "" || picture.trim() == null) {
        alert('Hãy thêm ảnh cho sản phẩm');
        return;
    }
    if (amount.trim() == "" || amount.trim() == null || amount.trim() < 1) {
        alert('Hãy thêm số lượng sản phẩm');
        return;
    } let count = 0;
    for (i = 0; i < products.length; i++) {
        if (products[i].name.toLocaleLowerCase() == name.toLocaleLowerCase() && products[i].price == price && products[i].size == size) {
            products[i].amounts = Number(products[i].amounts) + Number(amount);
            count++;
        }
    }
    if (count == 0) {
        products.push(product);
    }
    localStorage.setItem(pdt, JSON.stringify(products));
    render(products);
    clearform();
}
function remove(index) {
    let confirmAnswer = confirm("Bạn chắc chắn muốn xóa sản phẩm này?");
    if (confirmAnswer) {
        products.splice(index, 1)
        localStorage.setItem(pdt, JSON.stringify(products));
        render(products);
    }
}
function edit(index) {
    document.querySelector('#hidden').value = index;
    document.querySelector('#name').value = products[index].name;
    document.querySelector("#price").value = products[index].price;
    document.querySelector('#size').value = products[index].size;
    document.querySelector('#picture').value = products[index].image;
    document.querySelector('#amount').value = products[index].amounts;
    document.querySelector(".btn-save").classList.remove("none");
    document.querySelector(".btn-add").classList.add("none");
}
function save() {
    let id = document.querySelector('#hidden').value;
    let name = document.querySelector(`#name`).value;
    let price = document.querySelector(`#price`).value;
    let size = document.querySelector(`#size`).value;
    let image = document.querySelector(`#picture`).value;
    let amount = document.querySelector(`#amount`).value;
    if (name.trim() == "" || name.trim() == null) {
        alert('Bạn chưa nhập tên sản phẩm');
        return;
    }
    if (price.trim() == "" || price.trim() == null || price.trim() < 1 || price.trim() > 100000) {
        alert('Bạn chưa nhập giá hoặc giá chưa phù hợp');
        return;
    }
    if (picture.trim() == "" || picture.trim() == null) {
        alert('Hãy thêm ảnh cho sản phẩm');
        return;
    }
    if (amount.trim() == "" || amount.trim() == null || amount.trim() < 1) {
        alert('Hãy thêm số lượng sản phẩm');
        return;
    }
    product = new Product(name, price, size, image, amount);
    products[id] = product;
    localStorage.setItem(pdt, JSON.stringify(products));
    products = JSON.parse(localStorage.getItem(pdt));
    document.querySelector(".btn-save").classList.add("none");
    document.querySelector(".btn-add").classList.remove("none");
    render(products);
    clearform();
}
function timkiem() {
    let keywork = document.getElementById("timkiem").value;
    let result = products.filter(function (pt) {
        return pt.name.toLocaleLowerCase().includes(keywork.toLocaleLowerCase());
    })
    render(result);
};
function clearform() {
    document.querySelector('#name').value = "";
    document.querySelector("#price").value = "";
    document.querySelector('#size').value = "";
    document.querySelector('#picture').value = "";
    document.querySelector('#amount').value = "";
}
function sortup() {
    function compare(a, b) {
        let comparison = 0;
        if (a.price > b.price) {
            comparison = 1;
        } else if (a.price < b.price) {
            comparison = -1;
        }
        return comparison;
    }
    products.sort(compare);
    render(products);
}
function sortdown() {
    function compare(a, b) {
        let comparison = 0;
        if (a.price < b.price) {
            comparison = 1;
        } else if (a.price > b.price) {
            comparison = -1;
        }
        return comparison;
    }
    products.sort(compare);
    render(products);
}
function dangxuat() {
    let confirmAnswer = confirm("Bạn chắc chắn muốn thoát?");
    if (confirmAnswer) {
        window.location.replace("index.html");
    }
}
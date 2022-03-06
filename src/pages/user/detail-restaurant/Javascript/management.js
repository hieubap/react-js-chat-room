const number_bill = 5;
const number_menu = 5;
var number_bill_max = false;
var number_menu_max = false;
var page_bill = 0;
var page_menu = 0;
var products;

function getDaysOfMonth(year, month) {return new Date(year, month, 0).getDate();}

function run(){
  chart();
  showBill();
  showListMenu();
  btnForm();
  addErrorHtml();
}
function chart() {
  var x = [];
  var y = [];
  var date_now = new Date();
  for (i = 1; i <= getDaysOfMonth(date_now.getFullYear(), date_now.getMonth() + 1); i++) {
    x.push(i + '/' + (date_now.getMonth() + 1));
    y.push(0);
  }

  var chart = document.getElementById('chart').getContext('2d');
  Chart.defaults.global.defaultFontColor = '#000';
  Chart.defaults.global.defaultFontFamily = 'Lato';
  Chart.defaults.global.defaultFontSize = 12;
  console.log('chart');

  fetch(url_bill_dashboard, {
    method: 'get'
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (text) {
        var data = JSON.parse(JSON.stringify(text)).data;
        console.log(data);

        for (i = 0; i < data.length; i++)
            y[data[i].day-1] = data[i].soluong;
        console.log(y);

        var lineChart = new Chart(chart, {
          type: 'bar',
          data: {
            labels: x,
            backgroundColor: "rgba(155,0,0,1)",
            datasets: [{
              fillColor: "rgba(155,0,0,1)",
              borderWidth: "20px",
              backgroundColor: "rgba(155,000,0,1)",
              strokeColor: "rgba(0,155,0,1)",
              data: y
            }]
          },
          options: {
            title: {
              display: true,
              text: 'Số đơn trong tháng',
              fontSize: 25
            },
            legend: {
              display: true,
              position: 'top',
              labels: {
                fontColor: '#000'
              }
            },
            tooltips: {
              enabled: true
            }
          }
        });
      })
    }
  });
}

function showBill(){

  fetch(url_bill,{
    method: 'get',
  }).then(function (response){
    if (response.status === 200)
    {
      console.log('successful');
      response.json().then(function (text){
        var body = JSON.parse(JSON.stringify(text));
        var bills = body.data;
        var list = '<div>';
        for (i = 0;i<bills.length&&i<number_bill;i++){
          if(i+page_bill >= bills.length) {
            number_bill_max = true;
            break;
          }
          var arr = bills[i+page_bill];
          list += `<div class="list_product_order">
              <div style="float: left;margin-left: 20px;"><div style="float: top;font-size: 17px"><b>id</b>: ${arr.id} </div>
              <div style="float: top;font-size: 17px"><b>người đặt</b>: ${arr.user.name} </div>
              <div style="float: top;font-size: 17px"><b>thời gian</b>: ${arr.date} </div>
              </div>
              <div style="float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>tổng tiền</b>: ${convertPrice(arr.total+'')} </div>
              <div style="float: top;font-size: 17px"><b>trạng thái</b>: ${arr.status} </div>
              </div>
              <div>
              <button class="btn btn-default btn-rm" onclick="deleteBill(${arr.id})" style="margin: 30px 20px 0 0">
              <i class="fas fa-trash-alt"></i>
              </button>
              <button class="btn btn-default btn-dt" onclick="changeHidden(${arr.id},0)" style="margin: 30px 5px 0 0">
              <i class="fas fa-eye"></i>
              </button>
              </div>
              </div>
              <div id="bill_id_${arr.id}" style="display: none">`
              ;
          var hiddenDiv = '<div style="font-size: 17px">';
          hiddenDiv += '<div><table>'
              + '<tr>'
              + '<th>stt</th>'
              + '<th>tên</th>'
              + '<th>số lượng</th>'
              + '<th>giá</th>'
              + '</tr>';
          for (j = 0;j<arr.foods.length;j++){
            hiddenDiv += '<tr>'
                + '<th>'+(j+1)+'</th>'
                + '<td>'+arr.foods[j].food.name+'</td>'
                + '<td>'+arr.foods[j].number+'</td>'
                + '<td>'+convertPrice(arr.foods[j].price)+'</td>'
                + '</tr>';
          }
          hiddenDiv+='<tr>'
              + '<th></th>'
              + '<th></th>'
              + '<th> tổng tiền: </th>'
              + '<th>'+arr.total+'</th>'
              + '</tr></table></div></div>';

          list += hiddenDiv+'</div>';
        }
        list += '</div>';
        document.getElementById("list_bill").innerHTML = list;

      });
    }
    else
    {
      console.log('unsuccessful: ' + response.status);
    }
  })
}

function changeHidden(id,type) {
  
  var x = (type==0)?document.getElementById("bill_id_"+id)
  :document.getElementById("product_id_"+id);

  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function showListMenu(){
  fetch(url_menu,{
    method: 'get',
  }).then(function (response) {
    if (response.status === 200) {
      response.json().then(function (text){
        var body = JSON.parse(JSON.stringify(text));
        var arr = body.data;
        products = arr;

        var list = '<div>';
        for (i = 0;i<arr.length&&i<number_bill;i++){
          if(i+page_menu >= arr.length) {
            number_menu_max = true;
            break;
          }
          var product = arr[i+page_menu];
          list += `<div class="list_product_order">
              <img src="images/food${i+1}.jpg" class="image">
              <div style="width:25%;float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>id</b>: ${arr[i+page_menu].id} </div>
              </div>
              <div style="float: left;margin-left: 20px"><div style="float: top;font-size: 17px"><b>tên</b>: ${arr[i+page_menu].name} </div>
              <div style="float: top;font-size: 17px"><b>giá</b>: ${convertPrice(product.newPrice)} </div>
              </div>
              <div><button class="btn btn-default btn-rm" onclick="changeHidden(${product.id},1);" style="content:f2ed;margin: 30px 20px 0 0">
              <i class="fas fa-trash-alt"></i>
              </button>
              <button class="btn btn-default btn-ud" onclick="update(${product.id})" style="margin: 30px 5px 0 0">
              <i class="fas fa-edit"></i>
              </button>
              <button class="btn btn-default btn-dt" onclick="changeHidden(${product.id},1)" style="margin: 30px 5px 0 0">
              <i class="fas fa-eye"></i>
              </button>
              </div></div>
              <div id="product_id_${product.id}" style="display: none">
              <div style="font-size: 17px"><div><table>
              <tr>
              <th>tiêu đề</th>
              <td>${product.title}</td>
              </tr>
              <tr>
              <th>tên</th>
              <td>${product.name}</td>
              </tr>
              <tr>
              <th>số sao</th>
              <td>${product.star}</td>
              </tr>
              <tr>
              <th>đánh giá</th>
              <td>${product.numberComment}</td>
              </tr>
              <tr>
              <th>đã bán</th>
              <td>${product.numberSell}</td>
              </tr>
              <tr>
              <th>số lượng</th>
              <td>${product.NUMBER}</td>
              </tr>
              <tr>
              <th>giá mới</th>
              <td>${convertPrice(product.newPrice)}</td>
              </tr>
              <tr>
              <th>giá cũ</th>
              <td>${convertPrice(product.oldPrice)}</td>
              </tr>
              <tr>
              <th>loại</th>
              <td>${product.type}</td>
              </tr>
              <tr>
              <th>màu sắc</th>
              <td>${product.color}</td>
              </tr>
              <tr>
              <th>nhãn hiệu</th>
              <td>${product.tradeMark}</td>
              </tr>
              <tr>
              <th>xuất xứ</th>
              <td>${product.manufactureCountry}</td>
              </tr>
              <tr>
              <th>thể tích</th>
              <td>${product.volumn}</td>
              </tr>
              <tr>
              <th>khối lượng</th>
              <td>${product.mass}</td>
              </tr>
              <tr>
              <th>chi tiết</th>
              <td>${product.detail}</td>
              </tr>
              <tr>
              <th>nhà phân phối</th>
              <td>${product.distributor}</td>
              </tr>
              <tr>
              <th>ngày tạo</th>
              <td>${product.createdDate}</td>
              </tr>
              <tr>
              <th>ngày cập nhật</th>
              <td>${product.updatedDate}</td>
              </tr>
              </table></div></div></div>`;
        }
        list += '</div>';
        document.getElementById("list_menu").innerHTML = list;

      })
    }
  });
}

function goMenuR(){
  if(!number_menu_max){
  page_menu+=number_menu;
  document.getElementById('menu_page').innerText = parseInt(page_menu/number_menu)+1;
  showListMenu();
  }
}
function goMenuL(){
  if (page_menu>0)
  {
    number_menu_max = false;
    page_menu-=number_menu;
    document.getElementById('menu_page').innerText = parseInt(page_menu/number_menu)+1;
  }
  showListMenu();
}

function goBillR(){
  if(!number_bill_max){
  page_bill+=number_bill;
  document.getElementById('bill_page').innerText = parseInt(page_bill/number_bill)+1;
  showBill();
  }
}
function goBillL(){
  if (page_bill>0)
    {
      number_menu_max = false;
      page_bill-=number_bill;
      document.getElementById('bill_page').innerText = parseInt(page_bill/number_bill)+1;
      showBill();
    }
}

function deleteMenu(id){
  fetch(url_menu_delete+id,{
    method: 'delete',
  }).then(function (response) {
    if (response.status === 200){
      showListMenu();
    }
  });
}

function deleteBill(id){
  fetch(url_bill_delete+id,{
    method: 'delete',
  }).then(function (response) {
    if (response.status === 200){
      showBill();
    }
  });
  showBill();
}

function addHandleForm(){
  let createBtn = document.getElementById('create_btn'); // get element of register item
  let createForm = document.getElementById('create-product-form'); // get element of login form

  // switch to login form
  createBtn.onclick = () => {
    console.log('create product');
      // Validator('#login-form', '.auth-form__group', 3);
      changeForms(createForm);
  }
}

function btnForm(){
  let inpEls = document.getElementsByClassName('create_input');

  document.getElementById('create_btn2').addEventListener('click',function(e){
    submitC = true;
    for (let inpEl of inpEls) {
      if (!inpEl.value) {
        let childEl = inpEl.parentElement.childNodes[5];
        childEl.style.display = 'block';
        inpEl.style = 'border-color:red';
        submitC = false;
      }
      else {
        inpEl.style = 'color: black; font-size: 0.95rem';
        inpEl.style = `border-color: black`;
        let childEl = inpEl.parentElement.childNodes[5];
        childEl.style.display = 'none';
      }
    }
    if(submitC)
    callApiCreate();
  });
  document.getElementById('cancel_btn').addEventListener('click',function(e){
    let inpEls = document.getElementsByClassName('create_input');
    for (let inpEl of inpEls) {
        inpEl.value = '';
        inpEl.style = 'border-color: black;color: black; font-size: 1.1rem';
        let childEl = inpEl.parentElement.childNodes[5];
        childEl.style.display = 'none';
    }
  });
  document.getElementById('back_btn').addEventListener('click',function(e){
    let modalLayer = document.querySelector('.modal');
    modalLayer.style.display = 'none';
  });
  document.getElementById('update-back_btn').addEventListener('click',function(e){
    let modalLayer = document.querySelector('.modal');
    modalLayer.style.display = 'none';
  });
  document.getElementById('update-cancel_btn').addEventListener('click',function(e){
    update(idProductU);
  });
  document.getElementById('update-btn').addEventListener('click',function(e){
    submitU = true;
    callApiUpdate();
  });
}

var idProductU = -1;
var submitU = false;
var submitC = false;

function addErrorHtml(){
  let formEl = document.querySelector('#create-product-form');
  let formU = document.querySelector('#update-product-form');
  let inpEls = document.getElementsByClassName('create_input');
  console.log(inpEls.length);
  
  formEl.onsubmit = (e) => {
    // if(!submitC)
    e.preventDefault();
  }
  formU.onsubmit = (e) => {
    if(!submitU)
    e.preventDefault();

  }
  
  console.log('add error span to all input');
  for (let inpEl of inpEls) {
    let childEl = inpEl.parentElement.appendChild(document.createElement('span'));
    childEl.setAttribute('class','error_span');
    childEl.innerText = 'Vui lòng nhập trường này';
    childEl.setAttribute('style','display:none;margin-bottom:-18px;color:red;text-align:right;padding-right:20%')
  }
}

function getProductById(id){
  for(i=0;i<products.length;i++)
  if(products[i].id == id) return products[i];
}
function update(id){
  if(id == -1) return;
  idProductU = id;
  console.log('update');
  let product = getProductById(id);
  changeForms(document.getElementById('update-product-form'));
  let inpEls = document.getElementsByClassName('update_input');
  
  inpEls[0].value = product.title;
  inpEls[1].value = product.name;
  inpEls[2].value = product.oldPrice;
  inpEls[3].value = product.newPrice;
  inpEls[4].value = product.img;
  inpEls[5].value = product.number;
  inpEls[6].value = product.detail;
  inpEls[7].value = product.type;
  inpEls[8].value = product.color;
  inpEls[9].value = product.tradeMark;
  inpEls[10].value = product.manufactureCountry;
  inpEls[11].value = product.distributor;
  inpEls[12].value = product.volumn;
  inpEls[13].value = product.mass;
  
  console.log(product);
}

function callApiUpdate(){
  let inpEls = document.getElementsByClassName('update_input');
  let oldP = getProductById(idProductU);
  var updateP = `{
    "id": ${idProductU},
    "title": "${inpEls[0].value}",
    "name": "${inpEls[1].value}",
    "star": ${oldP.star},
    "numberComment": ${oldP.numberComment},
    "numberSell": ${oldP.numberSell},
    "number": ${inpEls[5].value},
    "oldPrice": ${inpEls[2].value},
    "newPrice": ${inpEls[3].value},
    "type": "${inpEls[7].value}",
    "color": "${inpEls[8].value}",
    "tradeMark": "${inpEls[9].value}",
    "manufactureCountry": "${inpEls[10].value}",
    "volume": "${inpEls[12].value}",
    "mass": "${inpEls[13].value}",
    "detail": "${inpEls[6].value}",
    "img": "${inpEls[4].value}",
    "distributor": "${inpEls[11].value}",
    "createdDate": "${oldP.createdDate}"
}`;
fetch(url_product_update+idProductU, {
  method: 'put',
  headers:{'content-type':'application/json'},
  body: updateP
}).then(function (response) {
  if (response.status === 200) {
    response.json().then(function (text) {
      var data = JSON.parse(JSON.stringify(text)).data;
      console.log(data);
    })
  }});
}

function callApiCreate(){
  let inpEls = document.getElementsByClassName('create_input');
  var createP = `{
    "title": "${inpEls[0].value}",
    "name": "${inpEls[1].value}",
    "star": 0,
    "numberComment": 0,
    "numberSell": 0,
    "number": ${inpEls[5].value},
    "oldPrice": ${inpEls[2].value},
    "newPrice": ${inpEls[3].value},
    "type": "${inpEls[7].value}",
    "color": "${inpEls[8].value}",
    "tradeMark": "${inpEls[9].value}",
    "manufactureCountry": "${inpEls[10].value}",
    "volume": ${inpEls[12].value},
    "mass": ${inpEls[13].value},
    "detail": "${inpEls[6].value}",
    "img": "${inpEls[4].value}",
    "distributor": "${inpEls[11].value}"
}`;
fetch(url_product_create, {
  method: 'post',
  headers:{'content-type':'application/json'},
  body: createP
}).then(function (response) {
  if (response.status === 200) {
    response.json().then(function (text) {
      var data = JSON.parse(JSON.stringify(text)).data;
      console.log(data);
    })
  }});
}
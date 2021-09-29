shop1 = ['soybeans', 'black mustard', 'barley', 'oats', 'Pan sauce', 'Salsa', 'White Sauce', 'Sofrito', 'Sour cream sauce', 'Steak sauce', 'Wine sauce', 'Worcestershire sauce', 'Soy sauce', 'artichoke', 'asparagus', 'lentils', 'broad beans', 'chickpeas', 'pinto beans', 'runner beans', 'split peas', 'broccoli', 'brussels sprouts', 'red cabbage', 'cauliflower', 'celery', 'fennel', 'bok choy', 'collard greens', 'anise', 'basil', 'coriander', 'daikon', 'oregano', 'rosemary', 'lettuce', 'mushrooms', 'okra', 'garlic', 'scallion', 'tabasco pepper', 'cayenne pepper', 'beetroot', 'carrot', 'ginger', 'parsnip', 'radish', 'potato', 'spinach', 'skirret', 'tomato ']
shop2 = ['soybeans', 'oats', 'Salsa', 'Sofrito', 'Tomato sauce', 'Wine sauce', 'eggplant', 'asparagus', 'lentils', 'black beans', 'peas', 'cauliflower', 'collard greens', 'oregano', 'sage', 'mushrooms', 'garlic', 'scallion', 'bell pepper', 'habanero', 'beetroot', 'horseradish', 'artichoke', 'broccoli ']
shop3 = ['black mustard', 'barley', 'wheat', 'sorghum', 'Pan sauce', 'Peppercorn sauce', 'Salad dressing', 'White Sauce', 'Sofrito', 'Sour cream sauce', 'Sweet chili sauce', 'Tomato sauce', 'Vinaigrette', 'Soy sauce', 'artichoke', 'eggplant', 'lentils', 'black beans', 'broad beans', 'green beans', 'pinto beans', 'runner beans', 'split peas', 'peas', 'broccoli', 'brussels sprouts', 'red cabbage', 'cauliflower', 'fennel', 'greens', 'bok choy', 'collard greens', 'mustard greens', 'anise', 'basil', 'coriander', 'fennel', 'lavender', 'oregano', 'parsley', 'rosemary', 'sage', 'thyme', 'okra', 'onions', 'garlic', 'leek', 'onion', 'shallot', 'scallion', 'bell pepper', 'chili pepper', 'paprika', 'tabasco pepper', 'cayenne pepper', 'ginger', 'parsnip', 'horseradish', 'potato', 'sweet potato', 'turnip', 'broccoli ', 'spinach', 'Brussels sprouts', 'skirret', 'sweetcorn ', 'cucumber', 'carrot']

let url='http://127.0.0.1:5000/';
let intersections = {}

function getRequest(subUrl, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url+subUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var JSON_received = JSON.parse(this.responseText);
            callback(JSON_received)
        }
    };
    xhr.send(JSON.stringify(data));

}

function postRequest(subUrl, data, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url+subUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var JSON_received = JSON.parse(this.responseText);
            callback(JSON_received['data']);
        }
    };
    xhr.send(JSON.stringify(data));
}

function putRequest(subUrl, data, callback){
    var xhr = new XMLHttpRequest();
    xhr.open('PUT', url+subUrl);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var JSON_received = JSON.parse(this.responseText);
            callback(JSON_received)
        }
    };
    xhr.send(JSON.stringify(data));
}

let lists = {

}

class List {
    constructor(name) {
        this.ingredients = [];
        this.list_id = null;
        this.list_name = name;

        this.add = this.add.bind(this);
        this.remove = this.remove.bind(this);
        this.set_id = this.set_id.bind(this);
    }

    add(ingredient) {
        if (this.ingredients.indexOf(ingredient) < 0) {
            this.ingredients.push(ingredient)
        }
        
        if (this.list_id == null) {
            let request_obj = {}
            request_obj['name'] = this.list_name;
            request_obj['ingredients'] = this.ingredients;
            postRequest('list', request_obj, this.set_id);
        }
        else {
            let request_obj = {}
            request_obj['name'] = this.list_name;
            request_obj['ingredients'] = this.ingredients;
            request_obj['list_id'] = this.list_id;
            putRequest('list', request_obj, ()=>{}); 
        }
    }

    remove(ingredient) {
        let index = this.ingredients.indexOf("red");
        if (index >= 0) {
            this.ingredients.splice( index, 1 );
        }
            
        let request_obj = {}
        request_obj['name'] = this.list_name;
        request_obj['ingredients'] = this.ingredients;
        request_obj['list_id'] = this.list_id;
        putRequest('list', request_obj, this.set_id);
    }

    reset(ingredient) {
        this.ingredients = [];

        let request_obj = {}
        request_obj['name'] = this.list_name;
        request_obj['ingredients'] = this.ingredients;
        putRequest('list', request_obj, this.set_id);
    }

    set_id(id){
        this.list_id = id;
        filterShops();
    }
}

function setCurrentList(name){
    current_list = lists[name];
}

function createList(name){
    return {
        ingredients: [],
        list_id: null,
        list_name: name,
        add: function (ingredient) {
            if (this.ingredients.indexOf(ingredient) < 0) {
                this.ingredients.push(ingredient)
            }
            
            if (this.list_id == null) {
                let request_obj = {}
                request_obj['name'] = this.list_name;
                request_obj['ingredients'] = this.ingredients;
                postRequest('list', request_obj, this.set_id);
            }
            else {
                let request_obj = {}
                request_obj['name'] = this.list_name;
                request_obj['ingredients'] = this.ingredients;
                putRequest('list', request_obj, this.set_id); 
            }
        },
        remove: function (ingredient) {
            let index = arr.indexOf("red");
            if (index >= 0) {
                arr.splice( index, 1 );
            }
            
            let request_obj = {}
            request_obj['name'] = this.list_name;
            request_obj['ingredients'] = this.ingredients;
            putRequest('list', request_obj, this.set_id); 
        },
        set_id: function (id) {
            this.list_id = id;
        }
    }
}

let current_list = null;

savedLists = [];
var buttonNum = 1;

ingredients = [];

window.onload = () => {   
    
    function setAutocorrect(query) {
        data = query['data']
        let autocomplete = document.getElementById("searchAuto");
        var options = "";
    
        for (i in data) 
            options += '<option value="' + data[i]['ingredient_name'] + '" />';
        autocomplete.innerHTML = options;
    }

    getRequest('/ingredient', [], setAutocorrect)
}

function filterShopsCallback(data){
    let shops = document.getElementById('shops');
    if (data.length == 0){
        let heading = document.createElement('h2');
        heading.setAttribute('id', 'empty');
        shops.appendChild(heading);
    }
    else{
        for (i in data){
            let shop = document.createElement('div');
            shop.className = 'row-container';

            let shop_name = document.createElement('h3');
            shop_name.innerText = data[i]['name'];

            let shop_address = document.createElement('h5');
            shop_address.innerText = data[i]['address'];

            shop.appendChild(shop_name);
            shop.appendChild(shop_address);
            shops.appendChild(shop);
            console.log(shops, shop)
        }
    }
}


function filterShops(){

    if (current_list.list_id != null){
        let shopList = document.getElementById('shops');
        while (shopList.firstChild) {
            shopList.removeChild(shopList.firstChild);
        }

        let request_obj = {}
        request_obj['list_id'] = current_list.list_id;
        postRequest('shops/intersection', request_obj, filterShopsCallback);
    }

    /*
    let empty = document.getElementById("empty");

    let shops = [
        [document.getElementById("shop1"), shop1],
        [document.getElementById("shop2"), shop2],
        [document.getElementById("shop3"), shop3],    
    ]

    let min = Number.MAX_VALUE;
    let finalCoords = new Set();

    for (let i = 0; i < 3; i ++){
        for (let j = 0; j < 3; j ++){
            let coords = new Set();
            coords.add(i); coords.add(j);

            let filter1 = ingredients.filter(value => shops[i][1].includes(value));
            let filter2 = [];
            if (i != j) filter2 = ingredients.filter(value => shops[j][1].includes(value));

            let union = new Set([...filter1, ...filter2]);
            if (union.size == ingredients.length){
                if (min > coords.size){
                    finalCoords.clear();
                    min = coords.size;
                    finalCoords = new Set([i, j]);
                }
            }
        }
    }

    let filter1 = ingredients.filter(value => shops[0][1].includes(value));
    let filter2 = ingredients.filter(value => shops[1][1].includes(value));
    let filter3 = ingredients.filter(value => shops[2][1].includes(value));


    let union = new Set([...filter1, ...filter2, ...filter3]);
    if (union.size == ingredients.length){
        if (min > 3){
            finalCoords.clear();
            finalCoords = new Set([0, 1, 2]);
        }
        empty.style.display = "none";
    }
    else {
        empty.style.display = "";
    }

    finalCoords = Array.from(finalCoords);
    for (let i = 0; i < 3; i++){
        shops[i][0].style.display = "none";
    }
    for (i in finalCoords){
        shops[finalCoords[i]][0].style.display = "";
    }
    */
}

// Adds item searched to ingredients section along with a delete button
function putValue() {
    // body...
    var save = document.getElementById("save");
    var reset = document.getElementById("reset");
    if (reset.style.display == "none") {
        ;
    }
    var newLi = document.createElement("li");
    var box = document.getElementById("ingredients").getElementsByTagName("ul")[0];	
    var title = document.getElementById("ingredients").getElementsByTagName("h2")[0];
    title.innerHTML = "Ingredients";
    var deleteItem = document.createElement("button");
    var itemName = document.createElement("p");
    deleteItem.innerHTML = "❌";
    deleteItem.setAttribute('onclick', "removeItem(this.parentNode, this.parentNode.parentNode)");
    newLi.appendChild(itemName);
    newLi.appendChild(deleteItem);

    let searchValue = document.getElementById("search").value;

    itemName.innerHTML = searchValue;
    newLi.setAttribute('name', searchValue);
    
    if (ingredients.indexOf(document.getElementById("search").value) < 0){
        ingredients.push(document.getElementById("search").value);
        box.appendChild(newLi);
        if (current_list == null) {
            current_list = new List("List "+buttonNum);
        }
        current_list.add(searchValue);
    }
    {
        save.style.display = "inline";
        reset.style.display = "inline";
    }
    document.getElementById("search").value = "";
    document.getElementById("search").focus();

    filterShops();
}


// This function deletes selected item from ingredients list. After deletion it searches for the shops with updated list
function removeItem(li, box) {
    for (var i = ingredients.length - 1; i >= 0; i--) {
        if (ingredients[i] == li.childNodes[0].innerHTML) {
            ingredients[i] = "";
            box.removeChild(li);
            filterShops();
        }
    }
    current_list.remove(li.getAttribute('name'));
}

// This function clears all items in the ingredients list
function clearList() {
    var box = document.getElementById("ingredients").getElementsByTagName("ul")[0];
    while (box.firstChild) {
        box.removeChild(box.lastChild);
    }
    current_list = null;
}

// This function displays the items of a saved list and displays output of the shops
// The items in save list cannot be deleted
function viewList(name) {
    var save = document.getElementById("save");
    var reset = document.getElementById("reset");
    save.style.display = "none";
    reset.style.display = "none";
    var box = document.getElementById("ingredients").getElementsByTagName("ul")[0];
    var title = document.getElementById("ingredients").getElementsByTagName("h2")[0];
    title.innerHTML = "Ingredients in " + name;
    while (box.firstChild) {
        box.removeChild(box.lastChild);
    }
    var newLi;
    list = [];
    var rest = name.split(" ");
    var index = parseInt(rest[1]) - 1;
    list = savedLists[index];
    if (list["length"] == 0) box.appendChild(document.createTextElement("List Has Been Emptied"))
    for (i = 0; i < list["length"]; i++) {
        newLi = document.createElement("li");
        newLi.innerHTML = list[i];
        box.appendChild(newLi);
    }
    filterShops();
}

// This function saves the contents of the ingredients section in a list and creates a button in saved lists to access it
buttonList = [];
function saveList() {
    list = [];
    var ul = document.getElementById("ingredients").getElementsByTagName("ul")[0];
    for (i = 0; i < ul["children"]["length"]; i++) {
        list[i] = ul["children"][i].innerHTML;
    }
    savedLists.push(list);
    var newLi = document.createElement("li");
    var box = document.getElementById("listButtons").getElementsByTagName("ul")[0]; 
    var newButton = document.createElement("button");
    var deleteItem = document.createElement("button");
    newButton.setAttribute('name', current_list.list_name)
    deleteItem.innerHTML = "❌";
    deleteItem.setAttribute('onclick','deleteSavedList(this.parentNode)');
    buttonList.push(newButton);
    buttonList.slice(-1)[0].innerHTML = "List "+buttonNum++;
    buttonList.slice(-1)[0].setAttribute('onclick', "setCurrentList(this.name); viewList(this.innerHTML);");
    newLi.appendChild(buttonList.slice(-1)[0]);
    newLi.appendChild(deleteItem);
    newLi.setAttribute('name', current_list.list_name);
    box.appendChild(newLi);

    temp = {};
    Object.assign(temp, current_list);
    lists[current_list.list_name] = temp;

    clearList();
}

// This function deletes the saved list and its presence in other parts of the program
function deleteSavedList(node) {
    delete lists[node.getAttribute('name')];
    for (var i = buttonList.length - 1; i >= 0; i--) {
        if (buttonList[i].innerHTML == node.childNodes[0].innerHTML) {
            buttonList[i].innerHTML = "-1";
            savedLists[i] = [];
            break;
        }
    }
    node.remove();
}
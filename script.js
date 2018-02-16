$(document).ready(function(){
	//declare variables
	var article, data, i, input;
	//initial loading, read database, display all items
	$.get("baza.txt", function(data, status){
		article = jQuery.parseJSON(data);
		for(i in article) {
			append_article(i);
		}
	});
	//adds article div to document
	function append_article(k) {
		$("#middle").append('<div class="article"><span class="article_description">'+article[k].name+
			'</span><span class="article_price">'+article[k].price+' kn</span><img src="images/'+article[k].url+
			'" class="article_img"></img><button class="article_tocart" id="'+article[k].name+
			'"></button><input type="number" class="article_amount" placeholder="Količina"></input></div>');
	}
	//update cart look
	checkCart();
	//Cookie implementation
	var cart_items = new Object();
	function setCookie(cname,cvalue,exdays) {
		var d = new Date();
		d.setTime(d.getTime() + (exdays*24*60*60*1000));
		var expires = "expires=" + d.toGMTString();
		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	}
	function getCookie(cname) {
		var name = cname + "=";
		var decodedCookie = decodeURIComponent(document.cookie);
		var ca = decodedCookie.split(';');
		for(var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') {
				c = c.substring(1);
			}
			if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
			}
		}
		return "";
	}
	//search by price
	$("#cijena_search_submit").click(function() {
		var from, to;
		from=parseFloat(document.getElementById("cijena_search_od").value);
		to=parseFloat(document.getElementById("cijena_search_do").value);
		if(isNaN(from)||isNaN(to)||(to<from)) {
			alert("Neispravan raspon cijena");
		}
		else {
			$("#middle").html("");
			for(i in article) {
				if(parseFloat(article[i].price)>=from && parseFloat(article[i].price)<=to) append_article(i);
			}
			if($("#middle").html()=="") $("#middle").append("<p class='search_message'>Nijedan artikl ne odgovara kriteriju pretrage</p>");
		}
		
	});
	//search by name
	$("#search_submit").click(function() {
		var search;
		search = document.getElementById("search_input").value;
		if(search=="") {
			$("#middle").html("");
			for(i in article) {
				append_article(i);
			}
		}
		else {
			$("#middle").html("");
			for(i in article) {
				if(article[i].name.search(search)!=-1) append_article(i);
			}
		}
		if($("#middle").html()=="") $("#middle").append("<p class='search_message'>Nijedan artikl ne odgovara kriteriju pretrage</p>");
	});
	//sort by category:
	$("#sve").click(function() {
		$("#middle").html("");
		for (i in article) {
			append_article(i);
		}
	});
	$("#tekucine").click(function() {
		category("tekucine");
	});
	$("#modovi").click(function() {
		category("modovi");
	});
	$("#tankovi").click(function() {
		category("tankovi");
	});
	$("#baterije").click(function() {
		category("baterije");
	});
	$("#zice").click(function() {
		category("zice");
	});
	function category(input) {
		$("#middle").html("");
		for(i in article) {
				if(article[i].category==input) append_article(i);
			}
	};
	//adds items to cart
	function addToCart (artId, artAmount) {
		if(artAmount%1===0&&artAmount>0) {
			JSONcart=getCookie("cart_items");
			if (JSONcart!="") {
				cart_items = jQuery.parseJSON(JSONcart);
			}
			if(cart_items[artId]==undefined) {
				cart_items[artId] = artAmount;
			}
			else {
				cart_items[artId]=parseInt(artAmount)+parseInt(cart_items[artId]);
			}
			var JSONcart = JSON.stringify(cart_items);
			setCookie("cart_items", JSONcart, 5);
			alert("Dodano u kosaricu");
		}
		else {
			alert("Neispravan iznos");
		}
		checkCart();
	};
	//event listener for adding to cart
	$(document.body).on('click', '.article_tocart', function() {
		addToCart(event.target.id, event.target.nextSibling.value);	
	});
	//checks im cart !empty and changes cart icon
	function checkCart(){
		JSONcart=getCookie("cart_items");
		if(JSONcart!=""&&JSONcart!="{}") {
			document.getElementById('kosarica').style.backgroundColor = 'yellow';
		}
		else {
			document.getElementById('kosarica').style.backgroundColor = 'lightgray';
		}
		console.log(getCookie("cart_items"));
	}
});
$(document).ready(function(){
	//read database
	$.get("baza.txt", function(data, status){
			article = jQuery.parseJSON(data);
		//implement cookies
		var cart_items = new Object();
		var JSONcart, sum, article;
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
		
		function render() {
			sum=0.0;
			//read cookie, fill the cart
			JSONcart = getCookie("cart_items");
			cart_items=jQuery.parseJSON(JSONcart);
			$("#middle").html("");
			$("#middle").append('<table><tr><th>Naziv artikla</th><th>Pojedinacna cijena</th><th>Kolicina</th><th>Ukupno</th><th>Ukloni</th></tr><tfoot><tr><td colspan=3>Ukupno: </td><td id="price_sum"></td><td><button id="empty_cart">Isprazni košaricu</button></td></tr></tfoot></table>');
			for (x in cart_items) {
				for (i in article) {
					if ( article[i].name==x) {
						$("table").append('<tr><td>'+x+'</td><td>'+article[i].price+'</td><td>'+cart_items[x]+'</td><td>'+parseFloat(article[i].price*cart_items[x]).toFixed(2)+'</td><td><button class="delete_item" id="'+x+'">X</button></td></tr>');
						sum+=article[i].price*cart_items[x];
					}
				}
			}
			if(sum!=0) $("#price_sum").html(parseFloat(sum).toFixed(2));
		}
		render();
		//deleting single article from cart
		$(document.body).on('click', '.delete_item', function() {
			JSONcart = getCookie("cart_items");
			cart_items=jQuery.parseJSON(JSONcart);
			delete cart_items[event.target.id];
			JSONcart=JSON.stringify(cart_items);
			setCookie("cart_items", JSONcart, 5);
			render();
		});
		//deleting all the articles from cart
		$(document.body).on('click', '#empty_cart', function() {
			JSONcart="{}";
			setCookie("cart_items", JSONcart, 5);
			render();
		});
	});
});
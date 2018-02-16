//appendanje artikla
$("#kosarica").click(function(){
		$("#middle").append('<div class="article"><span class="article_description">'+article.name+'</span><span class="article_price">'+article.price+'</span><img src="images/'+article.url+'" class="article_img"></img><button class="article_tocart"></button></div><input type="number" class="article_amount" placeholder="1" ></input>');
	});

//ciscenje liste artikala
$("#cijena_search_submit").click(function(){
		$("#middle").html("");
	});
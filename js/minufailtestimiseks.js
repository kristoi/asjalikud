$(document).ready(function() {

	function F1() {

		location.reload(true);

		window.open('child.aspx');

	}
 	$.ajax({
  		dataType: 'json',
  		type: 'GET',
  		url: 'json.txt',
  		data: {},
 	}).done(function(data) {
		$.each(data.response.docs, function (i, news) {
			if($('[data-source="'+news.source+'"]').length == 0) {
				var site = $('<div />').addClass('site-container').attr('data-source', news.source);
				$('#row').append(site);
				var sitename = $('<div />').addClass('sitename-style col-md-12').text(news.source)
				$('[data-source="'+news.source+'"]').append(sitename)
			}
			if($('[data-source="'+news.source+'"]').find('.news-container').length < 3) {
			var newsstory = $('<a />').addClass('news-container col-md-3 news-count').attr('href', news.link).text(news.title);
			$('[data-source="'+news.source+'"]').append(newsstory);
			}
		});
		$('.sitename-style').click(function() {
			var target = $(this).closest('.site-container').attr('data-source');
			console.log(target);
			$('#step1').slideUp(500);
			$('#step2').css( 'visibility', 'visible')
			$.ajax({
  				dataType: 'json',
  				type: 'GET',
  				url: 'json.txt',
  				data: {},
 			}).done(function(data) {

 				var site = $('<div />').addClass('site-container2').attr('data-source', target);
				$('#row2').append(site);
				var sitename = $('<div />').addClass('sitename-style col-md-12').text(target);
				$('.site-container2').append(sitename);

				$.each(data.response.docs, function (i, news) {
					var newsstory = $('<a />').addClass('news-container col-md-3 news-count').attr('href', news.link).text(news.title);
					$('[data-source="'+news.source+'"]').append(newsstory);
				})
			})

		})



 	}).fail(function( jqxhr, textStatus, error ) {

  		var err = textStatus + ', ' + error;
  		console.log( 'Request Failed: ' + err );

 	})

});
/*
 	$.ajax({
  		dataType: 'json',
  		type: 'GET',
  		url: 'http://uptsearch.cloudapp.net/solr/rss/select?q=*%3A*&wt=json&indent=true',
  		data: {fl: 'source,link,title', rows: 150 },
 	})

 	$.ajax({
  				dataType: 'json',
  				type: 'GET',
  				url: 'http://uptsearch.cloudapp.net/solr/rss/select?q=*%3A*&wt=json&indent=true',
  				data: {fl: 'source,link,title', rows: 21, fq: target },
 			})
 */
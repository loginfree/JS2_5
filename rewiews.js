function renderNameReview() {
	$('#reviews').append('Имя: <input type="text" id="name">');
	$('#reviews').append('Отзыв: <input type="text" id="message">');
	$('#reviews').append('Одобрение: <input type="text" id="approved">');
	$('#reviews').append($('<button/> ', {class: 'add', text: 'Разместить отзыв'}));
	$('#reviews').append($('<button/> ', {class: 'view', text: 'Посмотреть отзывы'}));
};

function postReview() {
	$(document).ready(function () {
		$('.add').click(function () {
			var name = $('#name').val();
			var message = $('#message').val();
			var approved = $('#approved').val();
			$.ajax({
				url: 'http://localhost:3000/reviews',
				type: 'POST',
				data: 'name=' + name + '&message=' + message + /*'&rate=' + rate +*/ '&approved=' + approved,
				success: function () {
					console.log('response');
				}
			})
		});
	});
}

function renderReviews() {

	$('.view').click(function () {
		$('#list').empty();
		$.ajax({
			url: 'http://localhost:3000/reviews',
			type: 'GET',
			success: function (items) {
				handleReview();
			}
		});
	});
}

function deleteReviews() {
	$('#list').on('click', '.remove',function() {
		var review = $(this).data();
		$.ajax({
			url: 'http://localhost:3000/reviews/' + review.id,
			type: 'DELETE',
			success: function() {
				handleReview();
			}
		})
	});
}

function handleReview() {
	$('#list').empty();
	$.ajax({
		url: 'http://localhost:3000/reviews',
		type: 'GET',
		success: function (items) {
			items.forEach(function (item) {
				var $div = $('<div>', {
					class: 'divred',
					'data-id': item.id,
					'data-name': item.name,
					'data-message': item.message,
					'data-approved': item.approved,
					text: 'Имя: ' + item.name + ' Отзыв: ' + item.message + ' ID: '
						+ item.id + ' Одобрение : ' + item.approved});
				var $button = $('<button>', {	text: 'Удалить отзыв',class: 'reviews-see' + item.id + ' remove',	'data-id': item.id});
				$('#list').append($div);
				$('#list').append($button);

				if (item.approved === '' ){
					console.log($div);
					$div.css("background-color","red");
				}

				var $buttonapr = $('<button>', {text: 'Одобрить отзыв',class: 'redcolorremove','data-approved': item.id});
				$('#list').append($buttonapr);

				/*var a = $('#list .divred[data-id="' + item.id + '"]').data();
				console.log(a);*/

			})
		}
	})
}



(function ($) {
	$(function () {
		renderNameReview();
		postReview();
		renderReviews();
		deleteReviews();
	});
})(jQuery);

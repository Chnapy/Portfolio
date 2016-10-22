
$(document).ready(function () {

	check();

	$(window).scroll(function () {
		check();
	});

	$('#contact form').submit(function (e) {
		e.preventDefault();
		var i = 0;
		$(this).find("textarea").each(function (index, element) {
			if ($(element).val().length === 0) {
				i++;
				$(element).css("border-color", "#DA4453");
			} else {
				$(element).css("border-color", "transparent");
			}
		});

		if (i > 0)
			return;

		$(this).find("input[type='submit']").val("Envoi en cours ...");
		$(this).find("input[type='submit']").attr("disabled", "true");
		$.ajax({
			url: 'mail.php',
			method: 'post',
			data: {
				nom: $("#contact form #nom").val(),
				contacter: $("#contact form #contacter").val(),
				message: $("#contact form #message").val(),
				envoi: 1
			},
			success: function (data, textStatus, jqXHR) {
				$("#contact form input[type='submit']").removeAttr("disabled");
				if (data['success']) {
					$("#contact form input[type='submit']").val("Envoi réussi !");
					$("#contact form input[type='submit']").css("color", "white");
				} else {
					$("#contact form input[type='submit']").val(data['error_msg']);
					$("#contact form input[type='submit']").css("color", "#DA4453");
				}
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$("#contact form input[type='submit']").val("Envoi échoué. Réessayer ?");
				$("#contact form input[type='submit']").removeAttr("disabled");
				$("#contact form input[type='submit']").css("color", "#DA4453");
			}
		});
	});

	$(".image-large").each(function (index, element) {
		$(element).click(function () {
			$('#imagepreview').attr('src', $(element).attr('src'));
			$('#imagemodal').modal('show');
			$('#imagemodal .modal-dialog').css('width', this.naturalWidth + 15 * 2 + "px");
		});
	});
	
	$('[data-toggle="tooltip"]').tooltip();
	
	function check() {
		var top = $(document).scrollTop();
		var height = $(window).height();
		var diff = Math.max(height - top, 36);

		$("header").css('height', diff + 'px');

		if (diff <= 36) {
			$('header').removeClass('top');
			$('#bg_video')[0].pause();
		} else {
			$('header').addClass('top');
			$('#bg_video')[0].play();
		}
	}

});
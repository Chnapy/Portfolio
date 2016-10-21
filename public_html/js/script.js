
$(document).ready(function () {

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
				$("#contact form input[type='submit']").val("Envoi réussi !");
				$("#contact form input[type='submit']").removeAttr("disabled");
				$("#contact form input[type='submit']").css("color", "white");
				console.log(data);
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$("#contact form input[type='submit']").val("Envoi échoué. Réessayer ?");
				$("#contact form input[type='submit']").removeAttr("disabled");
				$("#contact form input[type='submit']").css("color", "#DA4453");
			},
			complete: function (jqXHR, textStatus) {
				console.log(jqXHR.responseText + " - " + textStatus);
			}
		});
		console.log({
			nom: $("#contact form #nom").val(),
			contacter: $("#contact form #contacter").val(),
			message: $("#contact form #message").val(),
			envoi: 1
		});
	});

	$(".image-large").each(function (index, element) {
		$(element).click(function () {
			$('#imagepreview').attr('src', $(element).attr('src'));
			$('#imagemodal').modal('show');
			$('#imagemodal .modal-dialog').css('width', this.naturalWidth + 15 * 2 + "px");
			console.log(this.naturalWidth);
		});
	});

});
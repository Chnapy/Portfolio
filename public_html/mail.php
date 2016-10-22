<?php

$echo_value = sendMail();

echo json_encode($echo_value);

function sendMail() {
	if (!isset($_POST["nom"]) || !isset($_POST["contacter"]) || !isset($_POST["message"]) || !isset($_POST["envoi"])) {
		return array(
			'success' => false,
			'error_msg' => 'Données manquantes'
		);
	}

	$nom = wordwrap($_POST["nom"], 70, "\r\n");
	$contacter = wordwrap($_POST["contacter"], 70, "\r\n");
	$message = wordwrap($_POST["message"], 70, "\r\n");

	$messageFinal = "NOM(S)\r\n" + $nom + "\r\n\r\n" + "MOYENS DE CONTACT\r\n" + $contacter + "\r\n\r\n" + "MESSAGE FINAL\r\n" + $message + "\r\n\r\n" + "FIN."
	;

	$envoye = mail('richardhaddad@hotmail.fr', 'richardhaddad.fr - CONTACT', $messageFinal);

	if (!$envoye) {
		return array(
			'success' => false,
			'error_msg' => 'Envoi échoué'
		);
	}
	return array(
		'success' => true
	);
}

<?php

define('ADRESSE_MAIL', 'richardhaddad@hotmail.fr');

$echo_value = sendMail();

echo json_encode($echo_value);

function sendMail() {
	if (!isset($_POST["nom"]) || !isset($_POST["contacter"]) || !isset($_POST["message"]) || !isset($_POST["envoi"])) {
		return array(
			'success' => false,
			'error_msg' => 'Données manquantes'
		);
	}

	$nom = wordwrap($_POST["nom"], 70, "\n");
	$contacter = wordwrap($_POST["contacter"], 70, "\n");
	$message = wordwrap($_POST["message"], 70, "\n");

	$messageFinal = "NOM(S)\n" . $nom . "\n\n" . "MOYENS DE CONTACT\n" . $contacter . "\n\n" . "MESSAGE FINAL\n" . $message . "\n\n" . "FIN."
	;

//	$headers = 'From: ' . ADRESSE_MAIL . "\n";
//	$headers .= 'Reply-To: ' . ADRESSE_MAIL . "\n";
//	$headers .= 'Content-Type: text/plain; charset="iso-8859-1"' . "\n";
//	$headers .= 'Content-Transfer-Encoding: 8bit';
	$envoye = mail(ADRESSE_MAIL, 'richardhaddad.fr - CONTACT', $messageFinal);

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

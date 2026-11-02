<?php
// Formulaire « Demande d'audit » — ydkagency.com (hébergement IONOS)
// Envoie la demande par e-mail et la garde en copie dans _demandes/ (dossier protégé).

date_default_timezone_set('Europe/Paris');

const DESTINATAIRE = 'contact@ydkagency.com';
const EXPEDITEUR   = 'contact@ydkagency.com';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: /#audit', true, 303);
    exit;
}

// Piège à robots : champ caché qui doit rester vide
if (!empty($_POST['site-web'])) {
    header('Location: /merci.html', true, 303);
    exit;
}

function champ(string $nom, int $max = 120): string {
    $v = trim((string)($_POST[$nom] ?? ''));
    $v = preg_replace('/[\r\n\t]+/', ' ', $v);   // pas d'injection d'en-têtes
    return mb_substr($v, 0, $max);
}

$type  = champ('type', 60);
$nom   = champ('etablissement');
$ville = champ('ville', 80);
$tel   = champ('tel', 30);

$types = ['Garage indépendant', 'Agent ou réparateur de marque', 'Carrosserie', 'Négociant VO', 'Concession ou groupe'];
if (!in_array($type, $types, true)) { $type = 'Non précisé'; }

if ($nom === '' || $ville === '' || !preg_match('/^[0-9 +().-]{6,30}$/', $tel)) {
    header('Location: /?erreur=1#audit', true, 303);
    exit;
}

$date = date('d/m/Y H:i');
$sujet = "Demande d'audit : $nom ($ville)";
$texte = "Nouvelle demande d'audit reçue sur ydkagency.com\n\n"
       . "Établissement : $nom\n"
       . "Type : $type\n"
       . "Ville : $ville\n"
       . "Téléphone : $tel\n"
       . "Date : $date\n";

$entetes = [
    'From' => 'YDK Agency <' . EXPEDITEUR . '>',
    'Content-Type' => 'text/plain; charset=UTF-8',
    'X-Mailer' => 'ydkagency.com',
];
$ok = @mail(DESTINATAIRE, '=?UTF-8?B?' . base64_encode($sujet) . '?=', $texte, $entetes, '-f' . EXPEDITEUR);

// Copie de secours (au cas où l'e-mail se perd)
$dossier = __DIR__ . '/_demandes';
if (is_dir($dossier) && is_writable($dossier)) {
    $ligne = [$date, $type, $nom, $ville, $tel, $ok ? 'mail envoyé' : 'mail en échec'];
    $f = fopen($dossier . '/demandes.csv', 'a');
    if ($f) { fputcsv($f, $ligne, ';'); fclose($f); }
}

header('Location: /merci.html', true, 303);
exit;

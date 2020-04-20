/**
 * 
 * BOOLZAP (boolthsapp per gli amici)
 * 
 * MILESTONE 1
 * Replica della grafica (allegata sotto con gli assets) con la possibilità di avere messaggi stilati e posizionati diversamente in base a: messaggio  dall’utente (verdi) e messaggio dall’interlocutore (bianco) assegnando due classi CSS diverse.
 * Aggiunta di un messaggio: l’utente scrive un testo nella parte bassa e cliccando icona ‘invia il testo’ viene aggiunto al thread sopra, come messaggio verde (ricordate focus() )
 * Font family: Lato
 * Messaggi visibili inizialmente sono inseriti statici nell’HTML
 * Usate un template nell’html e clone() per l’ inserimento del messaggio da fare in JS
 * 
 * MILESTONE 2
 * Risposta dall’interlocutore: ad ogni inserimento di un messaggio, l’utente riceverà un “ok” come risposta, che apparirà dopo 1 secondo.
 * Ricerca utenti: scrivendo qualcosa nell’input a sinistra, vengono visualizzati solo i contatti il cui nome contiene le lettere inserite (es, Marco, Matteo Martina -> Scrivo “mar” rimangono solo Marco e Martina)
 * Ricordate che c’è un metodo includes()  anche per le stringhe oltre che per gli array.
 */

$(document).ready(function () {
    
    var app = $('#app');
    var chat = $('.message-list');
    var searchInput = $('#boolzap-search');
    var sendIcon = $('#actions--send');
    var sendInput = $('#new-input');
    var activeChat = $('.active-chat');
    var chatWindow = $('.chat');
    var chatId = activeChat.attr('data-conversation');

    // Costruisco un array con tutti i nomi dei contatti con cui sono presenti delle chat
    var contactsNames = [];
    $('.name').each( function() {
        contactsNames.push($(this).text());
    });
    
    // Modifica icona da microfono ad aereo di carta
    app.on('blur focus','#new-input', toggleSendIcon);

    // Chiama la funzione di invio messaggio al click dell'icona
    app.on('click','#actions--send', () => {
        var text = sendInput.val().trim();
        sendMessage(chatId, text, 'sent');
        
        // Risposta automatica
        setTimeout(() => {
            sendMessage(chatId, 'ok', 'received');
        }
        ,1000);
    });

    // Chiama la funzione di invio messaggio una volta premuto enter nell'input
    app.on('keyup','#new-input', (e) => {
        if(e.which === 13 || e.keyCode === 13) {
            var text = sendInput.val().trim();
            sendMessage(chatId, text, 'sent');
            
            // Risposta automatica
            setTimeout(() => {
                sendMessage(chatId, 'ok', 'received');
            }
            ,1000);
        }
    });

    // Ricerca di un contatto
    app.on('keyup','#boolzap-search', function() {
        
        // Elemento di ricerca
        var string = searchInput.val().trim().toLowerCase();
        
        // Nascondi tutte le chat
        $('.contact').hide();

        for(var i = 0; i < contactsNames.length; i++) {
           if(contactsNames[i].toLowerCase().includes(string)) {
                // Applica classe che da' visibilità soltanto alle conversazioni trovate
                $('li.contact:has(.name:contains("' + contactsNames[i] + '"))').show();               
           } 
        }

    });
    

    /********** FUNZIONI ************/
    /********** CHE *****************/
    /********** FUNZIONANO **********/

    function toggleSendIcon() {
        sendIcon.toggleClass('fa-microphone fa-paper-plane');
    }

    function sendMessage(chatId, text, way = 'sent') {
        if(text.length > 0) {

            // Clone del template
            var newMsg = $('.chat-template .msg').clone();

            // Chat in cui appendere il nuovo messaggio
            var chat = $('.message-list[data-conversation="' + chatId + '"]');

            // Applicazione testo, orario e classe al clone
            newMsg.children('.msg--text').text(text);
            newMsg.children('.msg--time').text(getTime());

            if(way == 'sent') newMsg.addClass('msg--sent');
            else              newMsg.addClass('msg--received');

            // Append del clone alla chat attiva
            activeChat.append(newMsg);

            // Pulisci contenuto del value nell'input del nuovo messaggio
            clearInput(sendInput);

            // Scroll fino all'ultimo elemento aggiunto
            chatWindow.scrollTop(chatWindow.height() + newMsg.height());
        }
    }

    // Pulizia dell'input
    function clearInput(ref) {
        ref.val('');
    }

    // Generazione orario
    function getTime() {
        var date = new Date();
        var hours = addZero(date.getHours());
        var minutes = addZero(date.getMinutes());
        return hours + ':' + minutes;
    }

    // Supporto a getTime per aggiungere 0 prima di ore/minuti
    function addZero(num) {
        return (num < 10 ? ('0' + num) : num);
    }

});
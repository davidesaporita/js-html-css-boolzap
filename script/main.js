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
 */

$(document).ready(function () {
    
    var app = $('#app');
    var chat = $('.message-list');
    var sendIcon = $('#actions--send');
    var sendInput = $('#new-input');
    var activeChat = $('.active-chat');
    var chatId = activeChat.attr('data-conversation');
    
    // Modifica icona da microfono ad aereo di carta
    app.on('blur focus','#new-input', toggleSendIcon);

    // Invia un messaggio al click dell'icona
    app.on('click','#actions--send', () => {
        sendMessage(chatId);
        clearInput(sendInput);
    });

    app.on('keyup','#new-input', (e) => {
        if(e.which === 13 || e.keyCode === 13) {
            sendMessage(chatId);
            clearInput(sendInput);
        }
    });
    
    //$('#new-input').keyup(function(e) {
        //     if(e.which === 13 || e.keyCode === 13) {

    // $('#app').on('click','.send', () => {
    //     var template = $('.chat-template .msg.msg--sent').clone();
    //     var newMsg = $('#new-input').val().trim();
    //     chat.append(template.append(newMsg));
    //     toggleMic();
    //     $('#new-input').val('');
    // });


    // $('#new-input').keyup(function(e) {
    //     if(e.which === 13 || e.keyCode === 13) {
    //         var text = $(this).val().trim();
    //         if(text !== '') {
    //             var template = $('.chat-template .msg.msg--sent').clone();
    //             var newMsg = $('#new-input').val().trim();
    //             chat.append(template.append(newMsg));
    //             $('#new-input').val('');
    //         }
    //     }
    // });

    // function addElement(text) {
    //     var text = $(this).val().trim();
    //     if(text !== '') {
    //         var template = $('.chat-template .msg.msg--sent').clone();
    //         var newMsg = $('#new-input').val().trim();
    //         chat.append(template.append(newMsg));
    //         toggleMic();
    //         $('#new-input').val('');
    //     }
    // }

    function toggleSendIcon() {
        sendIcon.toggleClass('fa-microphone fa-paper-plane');
    }

    function sendMessage(chatId) {
        var text = sendInput.val().trim();
        if(text.length > 0) {

            // Clone del template
            var newMsg = $('.chat-template .msg').clone();

            // Chat in cui appendere il nuovo messaggio
            var chat = $('.message-list[data-conversation="' + chatId + '"]');

            // Applicazione testo, orario e classe al clone
            newMsg.children('.msg--text').text(text);
            newMsg.children('.msg--time').text(getTime());
            newMsg.addClass('msg--sent');            

            // Append del clone alla chat attiva
            activeChat.append(newMsg);
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
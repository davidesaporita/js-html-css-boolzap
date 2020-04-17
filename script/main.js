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
    
    var chat = $('.message-list');
    
    $('#app').on('focus','#new-input', () => { 
        toggleMic();
    });

    $('#app').on('click','.send', () => {
        var template = $('.chat-template .msg.msg--sent').clone();
        var newMsg = $('#new-input').val().trim();
        chat.append(template.append(newMsg));
        toggleMic();
        $('#new-input').val('');
    });

    $('#new-input').keyup(function(e) {
        if(e.which === 13 || e.keyCode === 13) {
            var text = $(this).val().trim();
            if(text !== '') {
                var template = $('.chat-template .msg.msg--sent').clone();
                var newMsg = $('#new-input').val().trim();
                chat.append(template.append(newMsg));
                $('#new-input').val('');
            }
        }
    });

    function addElement(text) {
        var text = $(this).val().trim();
        if(text !== '') {
            var template = $('.chat-template .msg.msg--sent').clone();
            var newMsg = $('#new-input').val().trim();
            chat.append(template.append(newMsg));
            toggleMic();
            $('#new-input').val('');
        }
    }

    function toggleMic() {
        $('.rec').toggle();
        $('.send').toggle();
    }

});
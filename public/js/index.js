'use stric';

const socket = new ReconnectingWebSocket('wss://tkjg.fi/meetme/updates');
socket.onopen = event => console.log('Socket opened');
socket.onclose = event => console.log('Socket closed');
socket.onmessage = message => {
    console.log(message.data);
    message = JSON.parse(message.data);
    switch (message.type) {
        case 'rr':
            updateBloodPressureDisplay(message.payload);
            break;
        case 'bgluc':
            updateBglucDisplay(message.payload);
            break;
        default:
            console.log('Hmm, woot?');
    }
}

const updateBloodPressureDisplay = data => {
    console.log('Updating RR display');
    let $display = $('#rr-current-value');
    let rr = data.sys + '/' + data.dia;
    let bgClass = '';
    if (between(data.sys, 110, 150) && between(data.dia, 60, 89)) {
       console.log('bingo');
       bgClass = 'bg-success';
    } else if (between(data.sys, 151, 170) || between(data.dia, 90, 95)) {
        bgClass = 'bg-warning';
    } else {
        bgClass = 'bg-danger';
    }
    $display.parent('p').removeClass('bg-success').removeClass('bg-warning')
        .removeClass('bg-danger').addClass(bgClass);
    $display.text(rr);
}

const updateBglucDisplay = data => {
    console.log('Updating Bgluc display');
    let $display = $('#bgluc-current-value');
    let bgClass = '';
    if (between(data.value, 4.4, 8)) {
        bgClass = 'bg-success';
    } else if (between(data.value, 8.1, 9)) {
        bgClass = 'bg-warning';
    } else {
        bgClass = 'bg-danger';
    }
    $display.parent('p').removeClass('bg-success').removeClass('bg-warning')
        .removeClass('bg-danger').addClass(bgClass);
    $display.text(data.value);

}

function between(value, low, high) {
    return value >= low && value <= high
}

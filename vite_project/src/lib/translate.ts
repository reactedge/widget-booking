export const tr = (text: string, venue: string) => {
    switch (venue) {
        case 'date-mate':
            if (text === 'What eventType type do you need?') text = 'What date type do you fancy?'
            if (text === 'appointment') text = 'date'
            if (text === 'EventType') text = 'Date style'
            if (text === 'EventHost') text = 'Date Host'
            if (text === 'Not a working day') text = 'No availability'
            break;
        case 'rachelle-hairdressing':
        case 'paddington-hairdressing':
            if (text === 'What eventType type do you need?') text = 'What haircut type do you fancy?'
            if (text === 'EventType') text = 'Haircut style'
            if (text === 'EventHost') text = 'Hairdresser'
            if (text === 'Not a working day') text = 'No availability'
            break;
        case 'poole-rugby':
            if (text === 'What eventType type do you need?') text = 'What event type do you fancy?'
            if (text === 'EventType') text = 'Event Type'
            if (text === 'EventHost') text = 'Trainer'
            if (text === 'Not a working day') text = 'No event'
            if (text === 'Book') text = 'Call team'
            break;
        case 'digital-rise-dorset':
            if (text === 'What eventType type do you need?') text = 'How do you want to meet?'
            if (text === 'EventType') text = 'Meeting Type'
            if (text === 'eventType') text = 'Appointment'
            if (text === 'EventHost') text = 'Appointment Host'
            if (text === 'Not a working day') text = 'No availability'
            if (text === 'In Cart!') text = 'Invite Sent'
            break;
        case 'qichen-restaurant':
            if (text === "Let's set your appointment details") text = "Let's organise your party"
            if (text === 'Appointment') text = 'Party'
            if (text === 'Appointment') text = 'Party'
            if (text === 'What eventType type do you need?') text = 'What haircut type do you fancy?'
            if (text === 'EventType') text = 'Number of guests'
            if (text === 'EventHost') text = 'Waiter / Waitress'
            if (text === 'Not a working day') text = 'No availability'
            break;
    }
    return text
}
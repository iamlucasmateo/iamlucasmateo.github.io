function sendGAEvent(action,category,label){
    gtag('event', action, {
    'event_category': category,
    'event_label': label,
    });
};

function sendGAValueEvent(data){
    gtag('event', data.action, {
    'event_category': data.category,
    'event_label': data.label,
    'value': data.value
    });
};

function sendGAClickEvent(element){
    element.addEventListener('click',function(event){
        const action = event.type;
        const category = 'AnalyticsTesting/analytics-testing';
        const label = this.textContent + '' + this.id;
        sendGAEvent(action,category,label);
        console.log('Data sent');
    })
}

const title = document.getElementById('title')
const subtitle = document.getElementById('subtitle')
sendGAClickEvent(title);
sendGAClickEvent(subtitle);

// Event with Value

const eventTrigger = document.getElementById('event-trigger'),
      eventLabel = document.getElementById('event-label'),
      eventValue = document.getElementById('event-value');

eventTrigger.addEventListener('click',function(event){
    const data = {};
    data['action'] = event.type;
    data['category'] = 'AnalyticsTesting/analytics-testing';
    data['label'] = eventLabel.value;
    data['value'] = eventValue.value;
    sendGAValueEvent(data);
    console.log('Data sent from trigger');
})      


// function sendTealiumEvent(element,eventType,eventDetails){
//     element.addEventListener(eventType,function(evt){
//         utag.link({
//             event: evenDetails.name,
//             eCategory: eventDetails.category,
//             eAction: eventDetails.action,
//             eLabel: eventDetails.label
//         });
//     });
// };





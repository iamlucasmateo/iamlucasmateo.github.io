function sendGAEvent(action,category,label){
    gtag('event', action, {
    'event_category': category,
    'event_label': label,
    });
};

const title = document.getElementById('title')
const subtitle = document.getElementById('subtitle')

function sendGAClickEvent(element){
    element.addEventListener('click',function(event){
        const action = event.type;
        const category = 'AnalyticsTesting/analytics-testing';
        const label = this.textContent + '' + this.id;
        sendGAEvent(action,category,label);
    })
}

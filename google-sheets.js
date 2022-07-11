function parseGoogleSheet(url, cback){
    return fetch(url).then(r => r.text()).then(parseText);

    function parseText(text){
        const dataArr = text.split('\r\n').map(row => row.split('\t'));
        const names = dataArr.shift();
        const data = dataArr.map(row => row.reduce((acc, el, i) => {
            acc[names[i]] = el;
            return acc;
        }, {}));
        cback(data);
        return data;
    }
}
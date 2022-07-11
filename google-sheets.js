const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSk_8vtyUu_h9UcJwMHXgZmARiJin3905d6Ou-BffRvOGEBVMvpm0SW4nL4aI9lR127XktogbzRwhrS/pub?gid=0&single=true&output=tsv';



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

parseGoogleSheet(URL, console.log);
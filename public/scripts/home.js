const stateSearch = document.querySelector('form');
const table = document.querySelector('table')

stateSearch.addEventListener('submit', (event) =>{
    event.preventDefault();
    let searchvalue = stateSearch.querySelector('input').value
    let requiredState = table.querySelector(`[data-state="${searchvalue}"]`).parentElement
    let existingSearch  = table.querySelector('.selected-state');

    if(existingSearch) existingSearch.classList.remove('selected-state')
    requiredState.classList.add('selected-state')
    requiredState.scrollIntoView()
})

fetch('data.csv')
    .then(res => res.text())
    .then(data => {
        let dataArray = data.split('\n').map(val => val.split(','))
        let dataSet = {}
        for (var i = 2; i < dataArray.length; i++) {
            dataSet[dataArray[i][0]] = dataArray[i].slice(1)
        }
        placeData(dataSet)
    })
    .catch(err => console.log(err))

function placeData(stateData) {
    let tableBody = table.querySelector('.table-body')
    for (let props in stateData) {
        let conformedCases = '';
        let revoveredCases = '';
        let tableRow = document.createElement('tr')
        if (parseInt(stateData[props][7]) !== 0) conformedCases = `<span>&uparrow;</span>` + parseInt(stateData[props][7])
        if (parseInt(stateData[props][8]) !== 0) revoveredCases = `<span>&uparrow;</span>` + parseInt(stateData[props][8])
        tableRow.innerHTML = `
                <th scope="row" data-state="${props}" class="states"><span class="state-pointer">&rsaquo;</span> ${props}</th>
                <td><span class="delta-confirm">${conformedCases}</span> ${+stateData[props][0]}</td>
                <td>${+stateData[props][3]}</td>
                <td><span class="delta-recover">${revoveredCases}</span> ${+stateData[props][1]}</td>
                <td>${+stateData[props][2]}</td>
            `
        tableBody.appendChild(tableRow)
    }
}
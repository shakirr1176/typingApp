export let timeMange = [
    {
        time: '5'
    },
    {
        time: '15'
    },
    {
        time: '60'
    },
    {
        time: '300'
    },
    {
        time: '600'
    }
]

timeMange = localStorage.getItem('timeArray') ? JSON.parse(localStorage.getItem('timeArray')) : timeMange

timeMange.forEach(el=>{
    el.name = 'rank'+el.time
    el['rank'+el.time] = []
})

let table = `<div class="table-container">
                <table cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>rank</th>
                            <th>name</th>
                            <th>wpm</th>
                            <th>accuracy</th>
                            <th>right word</th>
                            <th>wrong word</th>
                            <th class="text-center">action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>`

function secondsToTime(e){
    const h = Math.floor(e / 3600).toString(),
          m = Math.floor(e % 3600 / 60).toString(),
          s = Math.floor(e % 60).toString();

    return {
        hours:h,
        min: m,
        sec:s
    };
}

export function manageTime(countTime){
    if(secondsToTime(countTime).hours > 0){
        return `<span>${secondsToTime(countTime).hours}</span>h <span>${secondsToTime(countTime).min > 0 ? secondsToTime(countTime).min + 'm' : '' } </span><span>${secondsToTime(countTime).sec > 0 ? secondsToTime(countTime).sec + 's' : '' }</span>`
    }else{
        if(secondsToTime(countTime).min > 0){
            return `<span>${secondsToTime(countTime).min}</span>m <span>${secondsToTime(countTime).sec > 0 ? secondsToTime(countTime).sec + 's' : ''}</span>`  
        }else{
            return `<span>${secondsToTime(countTime).sec}</span>s`  
        }
    }
}

export let data = []

timeMange.forEach(el=>{
    data.push({
        id: el.time,
        name: el.name,
        storageName: el.name,
        template: `<div class="${el.name}">
                    <div class="rank-time">
                        Time
                        ${manageTime(el.time)}
                    </div>
                    ${table}
                </div>`
    })
})
export let timeMange = [
    {
        time: '5',
        name: 'fiveSecRank',
        fiveSecRank: []
    },
    {
        time: '15',
        name: 'fifteenSecRank',
        fifteenSecRank:[]
    },
    {
        time: '30',
        name: 'thirtySecRank',
        thirtySecRank:[]
    },
    {
        time: '60',
        name: 'sixtySecRank',
        sixtySecRank:[]
    },
    {
        time: '300',
        name: 'threeHunSecRank',
        threeHunSecRank:[]
    },
    {
        time: '600',
        name: 'sixHunSecRank',
        sixHunSecRank:[]
    },
    {
        time: '1800',
        name: 'eighteenHunSecRank',
        eighteenHunSecRank:[]
    },
]

let table = `<div>
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
    if(secondsToTime(countTime).min > 0){
        return `<span>${secondsToTime(countTime).min}</span>min <span>${secondsToTime(countTime).sec > 0 ? secondsToTime(countTime).sec + 's' : ''}</span>`  
    }else if(secondsToTime(countTime).hours > 0){
        return `<span>${secondsToTime(countTime).hours}</span>hour <span>${secondsToTime(countTime).min > 0 ? secondsToTime(countTime).min + 'min' : '' }</span><span>${secondsToTime(countTime).sec > 0 ? secondsToTime(countTime).sec + 's' : '' }</span>`  
    }else{
        return `<span>${secondsToTime(countTime).sec}</span>s`  
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
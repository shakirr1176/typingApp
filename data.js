let table = `<div>
                <table cellspacing="0" cellpadding="0">
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>wpm</th>
                            <th>accuracy</th>
                            <th class="text-center">action</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>`

export let data = [
    {
        id: '5',
        name: 'five-sec-rank',
        storageName: 'fiveSecRank',
        template: `<div class="five-sec-rank">
                        <div class="rank-time">
                            Time
                            <span>5</span>
                        </div>
                        ${table}
                    </div>`
    },
    {
        id: '15',
        name: 'fifteen-sec-rank',
        storageName: 'fifteenSecRank',
        template: `<div class="fifteen-sec-rank">
                        <div class="rank-time">
                            Time
                            <span>15</span>
                        </div>
                        ${table}
                    </div>`
    },
    {
        id: '30',
        name: 'thirty-sec-rank',
        storageName: 'thirtySecRank',
        template: `<div class="thirty-sec-rank">
                        <div class="rank-time">
                            Time
                            <span>30</span>
                        </div>
                        ${table}
                    </div>`
    },
    {
        id: '60',
        name: 'sixty-sec-rank',
        storageName: 'sixtySecRank',
        template: `<div class="sixty-sec-rank">
                        <div class="rank-time">
                            Time
                            <span>1min</span>
                        </div>
                        ${table}
                    </div>`
    },
    {
        id: '300',
        name: 'three-hun-sec-rank',
        storageName: 'threeHunSecRank',
        template: `<div class="three-hun-sec-rank">
                        <div class="rank-time">
                            Time
                            <span>5min</span>
                        </div>
                        ${table}
                    </div>`
    },
    {
        id: '600',
        name: 'six-hun-sec-rank',
        storageName: 'sixHunSecRank',
        template: `<div class="six-hun-sec-rank">
                        <div class="rank-time">
                            Time
                            <span>10min</span>
                        </div>
                        ${table}
                    </div>`
    },
    {
        id: '1800',
        name: 'eighteen-hun-sec-rank',
        storageName: 'eighteenHunSecRank',
        template: `<div class="eighteen-hun-sec-rank">
                        <div class="rank-time">
                            Time
                            <span>30min</span>
                        </div>
                        ${table}
                    </div>`
    },
]
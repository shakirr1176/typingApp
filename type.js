import { manageTime,timeMange } from "./data.js"

let selectTime = document.querySelector('.slect-time')
timeMange.forEach(el => {
    selectTime.innerHTML += `<div data-time="${el.time}" class="times">${manageTime(el.time)}</div>`
});

selectTime.innerHTML += `
<div class="custom-time">
<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="0" stroke="fill">
<path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
</svg>
</div>
<div class="auto-bot">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
</svg>
</div>
`

class MyType{
    constructor(){
        this.declaration()
        this.draw()
    }

    declaration(){
        this.moreText = 'number/here/because/right/system/well/out/school/another/course/mean/without/they/play/begin/say/seem/or/mean/there/lead/over/from/interest/then/much/we/any/get/line/when/school/there/think/present/long/last/and/just/each/so/get/fact/much/or/in/order/follow/each/see/this/work/now/group/form/so/life/seem/off/when/see/last/high/few/those/so/against/want/seem/open/old/against/point/person/during/just/such/play/must/between/end/know/if/to/very/long/must/who/like/off/right/come/if/way/we/word/eye/but/want/end/feel/old/good/over/increase/old/such/life/will/word/form/use/head/what/most/seem/even/without/again/who/as/around/give/where/just/look/public/hold/than/most/consider/as/new/a/she/we/through/those/by/than/set/where/about/govern/write/good/some/long/before/like/consider/before/man/do/large/possible/stand/first/a/say/under/people/without/turn/if/feel/plan/also/ask/then/too/might/old/follow/give/open/up/after/system/must/off/seem/write/most/part/present/first/call/between/these/of/right/when/with/last/she/one/develop/come/there/without/stand/before/still/if/make/seem/follow/call/state/down/after/order/help/fact/another/form/see/many/program/since/early/long/public'.split('/')
        this.allText = this.moreText
        this.para = document.querySelector('.para')
        this.paraContainer = document.querySelector('.para-container')
        this.extraKey = ['Control','Shift','Tab','Alt','CapsLock','F2','Insert','Home','PageUp','PageDown','Enter','ContextMenu','ArrowDown','ArrowLeft','ArrowRight','ArrowUp','End','\\','Backspace']
        this.isNext = false;
        this.remainWord = 50
        this.currentWordIndex = 0
        this.currentLetterIndex = -1
        this.wpmGraphData = []
        this.rawwpmGraphData = []
        this.instantWPMData = []
        this.isTypingStart = false
        this.isSetInterval = true
        this.isType = true
        this.word = null
        this.accuracy = 0;
        this.rightWord = 0
        this.totalLetter = 0
        this.skility;
        this.extraLetter = 0
        this.line = document.querySelector('.line')
        this.lineForBot = document.querySelector('.line-for-bot')
        this.time = document.querySelector('.time')
        this.showResult = document.querySelector('.result')
        this.showRawResult = document.querySelector('.raw-result')
        this.acurracyDiv = document.querySelector('.acurracy')
        this.manageTime = manageTime
        this.rankArray = timeMange
        this.timeOption = document.querySelectorAll('.times')

        this.prev

        if(localStorage.getItem('time')  && this.rankArray.some(el=>el.time == localStorage.getItem('time') )){
          this.prev =  [...this.timeOption].filter(el=> el.dataset.time == localStorage.getItem('time'))[0]
        }else{
            if(localStorage.getItem('time') && !this.rankArray.some(el=>el.time == localStorage.getItem('time') ) ){
                if(this.prev){
                    this.prev.classList.remove('active')
                }
                this.prev = ''
            }else{
                if(!localStorage.getItem('time')){
                    this.prev = this.timeOption[1]
                }
            }
        }

        this.totalTime = localStorage.getItem('time') ? localStorage.getItem('time') : timeMange[1].time
        this.countTime = this.totalTime
        this.measure = 45
        this.scrollUnit = 0
        this.myTimer
        this.botTime
        this.letterInterval
        this.forAfterRestart
        this.finalResult = 0
        this.rawResult = 0
        this.restart = document.querySelector('.restart')
        this.restartAfterWin = document.querySelector('.restart-after-win')
        this.typeInput = document.querySelector('.type-input')
        this.total_typed_word = document.querySelector('.total-typed-word')
        this.right_word = document.querySelector('.right-word-show')
        this.wrong_word = document.querySelector('.wrong-word-show')
        this.nameInput = document.querySelector('.name-input')
        this.capLock = document.querySelector('.caps-lock')
        this.customTimeBtn = document.querySelector('.custom-time')
        this.customTimePopUp = document.querySelector('.custom-time-pop-up')
        this.popUpInput = document.querySelector('.pop-up-input')
        this.timeLabel = document.querySelector('.time-label')
        this.popUpError = document.querySelector('.pop-up-error')

        this.wpmResultPerSec = document.querySelector('.wpm-result-per-sec')
        this.isPopUpOpen = false
        this.chart = document.querySelector('.chart')
        this.rightWordPerSec = 0
        this.countable = true
        this.hasCounted = false

        this.isautobotPopUpOpen = false
        this.autoBotBtn = document.querySelector('.auto-bot')
        this.autobotPopUp = document.querySelector('.auto-bot-pop-up')
        this.autobotInput = document.querySelector('.autobot-input')
        this.autobotLabel = document.querySelector('.autobot-label')
        this.autobotError = document.querySelector('.autobot-error')
        this.botSpeedDiv = document.querySelector('.bot-speed')

        this.currentWordForBot = 0
        this.currentLetterForBot = 0
        this.timeForOneWordCross;

        this.botRemoveBtn  = document.querySelector('.bot-remove-btn')
        this.botSaveBtn  = document.querySelector('.bot-save-btn')
    }

    draw(){
        this.botSpeed = 0
        this.shuffleArray(this.allText)
        this.forAfterRestart = this.allText
        this.customTimeFunc()
        this.setAutoBotPopUpFunc()
        this.initialize()
        this.selectTime()
        this.startTyping()
        this.restartFunc()
    }
    
   

    initialize(){
        this.chart.innerHTML = ''
        this.para.innerHTML = this.allText.join(' ').split(' ').map(el=>`<span class="word">${el.split('').map(x=>`<span>${x}</span>`).join('')}</span>`).join('')
        this.showResult.closest('.result-container').classList.add('hidden')
        this.line.classList.add('line-animation')
        this.typeInput.value = ''
        this.total_typed_word.innerHTML = 0
        this.right_word.innerHTML = 0
        this.wrong_word.innerHTML = 0
        this.nameInput.value = ''
        if(this.prev){
            this.prev.classList.add('active')
        }

        this.rankArray.forEach(el=>{
            Object.values(el).pop()[0] = JSON.parse(localStorage.getItem(Object.keys(el).pop())) || []
        })

        this.result()
        
        this.wpmResultPerSec.innerHTML = ''
        this.lineForBot.classList.add('hidden')

        this.time.innerHTML = this.manageTime(this.countTime)
        this.word = document.querySelectorAll('.word')
        this.para.style.marginTop = null
        this.postionLine(this.word[this.currentWordIndex].children[this.currentLetterIndex],this.word[this.currentWordIndex])
        this.postionLineForBot(this.word[this.currentWordForBot].children[this.currentLetterForBot])
        clearInterval(this.myTimer)
        clearInterval(this.botTime)
        clearInterval(this.letterInterval)
        
        window.addEventListener('resize',()=>{
            this.postionLineForBot(this.word[this.currentWordForBot].children[this.currentLetterForBot])
            this.postionLine(this.word[this.currentWordIndex].children[this.currentLetterIndex],this.word[this.currentWordIndex])
            this.scrollPara(this.paraContainer,this.word[this.currentWordIndex])
        })
        
        window.addEventListener('scroll',()=>{
            this.postionLineForBot(this.word[this.currentWordForBot].children[this.currentLetterForBot])
            this.postionLine(this.word[this.currentWordIndex].children[this.currentLetterIndex],this.word[this.currentWordIndex])
        })
    }

    saveBotWPM(){
        if(this.autobotInput.value != 0 && this.autobotInput.value <= 1000 && this.autobotInput.value.match(/^[0-9]+$/) !== null){
            this.isautobotPopUpOpen = false
            this.autobotPopUp.classList.add('hidden')
            this.botSpeed = this.autobotInput.value
            this.timeForOneWordCross = 60/this.botSpeed
            this.botSpeedDiv.innerHTML = this.botSpeed + 'wpm' + '(Bot)' 
            this.autobotInput.value = ''
        }
    }

    setAutoBotPopUpFunc(){

        this.botRemoveBtn.addEventListener('click',()=>{
            this.autobotPopUp.classList.add('hidden')
            this.isautobotPopUpOpen = false
            this.botSpeed = 0
            this.botSpeedDiv.innerHTML = ''
        })

        this.botSaveBtn.addEventListener('click',()=>{
            this.saveBotWPM()
        })

        this.autoBotBtn.addEventListener('click',()=>{
            if(!this.isTypingStart){
                this.autobotPopUp.classList.remove('hidden')
                this.isautobotPopUpOpen = true
                this.autobotInput.value = ''
                this.autobotError.innerHTML = ''
                this.autobotLabel.innerHTML = ''
            }
        })

        window.addEventListener('click',(e)=>{
            if((!e.target.closest('.auto-bot') && !e.target.closest('.auto-bot-pop-up-div')
            )){
                this.autobotPopUp.classList.add('hidden')
                this.isautobotPopUpOpen = false
            }
        })

        this.autobotInput.addEventListener('input',()=>{
            this.autobotError.classList.add('hidden')
            if(this.autobotInput.value.match(/^[0-9]+$/) !== null){
                
                if(this.autobotInput.value <= 1000){
                    this.autobotLabel.innerHTML = this.autobotInput.value + 'WPM'
                    if(this.autobotInput.value <= 0){
                        this.autobotError.classList.remove('hidden')
                        this.autobotError.innerHTML = 'WPM can\'t be zero'
                    }
                }else{
                    this.autobotError.classList.remove('hidden')
                    this.autobotError.innerHTML = 'WPM should be less than 1000'
                }
            }else{
                this.autobotLabel.innerHTML = ''
                this.autobotError.classList.remove('hidden')
                this.autobotError.innerHTML = 'value should be number'
            }
        })

        this.autobotInput.addEventListener('keypress',(e)=>{
            if (e.key == 'Enter') {
                this.saveBotWPM()
            }
        })
    }

    restartFunc(){
        this.restart.addEventListener('click',(e)=>{
            this.declaration()
            this.shuffleArray(this.allText)
            this.forAfterRestart = this.allText
            this.initialize()
        })

        this.restartAfterWin.addEventListener('click',(e)=>{
            if(this.countTime === 0){
                this.rankFun()
                this.declaration()
                this.allText = this.forAfterRestart ? this.forAfterRestart : this.allText
                this.initialize()
            }
        })

        this.nameInput.addEventListener('keypress',(e)=>{
            if(e.key == 'Enter' && this.nameInput.value.trim() !=  ''){
                this.restartAfterWin.click()
            }
        })

        window.addEventListener('keydown',(e)=>{
            if(e.key == 'Shift'){
                this.restart.click()
            }
        })
    }

    setAutoBot(){
        if(this.botSpeed > 0){
            clearInterval(this.letterInterval)
            this.lineForBot.classList.remove('hidden')
            let decrease = ()=>{
                if(this.countTime > 0){
                    this.postionLineForBot(this.word[this.currentWordForBot].children[this.currentLetterForBot])
                    this.currentLetterForBot++
                }
                
                if(this.countTime == 0){
                    clearInterval(this.botTime)
                }
            }

            decrease()
            
            this.letterInterval =  setInterval(decrease,(this.timeForOneWordCross/this.word[this.currentWordForBot].children.length)*1000)
        }
    }

    customTimeFunc(){

        this.customTimeBtn.addEventListener('click',()=>{
            if(!this.isTypingStart){
                this.customTimePopUp.classList.remove('hidden')
                this.isPopUpOpen = true
                this.popUpInput.value = ''
                this.popUpError.innerHTML = ''
                this.timeLabel.innerHTML = 'Total time '
            }
        })

        window.addEventListener('click',(e)=>{
            if((!e.target.closest('.custom-time') && !e.target.closest('.pop-up-div')
            )){
                this.customTimePopUp.classList.add('hidden')
                this.isPopUpOpen = false
            }
        })

        this.popUpInput.addEventListener('input',()=>{

            this.popUpError.classList.add('hidden')

            if(this.popUpInput.value.match(/^[0-9]+$/) !== null){

                if(this.popUpInput.value <= 86400){
                    this.timeLabel.innerHTML = 'Total time ' + this.manageTime(this.popUpInput.value)
                    if(this.popUpInput.value <= 0){
                        this.popUpError.classList.remove('hidden')
                        this.popUpError.innerHTML = 'Time can\'t be zero'
                    }
                }else{
                    this.popUpError.classList.remove('hidden')
                    this.popUpError.innerHTML = 'Time should be less than 24 hours'
                }
                
            }else{
                this.timeLabel.innerHTML = 'Total time '
                this.popUpError.classList.remove('hidden')
                this.popUpError.innerHTML = 'value should be number'
            }
        })

        this.popUpInput.addEventListener('keypress',(e)=>{
            if (e.key == 'Enter') {
                if(this.popUpInput.value != 0 && this.popUpInput.value <= 86400 && this.popUpInput.value.match(/^[0-9]+$/) !== null){
                    this.isPopUpOpen = false
    
                    this.customTimePopUp.classList.add('hidden')
    
                    this.totalTime = this.popUpInput.value
                    this.countTime = this.totalTime
                    localStorage.setItem('time',this.popUpInput.value)
                    this.time.innerHTML = this.manageTime(this.totalTime)
    
                    if(this.prev && this.prev.dataset.time != this.popUpInput.value){
                        this.prev.classList.remove('active')
                    }
    
                    this.prev = this.popUpInput.value  && this.rankArray.some(el=>el.time == this.popUpInput.value ) ? [...this.timeOption].filter(el=> el.dataset.time == this.popUpInput.value)[0] : ''
                    this.warning = true
    
                    if(this.prev){
                        this.prev.classList.add('active')
                    }
    
                    this.popUpInput.value = ''
                }
            }
        })
    }

    chartFunc(){

        this.chart.innerHTML =  `<canvas id="myChart"></canvas>`

        const ctx = document.getElementById('myChart');
        const DATA_COUNT = +this.totalTime+1;
        const labels = [];

        let step = 1

        if(Math.round(+this.totalTime/60) >= 1){
            step = Math.round(+this.totalTime/60)+1
        }

        let strokColor = getComputedStyle(this.time).getPropertyValue('--primary') ? getComputedStyle(this.time).getPropertyValue('--primary') : 'white'
        let strokColor2 = getComputedStyle(this.customTimeBtn).color ? getComputedStyle(this.customTimeBtn).color : 'white'

        for (let i = 1; i < DATA_COUNT; i = i + step) {
            labels.push(i.toString());
        }

        const wpmGraphData = [];
        const rawwpmGraphData = [];
        // const instantWPMData = [];

        for (let i = 0; i < this.wpmGraphData.length; i = i + step) {
             wpmGraphData.push(this.wpmGraphData[i]);
             rawwpmGraphData.push(this.rawwpmGraphData[i])
            //  instantWPMData.push(this.instantWPMData[i])
        }

        const data = {
        labels: labels,
        datasets: [
            {
                label: 'wpm',
                data: wpmGraphData,
                borderColor: strokColor,
                borderWidth: 2,
                fill: false,
                tension: 0.4
            },
            // {
            //     label: 'Instant WPM',
            //     data: instantWPMData,
            //     borderWidth: 2,
            //     borderColor: strokColor2,
            //     fill: false,
            //     tension: 0.4
            // },
            {
                label: 'raw',
                data: rawwpmGraphData,
                borderWidth: 2,
                borderColor: 'red',
                fill: false,
                tension: 0.4
            },
        ]
        };

        const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            plugins: {
            title: {
                display: true,
                text: ''
            },
            },
            interaction: {
            intersect: false,
            },
            scales: {
                x: {
                    display: true,
                    title: {
                    display: true
                    }
                },
                y: {
                    display: true,
                    title: {
                    display: true,
                    text: 'w p m'
                    },
                    suggestedMin: 0,
                    // suggestedMax: Math.max(Math.max(...wpmGraphData),Math.max(...instantWPMData),Math.max(...rawwpmGraphData)) + 20
                    suggestedMax: Math.max(Math.max(...wpmGraphData),Math.max(...rawwpmGraphData)) + 20
                }
            }
        },
        };

        let aa = new Chart(ctx,config)
    }

    addmoreMoreText(){
        if(this.word.length - this.currentWordIndex < this.remainWord){
            this.shuffleArray(this.moreText)
            this.para.innerHTML += this.moreText.join(' ').split(' ').map(el=>`<span class="word">${el.split('').map(x=>`<span>${x}</span>`).join('')}</span>`).join('')
            this.word = document.querySelectorAll('.word')
        }
    }

    rankFun(){
        if(!this.isType && this.prev){
            if(this.nameInput.value.trim() !== ''){
                this.rankArray.forEach(el=>{
                    if(this.prev.dataset.time == el.time){
                        this.specificTimeFunc(Object.values(el).pop()[0],Object.keys(el).pop())
                    }
                })
            }
        }
    }

    specificTimeFunc = (rankArray,rank)=>{

        let currentObj = {
            name: this.nameInput.value,
            wpm: this.finalResult,
            rawWPM: this.rawResult,
            accuracy: this.accuracy,
            rightWord: this.rightWord,
            wrongWord: this.currentWordIndex+1 - this.rightWord
        }

        if(rankArray){
            let hasAlready = rankArray.find(o=>o.name.trim('') == currentObj.name.trim())
            if(hasAlready == undefined){
                rankArray.push(currentObj)
            }else{ 
                if((currentObj.wpm > hasAlready.wpm) || (currentObj.wpm == hasAlready.wpm && hasAlready.accuracy < currentObj.accuracy)){
                    const i = rankArray.findIndex(x => x.name.trim('') === hasAlready.name.trim(''))
                    rankArray[i] = currentObj
                }
            }
        }else{
            rankArray.push(currentObj)
        }

        localStorage.setItem(`isActiveFor${rank}`,'yes')
        localStorage.setItem(`activeObjFor${rank}`,JSON.stringify(currentObj))
        localStorage.setItem(rank,JSON.stringify(rankArray))
    }

    botTimer(){
        
        let timeDecrase = ()=>{
            if(this.countTime > 0){
                this.currentLetterForBot = 0
                this.currentWordForBot++
                this.setAutoBot()
            }
            
            if(this.countTime == 0){
                clearInterval(this.botTime)
            }
        }
        
        this.botTime =  setInterval(timeDecrase,this.timeForOneWordCross*1000)
    }

    timer(){
        let timeDecrase = ()=>{
            if(this.countTime > 0){
                this.countTime--
                this.instantWPM()
                this.rightWordPerSec = 0
                this.time.innerHTML = this.manageTime(this.countTime)
                this.resultPerSec()
            }

            if(this.countTime == 0){
                this.isTypingStart = false
                this.isType = false
                
                if(this.prev == ''){
                    this.nameInput.classList.add('hidden') 
                    this.restartAfterWin.innerHTML = 'Restart'
                }else{
                    this.nameInput.classList.remove('hidden') 
                    this.restartAfterWin.innerHTML = 'Save and restart'
                }
                
                this.showResult.closest('.result-container').classList.remove('hidden')
                
                this.result()
                this.chartFunc()
                clearInterval(this.myTimer)
            }
        }

        this.myTimer =  setInterval(timeDecrase,1000)
    }

    shuffleArray(array) {
        let len = array.length,
            currentIndex;
        for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
            let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
            var temp = array[currentIndex];
            array[currentIndex] = array[randIndex];
            array[randIndex] = temp;
        }
    }

    selectTime(){
        this.timeOption.forEach(el=>{
            el.addEventListener('click',()=>{
                if(!this.isTypingStart){
                    if(this.prev){
                     this.prev.classList.remove('active')
                    }
                    el.classList.add('active')
                    localStorage.setItem('time',el.dataset.time)
                    this.prev = el
                    this.totalTime = +el.dataset.time
                    this.countTime = this.totalTime
                    this.time.innerHTML = this.manageTime(this.totalTime)
                }
            })
        })
    }

    postionLine(letter,word){
        if(this.currentLetterIndex == -1){
            if(word){
                this.line.style.top = word.getBoundingClientRect().top + 8 + 'px'
                this.line.style.left = word.getBoundingClientRect().left + 6 + 'px'
            }
        }else{
            if(letter){
                this.line.style.top = letter.getBoundingClientRect().top + 'px'
                this.line.style.left = letter.getBoundingClientRect().right + 'px'
            }
        }
    }

    postionLineForBot(word){
        if(word){
            this.lineForBot.style.top = word.offsetTop + 'px'
            this.lineForBot.style.left = word.offsetLeft + 'px'
        }
    }

    scrollPara(paraCon,wordLine){
        let paraTop = paraCon.getBoundingClientRect().top
        let lineTop = wordLine.getBoundingClientRect().top
        if(lineTop - paraTop > this.measure){
            this.scrollUnit = this.scrollUnit - this.measure
            this.para.style.marginTop = this.scrollUnit + 'px'
            this.line.style.top = (lineTop - this.measure) + 8 + 'px'
        }

        if(lineTop < paraTop){
            this.scrollUnit = this.scrollUnit + this.measure
            this.para.style.marginTop = this.scrollUnit + 'px'
            this.line.style.top = (lineTop + this.measure) + 8 + 'px'
        }
    }
    
    startTyping(){

        window.addEventListener('keydown',(e)=>{

            if(e.key !== 'CapsLock'){
                if(e.getModifierState('CapsLock')){
                    this.capLock.classList.remove('hide')
                }else{
                    this.capLock.classList.add('hide')
                }
            }
            if(e.key == 'CapsLock'){
                this.capLock.classList.toggle('hide')
            }
               
            let currentWord = this.word[this.currentWordIndex]
            if( e.code != 'Space' &&
            !this.extraKey.includes(e.key)
            && e.key.length == 1 && this.isType && !this.isPopUpOpen && !this.isautobotPopUpOpen
            ){  

                if(!this.isTypingStart){
                    this.setAutoBot()
                }

                this.line.classList.remove('line-animation')
                this.isTypingStart = true
                this.typeInput.focus()

                if( currentWord &&
                    currentWord.clientWidth < this.para.clientWidth-16 &&
                    this.extraLetter < 20
                  ){

                    this.currentLetterIndex++
                    currentWord = this.word[this.currentWordIndex]

                    let currentWordsLetter = currentWord.children[this.currentLetterIndex]
        
                    if(currentWordsLetter){
                        currentWordsLetter.innerText == e.key ? currentWordsLetter.classList.add('right') : currentWordsLetter.classList.add('wrong')
                    }else{
                        let span = document.createElement('span')
                        span.className = 'wrong extra'
                        span.innerHTML = e.key
                        currentWord.append(span)
                        this.extraLetter = this.word[this.currentWordIndex].querySelectorAll('.extra').length
                    }
                    this.isNext = false
                }

                if(this.isTypingStart && this.isSetInterval){
                    this.timer()
                    if(this.botSpeed > 0){
                        this.botTimer()
                    }
                }
    
                this.isSetInterval = false
            }
        
            if( e.code == 'Space'&&
                this.word[this.currentWordIndex+1] && this.isType && !this.isPopUpOpen && !this.isautobotPopUpOpen
              ){
                
                this.addmoreMoreText()
                this.countable = true
                
                if(
                    this.word[this.currentWordIndex] && 

                    (this.word[this.currentWordIndex].firstChild.classList.contains('wrong') ||
                     this.word[this.currentWordIndex].firstChild.classList.contains('right')
                    )

                    ){

                    if([...this.word[this.currentWordIndex].children].every(el=>el.classList.contains('right'))){
                        this.word[this.currentWordIndex].classList.add('correct-word')

                        if(this.hasCounted == false){
                            this.rightWordPerSec++
                        }

                    }else{
                        this.word[this.currentWordIndex].classList.add('wrong-word')
                    }

                    this.word[this.currentWordIndex].dataset.passedindex = this.currentLetterIndex
                    this.isNext = true
                    this.currentLetterIndex = -1
                    this.currentWordIndex++
                    this.extraLetter = 0
                    this.hasCounted = false
                }
            }
        
            if( e.key == 'Backspace' && this.isType && !this.isPopUpOpen && !this.isautobotPopUpOpen
               ){
        
                if(this.currentLetterIndex > -2){
        
                    let currentWordsLetter = currentWord.children[this.currentLetterIndex]
                    
                    this.currentLetterIndex--
                    this.extraLetter = this.word[this.currentWordIndex].querySelectorAll('.extra').length
                    
                    if(currentWordsLetter){
                        if(currentWordsLetter.classList.contains('extra')){
                            currentWordsLetter.remove()
                        }
            
                        if(currentWordsLetter.classList.contains('wrong')){
                            currentWordsLetter.classList.remove('wrong')
                        }
            
                        if(currentWordsLetter.classList.contains('right')){
                            currentWordsLetter.classList.remove('right')
                        }
                    }
        
                    if(  this.currentLetterIndex == -2 &&
                         !this.isNext
                        ){
                        if(this.currentWordIndex > 0){
                            this.currentWordIndex--
                            this.currentLetterIndex = this.word[this.currentWordIndex].dataset.passedindex
                            this.word[this.currentWordIndex].removeAttribute('data-passedindex')
                        }
                    }
                }
                
                if(this.isNext){
                    this.currentWordIndex--
                    this.currentLetterIndex = this.word[this.currentWordIndex].dataset.passedindex
                    this.word[this.currentWordIndex].removeAttribute('data-passedindex')
                    this.isNext = false
                }
                
                if(this.currentWordIndex == 0 && this.currentLetterIndex == -2){
                    this.currentLetterIndex = -1
                    this.currentWordIndex = 0
                }

                if(this.word[this.currentWordIndex]){
                    this.word[this.currentWordIndex].classList.remove('correct-word','wrong-word')
                }
            }

            if((!this.extraKey.includes(e.key) && this.isTypingStart) || e.key == 'Backspace'){
                this.postionLine(this.word[this.currentWordIndex].children[this.currentLetterIndex],this.word[this.currentWordIndex])
                this.scrollPara(this.paraContainer,this.word[this.currentWordIndex])
            }
        })
    }

    resultPerSec(){
        if([...this.word[this.currentWordIndex].children].every(el => el.classList.contains('right'))){
            this.word[this.currentWordIndex].classList.add('correct-word')
        }
        
        if(
            [...this.word[this.currentWordIndex].children].every(el => el.classList.contains('right') || el.classList.contains('wrong'))
        ){
            if([...this.word[this.currentWordIndex].children].some(el => el.classList.contains('wrong'))){
                this.word[this.currentWordIndex].classList.add('wrong-word')
            }
        }

        let rightWord = document.querySelectorAll('.correct-word').length
        let allWord = document.querySelectorAll('.correct-word,.wrong-word').length
        
        this.wpmGraphData.push(Math.round((rightWord/(this.totalTime-this.countTime))*60))
        this.rawwpmGraphData.push(Math.round((allWord/(this.totalTime-this.countTime))*60))
        this.wpmResultPerSec.innerHTML = this.wpmGraphData[this.wpmGraphData.length-1] + 'wpm'
    }

    instantWPM(){
        if([...this.word[this.currentWordIndex].children].every(el => el.classList.contains('right'))){
            if(this.countable){
                this.rightWordPerSec++
                this.countable = false
                this.hasCounted = true
            }
        }

        this.instantWPMData.push(Math.round((this.rightWordPerSec/1)*60))
    }

    result(){
        
        if(this.word == null){
            return
        }

        if(
            !this.word[this.currentWordIndex].firstChild.classList.contains('right') &&
            !this.word[this.currentWordIndex].firstChild.classList.contains('wrong')
        ){
            this.currentWordIndex = this.currentWordIndex - 1
        }else{
            if([...this.word[this.currentWordIndex].children].every(el => el.classList.contains('right'))){
                this.word[this.currentWordIndex].classList.add('correct-word')
            }
        }
        
        for (let i = 0; i < this.currentWordIndex+1; i++) {
            this.totalLetter += this.word[i].children.length
        }
        
        if(this.word[this.currentWordIndex]){
            for (let i = 0; i < this.word[this.currentWordIndex].children.length; i++) {
                let letter = this.word[this.currentWordIndex].children[i]
                if(letter.className == ''){
                    this.totalLetter--
                }
            }
        }

        this.rightWord = document.querySelectorAll('.correct-word').length
        let rightLetter = this.para.querySelectorAll('.right').length

        this.total_typed_word.innerHTML = this.currentWordIndex+1
        this.right_word.innerHTML = this.rightWord
        this.wrong_word.innerHTML = this.currentWordIndex+1 - this.rightWord
        this.finalResult = Math.round((this.rightWord/this.totalTime)*60)
        this.accuracy = this.totalLetter==0 ? 0 : Math.round((rightLetter/this.totalLetter)*100)
        this.rawResult = this.rawwpmGraphData[this.rawwpmGraphData.length-1]
        this.showResult.innerHTML = this.finalResult
        this.showRawResult.innerHTML = this.rawResult
        this.acurracyDiv.innerHTML = this.accuracy + '%'
    }   
}

let myType = new MyType()
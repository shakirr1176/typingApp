class MyType{
    constructor(){
        this.declaration()
        this.draw()
    }

    declaration(){
        this.allText = 'number/here/because/right/system/well/out/school/another/course/mean/without/they/play/begin/say/seem/or/mean/there/lead/over/from/interest/then/much/we/any/get/line/when/school/there/think/present/long/last/ans/just/each/so/get/fact/much/or/in/order/follow/each/see/this/work/now/group/form/so/life/seem/off/when/see/last/high/few/those/so/against/want/seem/open/old/against/point/person/during/just/such/play/must/between/end/know/if/to/very/long/must/who/like/off/right/come/if/way/we/word/eye/but/want/end/feel/old/good/over/increase/old/such/life/will/word/form/use/head/what/most/seem/even/without/again/who/as/around/give/where/just/look/public/hold/than/most/consider/as/new/a/she/we/through/those/by/than/set/where/about/govern/write/good/some/long/before/like/consider/before/man/do/large/possible/stand/first/a/say/under/people/without/turn/if/feel/plan/also/ask/then/too/might/old/follow/give/open/up/after/system/must/off/seem/write/most/part/present/first/call/between/these/of/right/when/with/last/she/one/develop/come/there/without/stand/before/still/if/make/seem/follow/call/state/down/after/order/help/fact/another/form/see/many/program/since/early/long/public'.split('/')

        this.para = document.querySelector('.para')
        this.paraContainer = document.querySelector('.para-container')
        this.extraKey = ['Control','Shift','Tab','Alt','CapsLock','F2','Insert','Home','PageUp','PageDown','Enter','ContextMenu','ArrowDown','ArrowLeft','ArrowRight','ArrowUp','End','\\','Backspace']
        this.isNext = true;
        this.currentWordIndex = 0
        this.currentLetterIndex = -1
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
        this.time = document.querySelector('.time')
        this.showResult = document.querySelector('.result')
        this.acurracyDiv = document.querySelector('.acurracy')
        this.skill = document.querySelector('.skill')
        this.timeOption = document.querySelectorAll('.times')
        this.prev = localStorage.getItem('time') ? [...this.timeOption].filter(el=> el.dataset.time == localStorage.getItem('time'))[0] : this.timeOption[1]
        this.totalTime = +this.prev.dataset.time
        this.countTime = this.totalTime
        this.measure = 45
        this.scrollUnit = 0
        this.myTimer

        this.fiveSecRankArray = []
        this.fifteenSecRankArray = []
        this.thirtySecRankArray = []
        this.sixtySecRankArray = []
        this.threeHunSecRankArray = []
        this.sixHunSecRankArray = []
        this.eighteenHunSecRankArray = []

        this.finalResult = 0
        this.restart = document.querySelector('.restart')
        this.restartAfterWin = document.querySelector('.restart-after-win')
        this.typeInput = document.querySelector('.type-input')

        this.total_typed_word = document.querySelector('.total-typed-word')
        this.right_word = document.querySelector('.right-word-show')
        this.wrong_word = document.querySelector('.wrong-word-show')
        this.nameInput = document.querySelector('.name-input')
    }

    draw(){
        this.initialize()
        this.selectTime()
        this.startTyping()
        this.restartFunc()
    }
    
    restartFunc(){
        this.restart.addEventListener('click',(e)=>{
            this.declaration()
            this.initialize()
        })

        this.restartAfterWin.addEventListener('click',(e)=>{
            this.rankFun()
            this.restart.click()
        })

    }

    initialize(){
        this.shuffleArray(this.allText)
        this.para.innerHTML = this.allText.join(' ').split(' ').map(el=>`<span class="word">${el.split('').map(x=>`<span>${x}</span>`).join('')}</span>`).join('')
        this.showResult.closest('.result-container').classList.add('hidden')
        this.line.classList.add('line-animation')
        this.typeInput.value = ''
        this.total_typed_word.innerHTML = 0
        this.right_word.innerHTML = 0
        this.wrong_word.innerHTML = 0
        this.nameInput.value = ''
        this.prev.classList.add('active')

        this.fiveSecRankArray = JSON.parse(localStorage.getItem('fiveSecRank')) || []
        this.fifteenSecRankArray = JSON.parse(localStorage.getItem('fifteenSecRank')) || []
        this.thirtySecRankArray = JSON.parse(localStorage.getItem('thirtySecRank')) || []
        this.sixtySecRankArray = JSON.parse(localStorage.getItem('sixtySecRank')) || []
        this.threeHunSecRankArray = JSON.parse(localStorage.getItem('threeHunSecRank')) || []
        this.sixHunSecRankArray = JSON.parse(localStorage.getItem('sixHunSecRank')) || []
        this.eighteenHunSecRankArray = JSON.parse(localStorage.getItem('eighteenHunSecRank')) || []

        this.result()

        this.manageTime(this.countTime)
        this.word = document.querySelectorAll('.word')
        this.para.style.marginTop = null
        this.postionLine(this.word[this.currentWordIndex].children[this.currentLetterIndex],this.word[this.currentWordIndex])
        clearInterval(this.myTimer)
        
        window.addEventListener('resize',()=>{
            this.postionLine(this.word[this.currentWordIndex].children[this.currentLetterIndex],this.word[this.currentWordIndex])
            this.scrollPara(this.paraContainer,this.word[this.currentWordIndex])
        })
        
        window.addEventListener('scroll',()=>{
            this.postionLine(this.word[this.currentWordIndex].children[this.currentLetterIndex],this.word[this.currentWordIndex])
        })
    }

    rankFun(){
        if(!this.isType){
            if(this.nameInput.value.trim() !== ''){

                switch (this.prev.dataset.time) {
                    case '5':
                        this.specificTimeFunc(this.fiveSecRankArray,'fiveSecRank')
                        break;
                    case '30':
                        this.specificTimeFunc(this.thirtySecRankArray,'thirtySecRank')
                        break;
                    case '60':
                        this.specificTimeFunc(this.sixtySecRankArray,'sixtySecRank')
                        break;
                    case '300':
                        this.specificTimeFunc(this.threeHunSecRankArray,'threeHunSecRank')
                        break;
                    case '600':
                        this.specificTimeFunc(this.sixHunSecRankArray,'sixHunSecRank')
                        break;
                    case '1800':
                        this.specificTimeFunc(this.eighteenHunSecRankArray,'eighteenHunSecRank')
                        break;
                    default:
                        this.specificTimeFunc(this.fifteenSecRankArray,'fifteenSecRank')
                        break;
                }
            }
        }
    }

    specificTimeFunc = (rankArray,rank)=>{

        let currentObj = {
            id: rankArray.length+1,
            name: this.nameInput.value,
            wpm: this.finalResult,
            accuracy: this.accuracy
        }

        if(rankArray){
            let hasAlready = rankArray.find(o=>o.name.trim('') == currentObj.name.trim())
            if(hasAlready == undefined){
                rankArray.push(currentObj)
            }else{ 
                if(currentObj.wpm > hasAlready.wpm){
                    const i = rankArray.findIndex(x => x.name.trim('') === hasAlready.name.trim(''))
                    rankArray[i] = currentObj
                }
            }
        }else{
            rankArray.push(currentObj)
        }

        localStorage.setItem(rank,JSON.stringify(rankArray))
    } 

    timer(){
        let timeDecrase = ()=>{
            this.countTime--
            this.manageTime(this.countTime)
            if(this.countTime == 0){
                this.isTypingStart = false
                this.isType = false
                this.showResult.closest('.result-container').classList.remove('hidden')
                this.result()
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
                    this.manageTime(this.totalTime)
                }
            })
        })
    }

    secondsToTime(e){
        const h = Math.floor(e / 3600).toString(),
              m = Math.floor(e % 3600 / 60).toString(),
              s = Math.floor(e % 60).toString();

        return {
            hours:h,
            min: m,
            sec:s
        };
    }

    manageTime(countTime){
        if(this.secondsToTime(countTime).min > 0){
            this.time.innerHTML = `<span>${this.secondsToTime(countTime).min}</span>min <span>${this.secondsToTime(countTime).sec}</span>s`  
        }else if(this.secondsToTime(countTime).hours > 0){
            this.time.innerHTML = `<span>${this.secondsToTime(countTime).hours}</span>hour <span>${this.secondsToTime(countTime).min}</span>min <span>${this.secondsToTime(countTime).sec}</span>s`  
       }else{
            this.time.innerHTML = `<span>${this.secondsToTime(countTime).sec}</span>s`  
       }
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
            let currentWord = this.word[this.currentWordIndex]
            if( e.code != 'Space' &&
            !this.extraKey.includes(e.key)
            && e.key.length == 1 && this.isType
            ){
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
                }
    
                this.isSetInterval = false
            }
        
            if( e.code == 'Space'&&
                this.word[this.currentWordIndex+1] && this.isType
              ){
                if(
                    this.word[this.currentWordIndex] && 

                    (this.word[this.currentWordIndex].firstChild.classList.contains('wrong') ||
                     this.word[this.currentWordIndex].firstChild.classList.contains('right')
                    )

                    ){

                    if([...this.word[this.currentWordIndex].children].every(el=>el.classList.contains('right'))){
                        this.word[this.currentWordIndex].classList.add('correct-word')
                    }else{
                        this.word[this.currentWordIndex].classList.add('wrong-word')
                    }

                    this.word[this.currentWordIndex].dataset.passedindex = this.currentLetterIndex
                    this.isNext = true
                    this.currentLetterIndex = -1
                    this.currentWordIndex++
                    this.extraLetter = 0
                }
            }
        
            if( e.key == 'Backspace' && this.isType
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

        this.rightWord = document.querySelectorAll('.correct-word').length
        
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

        
        this.total_typed_word.innerHTML = this.currentWordIndex+1
        this.right_word.innerHTML = this.rightWord
        this.wrong_word.innerHTML = this.currentWordIndex+1 - this.rightWord
        
        this.finalResult = Math.round((this.rightWord/this.totalTime)*60)
        
        let rightLetter = this.para.querySelectorAll('.right').length

        this.accuracy = this.totalLetter==0 ? 0 : Math.round((rightLetter/this.totalLetter)*100)
        
        switch (true) {
            case this.finalResult>=30 && this.finalResult<40:
                this.skility = 'bellow average'
                break;
            case this.finalResult>=40 && this.finalResult<50:
                this.skility = 'average'
                break;
            case this.finalResult>=50 && this.finalResult<60:
                this.skility = 'semi pro'
                break;
            case this.finalResult>=70 && this.finalResult<80:
                this.skility = 'professional'
                break;
            case this.finalResult>=80 && this.finalResult<100:
                this.skility = 'type master'
                break;
            case this.finalResult>=100 && this.finalResult<200:
                this.skility = 'comepetitive'
                break;
            case this.finalResult>=200:
                this.skility = 'hacker'
                break;
            default:
                this.skility = 'noob'
                break;
        }
    
        this.skill.innerHTML = this.skility
        this.showResult.innerHTML = this.finalResult
        this.acurracyDiv.innerHTML = this.accuracy + '%'
    }   
}

let myType = new MyType()
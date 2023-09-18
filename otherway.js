class MyType{
    constructor(){
        this.declaration()
        this.draw()
    }

    declaration(){
        this.allText = 'number here because right system well out school another course mean without they play begin say seem or mean there lead over from interest then much we any get line when school there think present long last ans just each so get fact much or in order follow each see this work now group form so life seem off when see last high few those so against want seem open old against point person during just such play must between end know if to very long must who like off right come if way we word eye but want end feel old good over increase old such life will word form use head what most seem even without again who as around give where just look public hold than most consider as new a she we through those by than set where about govern write good some long before like consider before man do large possible stand first a say under people without turn if feel plan also ask then too might old follow give open up after system must off seem write most part present first call between these of right when with last she one develop come there without stand before still if make  seem follow call state down after order help fact another form see many program since early long public'.split(' ')
        this.para = document.querySelector('.para')
        this.paraContainer = document.querySelector('.para-container')
        this.extraKey = ['Control','Shift','Tab','Alt','CapsLock','F2','Insert','Home','PageUp','PageDown','Enter','ContextMenu','ArrowDown','ArrowLeft','ArrowRight','ArrowUp','End','\\','Backspace']
        this.isNext = true;
        this.currentWord = null
        this.currentLetter = null
        this.lastWordIndex = 0
        this.isTypingStart = false
        this.isBack = false
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
        this.prev = [...this.timeOption].filter(el=> el.classList.contains('active'))[0]
        this.totalTime = +this.prev.dataset.time
        this.countTime = this.totalTime
        this.measure = 45
        this.scrollUnit = 0
        this.myTimer
        this.restart = document.querySelector('.restart')
        this.restartAfterWin = document.querySelector('.restart-after-win')
        this.typeInput = document.querySelector('.type-input')

        this.total_typed_word = document.querySelector('.total-typed-word')
        this.right_word = document.querySelector('.right-word-show')
        this.wrong_word = document.querySelector('.wrong-word-show')
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
            this.restart.click()
        })

    }

    initialize(){

        this.shuffleArray(this.allText)
        this.para.innerHTML = this.allText.join(' ').split(' ').map(el=>`<span class="word">${el.split('').map(x=>`<span class="letter">${x}</span>`).join('')}</span>`).join('')
        this.currentWord = document.querySelector('.word')

        this.total_typed_word.innerHTML = 0
        this.right_word.innerHTML = 0
        this.wrong_word.innerHTML = 0

        this.result()
        this.word = document.querySelectorAll('.word')
        this.line.classList.add('line-animation')
        this.typeInput.value = ''

        this.currentWord.classList.add('active')
        this.showResult.closest('.result-container').classList.add('hidden')
        this.manageTime(this.countTime)
        this.para.style.marginTop = null
        this.postionLine(this.currentLetter,this.currentWord)
        clearInterval(this.myTimer)

        window.addEventListener('resize',()=>{
            this.postionLine(this.currentLetter,this.currentWord)
            this.scrollPara(this.paraContainer,this.currentWord)
        })

        window.addEventListener('scroll',()=>{
            this.postionLine(this.currentLetter,this.currentWord)
        })
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
        if(!word.querySelector('.active')){
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
            if( e.code != 'Space' &&
            !this.extraKey.includes(e.key)
            && e.key.length == 1 && this.isType
            ){
                this.line.classList.remove('line-animation')
                this.isTypingStart = true
                this.typeInput.focus()

                if( this.currentWord &&
                    this.currentWord.clientWidth < this.para.clientWidth-16 &&
                    this.extraLetter < 20
                  ){

                    if(!this.currentWord.querySelector('.active')){
                        this.currentLetter = this.currentWord.querySelector('.letter')
                        this.currentLetter.classList.add('active')
                    }else{
                        this.currentLetter.classList.remove('active')
                        this.currentLetter = this.currentLetter.nextElementSibling
                    }
        
                    if(this.currentLetter){
                        this.currentLetter.classList.add('active')
                        this.currentLetter.innerText == e.key ? this.currentLetter.classList.add('right') : this.currentLetter.classList.add('wrong')
                    }else{
                        let span = document.createElement('span')
                        span.classList.add('wrong','extra','active')
                        span.innerHTML = e.key
                        this.currentWord.append(span)
                        this.extraLetter = this.currentWord.querySelectorAll('.extra').length

                        this.currentLetter = span
                    }
                    this.isNext = false
                }

                if(this.isTypingStart && this.isSetInterval){
                    this.timer()
                }
    
                this.isSetInterval = false
            }
        
            if( e.code == 'Space'&& this.currentWord.nextElementSibling && this.isType
              ){
                if(
                    this.currentWord && 
                    (this.currentWord.firstChild.classList.contains('wrong') ||
                     this.currentWord.firstChild.classList.contains('right')
                    )
                ){
                    if([...this.currentWord.children].every(el=>el.classList.contains('right'))){
                        this.currentWord.classList.add('correct-word')
                    }else{
                        this.currentWord.classList.add('wrong-word')
                    }

                    this.currentLetter.classList.remove('active')
                    this.currentWord.classList.remove('active')
                    this.currentWord.dataset.datapassed = [...this.currentWord.children].indexOf(this.currentLetter)
                    this.currentWord = this.currentWord.nextElementSibling
                    this.currentWord.classList.add('active')
                    this.isNext = true
                    this.extraLetter = 0
                }
            }
        
            if( e.key == 'Backspace' && this.isType
               ){
                    if(this.currentWord){   
                        this.extraLetter = this.currentWord.querySelectorAll('.extra').length
                    }
                    
                    if(!this.currentLetter &&
                        !this.currentWord.querySelector('.active') &&
                        !document.querySelectorAll('.word')[0].classList.contains('active')
                        ){
                        this.isBack = true
                    }

                    let currentLetter = this.currentLetter

                    if(this.currentLetter && !this.isNext){

                        this.currentLetter = this.currentLetter.previousElementSibling

                        if(this.currentLetter){
                            this.currentLetter.classList.add('active')
                        }

                        currentLetter.classList.remove('active')

                        if(currentLetter.classList.contains('extra')){
                            currentLetter.remove()
                        }
            
                        if(currentLetter.classList.contains('wrong')){
                            currentLetter.classList.remove('wrong')
                        }
            
                        if(currentLetter.classList.contains('right')){
                            currentLetter.classList.remove('right')
                        }
                        
                    }
                    
                    let nextWordShift = ()=>{
                        this.currentWord.classList.remove('active')
                        this.currentWord.removeAttribute('data-datapassed')
                        this.currentWord = this.currentWord.previousElementSibling
                        this.currentWord.classList.add('active')
                        this.currentLetter = this.currentWord.children[this.currentWord.dataset.datapassed]
                        this.currentLetter.classList.add('active')
                    }

                    if(this.isBack == true && !this.isNext){
                        this.isBack = false
                        nextWordShift()
                    }

                    if(this.isNext && !document.querySelectorAll('.word')[0].classList.contains('active')){
                        this.isNext = false
                        nextWordShift()
                    }

                    if(this.currentWord){
                        this.currentWord.classList.remove('correct-word','wrong-word')
                    }
            }

            if((!this.extraKey.includes(e.key) && this.isTypingStart) || e.key == 'Backspace'){
                this.postionLine(this.currentLetter,this.currentWord)
                this.scrollPara(this.paraContainer,this.currentWord)
            }
        })
    }

    result(){

        if(this.word == null){
            return
        }

        this.lastWordIndex = [...this.para.children].indexOf(this.currentWord)

        this.rightWord = document.querySelectorAll('.correct-word').length

        if(
            !this.word[this.lastWordIndex].firstChild.classList.contains('right') &&
            !this.word[this.lastWordIndex].firstChild.classList.contains('wrong')
        ){
            this.lastWordIndex = this.lastWordIndex - 1
        }

        this.total_typed_word.innerHTML = this.lastWordIndex+1
        this.right_word.innerHTML = this.rightWord
        this.wrong_word.innerHTML = this.lastWordIndex+1 - this.rightWord
        
        for (let i = 0; i < this.lastWordIndex+1; i++) {
          this.totalLetter += this.word[i].children.length
        }


        if(this.word[this.lastWordIndex]){
            for (let i = 0; i < this.word[this.lastWordIndex].children.length; i++) {
                let letter = this.word[this.lastWordIndex].children[i]
                if(letter.className == 'letter'){
                    this.totalLetter--
                }
            }
        }

        let finalResult = Math.round((this.rightWord/this.totalTime)*60)

        let rightLetter = this.para.querySelectorAll('.right').length

        this.accuracy = this.totalLetter==0 ? 0 : Math.round((rightLetter/this.totalLetter)*100)
        
        switch (true) {
            case finalResult>=30 && finalResult<40:
                this.skility = 'bellow average'
                break;
            case finalResult>=40 && finalResult<50:
                this.skility = 'average'
                break;
            case finalResult>=50 && finalResult<60:
                this.skility = 'semi pro'
                break;
            case finalResult>=70 && finalResult<80:
                this.skility = 'professional'
                break;
            case finalResult>=80 && finalResult<100:
                this.skility = 'type master'
                break;
            case finalResult>=100 && finalResult<200:
                this.skility = 'comepetitive'
                break;
            case finalResult>=200:
                this.skility = 'hacker'
                break;
            default:
                this.skility = 'noob'
                break;
        }
    
        this.skill.innerHTML = this.skility
        this.showResult.innerHTML = finalResult
        this.acurracyDiv.innerHTML = this.accuracy + '%'
    }
}

let myType = new MyType()
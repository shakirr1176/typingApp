class MyType{
    constructor(){
        this.declaration()
        this.initialize()
    }

    declaration(){
        this.allText = 'number here because right system well out school another course mean without they play begin say seem or mean there lead over from interest then much we any get line when school there think present long last ans just each so get fact much or in order follow each see this work now group form so life seem off when see last high few those so against want seem open old against point person during just such play must between end know if to very long must who like off right come if way we word eye but want end feel old good over increase old such life will word form use head what most seem even without again who as around give where just look public hold than most consider as new a she we through those by than set where about govern write'.split(' ')
        this.para = document.querySelector('.para')
        this.paraContainer = document.querySelector('.para-container')
        this.extraKey = ['Control','Shift','Tab','Alt','CapsLock','F2','Insert','Home','PageUp','PageDown','Enter','ContextMenu','ArrowDown','ArrowLeft','ArrowRight','ArrowUp','End','\\','Backspace']
        this.isNext = true;
        this.currentWordIndex = 0
        this.currentLetterIndex = -1
        this.isTypingStart = false
        this.typing = true

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

        this.restart = document.querySelector('.restart')
        this.restartAfterWin = document.querySelector('.restart-after-win')
    }

    initialize(){
        this.puttingWord()
        this.startTyping()
        this.restartFunc()
    }

    restartFunc(){
        this.restart.addEventListener('click',()=>{
            this.declaration()
            this.puttingWord()
            this.startTyping()
        })
    }

    puttingWord(){

        this.shuffleArray(this.allText)
        this.para.innerHTML = this.allText.join(' ').split(' ').map(el=>`<span class="word">${el.split('').map(x=>`<span>${x}</span>`).join('')}</span>`).join('')
        this.showResult.closest('.result-container').classList.add('hidden')

        this.manageTime(this.countTime)
        this.selectTime()
        let word = document.querySelectorAll('.word')
        this.postionLine(word[this.currentWordIndex].children[this.currentLetterIndex],word[this.currentWordIndex])

        window.addEventListener('resize',()=>{
            this.postionLine(word[this.currentWordIndex].children[this.currentLetterIndex],word[this.currentWordIndex])
            this.scrollPara(this.paraContainer,word[this.currentWordIndex])
        })
        
        window.addEventListener('scroll',()=>{
            this.postionLine(word[this.currentWordIndex].children[this.currentLetterIndex],word[this.currentWordIndex])
        })

        
    }

    timer(){
        let timeDecrase = ()=>{
            this.countTime--
            this.manageTime(this.countTime)
            if(this.countTime == 0){
                this.isTypingStart = false
                this.result()
                clearInterval(myTimer)
            }
        }

        let myTimer =  setInterval(timeDecrase,1000)
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
        console.log(lineTop , paraTop);
        if(lineTop < paraTop){
            this.scrollUnit = this.scrollUnit + this.measure
            this.para.style.marginTop = this.scrollUnit + 'px'
            this.line.style.top = (lineTop + this.measure) + 8 + 'px'
        }
    }

    startTyping(){
        let word = document.querySelectorAll('.word')
        addEventListener('keydown',(e)=>{
            let currentWord = word[this.currentWordIndex]
            
            if( e.code != 'Space' &&
            !this.extraKey.includes(e.key)
            && e.key.length == 1
            ){
                this.isTypingStart = true

                if( currentWord &&
                    currentWord.clientWidth < this.para.clientWidth-16 &&
                    this.extraLetter < 20 &&
                    this.isTypingStart
                  ){
        
                    this.currentLetterIndex++
                    currentWord = word[this.currentWordIndex]
        
                    let currentWordsLetter = currentWord.children[this.currentLetterIndex]
        
                    if(currentWordsLetter){
                        currentWordsLetter.innerText == e.key ? currentWordsLetter.classList.add('right') : currentWordsLetter.classList.add('wrong')
                    }else{
                        let span = document.createElement('span')
                        span.className = 'wrong extra'
                        span.innerHTML = e.key
                        currentWord.append(span)
                        this.extraLetter = word[this.currentWordIndex].querySelectorAll('.extra').length
                    }
                    this.isNext = false
                }

                if(this.isTypingStart && this.typing){
                    this.timer()
                }
    
                this.typing = false
            }
        
            if( e.code == 'Space'&&
                word[this.currentWordIndex+1]&&
                this.isTypingStart
              ){
                if(this.isNext == false){
                    word[this.currentWordIndex].dataset.passedindex = this.currentLetterIndex
                    this.isNext = true
                    this.currentLetterIndex = -1
                    this.currentWordIndex++
                    this.extraLetter = 0
                }
            }
        
            if( e.key == 'Backspace'&&
                this.isTypingStart
               ){
        
                if(this.currentLetterIndex > -2){
        
                    let currentWordsLetter = currentWord.children[this.currentLetterIndex]
                    
                    this.currentLetterIndex--
        
                    this.extraLetter = word[this.currentWordIndex].querySelectorAll('.extra').length
                    
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
                            this.currentLetterIndex = word[this.currentWordIndex].dataset.passedindex
                            word[this.currentWordIndex].removeAttribute('data-passedindex')
                        }
                    }
                }
                
                if(this.isNext){
                    this.currentWordIndex--
                    this.currentLetterIndex = word[this.currentWordIndex].dataset.passedindex
                    word[this.currentWordIndex].removeAttribute('data-passedindex')
                    this.isNext = false
                }
                
                if(this.currentWordIndex == 0 && this.currentLetterIndex == -2){
                    this.currentLetterIndex = -1
                    this.currentWordIndex = 0
                }
            }
        
            this.postionLine(word[this.currentWordIndex].children[this.currentLetterIndex],word[this.currentWordIndex])
            this.scrollPara(this.paraContainer,word[this.currentWordIndex])
        })
    }

    result(){
        let word = document.querySelectorAll('.word')
        for (let i = 0; i < this.currentWordIndex+1; i++) {
          let isAll =   [...word[i].children].every(el=>{
            return el.classList.contains('right')
          })
    
          if(isAll){
            this.rightWord++
          }
    
          this.totalLetter += word[i].children.length
        }
    
        this.showResult.closest('.result-container').classList.remove('hidden')
        let finalResult = Math.round((this.rightWord/this.totalTime)*60)
        this.showResult.innerHTML = finalResult
    
        let rightLetter = this.para.querySelectorAll('.right').length
        this.accuracy = Math.round((rightLetter/this.totalLetter)*100)
        this.acurracyDiv.innerHTML = this.accuracy + '%'
    
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
    }
    
}

let myType = new MyType()
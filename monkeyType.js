let allText = 'number here because right system well out school another course mean without they play begin say seem or mean there lead over from interest then much we any get line when school there think present long last ans just each so get fact much or in order follow each see this work now group form so life seem off when see last high few those so against want seem open old against point person during just such play must between end know if to very long must who like off right come if way we word eye but want end feel old good over increase old such life will word form use head what most seem even without again who as around give where just look public hold than most consider as new a she we through those by than set where about govern write'.split(' ')

function shuffleArray(array) {
    let len = array.length,
        currentIndex;
    for (currentIndex = len - 1; currentIndex > 0; currentIndex--) {
        let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
        var temp = array[currentIndex];
        array[currentIndex] = array[randIndex];
        array[randIndex] = temp;
    }
}

shuffleArray(allText)

let text = allText.join(' ')

let para = document.querySelector('.para')
let paraContainer = document.querySelector('.para-container')

let extraKey = ['Control','Shift','Tab','Alt','CapsLock','F2','Insert','Home','PageUp','PageDown','Enter','ContextMenu','ArrowDown','ArrowLeft','ArrowRight','ArrowUp','End','\\','Backspace']

para.innerHTML = text.split(' ').map(el=>`<span class="word">${el.split('').map(x=>`<span>${x}</span>`).join('')}</span>`).join('')

let word = document.querySelectorAll('.word')

let isNext = true;
let currentWordIndex = 0
let currentLetterIndex = -1
let isTypingStart = false
let typing = true

let accuracy = 0;
let rightWord = 0
let totalLetter = 0
let skility;
let extraLetter = 0

let line = document.querySelector('.line')
let time = document.querySelector('.time')
let showResult = document.querySelector('.result')
let acurracyDiv = document.querySelector('.acurracy')
let skill = document.querySelector('.skill')
let timeOption = document.querySelectorAll('.times')

showResult.closest('.result-container').classList.add('hidden')
let prev = [...timeOption].filter(el=> el.classList.contains('active'))[0]

let totalTime = +prev.dataset.time
let countTime = totalTime

timeOption.forEach(el=>{
    el.addEventListener('click',()=>{
        if(!isTypingStart){
            if(prev){
             prev.classList.remove('active')
            }
            
            el.classList.add('active')
            prev = el
     
            totalTime = +el.dataset.time
            countTime = totalTime
     
            manageTime(countTime)
        }
    })
})

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

function manageTime(countTime){
    if(secondsToTime(countTime).min > 0){
        time.innerHTML = `<span>${secondsToTime(countTime).min}</span>min <span>${secondsToTime(countTime).sec}</span>s`  
    }else if(secondsToTime(countTime).hours > 0){
        time.innerHTML = `<span>${secondsToTime(countTime).hours}</span>hour <span>${secondsToTime(countTime).min}</span>min <span>${secondsToTime(countTime).sec}</span>s`  
   }else{
        time.innerHTML = `<span>${secondsToTime(countTime).sec}</span>s`  
   }
}

let myTimer = setInterval(timeDecrase,1000)

function timeDecrase (){
    if(isTypingStart && typing){
        countTime--
        manageTime(countTime)
        if(countTime == 0){
            typing = false
            isTypingStart = false
            result()
            clearInterval(myTimer)
        }
    }
}

manageTime(countTime)

function result(){
    for (let i = 0; i < currentWordIndex+1; i++) {
      let isAll =   [...word[i].children].every(el=>{
        return el.classList.contains('right')
      })

      if(isAll){
        rightWord++
      }

      totalLetter += word[i].children.length
    }

    showResult.closest('.result-container').classList.remove('hidden')
    let finalResult = Math.round((rightWord/totalTime)*60)
    showResult.innerHTML = finalResult

    let rightLetter = para.querySelectorAll('.right').length
    accuracy = Math.round((rightLetter/totalLetter)*100)
    acurracyDiv.innerHTML = accuracy + '%'

    switch (true) {
        case finalResult>=30 && finalResult<40:
            skility = 'bellow average'
            break;
        case finalResult>=40 && finalResult<50:
            skility = 'average'
            break;
        case finalResult>=50 && finalResult<60:
            skility = 'semi pro'
            break;
        case finalResult>=70 && finalResult<80:
            skility = 'professional'
            break;
        case finalResult>=80 && finalResult<100:
            skility = 'type master'
            break;
        case finalResult>=100 && finalResult<200:
            skility = 'comepetitive'
            break;
        case finalResult>=200:
            skility = 'hacker'
            break;
        default:
            skility = 'noob'
            break;
    }

    skill.innerHTML = skility
}

function postionLine(letter,word){
    if(currentLetterIndex == -1){
        if(word){
            line.style.top = word.getBoundingClientRect().top + 8 + 'px'
            line.style.left = word.getBoundingClientRect().left + 6 + 'px'
        }
    }else{
        if(letter){
            line.style.top = letter.getBoundingClientRect().top + 'px'
            line.style.left = letter.getBoundingClientRect().right + 'px'
        }
    }
}

let measure = 45

let scrollUnit = 0

function scrollPara(paraCon,wordLine){
    
    let paraTop = paraCon.getBoundingClientRect().top
    let lineTop = wordLine.getBoundingClientRect().top

    if(lineTop - paraTop > measure){
        scrollUnit = scrollUnit - measure
        para.style.marginTop = scrollUnit + 'px'
        line.style.top = (lineTop - measure) + 8 + 'px'
    }
    
    if(lineTop < paraTop){
        scrollUnit = scrollUnit + measure
        para.style.marginTop = scrollUnit + 'px'
        line.style.top = (lineTop + measure) + 8 + 'px'
    }
}

postionLine(word[currentWordIndex].children[currentLetterIndex],word[currentWordIndex])

window.addEventListener('resize',()=>{
    postionLine(word[currentWordIndex].children[currentLetterIndex],word[currentWordIndex])
    scrollPara(paraContainer,word[currentWordIndex])
})

window.addEventListener('scroll',()=>{
    postionLine(word[currentWordIndex].children[currentLetterIndex],word[currentWordIndex])
})

addEventListener('keydown',(e)=>{
    
    let currentWord = word[currentWordIndex]

    if( e.code != 'Space' &&
        !extraKey.includes(e.key)
        && e.key.length == 1
       ){

        isTypingStart = true

        if( currentWord &&
            currentWord.clientWidth < para.clientWidth-16 &&
            extraLetter < 20 &&
            isTypingStart &&
            typing
          ){

            currentLetterIndex++
            currentWord = word[currentWordIndex]

            let currentWordsLetter = currentWord.children[currentLetterIndex]

            if(currentWordsLetter){
                currentWordsLetter.innerText == e.key ? currentWordsLetter.classList.add('right') : currentWordsLetter.classList.add('wrong')
            }else{
                let span = document.createElement('span')
                span.className = 'wrong extra'
                span.innerHTML = e.key
                currentWord.append(span)
                extraLetter = word[currentWordIndex].querySelectorAll('.extra').length
            }
            isNext = false
        }
    }

    if( e.code == 'Space'&&
        word[currentWordIndex+1]&&
        isTypingStart && typing
      ){
        if(isNext == false){
            word[currentWordIndex].dataset.passedindex = currentLetterIndex
            isNext = true
            currentLetterIndex = -1
            currentWordIndex++
            extraLetter = 0
        }
    }

    if( e.key == 'Backspace'&&
        isTypingStart&&
        typing
       ){

        if(currentLetterIndex > -2){

            let currentWordsLetter = currentWord.children[currentLetterIndex]
            
            currentLetterIndex--

            extraLetter = word[currentWordIndex].querySelectorAll('.extra').length
            
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

            if(  currentLetterIndex == -2&&
                 !isNext
                ){
                if(currentWordIndex > 0){
                    currentWordIndex--
                    currentLetterIndex = word[currentWordIndex].dataset.passedindex
                    word[currentWordIndex].removeAttribute('data-passedindex')
                }
            }
        }
        
        if(isNext){
            currentWordIndex--
            currentLetterIndex = word[currentWordIndex].dataset.passedindex
            word[currentWordIndex].removeAttribute('data-passedindex')
            isNext = false
        }
        
        if(currentWordIndex == 0 && currentLetterIndex == -2){
            currentLetterIndex = -1
            currentWordIndex = 0
        }
    }

    postionLine(word[currentWordIndex].children[currentLetterIndex],word[currentWordIndex])
    scrollPara(paraContainer,word[currentWordIndex])
})

let restart = document.querySelector('.restart')
let restartAfterWin = document.querySelector('.restart-after-win')

restart.addEventListener('click',()=>{
    location.reload()
})

restartAfterWin.addEventListener('click',()=>{
    location.reload()
})

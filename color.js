

let bringColor = document.querySelector('.bring-color')
let allColor = document.querySelector('.all-color')
let primaryColorTem = document.querySelector('.primary-color-tem')

let primaryColors = ['#e2b714','#28ae60','#f57900','#ef2929','#ad7fa8','#3465a4']

if(localStorage.getItem('p-color')){
    document.documentElement.style.setProperty('--primary', localStorage.getItem('p-color'))
}else{
    document.documentElement.style.setProperty('--primary', primaryColors[1])
}

if(bringColor && allColor && primaryColorTem){

    primaryColors.forEach(el=>{
        let div = document.createElement('div')
        div.className = 'p-color-con'
        div.innerHTML = ` <div class="p-color" style="background:${el}"></div>`
        primaryColorTem.append(div)
    })

    let pColor = document.querySelectorAll('.p-color')

    pColor.forEach(el=>{
        el.addEventListener('click',()=>{
            document.documentElement.style.setProperty('--primary', getComputedStyle(el).background)
            localStorage.setItem('p-color',getComputedStyle(el).background)
        })
    })

    bringColor.addEventListener('click',()=>{
        if(!allColor.style.height || allColor.style.height == '0px'){
            allColor.style.height = allColor.scrollHeight + 'px'
            bringColor.querySelector('svg').classList.add('setting')
        }else{
            bringColor.querySelector('svg').classList.remove('setting')
            allColor.style.height = '0px'
        }
    })
    
    window.addEventListener('click',(e)=>{
        if (!e.target.closest('.color-change')) {
            bringColor.querySelector('svg').classList.remove('setting')
            allColor.style.height = '0px'
        }
    })

}


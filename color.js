
let colorChange = document.querySelector('.color-change')

let primaryColors = ['#e2b714','#28ae60','#f57900','#ef2929','#ad7fa8','#3465a4']
let backgroundColor = ['#27282b','#36475c','#2e1a47','#0f1f2c','#000000','#0b1e1a']

if(localStorage.getItem('p-color')){
    document.documentElement.style.setProperty('--primary', localStorage.getItem('p-color'))
}else{
    document.documentElement.style.setProperty('--primary', primaryColors[1])
}

if(localStorage.getItem('bg-color')){
    document.documentElement.style.setProperty('--bgColor', localStorage.getItem('bg-color'))
}else{
    document.documentElement.style.setProperty('--bgColor', backgroundColor[0])
}

if(colorChange){

    let bringColor = colorChange.querySelector('.bring-color')
    let allColor = colorChange.querySelector('.all-color')
    let primaryColorTem = colorChange.querySelector('.primary-color-tem')
    let backgroundColorTem = colorChange.querySelector('.background-color-tem')
    let pColorChang = colorChange.querySelector('.p-color-chang')
    let bgColorChang = colorChange.querySelector('.bg-color-chang')

    pColorChang.addEventListener('change',()=>{
        document.documentElement.style.setProperty('--primary', pColorChang.value)
        localStorage.setItem('p-color',pColorChang.value)
    })
    bgColorChang.addEventListener('change',()=>{
        document.documentElement.style.setProperty('--bgColor', bgColorChang.value)
        localStorage.setItem('bgColor',bgColorChang.value)
    })

    primaryColors.forEach(el=>{
        let div = document.createElement('div')
        div.className = 'color-con'
        div.innerHTML = ` <div class="p-color" style="background:${el}"></div>`
        primaryColorTem.append(div)
    })

    backgroundColor.forEach(el=>{
        let div = document.createElement('div')
        div.className = 'color-con'
        div.innerHTML = ` <div class="bg-color" style="background:${el}"></div>`
        backgroundColorTem.append(div)
    })

    let pColor = document.querySelectorAll('.p-color')
    let bgColor = document.querySelectorAll('.bg-color')

    pColor.forEach(el=>{
        el.addEventListener('click',()=>{
            setColor(el,'--primary','p-color')
        })
    })

    bgColor.forEach(el=>{
        el.addEventListener('click',()=>{
            setColor(el,'--bgColor','bg-color')
        })
    })

    function setColor(el,baseColor,color){
        document.documentElement.style.setProperty(baseColor, getComputedStyle(el).background)
        localStorage.setItem(color,getComputedStyle(el).background)
    }

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


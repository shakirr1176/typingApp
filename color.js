
let colorChange = document.querySelector('.color-change')

let primaryColors = ['#e2b714','#28ae60','#f57900','#ef2929','#ad7fa8','#3465a4']

let bgColors = ['#323437','#1A374D','#2f3537','#0B212F','#06283D','#545652','#493636','#322a2a','#451952','#186F65','#5F264A','#37306B','#2A0944','#313552','#4A403A','#214252','#181D50']

if(localStorage.getItem('p-color')){
    document.documentElement.style.setProperty('--primary', localStorage.getItem('p-color'))
}else{
    document.documentElement.style.setProperty('--primary', primaryColors[1])
}

let rootName = ['--commonColor-h','--commonColor-s','--commonColor-l']

setColorOnload()

function setColorOnload(){
    rootName.forEach(el=>{
        if(localStorage.getItem(el)){
            document.documentElement.style.setProperty(el, localStorage.getItem(el))
        }
    })
}  

if(colorChange){
    let bringColor = colorChange.querySelector('.bring-color')
    let allColor = colorChange.querySelector('.all-color')
    let primaryColorTem = colorChange.querySelector('.primary-color-tem')
    let bgColorTem = colorChange.querySelector('.bg-color-tem')
    let pColorChang = colorChange.querySelector('.p-color-chang')

    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length == 1 ? "0" + hex : hex;
      }
      
      const rgbToHex = (r, g, b) => {
        return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
      }

    pColorChang.addEventListener('change',()=>{
        document.documentElement.style.setProperty('--primary', pColorChang.value)
        localStorage.setItem('p-color',pColorChang.value)
    })

    if(localStorage.getItem('p-color') && localStorage.getItem('p-color').includes('#')){
        pColorChang.value = localStorage.getItem('p-color')
    }else{
        if(localStorage.getItem('p-color')){
            let onloadColor = localStorage.getItem('p-color').slice(4,-1).split(',').map(el=> Number(el))
            pColorChang.value = rgbToHex(...onloadColor)
        }
    }

    function setColorToDoc(color){
        rootName.forEach((el,i)=>{
            document.documentElement.style.setProperty(el, color[i])
            localStorage.setItem(el,color[i])
        })
    }

    function hexToCssHsl(hex, valuesOnly = false) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        var cssString = '';
        r /= 255, g /= 255, b /= 255;
        var max = Math.max(r, g, b), min = Math.min(r, g, b);
        var h, s, l = (max + min) / 2;
        if (max == min) {
          h = s = 0; // achromatic
        } else {
          var d = max - min;
          s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
          switch(max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
          }
          h /= 6;
        }
        
        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);
        
        return [h, s+'%', l+'%'];
      }

    primaryColors.forEach(el=>{
        let div = document.createElement('div')
        div.className = 'color-con'
        div.innerHTML = ` <div class="p-color" style="background:${el}"></div>`
        primaryColorTem.append(div)
    })

    bgColors.forEach(el=>{
        let div = document.createElement('div')
        div.className = 'color-con'
        div.innerHTML = ` <div class="bg-color" style="background:${el}"></div>`
        bgColorTem.append(div)
    })

    let pColor = document.querySelectorAll('.p-color')
    let bgColor = document.querySelectorAll('.bg-color')

    bgColor.forEach((el,i)=>{
        el.addEventListener('click',()=>{
            localStorage.setItem('bgGex',bgColors[i])
            let color = hexToCssHsl(bgColors[i])
            setColorToDoc(color)
        })
    })

    pColor.forEach(el=>{
        el.addEventListener('click',()=>{
            setColor(el,'--primary','p-color')
        })
    })

    function setColor(el,baseColor,color){
        document.documentElement.style.setProperty(baseColor, getComputedStyle(el).background)
        localStorage.setItem(color,getComputedStyle(el).background)

        let onloadColor = localStorage.getItem(color).slice(4,-1).split(',').map(el=> Number(el))
        pColorChang.value = rgbToHex(...onloadColor)
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
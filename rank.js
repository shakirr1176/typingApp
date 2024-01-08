import {data,timeMange} from './data.js'

let allTemplate = data
let selectedRow
let rankArray

let tableMain = document.querySelector('#table-main')
let confirmDelete = document.querySelector('.confirm-delete')
let cancelBtn = document.querySelector('.cancel-btn')
let confirmDeleteBtn = document.querySelector('.confirm-delete-btn')
let confirmInput = confirmDelete.querySelector('input')
let errorMsg = document.querySelector('.error-msg')
let userName = document.querySelector('.user-name')
let paggination = document.querySelector('.paggination')
let pagginatioNumberDiv = document.querySelector('.pagginatio-number')
let prev = document.querySelector('.prev')
let next = document.querySelector('.next')
let paggBtn;

let firstBtn = document.querySelector('.first-list-btn')
let lastBtn = document.querySelector('.last-list-btn')

tableMain.innerHTML = localStorage.getItem('time') && timeMange.some(el=>el.time == localStorage.getItem('time')) ? allTemplate.find(x=> x.id == localStorage.getItem('time')).template : allTemplate[1].template

    let currentTemple = allTemplate.find(x=> x.id == localStorage.getItem('time')) ? allTemplate.find(x=> x.id == localStorage.getItem('time')) : allTemplate[1]
    
    let limit = 10
    let maxPaggNum = 3
    
    let nextPrevValue = localStorage.getItem('nextPrev'+currentTemple.name) ? +localStorage.getItem('nextPrev'+currentTemple.name) : 0
    let hold;

    if(currentTemple){
        let tableDiv = document.querySelector(`.${currentTemple.name}`)
        let activeRowObj = localStorage.getItem(`activeObjFor${currentTemple.date}`) ? JSON.parse(localStorage.getItem(`activeObjFor${currentTemple.date}`)) : null
        let allData = JSON.parse(localStorage.getItem(currentTemple.storageName)) ? JSON.parse(localStorage.getItem(currentTemple.storageName)) : []
        if(tableDiv){

            function sortinAllData(allData){
                if(allData){
                    allData.sort((y, x) => {
                        if(x.wpm > y.wpm){
                            return x.wpm - y.wpm
                        }
                        if(x.wpm == y.wpm){
                            return x.accuracy - y.accuracy
                        }
                        return 0
                    });
                }
            }

            sortinAllData(allData)

            if( activeRowObj && localStorage.getItem(`isActiveFor${currentTemple.storageName}`) &&
                localStorage.getItem(`isActiveFor${currentTemple.storageName}`) == 'yes'
             ){
                let crrPos = allData.findIndex(p=>p.date == activeRowObj.date)
                nextPrevValue = Math.floor(crrPos/limit)*limit
            }

            if(nextPrevValue%limit !== 0){
                nextPrevValue = 0
                localStorage.setItem('nextPrev'+currentTemple.name,'0')
                allTableSet()
            }

            paggination.addEventListener('click',(e)=>{

                if(e.target.classList.contains('prev') && nextPrevValue !== 0 && nextPrevValue > 0){
                    nextPrevValue = nextPrevValue - limit
                    setAllForPaggBtn()
                }
                
                if(e.target.classList.contains('next') && nextPrevValue < allData.length-limit){
                    nextPrevValue = nextPrevValue + limit
                    setAllForPaggBtn()
                }
                if(e.target.closest('.first-list-btn')){
                    nextPrevValue = 0
                    setAllForPaggBtn()
                }
                if(e.target.closest('.last-list-btn')){
                    nextPrevValue = Math.floor(allData.length/limit)*limit
                    setAllForPaggBtn()
                }
            })

            function setAllForPaggBtn(){
                localStorage.setItem('nextPrev'+currentTemple.name,nextPrevValue)
                localStorage.setItem(`isActiveFor${currentTemple.storageName}`,'no')
                controlNumberPagg()

               

                allTableSet()
            }

            controlNumberPagg()

            function controlNumberPagg(){
                hold = Math.floor((nextPrevValue/limit)/maxPaggNum)*maxPaggNum
            }

            tableDiv.addEventListener('click',(e)=>{
                if(e.target.closest('.delete-btn')){
                    openModal(e.target)
                }
            })

            function openModal(e){
                selectedRow = e
                confirmDelete.classList.remove('hide')
                let i = allData.findIndex(x=> x.id == selectedRow.closest('tr').id)
                userName.innerHTML = "Delete " + allData[i].name + '-' + allData[i].wpm + 'wpm' + '?'
            }

            function deleteRow(){
                let i = allData.findIndex(x=> x.id == selectedRow.closest('tr').id)
                let rankArrayIndex = rankArray.findIndex(x=> x.id == selectedRow.closest('tr').id)
               
                if( 
                    (allData[i].name.trim().toLocaleLowerCase().length <= 3 && allData[i].name.trim().toLocaleLowerCase() == confirmInput.value.trim()) 
                    || 
                    (confirmInput.value.trim().length > 3 && confirmInput.value.trim().toLocaleLowerCase() == allData[i].name.trim().toLocaleLowerCase().slice(0,confirmInput.value.trim().length))){
                    selectedRow.closest('tr').remove()
                    allData.splice(i,1)
                    rankArray.splice(rankArrayIndex,1)
                    localStorage.setItem(currentTemple.storageName,JSON.stringify(allData))

                    if(rankArray.length == 0){
                        nextPrevValue = nextPrevValue - limit
                        localStorage.setItem('nextPrev'+currentTemple.name,nextPrevValue)

                    }
                    allTableSet()
                    closeModal()
                }else{
                    errorMsg.classList.remove('hide')
                }
            }

            confirmDeleteBtn.addEventListener('click',()=>{
                deleteRow()
            })
            
            confirmInput.addEventListener('keypress',(e)=>{
                if(e.key == 'Enter'){
                    deleteRow()
                }
            })
            
            function closeModal(){
                confirmInput.value = ''
                errorMsg.classList.add('hide')
                selectedRow = ''
                userName.innerHTML = ''
                confirmDelete.classList.add('hide')
            }

            cancelBtn.addEventListener('click',()=>{
                closeModal()
            })

            function activePaggNum(paggBtn){
                if(paggBtn[(nextPrevValue/limit) % maxPaggNum]){
                    paggBtn[(nextPrevValue/limit) % maxPaggNum].classList.add('pagg-num-active')
                }
            }

            function numberPaggFunc(index) {
                nextPrevValue = limit*index
                localStorage.setItem('nextPrev'+currentTemple.name,nextPrevValue)
                allTableSet()
            }
            controlNumberPagg()

            allTableSet()

            function allTableSet(){
                if(!tableDiv) return
            
                sortinAllData(allData)

                let paggStartNum = Math.ceil(allData.length/limit)
                pagginatioNumberDiv.innerHTML = ''
                let totalBtn = []

                for (let i = 0; i < paggStartNum; i++) {
                    let button = document.createElement('button')
                    button.className = 'pagg-btn'
                    button.innerText = i+1
                    totalBtn.push(button)
                }

                totalBtn.slice(hold,hold+maxPaggNum).forEach(el=>{
                    pagginatioNumberDiv.append(el)
                })
                
        
                paggBtn = document.querySelectorAll('.pagg-btn')

                activePaggNum(paggBtn)

                paggBtn.forEach((el)=>{
                    if(!el.classList.contains('pagg-num-active')){
                        el.addEventListener('click',()=>{
                            numberPaggFunc(totalBtn.indexOf(el))
                        })
                    }
                })

                rankArray = allData ? allData.slice(nextPrevValue,limit+nextPrevValue) : []
                let tbody = tableDiv.querySelector('tbody')
                
                if(allData.length > limit){
                    paggination.classList.remove('hide')
            
                    if(nextPrevValue == 0){
                        prev.classList.add('dim')
                        firstBtn.classList.add('dim')
                    }else{
                        prev.classList.remove('dim')
                        firstBtn.classList.remove('dim')
                    }
            
                    if(nextPrevValue >= allData.length-limit){
                        next.classList.add('dim')
                        lastBtn.classList.add('dim')
                    }else{
                        next.classList.remove('dim')
                        lastBtn.classList.remove('dim')
                    }
                }else{
                    paggination.classList.add('hide')
                }

                if(rankArray && rankArray.length != 0){
            
                    tbody.innerHTML = ''
            
                    rankArray.forEach((el,i)=>{
                        let tr = document.createElement('tr')
                        el.id = i+nextPrevValue+1  
                        allData[el.id-1].id = i+nextPrevValue+1
                        localStorage.setItem(currentTemple.storageName,JSON.stringify(allData))
                        tr.id = i+nextPrevValue+1
            
                        if(activeRowObj && el.date == activeRowObj.date){
                            tr.classList.add('active-td')
                        }
            
                        tr.innerHTML =  `<td>${i+nextPrevValue+1 == 1 ? '<img class="crown" src="icons8-crown-50.png" alt="">' : i+nextPrevValue+1}</td>
                                        <td>${el.name ? el.name : '-'}</td>
                                        <td>${el.date ? el.date : '-'}</td>
                                        <td>${el.wpm || el.wpm == 0 ? el.wpm : '-'}</td>
                                        <td>${el.rawWPM || el.rawWPM == 0 ? el.rawWPM : '-'}</td>
                                        <td>${el.accuracy || el.accuracy == 0 ? el.accuracy : '-'}%</td>
                                        <td>${el.rightWord || el.rightWord == 0 ? el.rightWord : '-'}</td>
                                        <td>${el.wrongWord || el.wrongWord == 0 ? el.wrongWord : '-'}</td>
                                        <td class="text-center">
                                            <button class="delete-btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                </svg>
                                            </button>
                                        </td>`
                        tbody.append(tr)
                    })
                }else{
                    tbody.innerHTML = '<td colspan="10" class="no-data">No Data</td>'   
                }
            }
        } 
    }


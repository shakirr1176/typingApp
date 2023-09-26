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

    tableMain.innerHTML = localStorage.getItem('time') && timeMange.some(el=>el.time == localStorage.getItem('time')) ? allTemplate.find(x=> x.id == localStorage.getItem('time')).template : allTemplate[1].template

    let currentTemple = allTemplate.find(x=> x.id == localStorage.getItem('time')) ? allTemplate.find(x=> x.id == localStorage.getItem('time')) : allTemplate[1]
    
    let limit = 10

    let nextPrevValue = localStorage.getItem('nextPrev'+currentTemple.name) ? +localStorage.getItem('nextPrev'+currentTemple.name) : 0
    
    if(currentTemple){
        let tableDiv = document.querySelector(`.${currentTemple.name}`)
        let allData = JSON.parse(localStorage.getItem(currentTemple.storageName)) ? JSON.parse(localStorage.getItem(currentTemple.storageName)) : []
        if(tableDiv){

            if(nextPrevValue%limit !== 0){
                nextPrevValue = 0
                localStorage.setItem('nextPrev'+currentTemple.name,'0')
                allTableSet(tableDiv,allData,currentTemple,nextPrevValue)
            }
            
            allTableSet(tableDiv,allData,currentTemple,nextPrevValue)

            paggination.addEventListener('click',(e)=>{
                if(e.target.classList.contains('prev') && nextPrevValue !== 0 && nextPrevValue > 0){
                    nextPrevValue = nextPrevValue - limit
                    localStorage.setItem('nextPrev'+currentTemple.name,nextPrevValue)
                    allTableSet(tableDiv,allData,currentTemple,nextPrevValue)
                }

                if(e.target.classList.contains('next') && nextPrevValue < allData.length-limit){
                    nextPrevValue = nextPrevValue + limit
                    localStorage.setItem('nextPrev'+currentTemple.name,nextPrevValue)
                    allTableSet(tableDiv,allData,currentTemple,nextPrevValue)
                }
            })

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
                    allTableSet(tableDiv,allData,currentTemple,nextPrevValue)
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
        } 
    }

function allTableSet(tableDiv,allData,currentTemple,nextPrevValue){
    if(!tableDiv) return

    rankArray = JSON.parse(localStorage.getItem(currentTemple.storageName)) ? JSON.parse(localStorage.getItem(currentTemple.storageName)).slice(nextPrevValue,limit+nextPrevValue) : []

    let tbody = tableDiv.querySelector('tbody')

    if(allData.length > limit){
        paggination.classList.remove('hide')

        if(nextPrevValue == 0){
            paggination.children[0].classList.add('dim')
        }else{
            paggination.children[0].classList.remove('dim')
        }

        if(nextPrevValue >= allData.length-limit){
            paggination.children[1].classList.add('dim')
        }else{
            paggination.children[1].classList.remove('dim')
        }
    }else{
        paggination.classList.add('hide')
    }

    if(rankArray && rankArray.length != 0){
        rankArray.sort((y, x) => {
            if(x.wpm > y.wpm){
                return x.wpm - y.wpm
            }
            if(x.wpm == y.wpm){
                return x.accuracy - y.accuracy
            }
            return 0
        });

        allData.sort((y, x) => {
            if(x.wpm > y.wpm){
                return x.wpm - y.wpm
            }
            if(x.wpm == y.wpm){
                return x.accuracy - y.accuracy
            }
            return 0
        });

        tbody.innerHTML = ''
        rankArray.forEach((el,i)=>{

            let tr = document.createElement('tr')
            el.id = i+nextPrevValue+1  
            allData[el.id-1].id = i+nextPrevValue+1
            localStorage.setItem(currentTemple.storageName,JSON.stringify(allData))
            tr.id = i+nextPrevValue+1

            tr.innerHTML =  `<td>${i+nextPrevValue+1}</td>
                            <td class="td-max">${el.name ? el.name : ''}</td>
                            <td>${el.wpm || el.wpm == 0 ? el.wpm : ''}</td>
                            <td>${el.accuracy || el.accuracy == 0 ? el.accuracy : ''}%</td>
                            <td>${el.rightWord || el.rightWord == 0 ? el.rightWord : ''}</td>
                            <td>${el.wrongWord || el.wrongWord == 0 ? el.wrongWord : ''}</td>
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
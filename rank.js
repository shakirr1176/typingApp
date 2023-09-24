import {data,timeMange} from './data.js'

let allTemplate = data

let tableMain = document.querySelector('#table-main')
let confirmDelete = document.querySelector('.confirm-delete')
let cancelBtn = document.querySelector('.cancel-btn')
let confirmDeleteBtn = document.querySelector('.confirm-delete-btn')
let confirmInput = confirmDelete.querySelector('input')
let errorMsg = document.querySelector('.error-msg')
let userName = document.querySelector('.user-name')
try {
    tableMain.innerHTML = localStorage.getItem('time') && timeMange.some(el=>el.time == localStorage.getItem('time')) ? allTemplate.find(x=> x.id == localStorage.getItem('time')).template : allTemplate[1].template

    allTemplate.forEach(tem=>{
        if(!tem) return
        let taleDiv = document.querySelector(`.${tem.name}`)
        if(taleDiv){
            allTableSet(taleDiv,tem.storageName)
        }
    })    
} catch (error) {
    console.log('no data found');
}

function allTableSet(tableDiv,rank){
    if(!tableDiv) return
    let rankArray = JSON.parse(localStorage.getItem(rank))
    let tbody = tableDiv.querySelector('tbody')
    function setTableData(){
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
            tbody.innerHTML = ''
            rankArray.forEach((el,i)=>{
                let tr = document.createElement('tr')
                el.id = i
                tr.id = i 
                tr.innerHTML =  `<td>${i+1}</td>
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

    setTableData()

    let selectedRow

    tableDiv.addEventListener('click',(e)=>{
        if(e.target.closest('.delete-btn')){
            openModal(e.target)
        }
    })

    function deleteRow(){
        let i = rankArray.findIndex(x=> x.id == selectedRow.closest('tr').id)
        if(confirmInput.value.trim().toLocaleLowerCase() == rankArray[i].name.trim().toLocaleLowerCase()){
            selectedRow.closest('tr').remove()
            rankArray.splice(i,1)
            localStorage.setItem(rank,JSON.stringify(rankArray))

            setTableData()

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

    function openModal(e){
        selectedRow = e
        confirmDelete.classList.remove('hide')
        let i = rankArray.findIndex(x=> x.id == selectedRow.closest('tr').id)
        userName.innerHTML = "Delete " + rankArray[i].name + '-' + rankArray[i].wpm + 'wpm' + '?'
    }
    
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
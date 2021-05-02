// Estado / Cidade
function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')
    
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(function(res) {
        return res.json()
    })
    .then(function(states) {
        for(state of states) {
            ufSelect.innerHTML += `<option value='${state.id}'>${state.nome}</option>`
        }
    })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector('select[name=city]')
    const stateInput = document.querySelector('input[name=state]')
    
    const select = event.target
    const idUF = select.value

    stateInput.value = select.options[select.selectedIndex].text

    let url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${idUF}/municipios`

    
    citySelect.disabled = true
    citySelect.innerHTML = '<option value="">Selecione a cidade</option>'

    fetch(url)
    .then(function(res) {
        return res.json()
    })
    .then(function(cities) {
        if(cities.length > 0) {
            for(city of cities) {
                citySelect.innerHTML += `<option value='${city.nome}'>${city.nome}</option>`
            }
            citySelect.disabled = false
        }
    })
}

document
.querySelector('select[name=uf]')
.addEventListener('change', getCities)


// Items de Coleta
const collectedItems = document.querySelector('input[name=items]')
const itemsToCollect = document.querySelectorAll('.items-grid li')

for(itemLi of itemsToCollect) {
    itemLi.addEventListener('click', hanleSelectedItem)
}

let selectedItems = [];
function hanleSelectedItem(event) {
    const itemLi = event.target
    itemLi.classList.toggle('selected')
    const itemId = itemLi.dataset.id

    const alreadySelected = selectedItems.findIndex(item => (item === itemId))
    if(alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(item => {
            return (item != itemId)
        })
        selectedItems = filteredItems
    }
    else {
        selectedItems.push(itemId)
    }
    collectedItems.value = selectedItems
}
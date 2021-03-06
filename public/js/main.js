const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const address = search.value
        msgOne.textContent = 'Loading...'
        msgTwo.textContent = ''
        const url = `/weather?address=${address}`
        fetch(url).then((response) => {

            response.json().then((data) =>{
                if(data.error) {
                    msgOne.textContent = data.error
                } else {
                    msgOne.textContent = data.Location
                    msgTwo.textContent = data.Forecast
                }
            })
        })
    
})
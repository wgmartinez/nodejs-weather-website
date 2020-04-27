const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageOne.textContent = ''
                messageTwo.textContent = data.error
            }else{
                messageOne.textContent = 'The weather in ' + data.location + " is " + data.weather 
                + ". The temperature is " + data.temperature + " degrees celcius and it feels like " + data.feelslike + " degrees with windspeed of " + 
                data.wind_speed
                
                messageTwo.textContent = ''
            }
            console.log(data)
        })
    })
    console.log(location)
})
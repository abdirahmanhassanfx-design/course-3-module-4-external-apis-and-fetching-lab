const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('state-input')
  const button = document.getElementById('fetch-alerts')
  const alertsDisplay = document.getElementById('alerts-display')
  const errorMessage = document.getElementById('error-message')

  button.addEventListener('click', async () => {
    const state = input.value.trim()
    input.value = ''
    errorMessage.textContent = ''
    errorMessage.classList.add('hidden')

    try {
      const response = await fetch(weatherApi + state)
      const data = await response.json()
      alertsDisplay.innerHTML = `<p>${data.title}: ${data.features.length}</p>`
      data.features.forEach(alert => {
        alertsDisplay.innerHTML += `<p>${alert.properties.headline}</p>`
      })
    } catch (error) {
      errorMessage.textContent = error.message
      errorMessage.classList.remove('hidden')
    }
  })
})

// Listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {
  // Hide Results
  document.querySelector('#results').style.display = 'none'

  // Show loader
  document.querySelector('#loading').style.display = 'block'

  setTimeout(calculateResults, 2000)

  e.preventDefault()
})

// Calculate Results
function calculateResults() {

  // UI vars
  const amount = document.querySelector('#amount')
  const interest = document.querySelector('#interest')
  const years = document.querySelector('#years')
  const monthlyPayment = document.querySelector('#monthly-payment')
  const totalPayment = document.querySelector('#total-payment')
  const totalInterest = document.querySelector('#total-interest')

  const principal = parseFloat(amount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(years.value) * 12

  // Compute monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  // Check if the numbers are finite
  if(isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)

    // Show results
    document.querySelector('#results').style.display = 'block'

    // Hide loader
    document.querySelector('#loading').style.display = 'none'

  } else {
    showError("Please check your numbers")
  }
}

// Show Error
function showError(error) {
  // Hide results
  document.querySelector('#results').style.display = 'none'

  // Hide loader
  document.querySelector('#loading').style.display = 'none'

  // Create field with the error message
  const errorDiv = document.createElement('div')
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')
  errorDiv.className = 'alert alert-danger'
  errorDiv.appendChild(document.createTextNode(error))
  card.insertBefore(errorDiv, heading)
  
  // Clear error after 3 seconds
  setTimeout(clearError, 3000)
}

// Crear Error
function clearError() {
  document.querySelector('.alert').remove()
}
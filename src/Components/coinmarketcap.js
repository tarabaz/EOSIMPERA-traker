const baseUrl = 'https://pro-api.coinmarketcap.com/v1'

export function getListings() {
  console.log('0. calling getListings...')
  return fetch(`${baseUrl}/listings/`)
    .then(console.log('step 1, returning response.json()...'))
    .then(response => response.json())



    
}
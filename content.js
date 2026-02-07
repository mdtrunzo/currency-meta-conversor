const EUR_RATE = 1700
const USD_RATE = 1500

const parseARS = (text) => {
  if (!text.includes('$') && !text.toUpperCase().includes('ARS')) return null

  const raw = text.replace(/[^\d.,]/g, '')
  if (!raw) return null

  const lastDot = raw.lastIndexOf('.')
  const lastComma = raw.lastIndexOf(',')

  let value

  if (lastDot > lastComma) {
    // US format: 4,713.23
    value = parseFloat(raw.replace(/,/g, ''))
  } else if (lastComma > lastDot) {
    // AR format: 4.713,23
    value = parseFloat(raw.replace(/\./g, '').replace(',', '.'))
  } else {
    value = parseFloat(raw)
  }

  return isNaN(value) ? null : value
}

const createTooltip = () => {
  const tooltip = document.createElement('div')
  tooltip.className = 'ars-eur-tooltip'
  document.body.appendChild(tooltip)
  return tooltip
}

const tooltip = createTooltip()

document.addEventListener('mouseover', (e) => {
  const el = e.target
  if (!el || !el.innerText) return

  const ars = parseARS(el.innerText)
  if (ars === null) return

  const eur = (ars / EUR_RATE).toFixed(2)
  const usd = (ars / USD_RATE).toFixed(2)

  tooltip.innerText = `€ ${eur} / $ ${usd}\n (ARS ${ars.toLocaleString('es-AR')})`
  tooltip.style.display = 'block'

  const rect = el.getBoundingClientRect()
  tooltip.style.top = `${rect.top + window.scrollY - 36}px`
  tooltip.style.left = `${rect.left + window.scrollX}px`
})

document.addEventListener('mouseout', () => {
  tooltip.style.display = 'none'
})

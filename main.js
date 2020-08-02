const div = dom.find('#test>.red')[0]
dom.style(div, 'color', 'red')


const distList = dom.find('.red')
dom.each(distList, (n)=>console.log(n))
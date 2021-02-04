
const currenyEL_one = document.getElementById('currency-one');
const amountEL_one = document.getElementById('amount-one');
const currenyEL_two = document.getElementById('currency-two');
const amountEL_two = document.getElementById('amount-two');

const rateEL = document.getElementById('rate');
const swap = document.getElementById('swap');

// Fetch exchange rates and update the DOM
function calculate()
{
    const currency_one = currenyEL_one.value;
    const currency_two = currenyEL_two.value;
    
    fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
        .then(res => res.json())
        .then(data => {
            //console.log(data);
            const rate = data.rates[currency_two];

            rateEL.innerHTML = `1 ${currency_one} = ${rate} ${currency_two}`;

            amountEL_two.value = (amountEL_one.value * rate).toFixed(2);
        });

}

// Event Listeners
currenyEL_one.addEventListener('change', calculate);
amountEL_one.addEventListener('input', calculate);
currenyEL_two.addEventListener('change', calculate);
amountEL_two.addEventListener('input', calculate);


swap.addEventListener('click', () => {
    const temp = currenyEL_one.value;
    currenyEL_one.value = currenyEL_two.value;
    currenyEL_two.value = temp;
    calculate();
});

calculate();
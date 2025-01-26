const resultsContainer = document.querySelector('.results');

if (resultsContainer) {
    resultsContainer.innerHTML = `
    <div class="non-counted">
        <header>
            <img src="./assets/images/illustration-empty.svg" alt="Empty form image">
            <h2>Results shown here</h2>
        </header>
        <p>Complete the form and click "calculate repayments" to see what your monthly repayments would be.</p>
        <div class="attribution">
            Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
            Coded by <a href="https://github.com/KOndra96">KOndra96</a>.
        </div>
    </div>
    `;
}

const button = document.querySelector('button[type=submit]');

button.addEventListener('click', (event) => {
    const amount = document.getElementById('amount').value;
    const term = document.getElementById('term').value;
    const rate = document.getElementById('rate').value;

    const type = document.getElementsByName('type');
    let typeValue = false;

    for (let i = 0; i < type.length; i++) {
        if (type[i].checked) {
            typeValue = type[i].value;
            break;
        }
    }

    if (!amount || !term || !rate || !typeValue) {
    } else {
        let floatAmount = parseFloat(amount);
        let years = Number(term);
        let floatInterest = parseFloat(rate);

        let numberOfPayments = years * 12; //yes

        let monthlyInterest = (floatInterest / 100 / 12); //yes

        let monthlyRepayment;
        let totalRepayment;
        let willContinue = false;

        if (typeValue === 'repayment') {
            monthlyRepayment = (floatAmount * monthlyInterest * Math.pow(1 + monthlyInterest, numberOfPayments) / (Math.pow(1 + monthlyInterest, numberOfPayments) - 1));
            willContinue = true;

        } else if (typeValue === 'interest-only') {
            monthlyRepayment = floatAmount * monthlyInterest + (floatAmount / numberOfPayments);
            willContinue = true;

        } else {
            console.log('ERROR: Unknown typeValue selected! (E-typeValue 01)');

        }

        if (willContinue) {
            if (resultsContainer) {
                totalRepayment = (monthlyRepayment * numberOfPayments);
                resultsContainer.innerHTML = `
                <div class="counted">
                    <header>
                        <h2>Your results</h2>
                    </header>
                    <p>Your results are shown below based on the information you provided. To adjust the results, edit the form and click "calculate repayments" again.</p>
                    <div class="result-box">
                        <p>Your monthly repayments<br>
                        <span class="monthly">£${monthlyRepayment.toFixed(2)}</span></p>
                        <hr>
                        <p>Total you'll repay over the term<br>
                        <span class="total">£${totalRepayment.toFixed(2)}</span>
                        </p>
                    </div>
                    <div class="attribution">
                        Challenge by <a href="https://www.frontendmentor.io?ref=challenge">Frontend Mentor</a>.
                        Coded by <a href="https://github.com/KOndra96">KOndra96</a>.
                    </div>
                </div>
                `;
                willContinue = false;
            }
        }
    }
});
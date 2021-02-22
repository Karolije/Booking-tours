const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

// console.log( txt.split(/[\r\n]+/gm) );

const tourDescription = document.querySelector('.excursions');
const uploaderInput = document.querySelector('input[type="file"]');
const excursionsPrice = document.querySelectorAll('.excursions__price');



uploaderInput.addEventListener('change', readFile);

function readFile(e) {
    const file = e.target.files[0];


    if (file && file.name.includes('.csv')) {
        let basket = [];


        const excursionsItemProto = document.querySelector('.excursions__item--prototype');


        const reader = new FileReader();
        reader.onload = function (readerEvent) {
            const content = readerEvent.target.result;
            const contentSplit = content.split(/[\r\n]+/gm);


            contentSplit.forEach(element => {
                const contentArr = element.split(/","/);
                const excursionsItem = excursionsItemProto.cloneNode(true);
                excursionsItem.classList.remove('excursions__item--prototype');


                tourDescription.appendChild(excursionsItem);

                const excursionsTitle = excursionsItem.querySelector('.excursions__title');
                const excursionsDescription = excursionsItem.querySelector('.excursions__description');
                const excursionsPrice = excursionsItem.querySelectorAll('.excursions__price');
                const orderTotalPrice = document.querySelector('.order__total-price-value');


                excursionsTitle.textContent = contentArr[1];
                excursionsDescription.textContent = contentArr[2];
                excursionsPrice[0].textContent = contentArr[3];
                excursionsPrice[1].textContent = contentArr[4];


                const addExcursion = excursionsItem.querySelector('.excursions__field-input--submit');

                addExcursion.addEventListener('click', chosenExc);

                function chosenExc(e) {
                    e.preventDefault();
                    const excursionsFieldAdults = excursionsItem.querySelector('[name="adults"]');
                    const FieldInputChildren = excursionsItem.querySelector('[name="children"]');
                    let number = /^[0-9]+$/;
                
                    if ((!number.test(excursionsFieldAdults.value)) || (!number.test(FieldInputChildren.value)) ) {
                        alert('Wprowadź poprawną ilość uczestników')
                    // } if ((FieldInputChildren.value = '0')&&(excursionsFieldAdults.value = '0' )) {
                     //   alert('Nie kupujesz żadnego biletu');
                    }else {
                    const excProto = document.querySelector('.summary__item--prototype')
                    const chosenExcursion = excProto.cloneNode(true);
                    chosenExcursion.classList.remove('summary__item--prototype');
                    const panelSummary = document.querySelector('.panel__summary');
                    panelSummary.appendChild(chosenExcursion);

                    const summaryName = chosenExcursion.querySelector('.summary__name');
                    const summaryPrices = chosenExcursion.querySelector('.summary__prices');
                    const summaryTotalPrice = chosenExcursion.querySelector('.summary__total-price')


                    const summBatRemove = chosenExcursion.querySelector('.summary__btn-remove');
                    summBatRemove.addEventListener('click', removeExc);

                    
                    
                    contentArr[5] = excursionsFieldAdults.value;
                    contentArr[6] = FieldInputChildren.value;

                    basket.push(contentArr);
                    console.log(basket)
                    let sum = [];

                    for (let i = 0; i < basket.length; i++) {
                        let basketCont = basket[i];




                        summaryName.textContent = basketCont[1];
                        summaryPrices.textContent = 'dorośli: ' + basketCont[5] + ' x ' + basketCont[3] + ' PLN, dzieci: ' + basketCont[6] + ' x ' + basketCont[4] + ' PLN';



                        summaryTotalPrice.textContent = parseInt(basketCont[5]) * parseInt(basketCont[3]) + parseInt(basketCont[6]) * parseInt(basketCont[4]) + ' PLN';

                        let sumToPay = parseInt(basketCont[5]) * parseInt(basketCont[3]) + parseInt(basketCont[6]) * parseInt(basketCont[4]);

                        contentArr[7] = sumToPay;
                        console.log(basketCont[7]);

                        sum.push(basketCont[7]);
 }


                    console.log(sum)
                    let toPay = 0;
                    for (let i = 0; i < sum.length; i++) {
                        toPay += sum[i];
                    }


                    orderTotalPrice.textContent = toPay + ' PLN';

                    const excForm = excursionsItem.querySelector('.excursions__form');
                excursionsItem.removeChild(excForm)
                


                    function removeExc(e) {
                        e.preventDefault();





                        panelSummary.removeChild(chosenExcursion);
                        FieldInputChildren.value = '';
                        excursionsFieldAdults.value = '';
                        let filtered = basket.filter(function (el) {
                            return el !== contentArr;


                        })

                        basket = filtered;
                        console.log(basket)


                        let sum = [];

                        for (let i = 0; i < basket.length; i++) {
                            let basketCont = basket[i];

                            let sumToPay = parseInt(basketCont[5]) * parseInt(basketCont[3]) + parseInt(basketCont[6]) * parseInt(basketCont[4]);

                            contentArr[7] = sumToPay;

                            sum.push(basketCont[7]);



                        }

                        let toPay = 0;
                        for (let i = 0; i < sum.length; i++) {
                            toPay += sum[i];
                        }


                        orderTotalPrice.textContent = toPay + ' PLN';


                
                     
                excursionsItem.appendChild(excForm)

                    }

                   

       
                }
            }
            });
            const panelOrder = document.querySelector('.panel__order');
            const orderFieldSubmit = panelOrder.querySelector('.order__field-submit');
            const ulEl = document.createElement('ul');
            ulEl.classList.add('errors');
            orderFieldSubmit.noValidate = true;
        
           
            orderFieldSubmit.addEventListener('click', checkData);
        
            function checkData(e) {
                
        
                
                const nameAndSurname = document.querySelector('[name="name"]');
                const email = document.querySelector('[name="email"]');
                const errors = [];
                const panelSummary = document.querySelector('.panel__summary');
                if (panelSummary.children.length < 2) {
                    e.preventDefault();
                    errors.push('Wybierz wycieczkę');
                }
                 if (nameAndSurname.value.length === 0) {
                    e.preventDefault();
                    errors.push('Uzupełnij imię i nazwisko');
                } if (email.value.length === 0) {
                    e.preventDefault();
                    errors.push('Wprowadź email');
        
                }
                const reg = /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*(\.\w{2,})+$/;
                 if ((!reg.test(email.value)) && (email.value.length > 0)) {
                    e.preventDefault();
                    errors.push('Wprowadź poprawny email');
                } if (errors.length > 0) {
                    e.preventDefault();
                    panelOrder.appendChild(ulEl);
                    ulEl.textContent = '';
                    errors.forEach(function (errors) {
        
                        const newLi = document.createElement('li');
                        newLi.innerText = errors;
                        ulEl.appendChild(newLi);
        
        
                    });
                    
                } else {
        
                    const errors = document.querySelector('.errors');
                    const orderTotalPrice = document.querySelector('.order__total-price-value');
                    if (errors) {
                        while (errors.children.length > 0) {
                            errors.removeChild(errors.lastElementChild);
                            
                        }
                     
                    }
                    alert("Dziękujemy za złożenie zamówienia o wartości " + orderTotalPrice.textContent + ". Wszelkie szczegóły zamówienia zostały wysłane na adres email: " + email.value);
                    
        
        
                }
            }
        }



        reader.readAsText(file, 'UTF-8');
    }



}












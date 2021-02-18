const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

// console.log( txt.split(/[\r\n]+/gm) );

const tourDescription = document.querySelector('.excursions');
const uploaderInput = document.querySelector('input[type="file"]');
const excursionsPrice = document.querySelectorAll('.excursions__price');



uploaderInput.addEventListener('change', readFile);

function readFile(e) {
    const file = e.target.files[0];
    
    
    if(file && file.name.includes('.csv')) {
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
                const excursionsPrice = excursionsItem.querySelectorAll('.excursions__price')
                excursionsTitle.textContent = contentArr[1];
                excursionsDescription.textContent = contentArr[2];
                excursionsPrice[0].textContent = contentArr[3];
                excursionsPrice[1].textContent = contentArr[4];
            

                
                
                const FieldInputChildren = excursionsItem.querySelector('[name="children"]');

                FieldInputChildren.addEventListener('input', numberOfChildren);

                let basket = [];

                function numberOfChildren(e) {
                    const children = e.target;
                    basket.push(children.value);
                }

                const excursionsFieldAdults = excursionsItem.querySelector('[name="adults"]');

                excursionsFieldAdults.addEventListener('input', numberOfAdults);

                function numberOfAdults(e) {
                    const adults = e.target;
                    basket.push(adults.value);
                }

                const addExcursion = excursionsItem.querySelector('.excursions__field-input--submit');
                
                addExcursion.addEventListener('click', chosenExc);

                function chosenExc(e) {
                    e.preventDefault();
                    const excProto = document.querySelector('.summary__item--prototype')
                    const chosenExcursion = excProto.cloneNode(true);
                chosenExcursion.classList.remove('summary__item--prototype');
                    const panelSummary = document.querySelector('.panel__summary');
                panelSummary.appendChild(chosenExcursion);

                const summaryName = chosenExcursion.querySelector('.summary__name');
                const summaryPrices = chosenExcursion.querySelector('.summary__prices');
                const summaryTotalPrice = chosenExcursion.querySelector('.summary__total-price')

                    summaryName.textContent = contentArr[1];
                    summaryPrices.textContent = 'dorośli: ' + basket[0] + ' x ' + contentArr[3] + 'PLN, dzieci: ' + basket[1] + ' x ' + contentArr[4] + 'PLN' ;
                    tourDescription.removeChild(excursionsItem);



                    const summBatRemove = chosenExcursion.querySelector('.summary__btn-remove');
                    summBatRemove.addEventListener('click', removeExc);
                    console.log(summBatRemove)

                    function removeExc(e) { 
                        e.preventDefault();
                        panelSummary.removeChild(chosenExcursion);
                        FieldInputChildren.value = '';
                        excursionsFieldAdults.value = '';

                        tourDescription.appendChild(excursionsItem);
                    }
    

                   

                }
                
                


            });


               

           
        
          
       
            
    
        
        }
        reader.readAsText(file, 'UTF-8');
    }
}













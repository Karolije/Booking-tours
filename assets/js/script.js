const txt = `"1","Ogrodzieniec","Zamek Ogrodzieniec – ruiny zamku leżącego na Jurze Krakowsko-Częstochowskiej, wybudowanego w systemie tzw. Orlich Gniazd, we wsi Podzamcze w województwie śląskim, w powiecie zawierciańskim, około 2 km na wschód od Ogrodzieńca. Zamek został wybudowany w XIV – XV w. przez ród Włodków Sulimczyków.","99PLN","50PLN"
"2","Ojców","wieś w województwie małopolskim, w powiecie krakowskim, w gminie Skała, na terenie Wyżyny Krakowsko-Częstochowskiej, w Dolinie Prądnika, na Szlaku Orlich Gniazd. W Królestwie Polskim istniała gmina Ojców. W latach 1975–1998 miejscowość położona była w województwie krakowskim. W latach 1928–1966 Ojców miał status uzdrowiska posiadającego charakter użyteczności publicznej.","40PLN","15PLN`;

// console.log( txt.split(/[\r\n]+/gm) );

const tourDescription = document.querySelector('.excursions');
const uploaderInput = document.querySelector('input[type="file"]');
const excursionsPrice = document.querySelectorAll('.excursions__price');



uploaderInput.addEventListener('change', readFile);

function readFile(e) {
    const file = e.target.files[0];
    
    if(file && file.type.includes('text')) {
        const excursionsItemProto = document.querySelector('.excursions__item--prototype');
        
        
        const reader = new FileReader();
        reader.onload = function(readerEvent) {
            const content = readerEvent.target.result;
            const contentSplit = content.split(/[\r\n]+/gm);
            
            contentSplit.forEach(element => {
                const contentArr = element.split(/","/);
                const excursionsItem = excursionsItemProto.cloneNode(true);
                excursionsItem.classList.remove('excursions__item--prototype');
              
                tourDescription.appendChild(excursionsItem);
                const excursionsTitle = document.querySelectorAll('.excursions__title');
                const excursionsDescription = document.querySelectorAll('.excursions__description');
               // excursionsTitle[1].textContent = contentArr[1];
               // excursionsDescription[1].textContent = contentArr[2];
                console.log(contentArr[1])
                
            
               
               
            });

            


               

           
        
          
       
            
    
        
        }
        reader.readAsText(file, 'UTF-8');
    }
}













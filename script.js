class Select {
    constructor(select) {
        var selctHtmlObj = select;

        var options = select.children;

        for(let i = 0; i < options.length; i++) {
            this.optionsList.push(new Option(options[i]));
        }

        this.currentOption = this.optionsList[0];

        var selectParent = select.parentElement;
        var selectParentChildren = Array.from(selectParent.children);

        for(let i = 0; i < selectParentChildren.length; i++) {
            if(selectParentChildren[i] == select){
                var newElement = this.createCustomSelect(selctHtmlObj);
                selectParentChildren[i] = newElement;
                break;
            }
        }

        selectParent.innerHTML = "";

        for(let i = 0; i < selectParentChildren.length; i++) {
            selectParent.append(selectParentChildren[i]);
        }

    }

    createCustomSelect(htmlSelect) {
        var element = document.createElement("div");
        element.append(htmlSelect);
        element.style = "position: relative; height: 100%; font-family: 'Inter-Regular';"
        htmlSelect.style = "display: none";

        var customSelect = document.createElement("div");
        customSelect.className = "select";
        element.append(customSelect);

        this.customSelectContainer = element;
        this.customSelect = customSelect;
        this.selectOption(this.currentOption);
        this.customSelect.addEventListener("click", ()=>{
           this.expandOptions()
        }, {once : true});
        return element;
    }

    selectOption(option) {
        console.log("Select option" + option.optionLabel) 
        this.customSelect.innerHTML = option.optionLabel;
        this.currentOption = option;
        this.customSelect.className = "select";
    }

    expandOptions() {
        console.log("expand")
        this.customSelect.innerHTML = "";
        this.customSelect.className = "expanded";
        this.customSelect
        for(let i = 0; i < this.optionsList.length; i++) {
            let option = document.createElement("div");
            option.innerHTML = this.optionsList[i].optionLabel;
            option.addEventListener("click",()=>{
                this.selectOption(this.optionsList[i]);
                setTimeout(()=>{
                    this.customSelect.addEventListener("click", ()=>{
                        this.expandOptions()
                     }, {once : true});
                }, 1)
            }, {once : true})
            this.customSelect.append(option);
        }

    }

    
    optionsList = [];
    customSelectContainer;
    customSelect;
    currentOption;
}

class Option {
    constructor(option) {
        this.optionValue = option.value;
        this.optionLabel = option.innerHTML;
    }

    optionValue;
    optionLabel;
}

let selects = document.querySelectorAll("select");

for(let i = 0; i < selects.length; i++) {
    new Select(selects[i]);
}

function initialize() {     
	var myLatlng = new google.maps.LatLng(50.397, 30.644);
	var myOptions = {
		zoom: 14,
		center: myLatlng,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}
	var map = new google.maps.Map(document.getElementById("map"), myOptions); 

    var contentString = `<div class="text-pin-map">
    <div class="bilding">
        <h3><strong>Voodoo</strong></h3>
    </div>
    <div class="bilding-adress">
        <p>
            137 Glasgow St., Unit 115<br>
            Kitchener, ON N2G 4X8<br>
            Ukraine
        </p>
    </div>
    <div class="phone-and-mail">
        <div class="phone">
            <p><svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.375 9.16497V10.79C11.3762 11.095 11.2488 11.3864 11.024 11.5926C10.7993 11.7989 10.498 11.9008 10.1942 11.8733C8.52737 11.6922 6.92629 11.1226 5.51958 10.2104C4.21082 9.37875 3.10122 8.26915 2.26958 6.96039C1.35415 5.54729 0.784463 3.93843 0.606665 2.26414C0.579296 1.96128 0.680479 1.66086 0.885496 1.43627C1.09051 1.21167 1.38049 1.08359 1.68458 1.08331H3.30958C3.85334 1.07795 4.31681 1.47654 4.39291 2.01497C4.4615 2.53501 4.5887 3.04562 4.77208 3.53706C4.9209 3.93295 4.82571 4.37924 4.52833 4.67997L3.84041 5.36789C4.61151 6.72398 5.73433 7.8468 7.09041 8.61789L7.77833 7.92997C8.07906 7.63259 8.52536 7.53741 8.92125 7.68622C9.41269 7.8696 9.9233 7.9968 10.4433 8.06539C10.988 8.14223 11.3886 8.61507 11.375 9.16497Z" stroke="#52514F" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            
             1-800-480-9597</p>
        </div>
        <div class="mail">
            <p><svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M2 2H10C10.55 2 11 2.45 11 3V9C11 9.55 10.55 10 10 10H2C1.45 10 1 9.55 1 9V3C1 2.45 1.45 2 2 2Z" stroke="#52514F" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M11 3L6 6.5L1 3" stroke="#52514F" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
             info@vodoo.com</p>
        </div>
    </div>
</div>`;
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title: 'Uluru (Ayers Rock)'
    });
    google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
    });
}
initialize();
setTimeout(()=>{
    document.getElementById("map").children[1].style = "display: none"
}, 1000)

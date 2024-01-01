const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns=document.querySelectorAll('.drop_downs select')
const botton=document.querySelector('form button')
const fromCur=document.querySelector('.selection_from')
const toCur=document.querySelector('.selection_to')
const msg=document.querySelector('.msg')
for(let select of dropdowns){
    for(Currcode in countryList){
        let newOption=document.createElement("option")
        newOption.innerText=Currcode;
        newOption.value=Currcode;
        if(select.name==="From"&&Currcode==="USD"){
            newOption.selected="selected";
         }else if(select.name==="To"&&Currcode==="INR"){
            newOption.selected="selected";
            }
            select.append(newOption);
}
select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}
const updateExchangeRate=async()=>{
    let amount=document.querySelector("#Amount")
    let amtVal=amount.value;
    console.log(amtVal)
    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    const URL = `${BASE_URL}/${fromCur.value.toLowerCase()}/${toCur.value.toLowerCase()}.json`; 
    // console.log(fromCur.value.toLowerCase(),toCur.value.toLowerCase())
    let response=await fetch(URL)
    let data=await response.json();
    let rate=data[toCur.value.toLowerCase()]
    
    let finalAmount=amtVal *rate;
    //1 usd=80inr
    msg.innerText=`${amtVal} ${fromCur.value} = ${finalAmount} ${toCur.value}`;
}
const updateFlag=(element)=>{
    // console.log(element)
    let Currcode=element.value;
    // console.log(Currcode)
    let countryCode=countryList[Currcode]
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img")//we are at select,at the top (select_container) parent
    img.src=newSrc
}
botton.addEventListener("click", async (evt) => {
    evt.preventDefault();
     updateExchangeRate(); // Call the function with parentheses
});

window.addEventListener("load",()=>{
    updateExchangeRate()
})


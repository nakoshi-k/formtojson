const fileSupport = ( elements = document.querySelectorAll(`input[type="file"]`) ) => 
[].slice.call(elements)
.forEach( (element:HTMLInputElement) => {
    const parent = element.parentElement || {insertBefore:()=>{}};
    const base64 = document.createElement("input");
    base64.name = element.name.replace(/^_/,"")
    base64.type = "hidden"
    parent.insertBefore(base64 ,element.nextSibling)
    const fileRead =  () => {
        if(element.files === null){
            return
        }
        const reader = new FileReader();
        reader.readAsDataURL( element.files[0] );
        reader.onload = () => {
            base64.value = <string>reader.result
        };
    }
    fileRead();
    element.addEventListener("change" , fileRead)
} )

export default fileSupport
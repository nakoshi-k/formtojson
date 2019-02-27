const getFields : (form:HTMLFormElement) => string[] = (form) => 
    [].slice.call( form.elements )
        .filter( (e:HTMLElement) => e.hasAttribute("name"))
        .map( (e:HTMLElement) => e.getAttribute("name") || "" )
        .filter( ( s :string , index : number , ar : string[]) => index === ar.indexOf(s))
export default getFields
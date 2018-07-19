
# HTMLFormElement to nested object literal or JSON

don't need jquery 

``` javascript
import formToJson from "formtojson"
// or
const formToJson = require("formtojson")

//get form element
const form = document.getElementById("#exmple-form")

// to object literal
const data = formToJSON(form,/[\[\]]+/)
//to json
const data = formToJSON(form,/[\[\]]+/ , true)

```



import { Link } from "react-router-dom";

import { useTheme } from '../Context/ThemeProvider';

console.log("Four04.js");

export const Four04 = () => {
   console.log("404.jsx", "1");
   const { theme } = useTheme();

   return (
      <>
         <h1>404.1</h1>
         {/* <h3>{window.location.href}</h3> */}
         <b>{window.location.origin} |  {window.location.pathname}</b>
         <br />
         <br />It's Un-Known state
         <br />
         <br />// Just fill below with BR //
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
         <br />
      </>
   )
}
export default Four04
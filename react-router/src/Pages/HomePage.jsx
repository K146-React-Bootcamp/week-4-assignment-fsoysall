import { Link } from "react-router-dom";
import { useTheme } from '../Context/ThemeProvider';

console.log("HomePage.js");

export const HomePage = () => {
   console.log("404.jsx", "1");
   const { theme } = useTheme();

   return (
      <>
            <h1>HomePage</h1>
            <h3>Sitemize Hoş Geldiniz</h3>
      </>
   )
}
export default HomePage
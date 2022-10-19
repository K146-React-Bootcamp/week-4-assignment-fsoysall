import { Link } from "react-router-dom";
import { useTheme } from '../Context/ThemeProvider';

console.log("About.js");

export const About = () => {
   console.log("404.jsx", "1");
   const { theme } = useTheme();

   return (
      <>
            <h1>About</h1>
            Haberler Ana Sayfa
      </>
   )
}
export default About
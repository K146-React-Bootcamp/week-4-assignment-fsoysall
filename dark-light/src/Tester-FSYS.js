
import { useContext, createContext } from 'react';

let a = 10; let b = 20
const BorderContext = createContext(1);    //#A

console.clear()


function Button({ children }) {
    const borderWidth = useContext(BorderContext);    //#B
    console.log("button", "borderWidth", borderWidth, children);
    const style = {
        border: `${borderWidth}px solid black`,
        background: 'transparent',
    };
    console.log("button", "style", style);
    return <button style={style}>{children}</button>
}

function CartButton() {
    return (
        <BorderContext.Provider value={5}>    #C
            <Button>Cart</Button>
        </BorderContext.Provider>
    )
}

function Header() {
    const style = {
        padding: '5px',
        borderBottom: '1px solid black',
        marginBottom: '10px',
        display: 'flex',
        gap: '5px',
        justifyContent: 'flex-end',
    }
    return (
        <header style={style}>
            <Button>Clothes</Button>
            <Button>Toys</Button>
            <CartButton />
        </header>
    )
}


function Footer() {
    const style = {
        padding: '5px',
        borderTop: '1px solid black',
        marginTop: '10px',
        display: 'flex',
        justifyContent: 'space-between',
    }
    return (
        <footer style={style}>
            <Button>About</Button>
            <Button>Jobs</Button>
            <CartButton />
            <Button>Jobs2</Button>
        </footer>
    )
}

export default function App() {
    return (
        <main>
            <h1>Welcome to the shop!</h1>
            <BorderContext.Provider value={2}>  {/* #D */}
                <Footer />
            </BorderContext.Provider>
            <Header />
        </main>
    );
}


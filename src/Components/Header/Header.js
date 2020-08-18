import React from 'react';

function Header(props) {
    return (
        <header style={styles.header}>
            <h1 style={styles.headerTxt} >Technical <br/> Conferences</h1>
        </header>
    )
}


const styles={
    header:{
        paddingTop:"10vh",
        height:"60vh",
        position:"relative",
        background:"linear-gradient(210.64deg, #346D97 15.51%, rgba(61, 111, 147, 0.36) 114.31%),url('./coverConf.jpg')",backgroundSize:"cover",backgroundPosition:"center"
    },
    headerTxt:{
        
        fontWeight: "bold",
        fontSize: "58px",
        textAlign: "center",

        color: "#EDE9E9"
    }
}


export default Header;


import React from 'react';

export default function Header ({number, children}){
    return(
        <>
            <h1>Header {number}</h1>
            {children}
        </>
    )
}
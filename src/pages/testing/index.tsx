import React, { useEffect, useState } from "react"

const Example = () => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        document.title = `Kamu menekan tombol ${count} kali`;
    });

    return(
        <div>
            <p>kamu mengklik tombol {count} kali</p>
            <button onClick={() => setCount(count + 1)}>Klik</button>
        </div>
    )
}

export default Example;


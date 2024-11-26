"use client"
import Link from "next/link"
import { useState } from "react";

const InnerPage = () => {

    const [width, setWidth] = useState(60);

    function updateRange(e: React.ChangeEvent<HTMLInputElement>) {
        let value = Number(e.target.value);
        setWidth(value);
    }

    return (
        <>
            <div id="mainOne" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <Link href='/' style={{ alignSelf: 'start' }}>Back</Link>
                <div id='controlThis' style={{ width: `${width}vw`, height: '50vh', backgroundColor: 'pink' }}> This is inside the div</div>
                <input type="range" name="" id="" min={30} max={70} value={width} onChange={updateRange} />
            </div>
        </>
    )
}

export default InnerPage
"use client";
import styles from './page.module.css';
import { useState } from 'react';

// a child server component is passed here
const Graph = ({children, graphTitle} : {children : React.ReactNode, graphTitle : String}) => {

    const [g1Width, setG1Width] = useState(0);

    function updateWidth(e: React.ChangeEvent<HTMLInputElement>) {
        let val = Number(e.target.value);
        setG1Width(val);
    }

    return (
        <div className={styles.graphCont}>
            <h2>{graphTitle}</h2>
            <div id={styles.cont} >
                <div id={styles.innerOne} style={{ paddingRight: `${g1Width}%` }}>
                    {children}
                    </div>
                </div>
            <input type="range" name="" id={styles.rangeControl} min={0} max={100} value={g1Width} onChange={updateWidth} />
        </div>
    )
}

export default Graph;
// by default this is a server component
import React from 'react';
import styles from './page.module.css';
import Graph from './graph';
import DataPart from "./serverPart";


const Page = () => {

    return (
        <div id={styles.pageHolder}>
            <h1>Statistics and Trends</h1>
            <p>The graphs of the current trends are as follows</p>
            <div id={styles.main}>
                {/* had attr of children as datapart */}
                <Graph graphTitle={"Number of jobs uploaded each day"}>
                    <DataPart />
                </Graph>
            </div>
        </div>
    )
}

export default Page;
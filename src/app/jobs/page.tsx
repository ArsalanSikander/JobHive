import Link from "next/link";
import styles from './page.module.css'
import { getAllRows } from '../utils/db';
import { Key } from "react";

const Jobs = async () => {

    const jobsArray = await getAllRows();
    interface job {
        id: Key,
        jobName: string
        link: string
    }

    return (
        <>
            <Link href='/'>Back</Link>
            <h1>Jobs</h1>
            <div id={styles.jobContainer} >
                {jobsArray.map((element: job) => {
                    return (
                        <div className={styles.jobContainer} key={element.id}>
                            <p>{element.jobName}</p>
                            <a href={element.link}>Apply</a>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Jobs;
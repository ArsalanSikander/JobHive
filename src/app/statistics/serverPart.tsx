"use server"
import { Key } from "react";
import { getTypesAndDates } from '../utils/db';
const { DateTime } = require("luxon");
import styles from './page.module.css'

const DataPart = async () => {
    interface jobTD {
        id: Key,
        jobs: Number,
        dateStr: String
    }

    var theData = await getTypesAndDates();

    let sumOfJobs = 0;
    let maxOfJobs: Number = 0;
    theData.forEach((elem: jobTD) => {
        sumOfJobs += Number(elem.jobs);
        if (elem.jobs > maxOfJobs) {
            maxOfJobs = Number(elem.jobs);
        }
    });
    console.log(sumOfJobs + " is the sum of jobs, and the largest one is: " + maxOfJobs);
    console.log("What the max of the graph is going to be is: " + String(Math.round(Number(maxOfJobs) / 10) * 10));

    const maxY = Math.round(Number(maxOfJobs) / 10) * 10;

    let yAxisArr = [];
    for (let i = 0; i <= maxY; i += 10) {
        yAxisArr.push(i);
    }

    let spacing = 0;
    let addThis = 1 / theData.length * 85;

    return (
        <>
            <div id={styles.yAxis} style={{ width: '1.5vw', height: '35vh' }}>
                {
                    yAxisArr.map((num: Number) => {
                        return (
                            <>
                                <p style={{ margin: 0, padding: 0, position: 'absolute', bottom: `${Number(num) / maxY * 100}%`, left: `0%`, fontSize: '1.2vw' }}>{String(num)}</p>
                            </>
                        )
                    })
                }
            </div>
            {
                theData.map((elem: jobTD) => {

                    let theDay = String((elem.dateStr).substring(elem.dateStr.length - 2))
                    console.log("This is the day!!!: " + theDay);
                    spacing = spacing + addThis;

                    return (
                        <div className={styles.dateJobItem} key={elem.id} style={{ position: 'absolute', bottom: 0, left: `${spacing}%`, }} >
                            <div id={styles.someHeight} style={{ height: `${Number(elem.jobs) / maxY * 35}vh`, width: `2vw` }}>
                            </div>
                            <div id={styles.dayLabel} >
                                <p style={{ fontSize: '1.2vw' }}>{theDay}</p>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}

export default DataPart;
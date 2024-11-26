"use server"
const pg = require('pg');
const { Pool, Client } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_ENV,
    ssl:{
        rejectUnauthorized: false,
    }
});

export async function getAllRows() {
    let result = await pool.query('Select "oldScrapedJobs".id, "oldScrapedJobs"."jobName", "oldScrapedJobs".link from "oldScrapedJobs"').catch(err => {
        return err;
    })
    return result.rows;
}

// export async function getAllRows() {
//     let result = await pool.query('Select jobs.id, jobs."jobName", jobs.link from jobs').catch(err => {
//         return err;
//     })
//     return result.rows;
// }

export async function getTypesAndDates() {

    // use this now: SELECT count("jobName"), to_char(to_timestamp("dateUnix"/1000), 'YYYYMMDD') as "ds"
    // from jobs
    // group by "ds"
    // order by "ds";

    let result = await pool.query(`select row_number() over() as "id", count("jobName") as "jobs", to_char(to_timestamp("dateUnix"/1000), 'YYYYMMDD') as "dateStr" from "oldScrapedJobs" group by "dateStr" order by "dateStr";`).catch(err => {
        console.error("Error in getTypesAndDates() : ")
        return err;
    })

    return result.rows;
}

export async function addUser(name, role, email, hashedPassword) {
    const data = await pool.query('insert into users("name", "email", "password","role") values ($1,$2,$3,$4) RETURNING id, role ', [name, email, hashedPassword, role]);
    return data.rows;
}

export async function doesUserExist(email) {
    const response = await pool.query(`select 1 from users where users."email"=$1`, [email]);
    return response.rows;
}

export async function findUserForSession() {
    const data = await pool.query('select "id", "name", "email" from users where id = $1', [sessionUserId]);
    return data;
}

export async function getUserIdRole(email){
    const data = await pool.query(`select "id","role" from users where users."email"=$1 `,[email]);
    return data.rows;
}
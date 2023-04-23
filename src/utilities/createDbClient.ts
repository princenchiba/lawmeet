import faunadb from 'faunadb';

const createDbClient =()=>{
    let client = new faunadb.Client({
        secret: 'fnAFCGvKXsAAzfvUEXUz4O97pnbOl7uCasQcOCLQ', // remember to move to .env file
        endpoint: 'https://db.fauna.com/',
    })
    return client
}

export default createDbClient
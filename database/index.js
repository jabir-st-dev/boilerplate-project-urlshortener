const connect = require('@databases/sqlite');
const {sql} = require('@databases/sqlite');
// We don't pass a file name here because we don't want to store
// anything on disk
const db = connect();

async function prepare() {
    await db.query(sql`
    CREATE TABLE app_data (
      original_url VARCHAR NOT NULL PRIMARY KEY,
      short_url VARCHAR NOT NULL
    );
  `);
}

const prepared = prepare();

exports.add = async function set({original_url}) {
    await prepared;
    let short_url = Math.floor(Math.random() * 100000).toString();

    const url = await db.query(sql`
    INSERT INTO app_data (original_url, short_url)
      VALUES (${original_url}, ${short_url})
    ON CONFLICT (original_url) DO NOTHING;
  `);

    const results = await db.query(sql`
    SELECT short_url FROM app_data WHERE original_url=${original_url};
  `);

    if (results.length) {
        short_url = results[0].short_url;
    } else {
        return undefined;
    }

    // console.log({original_url, short_url});
    return {original_url, short_url};
}

exports.get = async function get({short_url}) {
    await prepared;
    const results = await db.query(sql`
    SELECT original_url FROM app_data WHERE short_url=${short_url};
  `);
    if (results.length) {
        return results[0].original_url;
    } else {
        return undefined;
    }
}
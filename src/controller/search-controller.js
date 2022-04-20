
import { Client } from '@elastic/elasticsearch'

/**
 * Function for searching elasticsearch with Entity: Sweden.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Array} - Array of objects.
 */
export async function searchSweden (req, res) {
  try {
    const client = connect()
    const sweden = await client.search({
      size: 1000,
      index: process.env.ES_INDEX,
      query: {
        match: { Entity: 'Sweden' }
      }
    })
    const extractedData = extractData(sweden.hits.hits)
    return extractedData
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 * Function for searching elasticsearch with Entity: United States.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Array} - Array of objects.
 */
export async function searchUSA (req, res) {
  try {
    const client = connect()
    const usa = await client.search({
      size: 1000,
      index: process.env.ES_INDEX,
      query: {
        match: { Entity: 'United States' }
      }
    })
    const extractedData = extractData(usa.hits.hits)
    return extractedData
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 * Function for searching elasticsearch with Entity: Norway.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Array} - Array of objects.
 */
export async function searchNorway (req, res) {
  try {
    const client = connect()
    const norway = await client.search({
      size: 1000,
      index: process.env.ES_INDEX,
      query: {
        match: { Entity: 'Norway' }
      }
    })
    const extractedData = extractData(norway.hits.hits)
    return extractedData
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 * Function for searching elasticsearch with Entity: Russia.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Array} - Array of objects.
 */
export async function searchRussia (req, res) {
  try {
    const client = connect()
    const russia = await client.search({
      size: 1000,
      index: process.env.ES_INDEX,
      query: {
        match: { Entity: 'Russia' }
      }
    })
    const extractedData = extractData(russia.hits.hits)
    return extractedData
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 * Function for searching elasticsearch with Entity: Israel.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Array} - Array of objects.
 */
export async function searchIsrael (req, res) {
  try {
    const client = connect()
    const israel = await client.search({
      size: 1000,
      index: process.env.ES_INDEX,
      query: {
        match: { Entity: 'Israel' }
      }
    })
    // console.log(israel.hits.hits.length)
    const extractedData = extractData(israel.hits.hits)
    return extractedData
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}
/**
 * Function for searching elasticsearch with Entity: Ukraine.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {Array} - Array of objects.
 */
export async function searchUkraine (req, res) {
  try {
    const client = connect()
    const ukraine = await client.search({
      size: 1000,
      index: process.env.ES_INDEX,
      query: {
        match: { Entity: 'Ukraine' }
      }
    })
    // console.log(israel.hits.hits.length)
    const extractedData = extractData(ukraine.hits.hits)
    return extractedData
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 * Function for collecting data from all elasticsearch searches.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @returns {object} - Array of objects.
 */
export async function searchAll (req, res) {
  try {
    const sweden = await searchSweden(req, res)
    const usa = await searchUSA(req, res)
    const norway = await searchNorway(req, res)
    const russia = await searchRussia(req, res)
    const ukraine = await searchUkraine(req, res)
    const israel = await searchIsrael(req, res)

    return [sweden, norway, usa, russia, ukraine, israel]
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 * Function for connecting to elasticsearch.
 *
 * @returns {object} - Elasticsearch client.
 */
function connect () {
  try {
    const client = new Client({
      node: 'https://localhost:9200',
      auth: {
        username: process.env.ES_USER,
        password: process.env.ES_PSW
      },
      tls: {
        ca: process.env.CERT,
        rejectUnauthorized: false
      }
    })
    return client
  } catch (error) {
    console.log(error)
  }
}

/**
 * Function for extracting data from elasticsearch search.
 *
 * @param {Array} data - Result from elasticsearch.
 * @returns {Array} - Array of objects.
 */
function extractData (data) {
  try {
    const result = []
    data.forEach(element => {
      result.push(element._source)
    })
    // console.log(result)
    return result
  } catch (error) {
    console.log(error)
  }
}

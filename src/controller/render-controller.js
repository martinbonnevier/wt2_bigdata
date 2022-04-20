/**
 * Function to create the chart.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 */
export function renderIndex (req, res) {
  try {
    res.render('pages/index', {})
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}
/**
 *Function to render index page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Array} result - Result from elasticsearch.
 */
export async function renderGraph (req, res, result) {
  try {
    const yearArray = await createYearArray(result)
    const dataArray = await createDataArray(result)
    const country = result[0].Entity
    console.log(yearArray)
    console.log(dataArray)
    res.render('pages/graph', { years: yearArray, data: dataArray, country: country })
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 * Function to create the chart with all graphs.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Array} result - Result from elasticsearch.
 */
export async function renderBigSpenders (req, res, result) {
  try {
    const yearArrayAllGraphs = []
    const dataArrayAllGraphs = []
    const countryAllGraphs = []
    for (let i = 0; i < result.length; i++) {
      const yearArray = await createYearArray(result[i])
      const dataArray = await createDataArray(result[i])
      const country = result[i].Entity
      yearArrayAllGraphs.push(yearArray)
      dataArrayAllGraphs.push(dataArray)
      countryAllGraphs.push(country)
    }

    res.render('pages/big-spenders', { years: yearArrayAllGraphs, data: dataArrayAllGraphs, country: countryAllGraphs })
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}
/**
 * Function to render small-spenders page.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Array} result - Result from elasticsearch.
 */
export async function renderSmallSpenders (req, res, result) {
  try {
    const yearArrayAllGraphs = []
    const dataArrayAllGraphs = []
    const countryAllGraphs = []
    for (let i = 0; i < result.length; i++) {
      const yearArray = await createYearArray(result[i])
      const dataArray = await createDataArray(result[i])
      const country = result[i][0].Entity

      yearArrayAllGraphs.push(yearArray)
      dataArrayAllGraphs.push(dataArray)
      countryAllGraphs.push(country)
    }

    res.render('pages/small-spenders', { years: yearArrayAllGraphs, data: dataArrayAllGraphs, country: countryAllGraphs })
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 * Function to create the year array.
 *
 * @param {Array} data - Array of objects.
 */
async function createYearArray (data) {
  try {
    const yearArray = []

    const years = data
    for (let i = 0; i < years.length; i++) {
      const year = years[i].Year
      yearArray.push(year)
    }
    return yearArray
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

/**
 *Function to create the data array.
 *
 * @param {Array} data - Array of objects.
 */
async function createDataArray (data) {
  try {
    const yearArray = []

    const years = data
    for (let i = 0; i < years.length; i++) {
      const year = years[i].military_expenditure
      yearArray.push(year)
    }
    return yearArray
  } catch (error) {
    res.render('pages/error', { error: error })
  }
}

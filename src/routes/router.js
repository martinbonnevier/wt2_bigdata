import express from 'express'
import * as searchController from '../controller/search-controller.js'
import * as renderController from '../controller/render-controller.js'
export const router = express.Router()

router.get('/', (req, res) => {
  renderController.renderIndex(req, res)
})

router.get('/sweden', async (req, res) => {
  const result = await searchController.searchSweden(req, res)
  renderController.renderGraph(req, res, result)
})

router.get('/usa', async (req, res) => {
  const result = await searchController.searchUSA(req, res)
  renderController.renderGraph(req, res, result)
})

router.get('/norway', async (req, res) => {
  const result = await searchController.searchNorway(req, res)
  renderController.renderGraph(req, res, result)
})

router.get('/russia', async (req, res) => {
  const result = await searchController.searchRussia(req, res)
  renderController.renderGraph(req, res, result)
})

router.get('/israel', async (req, res) => {
  const result = await searchController.searchIsrael(req, res)
  renderController.renderGraph(req, res, result)
  // console.log(result.length)
  // res.send(JSON.stringify(result));
})
router.get('/ukraine', async (req, res) => {
  const result = await searchController.searchUkraine(req, res)
  renderController.renderGraph(req, res, result)
})

router.get('/big-spenders', async (req, res) => {
  const result = await searchController.searchAll(req, res)
  renderController.renderBigSpenders(req, res, result)
})

router.get('/small-spenders', async (req, res) => {
  const result = await searchController.searchAll(req, res)
  renderController.renderSmallSpenders(req, res, result)
})

router.use('*', (req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
  res.render('pages/error', { error: error.status })
})
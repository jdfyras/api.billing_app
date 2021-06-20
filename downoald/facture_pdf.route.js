const express = require('express')
const router = express.Router()

const pdfController = require('./facture_pdf.controller')

router.get('/Facture_pdf/:id', pdfController.Facture_pdf)
//router.post('/hello', pdfController.hello)



module.exports = router


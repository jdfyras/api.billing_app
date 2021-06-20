const fs = require('fs')
const path = require('path')
const PDFDocument = require('./pdfkit-tables')
const Contrat = require('../Admin/contrat/contrat.model')
const Facture = require('../Admin/facture/facture.model')
const User = require('../Admin/User/User.model')

module.exports = {
    Facture_pdf: async (req, res, next) => {
        const Facture_ID = req.params.id
        console.log(Facture_ID)
        const facture = await Facture.findById(Facture_ID)
        const factureName = 'facture-' + Facture_ID + '.pdf'
        const facturePath = path.join('data', 'factures', factureName)
        console.log(factureName, facturePath)
        const pdfDoc = new PDFDocument()
        pdfDoc.pipe(fs.createWriteStream(facturePath))
        //pdfDoc
        //    .fillColor('#444444')
        //    .fontSize(20)
        //    .text('Patient Information.', 110, 57)
        //    .fontSize(10)
        //    .text('725 Fowler Avenue', 200, 65, { align: 'right' })
        //    .text('Chamblee, GA 30341', 200, 80, { align: 'right' })
        //    .moveDown()
        const table = {
            headers: [
                'numFacture',
                'Montant_aPayer',
                'Reste_aPayer',
                'prise_charge',
                'Echeances',
                'isPayed',
            ],
            rows: [
                [
                    facture.numFacture,
                    facture.Montant_aPayer,
                    facture.Reste_aPayer,
                    facture.prise_charge,
                    facture.Echeances,
                    facture.isPayed,
                ],
            ],
        }
    //   pdfDoc.table(table, {
    //       prepareHeader: () => pdfDoc.font('Helvetica-Bold'),
    //       prepareRow: (row, i) => pdfDoc.font('Helvetica').fontSize(12),
    //   })
        pdfDoc.moveDown().table(table, 10, 125, { width: 590 })
        pdfDoc.pipe(res)

        pdfDoc.end()
    },
}

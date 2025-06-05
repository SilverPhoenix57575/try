const express = require('express');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

// Generate legal documents
router.post('/generate', auth, async (req, res) => {
  try {
    const { type, data, country } = req.body;
    
    let documentContent;
    
    switch (type) {
      case 'chargesheet':
        documentContent = generateChargesheet(data, country);
        break;
      case 'warrant':
        documentContent = generateWarrant(data, country);
        break;
      case 'contract':
        documentContent = generateContract(data, country);
        break;
      case 'will':
        documentContent = generateWill(data, country);
        break;
      default:
        return res.status(400).json({ message: 'Invalid document type' });
    }
    
    // Create PDF
    const doc = new PDFDocument();
    const filename = `${type}_${Date.now()}.pdf`;
    const filepath = path.join(__dirname, '../documents', filename);
    
    // Ensure documents directory exists
    if (!fs.existsSync(path.dirname(filepath))) {
      fs.mkdirSync(path.dirname(filepath), { recursive: true });
    }
    
    doc.pipe(fs.createWriteStream(filepath));
    
    // Add content to PDF
    doc.fontSize(16).text(documentContent.title, { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(documentContent.content);
    
    doc.end();
    
    res.json({
      success: true,
      filename: filename,
      downloadUrl: `/api/documents/download/${filename}`
    });
    
  } catch (error) {
    console.error('Document Generation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error generating document',
      error: error.message
    });
  }
});

// Download generated document
router.get('/download/:filename', (req, res) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '../documents', filename);
  
  if (fs.existsSync(filepath)) {
    res.download(filepath);
  } else {
    res.status(404).json({ message: 'Document not found' });
  }
});

function generateChargesheet(data, country) {
  return {
    title: `CHARGESHEET - ${country.toUpperCase()}`,
    content: `
Case No: ${data.caseNumber}
Date: ${new Date().toLocaleDateString()}

ACCUSED: ${data.accusedName}
Address: ${data.accusedAddress}

CHARGES:
${data.charges.map((charge, index) => `${index + 1}. ${charge}`).join('\n')}

FACTS OF THE CASE:
${data.facts}

EVIDENCE:
${data.evidence}

INVESTIGATING OFFICER: ${data.investigatingOfficer}
Signature: _________________
Date: ${new Date().toLocaleDateString()}
    `
  };
}

function generateWarrant(data, country) {
  return {
    title: `${data.warrantType.toUpperCase()} WARRANT - ${country.toUpperCase()}`,
    content: `
Warrant No: ${data.warrantNumber}
Date: ${new Date().toLocaleDateString()}

TO: All Police Officers

You are hereby directed to ${data.warrantType === 'arrest' ? 'arrest' : 'search'} the following:

NAME: ${data.subjectName}
Address: ${data.subjectAddress}

REASON: ${data.reason}

This warrant is issued based on the following grounds:
${data.grounds}

Valid until: ${data.validUntil}

Issued by: ${data.issuingAuthority}
Signature: _________________
Seal: [OFFICIAL SEAL]
    `
  };
}

function generateContract(data, country) {
  return {
    title: `${data.contractType.toUpperCase()} CONTRACT - ${country.toUpperCase()}`,
    content: `
Contract Date: ${new Date().toLocaleDateString()}

PARTY A: ${data.partyA.name}
Address: ${data.partyA.address}

PARTY B: ${data.partyB.name}
Address: ${data.partyB.address}

TERMS AND CONDITIONS:
${data.terms.map((term, index) => `${index + 1}. ${term}`).join('\n')}

DURATION: ${data.duration}
CONSIDERATION: ${data.consideration}

GOVERNING LAW: ${country} Law

Signature Party A: _________________
Signature Party B: _________________
Date: ${new Date().toLocaleDateString()}
    `
  };
}

function generateWill(data, country) {
  return {
    title: `LAST WILL AND TESTAMENT - ${country.toUpperCase()}`,
    content: `
I, ${data.testatorName}, of ${data.testatorAddress}, being of sound mind and disposing memory, do hereby make, publish and declare this to be my Last Will and Testament.

EXECUTOR: ${data.executor}

BEQUESTS:
${data.bequests.map((bequest, index) => `${index + 1}. ${bequest}`).join('\n')}

RESIDUARY ESTATE: ${data.residuaryEstate}

WITNESSES:
1. ${data.witness1}
2. ${data.witness2}

Testator Signature: _________________
Date: ${new Date().toLocaleDateString()}

Witness 1 Signature: _________________
Witness 2 Signature: _________________
    `
  };
}

module.exports = router;
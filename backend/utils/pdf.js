const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');
const {logError}=require('./logEvent');

let oldFontSize = '';
const pages = [];
let titlePage = '';
const createFooter = (doc) => {
    const range = doc.bufferedPageRange();
    doc.fontSize(10);
    doc.font('Times-Roman');
    const footerText = '(c)2023 Editiel98 - G.Crégut'
    for (i = range.start, end = range.start + range.count, range.start <= end; i < end; i++) {
        doc.switchToPage(i);
        doc.fillColor('black').text(footerText, 10, 800);
        if (i !== 0) {
            doc.text(`Page ${i} / ${range.count - 1}`, 10, 800, { with: 450, align: 'right' });
        }
        doc.image(`./utils/logo-mini.png`, 10, 820);
    }
}

const fillSummary = (doc) => {
    doc.switchToPage(1);
    doc.fontSize(15);
    let count = 0;
    const lineHeight = doc.heightOfString('ffff');
    pages.forEach((item) => {
        doc.text(`Page ${item.page} ----------- ${item.titlePage}`, 150, 100 + (count * (lineHeight + 20)));
        count++;
    })

}

const createImageAndTitle = (doc, image, title, startLine) => {
    const left = 40;
    doc.text(title, left, startLine, { width: doc.page.width, align: 'center' });
    const leftImg = (doc.page.width - 250) / 2;
    doc.image(image, leftImg, startLine + 50, {
        fit: [250, 300],
        align: 'center',
        valign: 'center'
    });
}

const createModelItem = (doc, model) => {
    doc.fontSize(16);
    const disponiblePlace = doc.page.height - (80 + (6 * doc.currentLineHeight()));
    const indent = 30;
    const offset = 50;
    if (doc.y >= disponiblePlace) {
        titlePage = '';
        doc.addPage();
    }
    let filePath = './utils/no_image.jpg';
    if (model.boxPicture.includes('jpg'))
        filePath = model.boxPicture.replaceAll('\\', '/');
    doc.image(`./${filePath}`, doc.x, doc.y + 30, {
        fit: [70, 70],
        align: 'center',
        valign: 'center'
    });
    doc.text(`${model.builderName} ${model.modelName}`, { indent: offset });
    doc.moveDown();
    doc.text(`Echelle : ${model.scaleName}`, { indent: indent + offset });
    doc.text(`Marque :  ${model.brandName}`, { indent: indent + offset });
    doc.text(`Référence : ${model.reference}`, { indent: indent + offset });
    doc.text(`Etat : ${model.stateName}`, { indent: indent + offset });
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(oldFontSize);
}

const makeTitle = (doc, title, oldSize) => {
    doc.fillColor('black');
    doc.fontSize(24);
    doc.moveDown();
    doc.text(title, { underline: true });
    doc.moveDown();
    doc.fontSize(oldSize);
}

const makeInlineText = (doc) => {
    doc.fillColor('black');
    doc.fontSize(16);
}

const makeDataUser = (doc, data) => {
    const nbLine = data.data.length;
    const disponiblePlace = doc.page.height - (80 + (nbLine * doc.currentLineHeight()));
    const indent = 30;
    const offset = 0;
    if (doc.y >= disponiblePlace) {
        titlePage = '';
        doc.addPage();
    }
    doc.moveDown();
    doc.text(`Répartion par ${data.title} :`, { indent: offset })
    data.data.forEach((item) => {
        doc.text(`${item.name} : ${item.count}`, { indent: offset + indent })
    })
}

const createPDF = async (response, pathTemp, totalPrice, userName, datas, models, userId, userData) => {
    pages.splice(0, pages.length);
    oldFontSize = '';
    titlePage = '';
    try {
        const today = new Date();
        const doc = new PDFDocument({
            size: 'A4', margins: {
                top: 30, bottom: 20, left: 72, right: 72
            }, bufferPages: true
        });
        const pdfPath = path.join(__dirname, '..', 'assets', 'uploads', 'users', `${userId}`, 'stats.pdf');
        // doc.pipe(fs.createWriteStream(pdfPath,{
        //     responseType: 'blob',
        //   }));
        response.type('application/pdf');
        doc.pipe(response);
        doc.on('pageAdded', () => {
            const range = doc.bufferedPageRange();
            if (titlePage !== '') {
                pages.push({ titlePage, page: range.count - 1 });
            }
        });
        //Première page
        doc.image(`./utils/logo2.png`, 10, 10, {
            width: 180
        });
        doc.font('fonts/Pacifico-Regular.ttf');
        doc.fontSize(48);
        oldFontSize = 48;
        doc.fillColor('#912C51');
        doc.text('Models Kit Database', 240, 20);
        doc.fontSize(60);
        oldFontSize = 60;
        doc.font('Times-Roman');
        doc.fillColor('black');
        doc.text('Statistiques du stock', 10, 350, { width: 580, align: 'center' });
        doc.fontSize(48);
        oldFontSize = 48;
        doc.text(`En date du ${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`, { width: 580, align: 'center' });
        doc.fontSize(24);
        oldFontSize = 24;
        doc.text(`${userName}`, { width: doc.page.width, align: 'center' })
        //Page 2
        titlePage = '';
        doc.addPage();
        doc.save()
            .moveTo(5, 5)
            .lineTo(5, 840)
            .lineTo(200, 840)
            .lineTo(200, 5)
            .fill('#ccccff')
            .restore();
        const widthSom = doc.page.width - 210;
        doc.text('Sommaire', 210, 30, { width: widthSom, align: 'center' });
        titlePage = 'Données chiffréees';
        doc.addPage();
        makeTitle(doc, 'Données chiffréees', oldFontSize);
        makeInlineText(doc);
        doc.text('Données référencées', 10, doc.y)
        //Stats écrites
        doc.list(datas.map((data) => {
            return (`Nombre de kits ${data.name} : ${data.count}`)
        }));
        doc.moveDown();
        doc.moveDown();
        userData.forEach((ud) => {
            makeDataUser(doc, ud);
        });
        doc.moveDown();
        doc.text(`Coût total du stock (suivant les informations fournies) : ${totalPrice} €`);
        titlePage = 'Liste des modèles';
        doc.addPage();
        makeTitle(doc, 'Liste des modèles', oldFontSize);
        models.forEach((model) => {
            createModelItem(doc, model)
        });
        titlePage = 'Répartition par marques - Fournisseurs';
        doc.addPage();
        //Graphiques
        createImageAndTitle(doc, `${pathTemp}/brand.png`, 'Répartition par marques', 40);
        createImageAndTitle(doc, `${pathTemp}/provider.png`, 'Répartition par fournisseurs', 440);
        titlePage = 'Répartition par échelles - périodes';
        doc.addPage();
        createImageAndTitle(doc, `${pathTemp}/scale.png`, 'Répartition par échelles', 40);
        createImageAndTitle(doc, `${pathTemp}/period.png`, 'Répartition par périodes', 440);
        titlePage = 'Répartition par catégories - états';
        doc.addPage();
        createImageAndTitle(doc, `${pathTemp}/category.png`, 'Répartition par catégories', 40);
        createImageAndTitle(doc, `${pathTemp}/state.png`, 'Répartition par états', 440);
        createFooter(doc);
        fillSummary(doc);
        doc.end();

    }
    catch (err) {
        console.error(err);
        logError(`pdf : Erreur dans la génération du PDF : ${err}`);
        throw new Error('Erreur in pdf');
    }
}

module.exports = {
    createPDF,
}
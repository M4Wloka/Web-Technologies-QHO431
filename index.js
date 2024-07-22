const express = require('express');
const path = require('path');
const db = require('./database/database');  // Correctly importing the database connection
const app = express();
const PORT = 5000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res, next) => {
    /* ---------------------------------- AREA ---------------------------------- */
    // stage 1 info - taking from database
    const stage_1 = new Promise((resolve, reject) => {
        db.all('SELECT * FROM Line_Up_Content WHERE stage="stage_1"', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    // stage 2 info taking from database
    const stage_2 = new Promise((resolve, reject) => {
        db.all('SELECT * FROM Line_Up_Content WHERE stage="stage_2"', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    /* ---------------------------------- home ---------------------------------- */
    //taking quotes from home
    const hero = new Promise((resolve, reject) => {
        db.all('SELECT * FROM Home_content', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    /* ---------------------------------- Area ---------------------------------- */
    //taking photo titles
    const area_photo_text = new Promise((resolve, reject) => {
        db.all('SELECT photo_title, photo_subtitles FROM Area_Content', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    //taking photo subtitles
    const area_text = new Promise((resolve, reject) => {
        db.all('SELECT area_text FROM Area_Content', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    /* ----------------------------------- FAQ ---------------------------------- */
    //taking questions from db
    const faq_questions = new Promise((resolve, reject) => {
        db.all('SELECT question FROM FAQ_content', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
    // taking answers
    const faq_answer = new Promise((resolve, reject) => {
        db.all('SELECT answer FROM FAQ_content', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });

    Promise.all([hero, stage_1, stage_2, area_photo_text, area_text, faq_questions, faq_answer])
    .then(([hero_text, stage_1_text, stage_2_text, area_img_text, area_txt, faq_questions_txt, faq_answer_txt]) => {

        //Hero quotes
        const q1_hero = hero_text.find(quote => quote.quote_identifier === 'Quote1').quote_text;
        const q2_hero = hero_text.find(quote => quote.quote_identifier === 'Quote2').quote_text;
        const q3_hero = hero_text.find(quote => quote.quote_identifier === 'Quote3').quote_text;
        const q4_hero = hero_text.find(quote => quote.quote_identifier === 'Quote4').quote_text;
        const q5_hero = hero_text.find(quote => quote.quote_identifier === 'Quote5').quote_text;

        // Stage 1 artists
        const art1 = stage_1_text[0];
        const art2 = stage_1_text[1];
        const art3 = stage_1_text[2];
        const art4 = stage_1_text[3];
        const art5 = stage_1_text[4];
        const art6 = stage_1_text[5];

        // Stage 2 artists
        const arti1 = stage_2_text[0];
        const arti2 = stage_2_text[1];
        const arti3 = stage_2_text[2];
        const arti4 = stage_2_text[3];
        const arti5 = stage_2_text[4];
        const arti6 = stage_2_text[5];

        // Area photo titles and subtitles
        const photo_title_1 = area_img_text[0].photo_title;
        const photo_title_2 = area_img_text[1].photo_title;
        const photo_title_3 = area_img_text[2].photo_title;
        const photo_title_4 = area_img_text[3].photo_title;
        const photo_sub_1 = area_img_text[0].photo_subtitles;
        const photo_sub_2 = area_img_text[1].photo_subtitles;
        const photo_sub_3 = area_img_text[2].photo_subtitles;
        const photo_sub_4 = area_img_text[3].photo_subtitles;

        // Area texts
        const area_text_1 = area_txt[0].area_text;
        const area_text_2 = area_txt[1].area_text;
        const area_text_3 = area_txt[2].area_text;

        // FAQ questions
        const faq_question_1 = faq_questions_txt[0].question;
        const faq_question_2 = faq_questions_txt[1].question;
        const faq_question_3 = faq_questions_txt[2].question;
        const faq_question_4 = faq_questions_txt[3].question;
        const faq_question_5 = faq_questions_txt[4].question;
        const faq_question_6 = faq_questions_txt[5].question;

        // FAQ answers
        const faq_answer_1 = faq_answer_txt[0].answer;
        const faq_answer_2 = faq_answer_txt[1].answer;
        const faq_answer_3 = faq_answer_txt[2].answer;
        const faq_answer_4 = faq_answer_txt[3].answer;
        const faq_answer_5 = faq_answer_txt[4].answer;
        const faq_answer_6 = faq_answer_txt[5].answer;

        // render the response
        res.render('index', { 
            art1, art2, art3, art4, art5, art6, 
            arti1, arti2, arti3, arti4, arti5, arti6, 
            q1_hero, q2_hero, q3_hero, q4_hero, q5_hero, 
            photo_title_1, photo_title_2, photo_title_3, photo_title_4, 
            photo_sub_1, photo_sub_2, photo_sub_3, photo_sub_4, 
            area_text_1, area_text_2, area_text_3,
            faq_question_1, faq_question_2, faq_question_3, faq_question_4, faq_question_5, faq_question_6,
            faq_answer_1, faq_answer_2, faq_answer_3, faq_answer_4, faq_answer_5, faq_answer_6 
        });
    })
    .catch(err => {
        console.error('Error fetching data:', err);
        res.status(500).send('Database Error');
    });
});

/* ---------------------------- path for activity --------------------------- */
app.get('/Activity', (req, res) => {
    res.render('partial/Activity'); 
});
/* --------------------------------- CONTACT -------------------------------- */
//path for contact
app.get('/Contact', (req, res) => {
    res.render('partial/Contact');
});
// post filled form
app.post('/Filled-form', (req, res) => {
    //extract the values from ejs body
    const { name, email, comment } = req.body;
    //validation 
    if (!name || !email || !comment) {
        return res.status(400).send('All fields need to be filled');
    }
    //sql query to save data in database
    const sql = 'INSERT INTO contact (full_name, email, comment) VALUES (?, ?, ?)';
    db.run(sql, [name, email, comment], (err) => {
        if (err) {
            console.error('Database error', err.message);
            return res.status(500).send('Error.');
        }
        res.redirect('/'); 
    });
}); 

app.get('/search', (req, res) => {
    //extracts q from query
    const { q } = req.query;
    //sql query
    const sql = 'SELECT question, answer FROM FAQ_content WHERE question LIKE ? OR answer LIKE ?';
    //q is a key word which is searching in the query
    const searchTerm = `%${q}%`; 

    //execute the query with search term
    db.all(sql, [searchTerm, searchTerm], (err, rows) => {
        if (err) {
            console.error('Error.', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        //send the result to json
        res.json(rows); 
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${5000}`);
});
 /* -------------------------------------------------------------------------- */
 /*                            node index.js to run                            */
 /* -------------------------------------------------------------------------- */
 /* -------------------------------------------------------------------------- */
 /*                                     or                                     */
 /* -------------------------------------------------------------------------- */
 /* -------------------------------------------------------------------------- */
 /*                              npm run devStart                              */
 /* -------------------------------------------------------------------------- */
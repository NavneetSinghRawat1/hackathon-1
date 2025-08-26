import 'dotenv/config';
import express from 'express';
import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
const app = express();

const port = process.env.PORT || 3030;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/submitform', async (req, res) => {
    try {
        console.log(req.body);

        const name = req.body.name;
        const email = req.body.email;
        const msg = req.body.message;

        const { data, error } = await supabase
            .from('form_data')
            .insert([
                {
                    name: name,
                    email: email,
                    message: msg
                },
            ])
            .select();

        if (error) throw new Error('error ocurred');
        console.log(data);
        return res.json({ result: 'success' });

    } catch (error) {
        console.error(error);
        return res.json({ result: 'fail' });
    }
});

app.post('/signup', async (req, res) => {
    try {
        console.log(req.body);

        const usrname = req.body.username;
        const email = req.body.email;
        const pwd = req.body.pwd;


        const { data, error } = await supabase
            .from('users')
            .insert([
                {
                    username: usrname,
                    email: email,
                    password: pwd
                },
            ])
            .select();


        if (error) throw new Error('error ocurred');
        console.log(data);
        return res.json({ result: 'success' });

    } catch (error) {
        console.error(error);
        return res.json({ result: 'fail' });
    }
});
app.post('/login', async (req, res) => {
    try {
        console.log(req.body);
        const email = req.body.email;
        const pwd = req.body.pwd;

        let { data: users, error } = await supabase
            .from('users')
            .select('*');

        if (error) throw new Error('error ocurred');

        if (users[0].email === email && users[0].password === pwd) {
            return res.json({ result: 'success' });
        }
        else return res.json({ result: 'fail', msg: `password or email didn't match` });

    } catch (error) {
        console.error(error);
        return res.json({ result: 'fail' });
    }
});


app.listen(port, () => console.log(`listening on : ${port}`))
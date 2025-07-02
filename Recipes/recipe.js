import express from 'express';
const app = express()
const port = 4001
app.use(express.static('public'))
app.use(express.static('assets'))
app.set('view engine','pug')
const recipes = {
    name : ["Fattened rice"],
    Ingredients: ["Falttened Rice","Onions","Mustard Seeds","Curry Leaves","Turmeric","Peanuts"],
    Steps:[
        'Heat oil in a pan, add mustard seeds, curry leaves, and green chilies.',
        'Add finely chopped onions and sauté until translucent.',
        'Add turmeric powder, salt, and soaked poha (flattened rice); mix well.',
        'Cook for 2-3 minutes, garnish with coriander leaves and lemon juice. Serve hot!'
    ]
}
app.get('/',(req,res) => {
    res.render('recipe',{recipes})
})
app.listen(port)
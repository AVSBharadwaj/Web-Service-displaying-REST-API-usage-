const express=require('express')
const Joi = require('joi')
const app=express()
app.use(express.json())

const port=process.env.PORT || 8080;
app.listen(port,()=>console.log('Listening in port $(port)..'));

const players =[
	{name:"messi", rank:1},
	{name:"ronaldo",rank : 2},
	{name:"hazard",rank:3},
	{name:"kaka",rank:4},
	{name:"falcao",rank:5}

]

app.get('/',(req,res)=>{
	res.send('Welcome to my world you may rest now ');
});

app.get('/api/players',(req,res)=>{
	res.send(players);
});

app.get('/api/players/:id',(req,res)=>{
	const player= players.find(c=> c.rank===parseInt(req.params.id));

	if(!player) res.status(404).send('<h2 style="color:darkred; font-family: Malgun	Gothic;">Sorry the page could not be found </h2> ');
	res.send(player);
});

app.post('/api/players',(req,res)=>{


	const{error}=validateName(req.body);
	if(error)
	{
		res.status(404).send(error.details[0].message);
		return;
	}
	const player={
		rank:players.length +1,
		name:req.body.name
	};
	players.push(player);
	res.send(player);
});

app.put('/api/players/:id',(req,res)=>{

	const player=players.find(c=>c.rank===parseInt(req.params.id));
	if(!player)res.status(404).send('<h2 style="color:darkred; font-family: Malgun	Gothic;">Sorry the page could not be found </h2> ');
	const{error}=validateName(req.body);
	if(error){	
		res.status(404).send(error.details[0].message);
		return;
	}
	player.name=req.body.name;
	res.send(player);
});


app.delete('/api/players/:id',(req,res)=>{

	const player=players.find(c=>c.rank===parseInt(req.params.id));
	if(!player) res.status(404).send('<h2 style="color:darkred; font-family: Malgun	Gothic;">Sorry the page could not be found </h2> ');
	const index=players.indexOf(player);
	players.splice(index, 1);
	res.send(player);

});
function validateName(player)
{
	schema={
		name:Joi.string().min(3).required()

	};
	return schema.validate(player);
}
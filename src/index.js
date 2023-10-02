const express=require('express');
const cors = require('cors');
var bodyParser = require('body-parser')

var app = express();

const userRouter = require('./routes/user_route');
const typeUserRouter = require('./routes/type_user_route');
const typeWorkRouter = require('./routes/type_work_route');
const companyRouter = require('./routes/company_route');
const floorRouter = require('./routes/floor_route');
const responsibleRouter = require('./routes/responsible_route');
const stateWorkRouter = require('./routes/state_work_route');
const workRouter = require('./routes/work_route');
const equipmentFacilitiesRouter = require('./routes/equipment_facilities_route');

app.use(bodyParser.json({limit: '50mb'}));
app.use(cors());
app.use('/api', userRouter);
app.use('/api', typeUserRouter);
app.use('/api', typeWorkRouter);
app.use('/api', companyRouter);
app.use('/api', floorRouter);
app.use('/api', responsibleRouter);
app.use('/api', stateWorkRouter);
app.use('/api', workRouter);
app.use('/api', equipmentFacilitiesRouter);

app.listen(3000, () => console.log("listening on port 3000"));
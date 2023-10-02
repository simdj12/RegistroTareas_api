const { Sequelize } = require('sequelize');
const UserModel = require('../models/user');
const TypeUserModel = require('../models/type_user');
const CompanyModel = require('../models/company');
const EquipmentFacilitiesModel = require('../models/equipment_facilities');
const FloorModel = require('../models/floor');
const ResponsibleModel = require('../models/responsible');
const StateWorkModel = require('../models/state_work');
const TypeWorkModel = require('../models/type_work');
const WorkModel = require('../models/work');
// CONNECCTION TO DB
const sequelize = new Sequelize('postgres://postgres:Caracas01.@localhost:5432/postgres')
//sequelize.sync().then(console.log('DB is synced'));

/// MODELS ///
const TypeUser = TypeUserModel(sequelize);
const User = UserModel(sequelize);
const Company = CompanyModel(sequelize);
const EquipmentFacilities = EquipmentFacilitiesModel(sequelize);
const Floor = FloorModel(sequelize);
const Responsible = ResponsibleModel(sequelize);
const StateWork = StateWorkModel(sequelize);
const TypeWork = TypeWorkModel(sequelize);
const Work = WorkModel(sequelize);
/// RELATIONS ///
User.belongsTo(TypeUser, { foreignKey: 'id_type_user' });
EquipmentFacilities.belongsTo(Floor, { foreignKey: 'id_floor' });
Responsible.belongsTo(Company, { foreignKey: 'id_company' });
Work.belongsTo(StateWork, { foreignKey: 'id_state_work' });
Work.belongsTo(TypeWork, { foreignKey: 'id_type_work' });
Work.belongsTo(Responsible, { foreignKey: 'id_responsible' });
Work.belongsTo(EquipmentFacilities, { foreignKey: 'id_equipment_facilities' });
// User.belongsTo(Owner, { foreignKey: 'id_owner' });
// Property.belongsTo(TypeProperty, { foreignKey: 'id_type_property' });
// OwnerProperty.belongsTo(Owner, { foreignKey: 'id_owner' });
// OwnerProperty.belongsTo(Property, { foreignKey: 'id_property' });
// Payment.belongsTo(TypePayment, { foreignKey: 'id_type_payment' });
// Payment.belongsTo(TypeAmount, { foreignKey: 'id_type_amount' })
// TypeUser.belongsTo(User);
/**
 * Uncomment this in order to generate table
 */
// sequelize.sync().then(logger('DB is synced'));

module.exports = {User, TypeUser, Company, EquipmentFacilities, Floor, Responsible, StateWork, TypeWork, Work, sequelize};
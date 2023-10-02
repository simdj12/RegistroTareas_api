const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('company',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            company_name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contact_phone: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.company

// -- DROP TABLE IF EXISTS public.company;

// CREATE TABLE IF NOT EXISTS public.company
// (
//     id integer NOT NULL DEFAULT nextval('company_id_seq'::regclass),
//     company_name character varying COLLATE pg_catalog."default" NOT NULL,
//     contact_phone character varying COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT company_pkey PRIMARY KEY (id)
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.company
//     OWNER to postgres;
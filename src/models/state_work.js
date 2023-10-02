const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('state_work',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            state_work: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.state_work

// -- DROP TABLE IF EXISTS public.state_work;

// CREATE TABLE IF NOT EXISTS public.state_work
// (
//     id integer NOT NULL DEFAULT nextval('state_work_id_seq'::regclass),
//     state_work character varying COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT state_work_pkey PRIMARY KEY (id)
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.state_work
//     OWNER to postgres;
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('type_work',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type_work: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.type_work

// -- DROP TABLE IF EXISTS public.type_work;

// CREATE TABLE IF NOT EXISTS public.type_work
// (
//     id integer NOT NULL DEFAULT nextval('type_work_id_seq'::regclass),
//     type_work character varying COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT type_work_pkey PRIMARY KEY (id)
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.type_work
//     OWNER to postgres;
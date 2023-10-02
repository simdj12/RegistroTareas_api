const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('type_user',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            type_user: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.type_user

// -- DROP TABLE IF EXISTS public.type_user;

// CREATE TABLE IF NOT EXISTS public.type_user
// (
//     id integer NOT NULL DEFAULT nextval('type_user_id_seq'::regclass),
//     type_user character varying COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT type_user_pkey PRIMARY KEY (id)
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.type_user
//     OWNER to postgres;
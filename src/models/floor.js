const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('floor',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            floor: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.floor

// -- DROP TABLE IF EXISTS public.floor;

// CREATE TABLE IF NOT EXISTS public.floor
// (
//     id integer NOT NULL DEFAULT nextval('floor_id_seq'::regclass),
//     floor character varying COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT floor_pkey PRIMARY KEY (id)
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.floor
//     OWNER to postgres;
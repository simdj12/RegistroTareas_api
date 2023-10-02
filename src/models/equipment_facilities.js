const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('equipment_facilities',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            id_floor: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.equipment_facilities

// -- DROP TABLE IF EXISTS public.equipment_facilities;

// CREATE TABLE IF NOT EXISTS public.equipment_facilities
// (
//     id integer NOT NULL DEFAULT nextval('equipment_facilities_id_seq'::regclass),
//     name character varying COLLATE pg_catalog."default" NOT NULL,
//     id_floor integer NOT NULL,
//     description text COLLATE pg_catalog."default" NOT NULL,
//     CONSTRAINT equipment_facilities_pkey PRIMARY KEY (id),
//     CONSTRAINT id_floor FOREIGN KEY (id_floor)
//         REFERENCES public.floor (id) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
//         NOT VALID
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.equipment_facilities
//     OWNER to postgres;
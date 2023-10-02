const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('work',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            id_type_work: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_responsible: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            id_state_work: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            start_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            end_date: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            id_equipment_facilities: {
                type: DataTypes.INTEGER,
                allowNull: false,
            }
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.work

// -- DROP TABLE IF EXISTS public.work;

// CREATE TABLE IF NOT EXISTS public.work
// (
//     id integer NOT NULL DEFAULT nextval('work_id_seq'::regclass),
//     id_type_work integer NOT NULL,
//     id_responsible integer NOT NULL,
//     id_state_work integer NOT NULL,
//     start_date date NOT NULL,
//     end_date date NOT NULL,
//     description text COLLATE pg_catalog."default" NOT NULL,
//     id_equipment_facilities integer NOT NULL,
//     CONSTRAINT work_pkey PRIMARY KEY (id),
//     CONSTRAINT id_equipment_facilities FOREIGN KEY (id_equipment_facilities)
//         REFERENCES public.equipment_facilities (id) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
//         NOT VALID,
//     CONSTRAINT id_responsible FOREIGN KEY (id_responsible)
//         REFERENCES public.responsible (id) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION,
//     CONSTRAINT id_state_work FOREIGN KEY (id_state_work)
//         REFERENCES public.state_work (id) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION,
//     CONSTRAINT id_type_work FOREIGN KEY (id_type_work)
//         REFERENCES public.type_work (id) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.work
//     OWNER to postgres;
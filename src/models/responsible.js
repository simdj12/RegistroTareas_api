const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('responsible',
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
            document_id: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            id_company: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.responsible

// -- DROP TABLE IF EXISTS public.responsible;

// CREATE TABLE IF NOT EXISTS public.responsible
// (
//     id integer NOT NULL DEFAULT nextval('responsible_id_seq'::regclass),
//     name character varying COLLATE pg_catalog."default" NOT NULL,
//     document_id character varying COLLATE pg_catalog."default" NOT NULL,
//     id_company integer NOT NULL,
//     CONSTRAINT responsible_pkey PRIMARY KEY (id),
//     CONSTRAINT id_company FOREIGN KEY (id_company)
//         REFERENCES public.company (id) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
//         NOT VALID
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public.responsible
//     OWNER to postgres;
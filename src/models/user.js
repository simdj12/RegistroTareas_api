const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('user',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            status: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            id_type_user: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
            }
        },{
            freezeTableName: true,
            timestamps: false,
        }
    );
};

// -- Table: public.user

// -- DROP TABLE IF EXISTS public."user";

// CREATE TABLE IF NOT EXISTS public."user"
// (
//     id integer NOT NULL DEFAULT nextval('user_id_seq'::regclass),
//     username character varying COLLATE pg_catalog."default" NOT NULL,
//     email character varying COLLATE pg_catalog."default" NOT NULL,
//     password character varying COLLATE pg_catalog."default" NOT NULL,
//     status boolean NOT NULL,
//     id_type_user integer NOT NULL,
//     CONSTRAINT user_pkey PRIMARY KEY (id),
//     CONSTRAINT id_type_user FOREIGN KEY (id_type_user)
//         REFERENCES public.type_user (id) MATCH SIMPLE
//         ON UPDATE NO ACTION
//         ON DELETE NO ACTION
//         NOT VALID
// )

// TABLESPACE pg_default;

// ALTER TABLE IF EXISTS public."user"
//     OWNER to postgres;
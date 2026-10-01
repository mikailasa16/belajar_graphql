const ProgramStudi = require("../../models/program_studi/ProgramStudiModel");
const { Op } = require("sequelize");

const resolvers = {
    Query: {
        programStudi: async () => {
            return await ProgramStudi.findAll({
                where: {
                    delete_at: null
                },
                order: [["nama", "ASC"]]
            });
        },

        programStudiById: async (_, { id }) => {
            const data = await ProgramStudi.findOne({
                where: {
                    id_program_studi: id,
                    delete_at: null
                }
            });

            if (!data) {
                throw new Error("Program studi tidak ditemukan");
            }

            return data;
        },

        cariProgramStudi: async (_, { keyword }) => {
            return await ProgramStudi.findAll({
                where: {
                    delete_at: null,
                    [Op.or]: [
                        {
                            kode: {
                                [Op.like]: `%${keyword}%`
                            }
                        },
                        {
                            nama: {
                                [Op.like]: `%${keyword}%`
                            }
                        }
                    ]
                },
                order: [["nama", "ASC"]]
            });
        }
    },

    Mutation: {
        tambahProgramStudi: async (_, { input }) => {
            const waktu = new Date();

            return await ProgramStudi.create({
                ...input,
                create_at: waktu,
                update_at: waktu,
                delete_at: null
            });
        },

        updateProgramStudi: async (_, { id, input }) => {
            const data = await ProgramStudi.findOne({
                where: {
                    id_program_studi: id,
                    delete_at: null
                }
            });

            if (!data) {
                throw new Error("Program studi tidak ditemukan");
            }

            await data.update({
                ...input,
                update_at: new Date()
            });

            return data;
        },

        deleteProgramStudi: async (_, { id }) => {
            const data = await ProgramStudi.findOne({
                where: {
                    id_program_studi: id,
                    delete_at: null
                }
            });

            if (!data) {
                throw new Error("Program studi tidak ditemukan");
            }

            await data.update({
                delete_at: new Date(),
                update_at: new Date()
            });

            return data;
        },

        restoreProgramStudi: async (_, { id }) => {
            const data = await ProgramStudi.findOne({
                where: {
                    id_program_studi: id
                }
            });

            if (!data) {
                throw new Error("Program studi tidak ditemukan");
            }

            await data.update({
                delete_at: null,
                update_at: new Date()
            });

            return data;
        }
    }
};

module.exports = resolvers;
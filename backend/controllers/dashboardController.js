const db = require("../config/db");

const getStats = (req, res) => {

    const usersQuery = "SELECT COUNT(*) AS totalUsers FROM users";

    const companiesQuery = "SELECT COUNT(*) AS totalCompanies FROM companies";

    const internshipsQuery = "SELECT COUNT(*) AS totalInternships FROM internships";

    db.query(usersQuery, (err, usersResult) => {
        if(err){
            return res.status(500).json({
                error: "Error obteniendo usuarios" 
            });
        }

        db.query(companiesQuery, (err, companiesResult) => {
            if(err){
                return res.status(500).json({
                    error: "Error obteniendo empresas"
                });
            }

            db.query(internshipsQuery, (err, internshipsResult) => {
                if(err){
                    return res.status(500).json({
                        error: "Error obteniendo prácticas"
                    });
                }
                res.json({
                    totalUsers: usersResult[0].totalUsers,
                    totalCompanies: companiesResult[0].totalCompanies,
                    totalInternships: internshipsResult[0].totalInternships
                });
            });
        });
    });
};

module.exports = {
    getStats
};
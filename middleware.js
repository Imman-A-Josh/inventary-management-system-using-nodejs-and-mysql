const sql = require('./src/model/connection')

module.exports = (req, res, next) => {
    let originalUrl = req.originalUrl;

    console.log(`\n\n \t 192.168.0.173:8000${originalUrl} \t ${req.method}`);
    let token = req.headers.authorization;

    if (originalUrl == '/api/user/login' || originalUrl == '/user') {
        next();
    }
    else {
        sql.query(`select loginid from UserSession where token='${token}'`, (err, data) => {
            if (err) {
                res.send(err);
            }
            if (data == 0) {
                console.log("token invalid");
                res.send("Please add the Token");
            }
            else {
                console.log(data);
                let id = data.pop().loginid;
                sql.query(`select * from Users where id='${id}'`, (err, result) => {
                    if (err) {
                        res.send(err);
                    }
                    if (result == 0) {
                        res.send("Users details wrong");
                    }
                    else {
                        var data = result.pop();
                        var role = data.role;
                        req.user = data
                        if (role == 'admin') {
                            next();
                        }
                        else {
                            res.send('Sorry Not access for any other Users');
                        }
                    }
                })
            }
        });

    }
}
/**
 * Created by rookie on 2017/6/19.
 * All copyright belongs to rookie.
 */

function loginFilter (request, response, next){
    if (request.session && request.session.user){
        return next();
    }
    response.render("login", {message : "please login first."});
}

module.exports = loginFilter;

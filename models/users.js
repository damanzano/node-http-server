/**
 * http://usejsdoc.org/
 */
var users = [
	{"name":"David", "email":"david.manzano@correo.icesi.edu.o"},
	{"name":"Karlos", "email":"Karlos.manzano@correo.icesi.edu.o"}
];

exports.getUser = function(index){
	return users[index];
}

exports.getAll = function(){
	return users;
}

exports.create = function(name, email){
	/* TODO We should validate the params*/
	var user = {"name":name, "email":email};
	users.push(user);
}

exports.update = function(index, name, email){
	// first verify that the user with id
	var user = this.getUser(index);
	if (user == null || user == undefined ){
		return false;
	}
	/* TODO We should validate the params*/
	user.name = name;
	user.email = email;
}

exports.deleteALL = function(){
	users = [];
}

exports.deleteUser = function(index){
	users.splice(index, 1);
}
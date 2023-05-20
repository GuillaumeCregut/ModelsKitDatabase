class User{
    id;
    firstname;
    lastname;
    login;
    password;
    rank;
    email;
    constructor(firstname,lastname,login, password,rank,email,id=0){
        this.firstname=firstname;
        this.lastname=lastname;
        this.email=email;
        this.rank=rank;
        this.password=password;
        this.login=login;
        this.id=id
    }

    setId(id){
        this.id=id;
    }
    update(firstname,lastname,login, password,rank,email){
        if(!this.firstname)
            this.firstname=firstname;
        if(!this.lastname)
            this.lastname=lastname;
        if(!this.login)
            this.login=login;
        if(!this.password)
            this.password=password;
        if(!this.rank)
            this.rank=rank;
        if(!this.email)
            this.email=email;
    }
}

module.exports=User;
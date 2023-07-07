class User{
    id;
    firstname;
    lastname;
    login;
    password;
    rank;
    email;
    isVisible;
    avatar;
    allow;
    constructor(firstname,lastname,login, password,rank,email,isVisible,avatar,allow,id=0){
        this.firstname=firstname;
        this.lastname=lastname;
        this.email=email;
        this.rank=rank;
        this.password=password;
        this.login=login;
        this.id=id
        this.isVisible=isVisible;
        this.avatar=avatar;
        this.allow=allow;
    }

    setId(id){
        this.id=id;
    }
    update(firstname,lastname,login, password,rank,email,isVisible,avatar,allow){
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
        if(this.isVisible===null)
            this.isVisible=isVisible;
        if(!this.avatar)
            this.avatar=avatar;
        if(this.allow===null)
            this.allow=allow;

    }
}

module.exports=User;
class Supplier{
    id;
    owner;
    name;
    constructor (id,name,ownerId){
        this.id=id;
        this.name=name;
        this.owner=ownerId;
    }
    setId(id){
        this.id=id;
    }
}

module.exports=Supplier;
class Builder{
    id;
    countryId;
    name;
    countryName;
    constructor(id,name,countryId){
        this.id=id;
        this.name=name;
        this.countryId=countryId;
    }
    setId (id){
        this.id=id
    }
    setCountryName(name){
        this.countryName=name;
    }
}

module.exports=Builder;
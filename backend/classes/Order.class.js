class Orders{
    providerId;
    providerName;
    ownerId;
    reference;
    dateOrder;
    models=[];
    constructor(provider,owner,reference,dateOrder){
        this.reference=reference;
        this.ownerId=owner;
        this.providerId=provider;
        this.dateOrder=dateOrder;
    }

    setProviderName (name){
         this.providerName=name;
    }

    addModels(model){
        this.models.push(model);
    }

    removeModel(id){
        this.models=this.models.filter((item)=>item.id!==id);
    }

    updateModel(id,model){
        this.models=this.models.map((item)=>{
            if(item.id===id)
                return model;
            else
                return item;
        })
    }

}

module.exports=Orders;
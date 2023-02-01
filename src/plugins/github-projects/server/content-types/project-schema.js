
module.exports ={
    kind:"collectionType",
    collectionName:"prjects",
    info:{
        singularName:"project",
        pluralName:"projects",
        displayName:"project"
    },
    options:{
        draftAndPublish:false,
    },
    attributes:{
        repositoryid:{
            type:"uid",
            unique:"true",
        },
   
        title:{
            type:"string",
            required:"true",
            unique:"true",
        },
        shortDescription:{
            type:"string",
            
        },
        longDescription:{
            type:"richText"
        },
        repositoryUrl:{
            type:"string"
        }

    }


}
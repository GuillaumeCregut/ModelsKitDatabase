import {produce} from "immer";

export const dragReducer=produce((draft,action)=>{
    switch (action.type){
        case 'MOVE':{
            draft[action.from] = draft[action.from]||[];
            draft[action.to] = draft[action.to]||[];
            const [removed]=draft[action.from].splice(action.fromIndex,1);
            draft[action.to].splice(action.toIndex,0,removed);
        }
    }
});


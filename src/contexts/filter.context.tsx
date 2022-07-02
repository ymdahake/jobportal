import {createContext, useState} from 'react';
import { Filters } from '../models/Option';
import { FiltersIntialState } from './../models/Option';



export const FilterContext = createContext({
    selectedfilters  : {} as Filters,
    setselectedfilters:(filters :Filters)=>{},
    
    });
    
    export const FilterProvider =({children}:any)=>{
        const [selectedfilters,setselectedfilters] = useState<Filters>(FiltersIntialState);
        const value ={selectedfilters,setselectedfilters};
        return  <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
    }
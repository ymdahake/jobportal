export interface  Option {
    key:string,
    value:string 
}


export interface Filters {
    filterByDate :string,
    filterByLocation :string,
    filterByLevel :string
  }
  

  export const FiltersIntialState :Filters = {
    filterByDate :"",
    filterByLocation :"",
    filterByLevel :""
  }
  